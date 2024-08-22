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
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--productFactory {productFactory address} \
--productImpl {productImpl address} \
--name "Product Name" \
--symbol "SYM" \
--baseTokenURI "http://youruri.com/"
```

Deployed Vendor address will store in `examples/tmp/address.json`.

### Create Activated Device

```bash
pnpm run cli create-activated-device \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
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
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--devices  {device1 address},{device2 address},... \
--receivers {receiver1 address},{receiver2 address},...
```

If Vendor address not set in `examples/tmp/address.json`, you need to add

```bash
--vendor {vendor address}
```
