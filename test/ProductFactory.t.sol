// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import {ProductFactory} from "../contracts/ProductFactory.sol";
import {Product} from "../contracts/Product.sol";

contract ProductFactoryTest is Test {
    ProductFactory public factory;
    Product public productImplementation;
    address public owner;
    address public vendor;
    address public user;
    address public device;
    uint256 public devicePK;

    function setUp() public {
        owner = makeAddr("owner");
        vendor = makeAddr("vendor");
        user = makeAddr("user");
        (device, devicePK) = makeAddrAndKey("device");

        productImplementation = new Product();
        factory = new ProductFactory(owner);
    }

    function testCreateProduct() public {
        vm.prank(vendor);

        ProductFactory.CreateProductArgs memory args = ProductFactory.CreateProductArgs({
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

        ProductFactory.CreateProductArgs memory args = ProductFactory.CreateProductArgs({
            productImpl: address(productImplementation),
            name: "Test Product",
            symbol: "TP",
            baseTokenURI: "https://example.com/token/"
        });

        address productAddress = factory.createProduct(args);

        ProductFactory.CreateDevicesArgs memory deviceArgs = ProductFactory.CreateDevicesArgs({
            product: productAddress,
            devices: new address[](1) 
        });
        deviceArgs.devices[0] = device;

        factory.createDevices(deviceArgs);

        vm.stopPrank();

        uint256 tokenId = factory.getDeviceTokenId(productAddress, deviceArgs.devices[0]);
        assertEq(tokenId, 1);
        assertEq(Product(productAddress).ownerOf(tokenId), address(factory));
    }

    function testCreateActivatedDevices() public {
        vm.startPrank(vendor);

        ProductFactory.CreateProductArgs memory args = ProductFactory.CreateProductArgs({
            productImpl: address(productImplementation),
            name: "Test Product",
            symbol: "TP",
            baseTokenURI: "https://example.com/token/"
        });

        address productAddress = factory.createProduct(args);

        ProductFactory.CreateActivatedDevicesArgs memory activatedDeviceArgs = ProductFactory.CreateActivatedDevicesArgs({
            product: productAddress,
            devices: new address[](1) ,
            receivers: new address[](1) 
        });
        activatedDeviceArgs.devices[0] = device;
        activatedDeviceArgs.receivers[0] = user;

        factory.createActivatedDevices(activatedDeviceArgs);

        vm.stopPrank();

        uint256 tokenId = factory.getDeviceTokenId(productAddress, activatedDeviceArgs.devices[0]);
        assertEq(tokenId, 1);

        assertEq(Product(productAddress).ownerOf(tokenId), user);
    }

    function testActivateDevice() public {
        vm.startPrank(vendor);

        ProductFactory.CreateProductArgs memory args = ProductFactory.CreateProductArgs({
            productImpl: address(productImplementation),
            name: "Test Product",
            symbol: "TP",
            baseTokenURI: "https://example.com/token/"
        });

        address productAddress = factory.createProduct(args);

        ProductFactory.CreateDevicesArgs memory deviceArgs = ProductFactory.CreateDevicesArgs({
            product: productAddress,
            devices: new address[](1) 
        });
        deviceArgs.devices[0] = device;

        factory.createDevices(deviceArgs);

        vm.stopPrank();

        uint256 tokenId = factory.getDeviceTokenId(productAddress, deviceArgs.devices[0]);
        assertEq(tokenId, 1);

        bytes32 domainSeparator = factory.getDomainSeparator();

        bytes32 hashedMessage = keccak256(
            abi.encode(
                factory.ACTIVATE_DEVICE_TYPEHASH(),
                productAddress,
                block.timestamp + 1 days
            )
        );

        bytes32 digest = _calculateDigest(domainSeparator, hashedMessage);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(devicePK, digest);

        ProductFactory.EIP712Signature memory signature = ProductFactory.EIP712Signature({
            signer: device,
            v: v,
            r: r,
            s: s,
            deadline: block.timestamp + 1 days
        });

        vm.prank(user);

        ProductFactory.ActivateDeviceArgs memory activateArgs = ProductFactory.ActivateDeviceArgs({
            receiver: user,
            product: productAddress,
            tokenId: tokenId
        });

        factory.activateDevice(activateArgs, signature);

        assertEq(Product(productAddress).ownerOf(tokenId), user);
    }

    function _calculateDigest(bytes32 domainSeparator, bytes32 hashedMessage) internal pure returns (bytes32) {
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", domainSeparator, hashedMessage));
        return digest;
    }
}
