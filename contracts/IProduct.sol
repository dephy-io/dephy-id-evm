// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IProduct is IERC721 {
    /**
     * @notice Initializes the product with the given parameters.
     * @param name The name of the product.
     * @param symbol The symbol of the product.
     * @param baseTokenURI The base URI for the product's tokens.
     */
    function initialize(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) external;

    /**
     * @notice Mints a new token to the specified address.
     * @param to The address to mint the token to.
     * @return uint256 The token ID of the newly minted token.
     */
    function mint(address to) external returns (uint256);
}
