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
