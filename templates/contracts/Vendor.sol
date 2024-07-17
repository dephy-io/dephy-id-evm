// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IProductFactory} from "../../contracts/IProductFactory.sol";

contract Vendor is Ownable {
    IProductFactory public productFactory;
    mapping(address => mapping(address => bool)) public isDeviceRegistered;

    constructor(
        address initialOwner,
        address productFactoryAddress
    ) Ownable(initialOwner) {
        productFactory = IProductFactory(productFactoryAddress);
    }

    function createProduct(
        address productImpl,
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) public onlyOwner {
        address product = productFactory.createProduct(
            IProductFactory.CreateProductArgs({
                productImpl: productImpl,
                name: name,
                symbol: symbol,
                baseTokenURI: baseTokenURI
            })
        );
    }

    function registerDevice(
        address product,
        address device
    ) external onlyOwner {
        isDeviceRegistered[product][device] = true;
    }

    function registerDevices(
        address product,
        address[] memory devices
    ) external onlyOwner {
        for (uint256 i = 0; i < devices.length; ++i) {
            isDeviceRegistered[product][devices[i]] = true;
        }
    }

    function activateDevice(
        address product,
        address device,
        bytes calldata customChallenge
    ) public {
        require(isDeviceRegistered[product][device], "Device Not Registered");

        _validate(customChallenge);

        uint256 tokenId = productFactory.createActivatedDevice(
            IProductFactory.CreateActivatedDeviceArgs({
                product: product,
                device: device,
                receiver: msg.sender
            })
        );
    }

    function _validate(bytes memory customChallenge) internal pure {
        // TODO: do your own validation here
        require(customChallenge[0] == 0x42, "Challenge Failed");
    }
}
