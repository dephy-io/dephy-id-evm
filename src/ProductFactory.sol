// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Product} from "./Product.sol";

contract ProductFactory is Ownable, EIP712 {
    struct EIP712Signature {
        address signer;
        uint8 v;
        bytes32 r;
        bytes32 s;
        uint256 deadline;
    }
    struct CreateProductArgs {
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
        address receiver;
        address product;
        uint256 tokenId;
    }

    error NotVendor();
    error SignatureMismatch();
    error SignatureExpired();
    error TokenIdMismatch();

    bytes32 constant ACTIVATE_DEVICE_TYPEHASH =
        keccak256(
            bytes(
                "ActivateDevice(address receiver,address product,uint256 deadline)"
            )
        );

    address public productImpl;
    mapping(address => address) internal _vendorByProduct;
    mapping(address => mapping(address => uint256)) internal _tokenIdByProductByDevice;

    constructor(address initialOwner) EIP712("ProductFactory", "1") Ownable(initialOwner) {}

    modifier onlyVendor(address product) {
        if (msg.sender != _vendorByProduct[product]) {
            revert NotVendor();
        }
        _;
    }

    function setProfuctImpl(address _productImpl) public onlyOwner {
        productImpl = _productImpl;
    }

    function createProduct(CreateProductArgs memory args) public {
        address product = Clones.clone(productImpl);
        Product(product).initialize(
            args.name,
            args.symbol,
            args.baseTokenURI,
            address(this)
        );

        _vendorByProduct[product] = msg.sender;
    }

    function createDevices(
        CreateDevicesArgs memory args
    ) public onlyVendor(args.product) {
        for (uint256 i = 0; i < args.devices.length; ++i) {
            uint256 tokenId = Product(args.product).mint(address(this));
            _tokenIdByProductByDevice[args.product][args.devices[i]] = tokenId;
        }
    }

    function createActivatedDevices(
        CreateActivatedDevicesArgs memory args
    ) public onlyVendor(args.product) {
        for (uint256 i = 0; i < args.devices.length; ++i) {
            uint256 tokenId = Product(args.product).mint(args.receivers[i]);
            _tokenIdByProductByDevice[args.product][args.devices[i]] = tokenId;
        }
    }

    function activateDevice(
        ActivateDeviceArgs memory args,
        EIP712Signature memory signature
    ) public {
        address recoveredDeviceAddr = _recoverSigner(
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        ACTIVATE_DEVICE_TYPEHASH,
                        args.receiver,
                        args.product,
                        signature.deadline
                    )
                )
            ),
            signature
        );

        if (signature.signer != recoveredDeviceAddr) {
            revert SignatureMismatch();
        }
        if(_tokenIdByProductByDevice[args.product][recoveredDeviceAddr] != args.tokenId) {
            revert TokenIdMismatch();
        }
        Product(args.product).transferFrom(address(this), args.receiver, args.tokenId);
    }

    function getDeviceTokenId(address product, address device) public view returns (uint256) {
        return _tokenIdByProductByDevice[product][device];
    }

    function _recoverSigner(
        bytes32 digest,
        EIP712Signature memory signature
    ) internal view returns (address) {
        if (signature.deadline < block.timestamp) revert SignatureExpired();
        address recoveredAddress = ecrecover(
            digest,
            signature.v,
            signature.r,
            signature.s
        );
        return recoveredAddress;
    }
}
