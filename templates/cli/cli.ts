import { ethers, ContractFactory } from "ethers";
import { Vendor__factory } from "./generated";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

yargs(hideBin(process.argv))
  .command(
    "deploy-vendor",
    "Deploy vendor contract",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      productFactory: { type: "string", demandOption: true },
    },
    async (args) => {
      // Step 1: Run `forge build --contracts ./templates`
      execSync("forge build --contracts ./templates");

      // Step 2: Read ABI and bytecode from `./out/Vendor.sol/Vendor.json`
      const vendorArtifactPath = path.resolve(
        __dirname,
        "../../out/Vendor.sol/Vendor.json"
      );
      const vendorArtifact = JSON.parse(
        fs.readFileSync(vendorArtifactPath, "utf-8")
      );

      // Step 3: Deploy contract with your wallet
      const wallet = new ethers.Wallet(
        args.privatekey,
        new ethers.providers.JsonRpcProvider(args.rpc)
      );
      const factory = new ContractFactory(
        vendorArtifact.abi,
        vendorArtifact.bytecode.object,
        wallet
      );
      const contract = await factory.deploy(
        wallet.address,
        args.productFactory
      );
      console.log("contract deploying...");
      await contract.deployed();
      console.log(`vendor deployed at ${contract.address}`);

      // Step 4: Write deployed contract address to `./templates/tmp/address.json`
      const addressPath = path.resolve(
        __dirname,
        "../../templates/tmp/address.json"
      );
      const addressDir = path.dirname(addressPath);
      if (!fs.existsSync(addressDir)) {
        fs.mkdirSync(addressDir, { recursive: true });
      }
      fs.writeFileSync(
        addressPath,
        JSON.stringify({ Vendor: contract.address }, null, 2)
      );
      console.log(`vendor address stored in ./templates/tmp/address.json`);
    }
  )
  .command(
    "create-product",
    "Create a new product",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      vendor: { type: "string", demandOption: false },
      productImpl: { type: "string", demandOption: true },
      name: { type: "string", demandOption: true },
      symbol: { type: "string", demandOption: true },
      baseTokenURI: { type: "string", demandOption: true },
    },
    async (args) => {
      // If vendor is not provided, read it from address.json
      let vendorAddress = args.vendor;
      if (!vendorAddress) {
        const addressPath = path.resolve(
          __dirname,
          "../../templates/tmp/address.json"
        );
        if (!fs.existsSync(addressPath)) {
          throw new Error(
            "Vendor address not provided and address.json not found"
          );
        }
        const addressJson = JSON.parse(fs.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
          throw new Error("Vendor address not found in address.json");
        }
      }
      const contract = Vendor__factory.connect(
        vendorAddress,
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
      vendor: { type: "string", demandOption: false },
      product: { type: "string", demandOption: true },
      device: { type: "string", demandOption: true },
    },
    async (args) => {
      // If vendor is not provided, read it from address.json
      let vendorAddress = args.vendor;
      if (!vendorAddress) {
        const addressPath = path.resolve(
          __dirname,
          "../../templates/tmp/address.json"
        );
        if (!fs.existsSync(addressPath)) {
          throw new Error(
            "Vendor address not provided and address.json not found"
          );
        }
        const addressJson = JSON.parse(fs.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
          throw new Error("Vendor address not found in address.json");
        }
      }
      const contract = Vendor__factory.connect(
        vendorAddress,
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
      vendor: { type: "string", demandOption: false },
      product: { type: "string", demandOption: true },
      devices: { type: "string", demandOption: true },
    },
    async (args) => {
      // If vendor is not provided, read it from address.json
      let vendorAddress = args.vendor;
      if (!vendorAddress) {
        const addressPath = path.resolve(
          __dirname,
          "../../templates/tmp/address.json"
        );
        if (!fs.existsSync(addressPath)) {
          throw new Error(
            "Vendor address not provided and address.json not found"
          );
        }
        const addressJson = JSON.parse(fs.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
          throw new Error("Vendor address not found in address.json");
        }
      }
      const contract = Vendor__factory.connect(
        vendorAddress,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );
      const tx = await contract.registerDevices(
        args.product,
        args.devices.split(",")
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
      vendor: { type: "string", demandOption: false },
      product: { type: "string", demandOption: true },
      device: { type: "string", demandOption: true },
      customChallenge: { type: "string", demandOption: true },
    },
    async (args) => {
      // If vendor is not provided, read it from address.json
      let vendorAddress = args.vendor;
      if (!vendorAddress) {
        const addressPath = path.resolve(
          __dirname,
          "../../templates/tmp/address.json"
        );
        if (!fs.existsSync(addressPath)) {
          throw new Error(
            "Vendor address not provided and address.json not found"
          );
        }
        const addressJson = JSON.parse(fs.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
          throw new Error("Vendor address not found in address.json");
        }
      }
      const contract = Vendor__factory.connect(
        vendorAddress,
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
  .command(
    "create-activated-device",
    "Create a activated device",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      vendor: { type: "string", demandOption: false },
      product: { type: "string", demandOption: true },
      device: { type: "string", demandOption: true },
      receiver: { type: "string", demandOption: true },
    },
    async (args) => {
      // If vendor is not provided, read it from address.json
      let vendorAddress = args.vendor;
      if (!vendorAddress) {
        const addressPath = path.resolve(
          __dirname,
          "../../templates/tmp/address.json"
        );
        if (!fs.existsSync(addressPath)) {
          throw new Error(
            "Vendor address not provided and address.json not found"
          );
        }
        const addressJson = JSON.parse(fs.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
          throw new Error("Vendor address not found in address.json");
        }
      }
      const contract = Vendor__factory.connect(
        vendorAddress,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );
      const tx = await contract.createActivatedDevice(
        args.product,
        args.device,
        args.receiver
      );
      console.log("tx hash:", tx.hash);
      await tx.wait();
      console.log("activated device created");
    }
  )
  .command(
    "create-activated-devices",
    "Create multiple activated devices",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      vendor: { type: "string", demandOption: false },
      product: { type: "string", demandOption: true },
      devices: { type: "string", demandOption: true },
      receivers: { type: "string", demandOption: true },
    },
    async (args) => {
      // If vendor is not provided, read it from address.json
      let vendorAddress = args.vendor;
      if (!vendorAddress) {
        const addressPath = path.resolve(
          __dirname,
          "../../templates/tmp/address.json"
        );
        if (!fs.existsSync(addressPath)) {
          throw new Error(
            "Vendor address not provided and address.json not found"
          );
        }
        const addressJson = JSON.parse(fs.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
          throw new Error("Vendor address not found in address.json");
        }
      }
      const contract = Vendor__factory.connect(
        vendorAddress,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );
      const tx = await contract.createActivatedDevices(
        args.product,
        args.devices.split(","),
        args.receivers.split(",")
      );
      console.log("tx hash:", tx.hash);
      await tx.wait();
      console.log("activated devices created");
    }
  )
  .help().argv;
