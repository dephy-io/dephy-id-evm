# public-vendor

## Contracts templates

`./contracts/ApplicationFactory.sol`
`./contracts/IApplication.sol`
`./contracts/Application.sol`

## Cli

Prepare environmental variables:

```bash
source .env
```

### Help

```bash
pnpm run cli --help
```

### Deploy ConnectionIdentities Contract

```bash
pnpm run cli deploy-connection-identities \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY 
```

### Get Identities

```bash
pnpm run cli get-identities \
--rpc $BASE_SEPOLIA_RPC_URL \
--user {user address}
```

If `ConnectionIdentities` address not set in `tmp/address.json`, you need to add

```bash
--connectionIdentities  {contract address}
```

### Add Identity

```bash
pnpm run cli add-identity \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--prefix {prefix string} \
--digest {digest string}
```

If `ConnectionIdentities` address not set in `tmp/address.json`, you need to add

```bash
--connectionIdentities  {contract address}
```

### Remove Identity

```bash
pnpm run cli add-identity \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--index {identity index} 
```

If `ConnectionIdentities` address not set in `tmp/address.json`, you need to add

```bash
--connectionIdentities  {contract address}
```