// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.9;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract Product is Initializable, ERC721Upgradeable {
    error NotAdministrator();
    error DeviceNotRegistered();

    address public ADMINISTRATOR;
    string public BASE_TOKEN_URI;
    uint256 private _tokenIdCount = 0;
    mapping(address => uint256) internal _tokenIdByDevice;
    mapping(uint256 => address) internal _deviceByTokenId;

    function __Product_init(
        string memory baseTokenURI,
        address administrator
    ) internal onlyInitializing {
        BASE_TOKEN_URI = baseTokenURI;
        ADMINISTRATOR = administrator;
    }

    function initialize(
        string memory name,
        string memory symbol,
        string memory baseTokenURI,
        address administrator
    ) public initializer {
        __ERC721_init(name, symbol);
        __Product_init(baseTokenURI, administrator);
    }

    modifier onlyAdministrator() {
        if (msg.sender != ADMINISTRATOR) {
            revert NotAdministrator();
        }
        _;
    }

    function mint(address to) public onlyAdministrator returns (uint256) {
        uint256 tokenId = _tokenIdCount++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return BASE_TOKEN_URI;
    }
}
