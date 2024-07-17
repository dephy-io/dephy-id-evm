# dephy-id-evm-templates
## Templates Vendor


## Cli

### Help

```bash
ts-node cli/cli.ts --help
```

```bash
source .env
```

### Create Product

```bash
ts-node cli/cli.ts create-product \
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
ts-node cli/cli.ts register-device \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--vendor 0x935EB754624F02D5F84e9B160f859Bc0726D8fED \
--product {your product} \
--device {your device}
```

### Register Device

```bash
ts-node cli/cli.ts register-devices \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--vendor 0x935EB754624F02D5F84e9B160f859Bc0726D8fED \
--product {your product} \
--devices {your device1},{your device2}
```

### Activate Device

```bash
ts-node cli/cli.ts activate-device \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--vendor 0x935EB754624F02D5F84e9B160f859Bc0726D8fED \
--product {your product} \
--device {your device} \
--customChallenge {your customChallenge: e.g '0x42'}
```

ts-node cli/cli.ts activate-device \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--vendor 0x935EB754624F02D5F84e9B160f859Bc0726D8fED \
--product 0x69358d874B9bC0c553E6E9cc7cFc97370d20b9eE \
--device 0x3F3786B67DC1874C3Bd8e8CD61F5eea87604470F \
--customChallenge 0x42
