// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

interface IProductFactory {
    struct DeviceBinding {
        address product;
        uint256 tokenId;
    }

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

    struct CreateDeviceArgs {
        address product;
        address device;
    }

    struct CreateDevicesArgs {
        address product;
        address[] devices;
    }

    struct CreateActivatedDeviceArgs {
        address product;
        address device;
        address receiver;
    }

    struct CreateActivatedDevicesArgs {
        address product;
        address[] devices;
        address[] receivers;
    }

    struct ActivateDeviceArgs {
        address device;
        bytes deviceSignature;
        uint256 deviceDeadline;
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
    event DeviceActivated(
        address indexed product,
        address indexed device,
        address receiver
    );

    /**
     * @notice Returns the domain separator for the EIP712 signature scheme.
     * @return bytes32 Domain separator.
     */
    function getDomainSeparator() external view returns (bytes32);

    /**
     * @notice Creates a new product.
     * @param args Struct containing product implementation address, name, symbol, and base token URI.
     * @return address Address of the newly created product.
     */
    function createProduct(CreateProductArgs calldata args) external returns (address);

    /**
     * @notice Creates a new device for a product.
     * @param args Struct containing the product address and the device address.
     */
    function createDevice(CreateDeviceArgs calldata args) external;

    /**
     * @notice Creates multiple new devices for a product.
     * @param args Struct containing the product address and an array of device addresses.
     */
    function createDevices(CreateDevicesArgs calldata args) external;

    /**
     * @notice Creates and activates a new device for a product.
     * @param args Struct containing the product address, device address, and receiver address.
     * @return uint256 Token ID of the newly created and activated device.
     */
    function createActivatedDevice(CreateActivatedDeviceArgs calldata args) external returns (uint256);

    /**
     * @notice Creates and activates multiple new devices for a product.
     * @param args Struct containing the product address, an array of device addresses, and an array of receiver addresses.
     */
    function createActivatedDevices(CreateActivatedDevicesArgs calldata args) external;

    /**
     * @notice Activates a device.
     * @param args Struct containing the product address, device address, device signature, and device deadline.
     * @param signature Struct containing the EIP712 signature details.
     */
    function activateDevice(ActivateDeviceArgs calldata args, EIP712Signature calldata signature) external;

    /**
     * @notice Returns the vendor address for a given product.
     * @param product Address of the product.
     * @return address Address of the vendor.
     */
    function getVendorByProduct(address product) external view returns (address);

    /**
     * @notice Returns the product address and token ID for a device.
     * @param device Address of the device.
     * @return DevieInfo Product address and Token ID associated with the device.
     */
    function getDeviceBinding(address device) external view returns (DeviceBinding memory);
}
