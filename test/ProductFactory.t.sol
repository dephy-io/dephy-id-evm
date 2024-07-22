// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IProductFactory} from "../contracts/IProductFactory.sol";
import {ProductFactory} from "../contracts/ProductFactory.sol";
import {Product} from "../contracts/Product.sol";
import "forge-std/Test.sol";

contract ProductFactoryTest is Test {
    ProductFactory public factory;
    Product public productImplementation;
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

        productImplementation = new Product();
        factory = new ProductFactory(owner);
    }

    function testCreateProduct() public {
        vm.prank(vendor);

        IProductFactory.CreateProductArgs memory args = IProductFactory
            .CreateProductArgs({
                productImpl: address(productImplementation),
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
                productImpl: address(productImplementation),
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

        uint256 tokenId = factory.getDeviceTokenId(
            productAddress,
            deviceArgs.devices[0]
        );
        assertEq(tokenId, 1);
        assertEq(Product(productAddress).ownerOf(tokenId), address(factory));
    }

    function testCreateActivatedDevices() public {
        vm.startPrank(vendor);

        IProductFactory.CreateProductArgs memory args = IProductFactory
            .CreateProductArgs({
                productImpl: address(productImplementation),
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

        uint256 tokenId = factory.getDeviceTokenId(
            productAddress,
            activatedDeviceArgs.devices[0]
        );
        assertEq(tokenId, 1);

        assertEq(Product(productAddress).ownerOf(tokenId), user);
    }

    function testActivateDevice() public {
        vm.startPrank(vendor);

        IProductFactory.CreateProductArgs memory args = IProductFactory
            .CreateProductArgs({
                productImpl: address(productImplementation),
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

        uint256 tokenId = factory.getDeviceTokenId(
            productAddress,
            deviceArgs.devices[0]
        );
        assertEq(tokenId, 1);

        uint256 deviceDeadline = block.timestamp + 12 hours;
        bytes memory deviceSignature = _generateDeviceSignature(
            deviceDeadline,
            devicePK
        );

        IProductFactory.ActivateDeviceArgs memory activateArgs = IProductFactory
            .ActivateDeviceArgs({
                product: productAddress,
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

        assertEq(Product(productAddress).ownerOf(tokenId), user);
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
                activateArgs.product,
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
