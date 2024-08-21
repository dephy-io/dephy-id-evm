// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {Product} from "../contracts/Product.sol";
import "forge-std/Script.sol";

contract DeployProductImpl is Script {
    function run() public returns (address) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        Product product = new Product();
        vm.stopBroadcast();
        return address(product);
    }
}
