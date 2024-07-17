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

### Create Product

```bash
pnpm run cli create-product \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--vendor 0x935EB754624F02D5F84e9B160f859Bc0726D8fED \
--productImpl 0x647d77324E241709BaF63D7f96F0C19ecA06E2e0 \
--name "Product Name" \
--symbol "SYM" \
--baseTokenURI "http://youruri.com/"
```

### Register Device

```bash
pnpm run cli register-device \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--vendor 0x935EB754624F02D5F84e9B160f859Bc0726D8fED \
--product {your product} \
--device {your device}
```

### Register Multiple Devices

```bash
pnpm run cli register-devices \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--vendor 0x935EB754624F02D5F84e9B160f859Bc0726D8fED \
--product {your product} \
--devices {your device1},{your device2}
```

### Activate Device

```bash
pnpm run cli activate-device \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--vendor 0x935EB754624F02D5F84e9B160f859Bc0726D8fED \
--product {your product} \
--device {your device} \
--customChallenge {your customChallenge: e.g '0x42'}
```
