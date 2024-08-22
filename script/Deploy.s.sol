// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {DeployProductImpl} from "./DeployProductImpl.s.sol";
import {DeployProductFactory} from "./DeployProductFactory.s.sol";
import "forge-std/Script.sol";

contract Deploy is Script {
    DeployProductImpl deployProductImpl;
    DeployProductFactory deployProductFactory;

    function run() public {
        deployProductImpl = new DeployProductImpl();
        deployProductFactory = new DeployProductFactory();

        address productImpl = deployProductImpl.run();
        address productFactory = deployProductFactory.run();

        console.log("ProductImpl:", productImpl);
        console.log("ProductFactory:", productFactory);
    }
}
