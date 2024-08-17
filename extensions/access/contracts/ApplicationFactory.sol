// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {IApplication} from "./IApplication.sol";

contract ApplicationFactory { 
    error NotApplicationTemplate();

    event ApplicationCreated(address indexed creator, address indexed applicationImpl, address indexed application);

    address public PRODUCT_FACTORY;

    constructor(address productFactory) {
        PRODUCT_FACTORY = productFactory;
    }

    function createApplication(
        address applicationImpl,
        string memory name,
        string memory symbol
    ) public returns (address) {
        if(!IApplication(applicationImpl).supportsInterface(type(IApplication).interfaceId)) {
            revert NotApplicationTemplate();
        }
        address application = Clones.clone(applicationImpl);
        IApplication(application).initialize(PRODUCT_FACTORY, name, symbol);
        emit ApplicationCreated(msg.sender, applicationImpl, application);
        return application;
    }
}
