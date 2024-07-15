// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IProduct} from "./IProduct.sol";

contract Product is
    Initializable,
    OwnableUpgradeable,
    ERC721Upgradeable,
    IProduct
{
    string public BASE_TOKEN_URI;
    uint256 private _tokenIdCount;

    constructor() {
        _disableInitializers();
    }

    /**
     * @inheritdoc IProduct
     */
    function initialize(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) public initializer {
        __ERC721_init(name, symbol);
        __Ownable_init(msg.sender);
        BASE_TOKEN_URI = baseTokenURI;
        _tokenIdCount = 1;
    }

    /**
     * @inheritdoc IProduct
     */
    function mint(address to) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCount++;
        _mint(to, tokenId);
        return tokenId;
    }

    /**
     * @inheritdoc IERC165
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721Upgradeable, IERC165) returns (bool) {
        return
            interfaceId == type(IProduct).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _baseURI() internal view override returns (string memory) {
        return BASE_TOKEN_URI;
    }
}
