// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {IProduct} from "./IProduct.sol";

contract ProductFactory is Ownable, EIP712 {
    struct EIP712Signature {
        address signer;
        uint8 v;
        bytes32 r;
        bytes32 s;
        uint256 deadline;
    }
    struct CreateProductArgs {
        address productImpl;
        string name;
        string symbol;
        string baseTokenURI;
    }
    struct CreateDevicesArgs {
        address product;
        address[] devices;
    }
    struct CreateActivatedDevicesArgs {
        address product;
        address[] devices;
        address[] receivers;
    }
    struct ActivateDeviceArgs {
        address product;
        address device;
        bytes signature;
        uint256 deadline;
    }

    error NotVendor();
    error EIP712SignatureMismatch();
    error EIP712SignatureExpired();
    error DeviceSignatureMismatch();
    error DeviceSignatureExpired();
    error DeviceAlreadyCreated();
    error TokenIdMismatch();
    error NotProductTemplate();

    event ProductCreated(
        address indexed vendor,
        address indexed productImpl,
        address indexed product
    );
    event DeviceCreated(
        address indexed product,
        address indexed device,
        uint256 indexed tokenId
    );
    event DeviceActivated(address indexed product, address indexed device);

    bytes32 public constant ACTIVATE_DEVICE_TYPEHASH =
        keccak256(
            bytes(
                "ActivateDevice(address product,address device,bytes signature,uint256 deadline,uint256 deadline)"
            )
        );

    mapping(address => address) internal _vendorByProduct;
    mapping(address => mapping(address => uint256))
        internal _tokenIdByProductByDevice;

    constructor(
        address initialOwner
    ) EIP712("ProductFactory", "1") Ownable(initialOwner) {}

    modifier onlyVendor(address product) {
        if (msg.sender != _vendorByProduct[product]) {
            revert NotVendor();
        }
        _;
    }

    function getDomainSeparator() external view returns (bytes32) {
        return _domainSeparatorV4();
    }

    function createProduct(
        CreateProductArgs memory args
    ) public returns (address) {
        if (
            !IProduct(args.productImpl).supportsInterface(
                type(IProduct).interfaceId
            )
        ) {
            revert NotProductTemplate();
        }

        address product = Clones.clone(args.productImpl);
        IProduct(product).initialize(
            args.name,
            args.symbol,
            args.baseTokenURI,
            address(this)
        );

        _vendorByProduct[product] = msg.sender;

        emit ProductCreated(msg.sender, args.productImpl, product);

        return product;
    }

    function createDevices(
        CreateDevicesArgs memory args
    ) public onlyVendor(args.product) {
        for (uint256 i = 0; i < args.devices.length; ++i) {
            if (_tokenIdByProductByDevice[args.product][args.devices[i]] > 0) {
                revert DeviceAlreadyCreated();
            }
            uint256 tokenId = IProduct(args.product).mint(address(this));
            _tokenIdByProductByDevice[args.product][args.devices[i]] = tokenId;
            emit DeviceCreated(args.product, args.devices[i], tokenId);
        }
    }

    function createActivatedDevices(
        CreateActivatedDevicesArgs memory args
    ) public onlyVendor(args.product) {
        for (uint256 i = 0; i < args.devices.length; ++i) {
            if (_tokenIdByProductByDevice[args.product][args.devices[i]] > 0) {
                revert DeviceAlreadyCreated();
            }
            uint256 tokenId = IProduct(args.product).mint(args.receivers[i]);
            _tokenIdByProductByDevice[args.product][args.devices[i]] = tokenId;
            emit DeviceCreated(args.product, args.devices[i], tokenId);
            emit DeviceActivated(args.product, args.receivers[i]);
        }
    }

    function activateDevice(
        ActivateDeviceArgs memory args,
        EIP712Signature memory signature
    ) public {
        address recoveredAddr = _recoverEIP712Signer(
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        ACTIVATE_DEVICE_TYPEHASH,
                        args.product,
                        args.device,
                        keccak256(args.signature),
                        args.deadline,
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
            _hashTypedDeviceMessage(keccak256(abi.encode(args.deadline))),
            args.signature,
            args.deadline
        );

        if (args.device != recoveredDeviceAddr) {
            revert DeviceSignatureMismatch();
        }

        IProduct(args.product).transferFrom(
            address(this),
            recoveredAddr,
            _tokenIdByProductByDevice[args.product][args.device]
        );

        emit DeviceActivated(args.product, args.device);
    }

    function getVendorByProduct(address product) public view returns (address) {
        return _vendorByProduct[product];
    }

    function getDeviceTokenId(
        address product,
        address device
    ) public view returns (uint256) {
        return _tokenIdByProductByDevice[product][device];
    }

    function _hashTypedDeviceMessage(
        bytes32 hashedMessage
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("DEPHY_ID_SIGNED_MESSAGE:", hashedMessage)
            );
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
}
