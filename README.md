# DePHY ID on EVM

The DePHY ID Solidity smart contracts mono repo

## Contents

- [Contracts](./contracts)
- [E2E test](./e2e):
  A brief way to show how the DePHY ID works for developers
- [Test](./test/):
  Standard foundry smart contract tests.
- [Script](./script/):
  Contracts deployment scripts.
- [Extensions](./extensions/):
  A proxy wallet of the product owner.
- [Templates](./templates/):
  A vendor contract template and cli.
- [Tools](./tools/):
  Consists of contracts interactive typescript sdk, react demo and device simulator.

## Contract addresses

Deployed contract addresses is stored in `addresses.json`.

## Build

```bash
pnpm run build
```

## Test / E2E Test

```bash
pnpm run e2e
```

## Deployment

Below are the commands for deploying your application to various networks:

- Deploy to Base Mainnet/Testnet

```bash
pnpm run deploy:base
pnpm run deploy:base_sepolia
```

- Deploy to BNB Smart Chain Mainnet/Testnet

```bash
pnpm run deploy:bnb
pnpm run deploy:bnb_testnet
```

Ensure you have a `.env` file configured with the necessary RPC URLs and private key before running these commands.

## Upgrade

First set ProductFactory proxy address:

```bash
PROXY=
```

Then execute `UpgradeProductFactory.s.sol` script:

```bash
forge script script/UpgradeProductFactory.s.sol --rpc-url {RPC} --broadcast
```

ProductFactoryV2 implementation is mounted to proxy now.
