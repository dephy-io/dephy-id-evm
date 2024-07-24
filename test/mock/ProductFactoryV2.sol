// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {ProductFactory} from "../../contracts/ProductFactory.sol";

contract ProductFactoryV2 is ProductFactory {
    function initialize(address initialOwner) public override reinitializer(2) {
        __Ownable_init(initialOwner);
        __EIP712_init("ProductFactory", "2");
        __ReentrancyGuard_init();
        __Pausable_init();
        __UUPSUpgradeable_init();
    }
}