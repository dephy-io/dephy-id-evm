# Device Simulator

## Help

Display help for the CLI commands:

```bash
pnpm run cli --help
```

## Create Private Key

Generate a new private key and save it to `./tmp/privatekey.json`. If a private key already exists, the command will exit with a message.

```bash
pnpm run cli create
```

## Sign Message

Sign a message using the existing private key. The signature and the message expiration time will be saved to `./tmp/signature.json`.

```bash
pnpm run cli sign --expiration {expiration_in_seconds, default 3600}
```
