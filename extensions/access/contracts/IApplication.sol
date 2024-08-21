// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IApplication is IERC721 {
    function initialize(
        address productFactory,
        string memory name,
        string memory symbol
    ) external;

    function getInstancesByDevice(address device) external returns (uint256[] memory);

    function getDeviceByInstanceId(uint256 instanceId) external returns (address);

    function getDeviceBinding(address device) external view returns (address product, uint256 tokenId);

    function isAccessible(address device, address user) external view returns (bool);

    function mint(address to, address device) external returns (uint256);

    function burn(address device, uint256 tokenId) external;
}
