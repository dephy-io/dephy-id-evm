// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ProductFactory} from "../../contracts/ProductFactory.sol";
import {CustomProduct} from "./CustomProduct.sol";

contract CustomVendor is Ownable {
    ProductFactory public productFactory;
    CustomProduct public productImpl;
    mapping(address => mapping(address => bool)) public productDevices;

    constructor(
        address initialOwner,
        address productFactoryAddress
    ) Ownable(initialOwner) {
        productFactory = ProductFactory(productFactoryAddress);
        productImpl = new CustomProduct();
    }

    function createProduct(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) public onlyOwner {
        CustomProduct product = CustomProduct(
            productFactory.createProduct(
                ProductFactory.CreateProductArgs({
                    productImpl: address(productImpl),
                    name: name,
                    symbol: symbol,
                    baseTokenURI: baseTokenURI
                })
            )
        );
        product.initVendor(address(this));
    }

    function registerDevice(
        address product,
        address device
    ) external onlyOwner {
        productDevices[product][device] = true;
    }

    function registerDevices(
        address product,
        address[] memory devices
    ) external onlyOwner {
        for (uint256 i = 0; i < devices.length; ++i) {
            productDevices[product][devices[i]] = true;
        }
    }

    function activateDevice(
        address productAddress,
        address device,
        bytes calldata customChallenge
    ) public {
        require(
            productDevices[productAddress][device],
            "Device Not Registered"
        );
        CustomProduct product = CustomProduct(productAddress);
        require(product.tokenIdByDevice(device) == 0, "Device Activated");

        // TODO: do your own validation here
        require(customChallenge[0] == 0x42, "Challenge Failed");

        uint256 tokenId = productFactory.createActivatedDevice(
            productAddress,
            device,
            msg.sender
        );

        product.bindDevice(tokenId, device);
    }
}
