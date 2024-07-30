# Indexer

## Init DB

```sh
cd indexer/indexer-storage
edgedb project init --server-instance dephy-id-evm-indexer --non-interactive
```

```edgeql
configure instance insert cfg::Auth {
    priority := -1,
    method := (insert cfg::Trust { transports := "SIMPLE_HTTP" }),
};
```


## Add Product Factory

Add each deployed `ProductFactory`. Use `$CHAIN_NAME` from `viem/chains`.

```sh
cd indexer/indexer
scripts/addProductFactory.ts -c $CHAIN_NAME -a $PRODUCT_FACTORY_ADDRESS -b $START_BLOCK_NUMBER -d $DB_INSTANCE

# example: add local anvil contract, $DB_INSTANCE defaults to `dephy-id-evm-indexer`
bun run scripts/addProductFactory.ts -c foundry -a 0xABCD... -b 1

# example: add bscTestnet
bun run scripts/addProductFactory.ts -c bscTestnet -a 0x6541465473e0DA2B2325e23CC0B3f92fF07b28D5 -b 42504706 -d dephy-id-evm-indexer
```

## Run Indexer

The RPC endpoints can be set for each chain with envs like `RPC_WS_${CHAIN_NAME}` or `RPC_HTTP_${CHAIN_NAME}`.

```sh
cd indexer/indexer
RPC_WS_BSCTESTNET=wss://... bun indexer
```

## Run API

This indexer API is just a proxy to edgedb graphql endpoint, but only accept graphql calls with `POST` and `query`.

```sh
cd indexer/indexer-api
bun indexer-api -g $EDGE_GRAPHQL_ENDPOINT
```
