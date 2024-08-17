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

### Deploy ApplicationFactory Contract

```bash
pnpm run cli deploy-application-factory \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--productFactory {productFactory address} 
```

Deployed ApplicationFactory address will store in `./tmp/address.json`.

### Deploy ApplicationImpl Contract

```bash
pnpm run cli deploy-application-impl \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY 
```

### Create Application

```bash
pnpm run cli create-application \
--rpc $BASE_SEPOLIA_RPC_URL \
--privatekey $PRIVATE_KEY \
--name {app name} \
--symbol {app symbol}
```

If `ApplicationFactory` and `ApplicationImpl` address not set in `./tmp/address.json`, you need to add

```bash
--applicationFactory {ApplicationFactory address}
--applicationImpl {ApplicationImpl address}
```
