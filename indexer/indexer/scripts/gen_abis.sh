#!/usr/bin/env sh

jq '.abi' out/ProductFactory.sol/ProductFactory.json > indexer/indexer/abis/ProductFactory.json
