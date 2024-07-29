// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Wallet is ReentrancyGuard {
    error NotDeviceOwner();
    error NotBeneficiary();
    error InsufficientBalance();
    error SelfCallForbidden();
    error DeviceSignatureExpired();
    error DeviceMismatch();
    error ProxyCallFailed();

    event BeneficiarySet(address indexed newBeneficiary);
    event Withdraw(
        address indexed token,
        address indexed receiver,
        uint256 amount
    );
    event ProxyCalled(
        address indexed target,
        uint256 value,
        bytes data,
        bytes returnedData
    );

    using SafeERC20 for IERC20;

    string public constant DEPHY_PREFIX = "DEPHY_ID_SIGNED_MESSAGE:";
    address public constant NATIVE_TOKEN = address(0);
    address public immutable DEVICE;
    IERC721 public immutable PRODUCT;
    uint256 public immutable TOKEN_ID;
    address public beneficiary;

    constructor(address device, address product, uint256 tokenId) {
        DEVICE = device;
        PRODUCT = IERC721(product);
        TOKEN_ID = tokenId;
    }

    modifier onlyDeviceOwner() {
        if (PRODUCT.ownerOf(TOKEN_ID) != msg.sender) {
            revert NotDeviceOwner();
        }
        _;
    }

    modifier onlyBeneficiary() {
        if (beneficiary != msg.sender) {
            revert NotBeneficiary();
        }
        _;
    }

    function setBeneficiary(address beneficiary_) public onlyDeviceOwner {
        beneficiary = beneficiary_;
        emit BeneficiarySet(beneficiary_);
    }

    function withdraw(
        address token,
        address receiver,
        uint256 amount
    ) public onlyBeneficiary {
        if (token == NATIVE_TOKEN) {
            if (address(this).balance < amount) {
                revert InsufficientBalance();
            }
            payable(receiver).transfer(amount);
        } else {
            IERC20(token).safeTransfer(receiver, amount);
        }
        emit Withdraw(token, receiver, amount);
    }

    function proxyCall(
        address target,
        bytes memory data,
        uint256 value,
        uint256 deadline,
        bytes memory signature
    ) public payable onlyDeviceOwner nonReentrant returns (bytes memory) {
        if (target == address(this)) {
            revert SelfCallForbidden();
        }

        if (address(this).balance < value) {
            revert InsufficientBalance();
        }

        if (target == address(PRODUCT)) {
            address recoveredDeviceAddr = _recoverDeviceSigner(
                _hashTypedDeviceMessage(keccak256(abi.encode(deadline))),
                signature,
                deadline
            );
            if (recoveredDeviceAddr != DEVICE) {
                revert DeviceMismatch();
            }
        }

        (bool success, bytes memory returnedData) = target.call{value: value}(
            data
        );
        if (!success) {
            revert ProxyCallFailed();
        }

        emit ProxyCalled(target, value, data, returnedData);

        return returnedData;
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

    receive() external payable {}
}
