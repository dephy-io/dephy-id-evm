// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {EIP712Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {IProductFactory} from "./IProductFactory.sol";
import {IProduct} from "./IProduct.sol";

contract ProductFactory is
    IProductFactory,
    OwnableUpgradeable,
    EIP712Upgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable
{
    string public constant DEPHY_PREFIX = "DEPHY_ID_SIGNED_MESSAGE:";
    bytes32 public constant ACTIVATE_DEVICE_TYPEHASH =
        keccak256(
            bytes(
                "ActivateDevice(address device,bytes deviceSignature,uint256 deviceDeadline,uint256 deadline)"
            )
        );

    mapping(address => address) internal _vendorByProduct;
    mapping(address => DeviceBinding) internal _deviceBindings;

    function initialize(address initialOwner) public virtual initializer {
        __Ownable_init(initialOwner);
        __EIP712_init("ProductFactory", "1");
        __ReentrancyGuard_init();
        __Pausable_init();
        __UUPSUpgradeable_init();
    }

    modifier onlyVendor(address product) {
        if (msg.sender != _vendorByProduct[product]) {
            revert NotVendor();
        }
        _;
    }

    /**
     * @inheritdoc IProductFactory
     */
    function getDomainSeparator() external view returns (bytes32) {
        return _domainSeparatorV4();
    }

    /**
     * @inheritdoc IProductFactory
     */
    function createProduct(
        CreateProductArgs memory args
    ) public nonReentrant whenNotPaused returns (address) {
        if (
            !IProduct(args.productImpl).supportsInterface(
                type(IProduct).interfaceId
            )
        ) {
            revert NotProductTemplate();
        }

        address product = Clones.clone(args.productImpl);
        IProduct(product).initialize(args.name, args.symbol, args.baseTokenURI);

        _vendorByProduct[product] = msg.sender;

        emit ProductCreated(msg.sender, args.productImpl, product);

        return product;
    }

    /**
     * @inheritdoc IProductFactory
     */
    function createDevice(
        CreateDeviceArgs memory args
    ) public nonReentrant whenNotPaused onlyVendor(args.product) {
        _createDevice(args.product, args.device);
    }

    /**
     * @inheritdoc IProductFactory
     */
    function createDevices(
        CreateDevicesArgs memory args
    ) public nonReentrant whenNotPaused onlyVendor(args.product) {
        for (uint256 i = 0; i < args.devices.length; ++i) {
            _createDevice(args.product, args.devices[i]);
        }
    }

    /**
     * @inheritdoc IProductFactory
     */
    function createActivatedDevice(
        CreateActivatedDeviceArgs memory args
    )
        public
        nonReentrant
        whenNotPaused
        onlyVendor(args.product)
        returns (uint256)
    {
        return _createActivatedDevice(args.product, args.device, args.receiver);
    }

    /**
     * @inheritdoc IProductFactory
     */
    function createActivatedDevices(
        CreateActivatedDevicesArgs memory args
    ) public nonReentrant whenNotPaused onlyVendor(args.product) {
        for (uint256 i = 0; i < args.devices.length; ++i) {
            _createActivatedDevice(
                args.product,
                args.devices[i],
                args.receivers[i]
            );
        }
    }

    /**
     * @inheritdoc IProductFactory
     */
    function activateDevice(
        ActivateDeviceArgs memory args,
        EIP712Signature memory signature
    ) public nonReentrant whenNotPaused {
        address recoveredAddr = _recoverEIP712Signer(
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        ACTIVATE_DEVICE_TYPEHASH,
                        args.device,
                        keccak256(args.deviceSignature),
                        args.deviceDeadline,
                        signature.deadline
                    )
                )
            ),
            signature
        );

        if (signature.signer != recoveredAddr) {
            revert EIP712SignatureMismatch();
        }

        address recoveredDeviceAddr = _recoverDeviceSigner(
            _hashTypedDeviceMessage(keccak256(abi.encode(args.deviceDeadline))),
            args.deviceSignature,
            args.deviceDeadline
        );

        if (args.device != recoveredDeviceAddr) {
            revert DeviceSignatureMismatch();
        }

        DeviceBinding memory deviceBinding = _deviceBindings[args.device];

        IProduct(deviceBinding.product).transferFrom(
            address(this),
            recoveredAddr,
            deviceBinding.tokenId
        );

        emit DeviceActivated(deviceBinding.product, args.device, recoveredAddr);
    }

    /**
     * @inheritdoc IProductFactory
     */
    function getVendorByProduct(address product) public view returns (address) {
        return _vendorByProduct[product];
    }

    /**
     * @inheritdoc IProductFactory
     */
    function getDeviceBinding(
        address device
    ) public view returns (DeviceBinding memory) {
        return _deviceBindings[device];
    }

    function _createDevice(
        address product,
        address device
    ) internal returns (uint256 tokenId) {
        if (_deviceBindings[device].product != address(0)) {
            revert DeviceAlreadyCreated();
        }
        tokenId = IProduct(product).mint(address(this));
        _deviceBindings[device] = DeviceBinding({
            product: product,
            tokenId: tokenId
        });
        emit DeviceCreated(product, device, tokenId);
    }

    function _createActivatedDevice(
        address product,
        address device,
        address receiver
    ) internal returns (uint256 tokenId) {
        if (_deviceBindings[device].product != address(0)) {
            revert DeviceAlreadyCreated();
        }
        tokenId = IProduct(product).mint(receiver);
        _deviceBindings[device] = DeviceBinding({
            product: product,
            tokenId: tokenId
        });
        emit DeviceCreated(product, device, tokenId);
        emit DeviceActivated(product, device, receiver);
    }

    function _hashTypedDeviceMessage(
        bytes32 hashedMessage
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(DEPHY_PREFIX, hashedMessage));
    }

    function _recoverDeviceSigner(
        bytes32 digest,
        bytes memory signature,
        uint256 deadline
    ) internal view returns (address) {
        if (deadline < block.timestamp) revert DeviceSignatureExpired();
        return ECDSA.recover(digest, signature);
    }

    function _recoverEIP712Signer(
        bytes32 digest,
        EIP712Signature memory signature
    ) internal view returns (address) {
        if (signature.deadline < block.timestamp)
            revert EIP712SignatureExpired();
        address recoveredAddress = ecrecover(
            digest,
            signature.v,
            signature.r,
            signature.s
        );
        return recoveredAddress;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}
}
