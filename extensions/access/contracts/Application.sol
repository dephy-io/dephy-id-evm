// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC721EnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IProductFactory} from "../../../contracts/IProductFactory.sol";
import {IProduct} from "../../../contracts/IProduct.sol";
import {IApplication} from "./IApplication.sol";

contract Application is Initializable, ERC721EnumerableUpgradeable, IApplication {
    error NotProductDeviceOwner();
    error AlreadyAuthorized();

    IProductFactory public PRODUCT_FACTORY;
    uint256 private _authorizationIdCount;
    mapping(address => uint256[]) internal _authorizationsByDevice;
    mapping(uint256 => address) internal _deviceByAuthorizationId;

    constructor() {
        _disableInitializers();
    }

    modifier onlyProductDeviceOwner(address device) {
        (address product, uint256 tokenId) = getDeviceBinding(device);
        if (IProduct(product).ownerOf(tokenId) != msg.sender) {
            revert NotProductDeviceOwner();
        }
        _;
    }

    /**
     * @inheritdoc IApplication
     */
    function initialize(
        address productFactory,
        string memory name,
        string memory symbol
    ) external initializer {
        PRODUCT_FACTORY = IProductFactory(productFactory);
        __ERC721_init(name, symbol);
        _authorizationIdCount = 1;
    }

    /**
     * @inheritdoc IApplication
     */
    function getAuthorizationsByDevice(address device) public view returns (uint256[] memory) {
        return _authorizationsByDevice[device];
    }

    /**
     * @inheritdoc IApplication
     */
    function getDeviceByAuthorizationId(uint256 authorizationId) public view returns (address) {
        return _deviceByAuthorizationId[authorizationId];
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
    function isAccessible(
        address device,
        address user
    ) external view returns (bool) {
        for(uint256 i = 0; i < _authorizationsByDevice[device].length; ++i) {
            if(_ownerOf(_authorizationsByDevice[device][i]) == user) {
                return true;
            }
        }
        return false;
    }

    /**
     * @inheritdoc IApplication
     */
    function mint(
        address to,
        address device
    ) external onlyProductDeviceOwner(device) returns (uint256) {
        uint256 balance = balanceOf(to);
        for(uint256 i = 0; i < balance; ++i) {
            if(_deviceByAuthorizationId[tokenByIndex(i)] == device) {
                revert AlreadyAuthorized();
            }
        }
        uint256 authorizationId = _authorizationIdCount++;
        _mint(to, authorizationId);
        _authorizationsByDevice[device].push(authorizationId);
        _deviceByAuthorizationId[authorizationId] = device;
        return authorizationId;
    }

    /**
     * @inheritdoc IApplication
     */
    function burn(address device, uint256 authorizationId) external onlyProductDeviceOwner(device) {
        _burn(authorizationId);
        uint256[] storage authorizations = _authorizationsByDevice[device];
        for(uint256 i = 0; i < authorizations.length; ++i) {
            if(authorizations[i] == authorizationId) {
                authorizations[i] = authorizations[authorizations.length - 1];
                authorizations.pop();
                break;
            }
        }
        delete _deviceByAuthorizationId[authorizationId];  
    }

    /**
     * @inheritdoc IERC165
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721EnumerableUpgradeable, IERC165) returns (bool) {
        return
            interfaceId == type(IApplication).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
