import { ethers } from "ethers";
import { Vendor__factory } from "../generated";
import yargs from "yargs";

yargs
  .command(
    "create-product",
    "Create a new product",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      vendor: { type: "string", demandOption: true },
      productImpl: { type: "string", demandOption: true },
      name: { type: "string", demandOption: true },
      symbol: { type: "string", demandOption: true },
      baseTokenURI: { type: "string", demandOption: true },
    },
    async (args) => {
      const contract = Vendor__factory.connect(
        args.vendor,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );
      const tx = await contract.createProduct(
        args.productImpl,
        args.name,
        args.symbol,
        args.baseTokenURI
      );
      console.log("tx hash:", tx.hash);
      const receipt = await tx.wait();
      const targetEvents = receipt.events?.filter(
        (e: any) =>
          e.topics[0] ===
          "0x0d516d8b14b989f8763b7f1b93e8e08f0f5ff06e0b833b8d080f0f1f33f9f302"
      );
      console.log(targetEvents);
      if (
        !targetEvents ||
        targetEvents.length === 0 ||
        !targetEvents[0].topics
      ) {
        throw new Error("Filter ProductCreated event failed");
      }
      const product: string = ethers.utils.getAddress(
        "0x" + targetEvents[0].topics[3].slice(26)
      );
      console.log("product created:", product);
    }
  )
  .command(
    "register-device",
    "Register a new device",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      vendor: { type: "string", demandOption: true },
      product: { type: "string", demandOption: true },
      device: { type: "string", demandOption: true },
    },
    async (args) => {
      const contract = Vendor__factory.connect(
        args.vendor,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );
      const tx = await contract.registerDevice(args.product, args.device);
      console.log("tx hash:", tx.hash);
      await tx.wait();
      console.log("device registered");
    }
  )
  .command(
    "register-devices",
    "Register multiple devices",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      vendor: { type: "string", demandOption: true },
      product: { type: "string", demandOption: true },
      devices: { type: "string", demandOption: true },
    },
    async (args) => {
      const contract = Vendor__factory.connect(
        args.vendor,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );
      const tx = await contract.registerDevices(
        args.product,
        args.devices.split(',')
      );
      console.log("tx hash:", tx.hash);
      await tx.wait();
      console.log("devices registered");
    }
  )
  .command(
    "activate-device",
    "Activate a device",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      vendor: { type: "string", demandOption: true },
      product: { type: "string", demandOption: true },
      device: { type: "string", demandOption: true },
      customChallenge: { type: "string", demandOption: true },
    },
    async (args) => {
      const contract = Vendor__factory.connect(
        args.vendor,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );
      const tx = await contract.activateDevice(
        args.product,
        args.device,
        args.customChallenge
      );
      console.log("tx hash:", tx.hash);
      await tx.wait();
      console.log("device activated");
    }
  )
  .help().argv;
