// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {IProductFactory} from "../contracts/IProductFactory.sol";
import {ProductFactory} from "../contracts/ProductFactory.sol";
import {Product} from "../contracts/Product.sol";
import {ProductFactoryV2} from "./mock/ProductFactoryV2.sol";
import "forge-std/Test.sol";

contract ProductFactoryTest is Test {
    ProductFactory public factory;
    Product public productImpl;
    address public owner;
    address public vendor;
    address public user;
    uint256 public userPK;
    address public device;
    uint256 public devicePK;

    function setUp() public {
        owner = makeAddr("owner");
        vendor = makeAddr("vendor");
        (user, userPK) = makeAddrAndKey("user");
        (device, devicePK) = makeAddrAndKey("device");

        productImpl = new Product();
        ProductFactory factoryImpl = new ProductFactory();
        ERC1967Proxy factoryProxy = new ERC1967Proxy(
            address(factoryImpl),
            abi.encodeWithSelector(ProductFactory.initialize.selector, owner)
        );
        factory = ProductFactory(address(factoryProxy));
    }

    function testUpgrade() public {
        address newOwner = makeAddr("newOwner");
        ProductFactoryV2 factoryImplV2 = new ProductFactoryV2();
        vm.prank(owner);
        factory.upgradeToAndCall(
            address(factoryImplV2),
            abi.encodeWithSelector(
                ProductFactoryV2.initialize.selector,
                newOwner
            )
        );
        assertEq(factory.owner(), newOwner);
        (, , string memory version, , , , ) = factory.eip712Domain();
        assertEq(version, "2");
    }

    function testCreateProduct() public {
        vm.prank(vendor);

        IProductFactory.CreateProductArgs memory args = IProductFactory
            .CreateProductArgs({
                productImpl: address(productImpl),
                name: "Test Product",
                symbol: "TP",
                baseTokenURI: "https://example.com/token/"
            });

        address product = factory.createProduct(args);

        assertEq(factory.getVendorByProduct(product), vendor);
    }

    function testCreateDevices() public {
        vm.startPrank(vendor);

        IProductFactory.CreateProductArgs memory args = IProductFactory
            .CreateProductArgs({
                productImpl: address(productImpl),
                name: "Test Product",
                symbol: "TP",
                baseTokenURI: "https://example.com/token/"
            });

        address productAddress = factory.createProduct(args);

        IProductFactory.CreateDevicesArgs memory deviceArgs = IProductFactory
            .CreateDevicesArgs({
                product: productAddress,
                devices: new address[](1)
            });
        deviceArgs.devices[0] = device;

        vm.expectEmit(true, true, false, false, address(factory));
        emit IProductFactory.DeviceCreated(productAddress, device, 0);

        factory.createDevices(deviceArgs);

        vm.stopPrank();

        IProductFactory.DeviceBinding memory deviceBinding = factory.getDeviceBinding(deviceArgs.devices[0]);
        assertEq(deviceBinding.product, productAddress);
        assertEq(deviceBinding.tokenId, 1);

        assertEq(Product(productAddress).ownerOf(deviceBinding.tokenId), address(factory));
    }

    function testCreateActivatedDevices() public {
        vm.startPrank(vendor);

        IProductFactory.CreateProductArgs memory args = IProductFactory
            .CreateProductArgs({
                productImpl: address(productImpl),
                name: "Test Product",
                symbol: "TP",
                baseTokenURI: "https://example.com/token/"
            });

        address productAddress = factory.createProduct(args);

        IProductFactory.CreateActivatedDevicesArgs
            memory activatedDeviceArgs = IProductFactory
                .CreateActivatedDevicesArgs({
                    product: productAddress,
                    devices: new address[](1),
                    receivers: new address[](1)
                });
        activatedDeviceArgs.devices[0] = device;
        activatedDeviceArgs.receivers[0] = user;

        vm.expectEmit(true, true, false, false, address(factory));
        emit IProductFactory.DeviceCreated(productAddress, device, 0);

        vm.expectEmit(true, true, false, false, address(factory));
        emit IProductFactory.DeviceActivated(productAddress, device, user);

        factory.createActivatedDevices(activatedDeviceArgs);

        vm.stopPrank();

        IProductFactory.DeviceBinding memory deviceBinding = factory.getDeviceBinding(activatedDeviceArgs.devices[0]);
        assertEq(deviceBinding.product, productAddress);
        assertEq(deviceBinding.tokenId, 1);

        assertEq(Product(productAddress).ownerOf(deviceBinding.tokenId), user);
    }

    function testActivateDevice() public {
        vm.startPrank(vendor);

        IProductFactory.CreateProductArgs memory args = IProductFactory
            .CreateProductArgs({
                productImpl: address(productImpl),
                name: "Test Product",
                symbol: "TP",
                baseTokenURI: "https://example.com/token/"
            });

        address productAddress = factory.createProduct(args);

        IProductFactory.CreateDevicesArgs memory deviceArgs = IProductFactory
            .CreateDevicesArgs({
                product: productAddress,
                devices: new address[](1)
            });
        deviceArgs.devices[0] = device;

        factory.createDevices(deviceArgs);

        vm.stopPrank();

        uint256 deviceDeadline = block.timestamp + 12 hours;
        bytes memory deviceSignature = _generateDeviceSignature(
            deviceDeadline,
            devicePK
        );

        IProductFactory.ActivateDeviceArgs memory activateArgs = IProductFactory
            .ActivateDeviceArgs({
                device: device,
                deviceSignature: deviceSignature,
                deviceDeadline: deviceDeadline
            });

        IProductFactory.EIP712Signature
            memory userSignature = _generateEIP712Signature(
                activateArgs,
                userPK
            );

        vm.prank(user);

        vm.expectEmit(true, true, false, false, address(factory));
        emit IProductFactory.DeviceActivated(productAddress, device, user);

        factory.activateDevice(activateArgs, userSignature);

        IProductFactory.DeviceBinding memory deviceBinding = factory.getDeviceBinding(activateArgs.device);
        assertEq(deviceBinding.product, productAddress);
        assertEq(deviceBinding.tokenId, 1);

        assertEq(Product(productAddress).ownerOf(deviceBinding.tokenId), user);
    }

    function _generateDeviceSignature(
        uint256 deadline,
        uint256 _devicePK
    ) internal pure returns (bytes memory) {
        bytes32 hashedMessage = keccak256(abi.encode(deadline));
        bytes32 digest = _calculateDeviceDigest(hashedMessage);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(_devicePK, digest);
        bytes memory signature = abi.encodePacked(r, s, v);
        return signature;
    }

    function _calculateDeviceDigest(
        bytes32 hashedMessage
    ) internal pure returns (bytes32) {
        bytes32 digest = keccak256(
            abi.encodePacked("DEPHY_ID_SIGNED_MESSAGE:", hashedMessage)
        );
        return digest;
    }

    function _generateEIP712Signature(
        IProductFactory.ActivateDeviceArgs memory activateArgs,
        uint256 accountPK
    ) internal view returns (IProductFactory.EIP712Signature memory) {
        bytes32 domainSeparator = factory.getDomainSeparator();

        bytes32 hashedMessage = keccak256(
            abi.encode(
                factory.ACTIVATE_DEVICE_TYPEHASH(),
                activateArgs.device,
                keccak256(activateArgs.deviceSignature),
                activateArgs.deviceDeadline,
                block.timestamp + 1 days
            )
        );

        bytes32 digest = _calculateEIP712Digest(domainSeparator, hashedMessage);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(accountPK, digest);

        IProductFactory.EIP712Signature memory signature = IProductFactory
            .EIP712Signature({
                signer: user,
                v: v,
                r: r,
                s: s,
                deadline: block.timestamp + 1 days
            });

        return signature;
    }

    function _calculateEIP712Digest(
        bytes32 domainSeparator,
        bytes32 hashedMessage
    ) internal pure returns (bytes32) {
        bytes32 digest = keccak256(
            abi.encodePacked("\x19\x01", domainSeparator, hashedMessage)
        );
        return digest;
    }
}
