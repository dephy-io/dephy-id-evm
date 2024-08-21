// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {ProductFactory} from "../contracts/ProductFactory.sol";
import "forge-std/Script.sol";

contract DeployProductFactory is Script {
    function run() public returns (address) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        ProductFactory factoryImpl = new ProductFactory();
        ERC1967Proxy factoryProxy = new ERC1967Proxy(
            address(factoryImpl),
            abi.encodeWithSelector(
                ProductFactory.initialize.selector,
                vm.addr(deployerPrivateKey)
            )
        );
        vm.stopBroadcast();
        return address(factoryProxy);
    }
}
