// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.9;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract Product is Initializable, ERC721Upgradeable {
    error NotAdministrator();
    error DeviceNotRegistered();

    address public ADMINISTRATOR;
    string public BASE_TOKEN_URI;
    uint256 private _tokenIdCount = 1;
    mapping(address => uint256) internal _tokenIdByDevice;
    mapping(uint256 => address) internal _deviceByTokenId;

    function __DePhy_init(
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
        __DePhy_init(baseTokenURI, administrator);
    }

    modifier onlyAdministrator() {
        if (msg.sender != ADMINISTRATOR) {
            revert NotAdministrator();
        }
        _;
    }

    function registerDevices(
        address[] memory devices
    ) public onlyAdministrator {
        for (uint256 i = 0; i < devices.length; ++i) {
            _tokenIdByDevice[devices[i]] = _tokenIdCount;
            _deviceByTokenId[_tokenIdCount++] = devices[i];
        }
    }

    function mint(address to, address device) public onlyAdministrator {
        uint256 tokenId = _tokenIdByDevice[device];
        if (tokenId == 0) {
            revert DeviceNotRegistered();
        }
        _safeMint(to, tokenId);
    }

    function mint(address to, uint256 tokenId) public onlyAdministrator {
        if (_deviceByTokenId[tokenId] == address(0)) {
            revert DeviceNotRegistered();
        }
        _safeMint(to, tokenId);
    }

    function getTokenIdByDevice(address device) public view returns (uint256) {
        return _tokenIdByDevice[device];
    }

    function getDeviceByTokenId(uint256 tokenId) public view returns (address) {
        return _deviceByTokenId[tokenId];
    }

    function _baseURI() internal view override returns (string memory) {
        return BASE_TOKEN_URI;
    }
}
