// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IProduct is IERC721 {
    function initialize(
        string memory name,
        string memory symbol,
        string memory baseTokenURI,
        address administrator
    ) external;

    function mint(address to) external returns (uint256);
}
