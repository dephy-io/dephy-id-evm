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
    }

    error NotVendor();
    error SignatureMismatch();
    error SignatureExpired();

    bytes32 constant ACTIVATE_DEVICE_TYPEHASH =
        keccak256(
            bytes(
                "ActivateDevice(address receiver,address product,uint256 deadline)"
            )
        );

    address public productImpl;
    mapping(address => address) internal _vendorByProduct;

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
        Product(args.product).registerDevices(args.devices);
    }

    function createActivatedDevices(
        CreateActivatedDevicesArgs memory args
    ) public onlyVendor(args.product) {
        Product(args.product).registerDevices(args.devices);
        for (uint256 i = 0; i < args.devices.length; ++i) {
            Product(args.product).mint(args.receivers[i], args.devices[i]);
        }
    }

    function activateDevice(
        ActivateDeviceArgs memory args,
        EIP712Signature memory signature
    ) public {
        address recoveredAddr = _recoverSigner(
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

        if (signature.signer != recoveredAddr) {
            revert SignatureMismatch();
        }

        Product(args.product).mint(args.receiver, recoveredAddr);
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
