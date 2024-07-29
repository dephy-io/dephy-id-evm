// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {ProductFactory} from "../contracts/ProductFactory.sol";
import {ProductFactoryV2} from "../test/mock/ProductFactoryV2.sol";
import "forge-std/Script.sol";

contract UpgradeProductFactory is Script {
    function run() public {
        address proxy = vm.envAddress("PROXY");
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        ProductFactoryV2 factoryImplV2 = new ProductFactoryV2();
        console.log("ProductFactoryImplV2:", address(factoryImplV2));
        ProductFactory(proxy).upgradeToAndCall(
            address(factoryImplV2),
            abi.encodeWithSelector(
                ProductFactoryV2.initialize.selector,
                vm.addr(deployerPrivateKey)
            )
        );
        vm.stopBroadcast();
    }
}
