// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IProductFactory} from "../../../contracts/IProductFactory.sol";
import {IApplication} from "./IApplication.sol";

abstract contract ApplicationBase is
    ERC721Enumerable,
    IApplication
{
    error NotProductDeviceOwner();
    error AccessAlreadyGranted();

    IProductFactory public PRODUCT_FACTORY;
    uint256 private _accessIdCount;
    mapping(address => uint256[]) internal _accessesByDevice;
    mapping(uint256 => address) internal _deviceByAccessId;
    mapping(uint256 => string) internal _accessURIs;

    constructor(
        address productFactory,
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {
        PRODUCT_FACTORY = IProductFactory(productFactory);
        _accessIdCount = 1;
    }

    /**
     * @inheritdoc IApplication
     */
    function getDeviceBinding(
        address device
    ) public view returns (address product, uint256 tokenId) {
        IProductFactory.DeviceBinding memory deviceBinding = PRODUCT_FACTORY
            .getDeviceBinding(device);
        return (deviceBinding.product, deviceBinding.tokenId);
    }

    /**
     * @inheritdoc IApplication
     */
    function getAccessesByDevice(
        address device
    ) public view returns (uint256[] memory) {
        return _accessesByDevice[device];
    }

    /**
     * @inheritdoc IApplication
     */
    function getDeviceByAccessId(
        uint256 accessId
    ) public view returns (address) {
        return _deviceByAccessId[accessId];
    }

    /**
     * @inheritdoc IApplication
     */
    function isAccessible(
        address device,
        address user
    ) external view returns (bool) {
        for (uint256 i = 0; i < _accessesByDevice[device].length; ++i) {
            if (_ownerOf(_accessesByDevice[device][i]) == user) {
                return true;
            }
        }
        return false;
    }

    /**
     * @inheritdoc IERC165
     */
    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721Enumerable, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IApplication).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @inheritdoc ERC721
     */
    function tokenURI(
        uint256 accessId
    ) public view override returns (string memory) {
        return _accessURIs[accessId];
    }

    function _grantAccess(
        address to,
        address device,
        string memory accessURI
    ) internal returns (uint256) {
        uint256 balance = balanceOf(to);
        for (uint256 i = 0; i < balance; ++i) {
            if (_deviceByAccessId[tokenByIndex(i)] == device) {
                revert AccessAlreadyGranted();
            }
        }
        uint256 accessId = _accessIdCount++;
        _mint(to, accessId);
        _accessesByDevice[device].push(accessId);
        _deviceByAccessId[accessId] = device;
        _accessURIs[accessId] = accessURI;
        return accessId;
    }

    function _revokeAccess(
        address device,
        uint256 accessId
    ) internal {
        _burn(accessId);
        uint256[] storage accesses = _accessesByDevice[device];
        for (uint256 i = 0; i < accesses.length; ++i) {
            if (accesses[i] == accessId) {
                accesses[i] = accesses[accesses.length - 1];
                accesses.pop();
                break;
            }
        }
        delete _deviceByAccessId[accessId];
        delete _accessURIs[accessId];
    }
}
