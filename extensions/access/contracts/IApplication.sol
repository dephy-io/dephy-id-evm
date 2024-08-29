// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IApplication is IERC721 {
    function getDeviceBinding(
        address device
    ) external view returns (address product, uint256 tokenId);

    function getAccessesByDevice(
        address device
    ) external returns (uint256[] memory);

    function getDeviceByAccessId(uint256 accessId) external returns (address);

    function isAccessible(
        address device,
        address user
    ) external view returns (bool);
}
