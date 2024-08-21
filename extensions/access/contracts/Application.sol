// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IProductFactory} from "../../../contracts/IProductFactory.sol";
import {IProduct} from "../../../contracts/IProduct.sol";
import {IApplication} from "./IApplication.sol";

contract Application is Initializable, ERC721Upgradeable, IApplication {
    error NotProductDeviceOwner();

    IProductFactory public PRODUCT_FACTORY;
    uint256 private _instanceIdCount;
    mapping(address => uint256[]) internal _instancesByDevice;
    mapping(uint256 => address) internal _deviceByInstanceId;

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
        _instanceIdCount = 1;
    }

    /**
     * @inheritdoc IApplication
     */
    function getInstancesByDevice(address device) public view returns (uint256[] memory) {
        return _instancesByDevice[device];
    }

    /**
     * @inheritdoc IApplication
     */
    function getDeviceByInstanceId(uint256 instanceId) public view returns (address) {
        return _deviceByInstanceId[instanceId];
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
        for(uint256 i = 0; i < _instancesByDevice[device].length; ++i) {
            if(_ownerOf(_instancesByDevice[device][i]) == user) {
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
        uint256 instanceId = _instanceIdCount++;
        _mint(to, instanceId);
        _instancesByDevice[device].push(instanceId);
        _deviceByInstanceId[instanceId] = device;
        return instanceId;
    }

    /**
     * @inheritdoc IApplication
     */
    function burn(address device, uint256 instanceId) external onlyProductDeviceOwner(device) {
        _burn(instanceId);
        uint256[] storage instances = _instancesByDevice[device];
        for(uint256 i = 0; i < instances.length; ++i) {
            if(instances[i] == instanceId) {
                instances[i] = instances[instances.length - 1];
                instances.pop();
                break;
            }
        }
        delete _deviceByInstanceId[instanceId];  
    }

    /**
     * @inheritdoc IERC165
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721Upgradeable, IERC165) returns (bool) {
        return
            interfaceId == type(IApplication).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
