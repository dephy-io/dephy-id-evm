// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {Product} from "../src/Product.sol";
import {ProductFactory} from "../src/ProductFactory.sol";

contract ProductFactoryTest is Test {
    // ProductFactory product_factory;
    // Product template_product;
    // Product test_product;

    // address factory_owner;
    // address product_owner;

    // function setUp() public {
    //     factory_owner = vm.createWallet(0x42).addr;

    //     template_product = new Product();

    //     vm.prank(factory_owner);
    //     product_factory = new ProductFactory(address(template_product));
    //     assertEq(product_factory.owner(), factory_owner);

    //     product_owner = vm.createWallet(0x99).addr;
    //     vm.prank(product_owner);
    //     test_product = product_factory.createProduct("Test Product", "TEST");
    // }

    // function test_product_template() public {
    //     assertEq(product_factory.product_template(), address(template_product));

    //     Product product2 = new Product();
    //     vm.prank(factory_owner);
    //     product_factory.setProgramTemplate(address(product2));
    //     assertEq(product_factory.product_template(), address(product2));
    // }

    // function test_create_product() public {
    //     test_product = product_factory.createProduct("Test Product", "TEST");

    //     assertEq(test_product.name(), "Test Product");
    //     assertEq(test_product.symbol(), "TEST");
    // }

    // function test_mint_product() public {
    //     assertEq(test_product.owner(), product_owner);

    //     vm.prank(product_owner);
    //     test_product.mint(msg.sender, 2024);
    //     assertEq(test_product.ownerOf(2024), msg.sender);

    //     assertEq(test_product.tokenURI(2024), "");
    //     vm.prank(product_owner);
    //     test_product.setBaseURI("https://example.com/");
    //     assertEq(test_product.tokenURI(2024), "https://example.com/2024");
    // }

    // function testFuzz_mint_product(address tokenOwner, uint256 tokenId) public {
    //     vm.prank(product_owner);
    //     test_product.mint(tokenOwner, tokenId);
    //     assertEq(test_product.ownerOf(tokenId), tokenOwner);
    // }
}
