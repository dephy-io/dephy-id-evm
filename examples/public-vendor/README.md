# public-vendor

## Contracts templates

`./contracts/PublicVendor.sol`

## Cli

Prepare environmental variables:

```bash
source .env
```

### Help

```bash
pnpm run cli --help
```

### Deploy Vendor Contract

```bash
pnpm run cli deploy \
--rpc $BNB_TESTNET_RPC_URL \
--privatekey $PRIVATE_KEY \
--productFactory {productFactory address}
```

Deployed Vendor address will store in `examples/tmp/address.json`.

### Create Product

```bash
pnpm run cli create-product \
--rpc $BNB_TESTNET_RPC_URL \
--privatekey $PRIVATE_KEY \
--productImpl {productImpl address} \
--name "Product Name" \
--symbol "SYM" \
--baseTokenURI "http://youruri.com/"
```

If Vendor address not set in `examples/tmp/address.json`, you need to add

```bash
--vendor {vendor address}
```

### Create Activated Device

```bash
pnpm run cli create-activated-device \
--rpc $BNB_TESTNET_RPC_URL \
--privatekey $PRIVATE_KEY \
--product {product address} \
--device {device address} \
--receiver {receiver address}
```

If Vendor address not set in `examples/tmp/address.json`, you need to add

```bash
--vendor {vendor address}
```

### Create Activated Devices

```bash
pnpm run cli create-activated-devices \
--rpc $BNB_TESTNET_RPC_URL \
--privatekey $PRIVATE_KEY \
--product {product address} \
--devices  {device1 address},{device2 address},... \
--receivers {receiver1 address},{receiver2 address},...
```

If Vendor address not set in `examples/tmp/address.json`, you need to add

```bash
--vendor {vendor address}
```
