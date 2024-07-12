// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Product} from "../../contracts/Product.sol";

contract CustomProduct is Product {
    address public vendor;

    mapping(uint256 => address) public deviceByTokenId;
    mapping(address => uint256) public tokenIdByDevice;

    modifier onlyVendor() {
        require(msg.sender == vendor);
        _;
    }

    function initVendor(address vendor_) public reinitializer(2) {
        vendor = vendor_;
    }

    function bindDevice(uint256 tokenId, address device) public onlyVendor {
        deviceByTokenId[tokenId] = device;
        tokenIdByDevice[device] = tokenId;
    }
}
