# Indexer

## Add Product Factory

Add each deployed `ProductFactory`. Use `$CHAIN_NAME` from `viem/chains`.

    scripts/addProductFactory.ts -c $CHAIN_NAME -a $PRODUCT_FACTORY_ADDRESS -b $START_BLOCK_NUMBER -d $DB_INSTANCE

## Run Indexer

The RPC endpoints can be for each chain with envs like `RPC_WS_${CHAIN_NAME}` or `RPC_HTTP_${CHAIN_NAME}`.
