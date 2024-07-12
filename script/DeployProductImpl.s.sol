// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Product} from "../contracts/Product.sol";
import "forge-std/Script.sol";

contract DeployProductImpl is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        new Product();
        vm.stopBroadcast();
    }
}
