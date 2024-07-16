DePHY ID on EVM
====

The DePHY ID Solidity smart contracts mono repo

## Contents

- [Contracts](./contracts)
- [E2E test](./e2e):
  A brief way to show how the DePHY ID works for developers

## Contract addresses

### Base Sepolia testnet:

- ProductFactory: `0x51FF9b79616973da54b68771099C7942519bC0BC`
- ProductImpl: `0x647d77324E241709BaF63D7f96F0C19ecA06E2e0`

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```
