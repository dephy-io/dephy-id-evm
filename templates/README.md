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
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--productFactory 0xC487C07f0e31d63a840157cBcC316FBcBbFc6088
```

Deployed Vendor address will store in `templates/tmp/address.json`.

### Create Product

```bash
pnpm run cli create-product \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--productImpl 0x647d77324E241709BaF63D7f96F0C19ecA06E2e0 \
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
--rpc $BASE_SEPOLIA_RPC_URL \
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
--rpc $BASE_SEPOLIA_RPC_URL \
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
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--vendor 0x935EB754624F02D5F84e9B160f859Bc0726D8fED \
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
--rpc $BASE_SEPOLIA_RPC_URL \
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
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--product {product address} \
--devices  {device1 address},{device2 address},... \
--receivers {receiver1 address},{receiver2 address},...
```

If Vendor address not set in `templates/tmp/address.json`, you need to add

```bash
--vendor {vendor address}
```
