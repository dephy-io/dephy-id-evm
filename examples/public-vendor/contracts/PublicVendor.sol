// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {IProductFactory} from "../../../contracts/IProductFactory.sol";

contract PublicVendor {
    IProductFactory public productFactory;
    address public product;

    constructor(
        address productFactoryAddress,
        address productImpl,
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) {
        productFactory = IProductFactory(productFactoryAddress);
        product = productFactory.createProduct(
            IProductFactory.CreateProductArgs({
                productImpl: productImpl,
                name: name,
                symbol: symbol,
                baseTokenURI: baseTokenURI
            })
        );
    }

    function createActivatedDevice(
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
