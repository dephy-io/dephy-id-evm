// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IProductFactory} from "../../../contracts/IProductFactory.sol";

contract PublicVendor is Ownable {
    IProductFactory public productFactory;

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
        productFactory.createProduct(
            IProductFactory.CreateProductArgs({
                productImpl: productImpl,
                name: name,
                symbol: symbol,
                baseTokenURI: baseTokenURI
            })
        );
    }

    function createActivatedDevice(
        address product,
        address device,
        address receiver
    ) public {
        productFactory.createActivatedDevice(
            IProductFactory.CreateActivatedDeviceArgs({
                product: product,
                device: device,
                receiver: receiver
            })
        );
    }

    function createActivatedDevices(
        address product,
        address[] memory devices,
        address[] memory receivers
    ) public {
        productFactory.createActivatedDevices(
            IProductFactory.CreateActivatedDevicesArgs({
                product: product,
                devices: devices,
                receivers: receivers
            })
        );
    }
}
