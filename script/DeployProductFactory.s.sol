// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ProductFactory} from "../contracts/ProductFactory.sol";
import "forge-std/Script.sol";

contract DeployProductFactory is Script {
    function run() public returns (address) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        ProductFactory factory = new ProductFactory(vm.addr(deployerPrivateKey));
        vm.stopBroadcast();
        return address(factory);
    }
}
