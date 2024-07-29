# extensions-wallet

## Contracts

## Cli

Prepare environmental variables:

```bash
source .env
```

### Help

```bash
pnpm run cli --help
```

### Deploy Wallet Contract

```bash
pnpm run cli deploy \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--device {device_address} \
--product {product_address} \
--tokenId {token_id}
```

Deployed Wallet address will store in `./tmp/address.json`.

### Set

```bash
pnpm run cli setBeneficiary \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--beneficiary {new_beneficiary_address}
```

If Wallet address not set in `./tmp/address.json`, you need to add:

```bash
--contract {wallet_contract_address}
```

### Send ETH or ERC20 to Wallet

```bash
# Send ETH
pnpm run cli send \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--amount {amount_in_ether}

# Send ERC20
pnpm run cli send \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--amount {amount_in_tokens} \
--token {erc20_token_address}
```

If Wallet address not set in `./tmp/address.json`, you need to add:

```bash
--contract {wallet_contract_address}
```

### Withdraw ETH or ERC20 from Wallet

```bash
# Withdraw ETH
pnpm run cli withdraw \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--receiver {receiver_address} \
--amount {amount_in_ether}

# Withdraw ERC20
pnpm run cli withdraw \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--receiver {receiver_address} \
--amount {amount_in_tokens} \
--token {erc20_token_address}
```

If Wallet address not set in `./tmp/address.json`, you need to add:

```bash
--contract {wallet_contract_address}
```

### Proxy Call on Wallet Contract

```bash
pnpm run cli proxyCall \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--target {target_address} \
--data {call_data}
```

`proxyCall` is a payable function, so you can specify the `msgValue`:

```bash
--msgValue {value_in_ether}
```

If the `target call` is a payable function so you need to spend wallet's balance, you need to add:

```bash
--walletValue {value_in_ether}
```

If Wallet address not set in `./tmp/address.json`, you need to add:

```bash
--contract {wallet_contract_address}
```

If `taget` is `Product` contract, you need to provide signature from your `device`:

```bash
--deadline {deadline_timestamp} \
--signature {signature} \
```
