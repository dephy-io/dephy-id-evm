// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IProduct} from "./IProduct.sol";

contract Product is Initializable, ERC721Upgradeable, IProduct {
    error NotAdministrator();

    address public ADMINISTRATOR;
    string public BASE_TOKEN_URI;
    uint256 private _tokenIdCount;

    constructor() {
        _disableInitializers();
    }

    modifier onlyAdministrator() {
        if (msg.sender != ADMINISTRATOR) {
            revert NotAdministrator();
        }
        _;
    }

    function initialize(
        string memory name,
        string memory symbol,
        string memory baseTokenURI,
        address administrator
    ) public initializer {
        __ERC721_init(name, symbol);
        BASE_TOKEN_URI = baseTokenURI;
        ADMINISTRATOR = administrator;
        _tokenIdCount = 1;
    }

    function mint(address to) public onlyAdministrator returns (uint256) {
        uint256 tokenId = _tokenIdCount++;
        _mint(to, tokenId);
        return tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return BASE_TOKEN_URI;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721Upgradeable, IERC165) returns (bool) {
        return
            interfaceId == type(IProduct).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
