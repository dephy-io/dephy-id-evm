// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Product} from "./Product.sol";

contract ProductFactory is Ownable {
    address public product_template;

    constructor(address product_template_) Ownable(msg.sender) {
        setProgramTemplate(product_template_);
    }

    function setProgramTemplate(address product_template_) public onlyOwner {
        requireIsContract(product_template_);
        product_template = product_template_;
    }

    function requireIsContract(address contract_address) internal view {
        uint256 code_size;
        assembly {
            code_size := extcodesize(contract_address)
        }
        require(code_size > 0);
    }

    function createProduct(string calldata name, string calldata symbol) external returns (Product product) {
        address product_address = _createProduct(product_template, msg.sender, name);
        product = Product(product_address);
        product.initialize(msg.sender, name, symbol);
    }

    function _createProduct(address implementation, address vendor, string calldata name) internal returns (address) {
        bytes32 salt = keccak256(abi.encodePacked("DePHY_ID", vendor, name));
        return Clones.cloneDeterministic(implementation, salt);
    }
}
