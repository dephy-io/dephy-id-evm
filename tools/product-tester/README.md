# Product Tester

## Cli

Prepare environmental variables:

```bash
source .env
```

### Help

```bash
pnpm run cli --help
```

### Deploy Product

```bash
pnpm run cli deploy \
--rpc $BNB_TESTNET_RPC_URL \
--privatekey $PRIVATE_KEY \
--productImpl {productImpl address}
```

Product impl and proxy addresses will store in `./tmp/address.json`.

### Mint

```bash
pnpm run cli mint \
--rpc $BNB_TESTNET_RPC_URL \
--privatekey $PRIVATE_KEY \
--to {receiver address}
```
