# dephy-id-evm-templates

## Contracts templates

`./tempaltes/contracts/Vendor.sol`

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
pnpm run cli deploy-vendor \
--rpc $BNB_TESTNET_RPC_URL \
--privatekey $PRIVATE_KEY \
--productFactory {productFactory address}
```

Deployed Vendor address will store in `templates/tmp/address.json`.

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

If Vendor address not set in `templates/tmp/address.json`, you need to add

```bash
--vendor {vendor address}
```

### Register Device

```bash
pnpm run cli register-device \
--rpc $BNB_TESTNET_RPC_URL \
--privatekey $PRIVATE_KEY \
--product {product address} \
--device {device address}
```

If Vendor address not set in `templates/tmp/address.json`, you need to add

```bash
--vendor {vendor address}
```

### Register Multiple Devices

```bash
pnpm run cli register-devices \
--rpc $BNB_TESTNET_RPC_URL \
--privatekey $PRIVATE_KEY \
--product {product address} \
--devices {device1 address},{device2 address},...
```

If Vendor address not set in `templates/tmp/address.json`, you need to add

```bash
--vendor {vendor address}
```

### Activate Device

```bash
pnpm run cli activate-device \
--rpc $BNB_TESTNET_RPC_URL \
--privatekey $PRIVATE_KEY \
--product {product address} \
--device {device address} \
--customChallenge {your customChallenge: e.g '0x42'}
```

If Vendor address not set in `templates/tmp/address.json`, you need to add

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

If Vendor address not set in `templates/tmp/address.json`, you need to add

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

If Vendor address not set in `templates/tmp/address.json`, you need to add

```bash
--vendor {vendor address}
```
