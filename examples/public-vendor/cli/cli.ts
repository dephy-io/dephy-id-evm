import { ethers, ContractFactory } from "ethers";
import { PublicVendor__factory } from "./generated";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const addressFilePath = path.resolve(process.cwd(), "./tmp/address.json");
const autoCreateFilePath = path.resolve(process.cwd(), "./tmp/auto-create.json");

yargs(hideBin(process.argv))
  .command(
    "deploy",
    "Deploy public vendor contract",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      productFactory: { type: "string", demandOption: true },
      productImpl: { type: "string", demandOption: true },
      name: { type: "string", demandOption: true },
      symbol: { type: "string", demandOption: true },
      baseTokenURI: { type: "string", demandOption: true },
    },
    async (args) => {
      // Step 1: Run `forge build --contracts ./examples/public-vendor -o ./examples/public-vendor/out`
      execSync("forge build --contracts ./examples/public-vendor -o ./examples/public-vendor/out");

      console.log("contracts has been built, reading artifacts from out dir...");

      // Step 2: Read ABI and bytecode from `./out/PublicVendor.sol/PublicVendor.json`
      const vendorArtifactPath = path.resolve(
        __dirname,
        "./out/PublicVendor.sol/PublicVendor.json"
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
        args.productFactory,
        args.productImpl,
        args.name,
        args.symbol,
        args.baseTokenURI
      );
      console.log("contract deploying...");
      await contract.deployed();
      console.log(`PublicVendor contract deployed at ${contract.address}`);

      // Step 4: Write deployed contract address to `./tmp/address.json`
      const addressDir = path.dirname(addressFilePath);
      if (!fs.existsSync(addressDir)) {
        fs.mkdirSync(addressDir, { recursive: true });
      }
      fs.writeFileSync(
        addressFilePath,
        JSON.stringify({ PublicVendor: contract.address }, null, 2)
      );
      console.log(`PublicVendor contract address stored in ./tmp/address.json`);
    }
  )
  .command(
    "create-activated-device",
    "Create a activated device",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      vendor: { type: "string", demandOption: false },
      device: { type: "string", demandOption: true },
      receiver: { type: "string", demandOption: true },
    },
    async (args) => {
      // If vendor is not provided, read it from address.json
      let vendorAddress = args.vendor;
      if (!vendorAddress) {
        if (!fs.existsSync(addressFilePath)) {
          throw new Error(
            "PublicVendor address not provided and tmp/address.json not found"
          );
        }
        const addressJson = JSON.parse(fs.readFileSync(addressFilePath, "utf-8"));
        vendorAddress = addressJson.PublicVendor;
        if (!vendorAddress) {
          throw new Error("PublicVendor address not found in tmp/address.json");
        }
      }
      const contract = PublicVendor__factory.connect(
        vendorAddress,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );
      const tx = await contract.createActivatedDevice(
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
      devices: { type: "string", demandOption: true },
      receivers: { type: "string", demandOption: true },
    },
    async (args) => {
      // If vendor is not provided, read it from address.json
      let vendorAddress = args.vendor;
      if (!vendorAddress) {
        if (!fs.existsSync(addressFilePath)) {
          throw new Error(
            "PublicVendor address not provided and tmp/address.json not found"
          );
        }
        const addressJson = JSON.parse(fs.readFileSync(addressFilePath, "utf-8"));
        vendorAddress = addressJson.PublicVendor;
        if (!vendorAddress) {
          throw new Error("PublicVendor address not found in tmp/address.json");
        }
      }
      const contract = PublicVendor__factory.connect(
        vendorAddress,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );
      const tx = await contract.createActivatedDevices(
        args.devices.split(","),
        args.receivers.split(",")
      );
      console.log("tx hash:", tx.hash);
      await tx.wait();
      console.log("activated devices created");
    }
  )
  .command(
    "auto-create",
    "Generate 10 new devices and activate them",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      vendor: { type: "string", demandOption: false },
      receiver: { type: "string", demandOption: true },
    },
    async (args) => {
      let vendorAddress = args.vendor;
      if (!vendorAddress) {
        if (!fs.existsSync(addressFilePath)) {
          throw new Error(
            "PublicVendor address not provided and tmp/address.json not found"
          );
        }
        const addressJson = JSON.parse(fs.readFileSync(addressFilePath, "utf-8"));
        vendorAddress = addressJson.PublicVendor;
        if (!vendorAddress) {
          throw new Error("PublicVendor address not found in tmp/address.json");
        }
      }

      const devices = Array.from({ length: 10 }, () => ethers.Wallet.createRandom());

      const deviceAddresses = devices.map(wallet => wallet.address);

      const contract = PublicVendor__factory.connect(
        vendorAddress,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );

      console.log(`Devices is auto created, then waiting to be activated and assigned to receiver ${args.receiver}...`);
      const tx = await contract.createActivatedDevices(deviceAddresses, Array(10).fill(args.receiver));
      console.log("tx hash:", tx.hash);
      await tx.wait();

      let existingWallets = [];
      if (fs.existsSync(autoCreateFilePath)) {
        existingWallets = JSON.parse(fs.readFileSync(autoCreateFilePath, "utf-8"));
      }

      const devicesData = devices.map(wallet => ({
        address: wallet.address,
        privateKey: wallet.privateKey,
      }));
      existingWallets.push(...devicesData);

      const dir = path.dirname(autoCreateFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(autoCreateFilePath, JSON.stringify(existingWallets, null, 2));
      console.log(`10 new devices created and activated stored in ./tmp/auto-create.json`);
    }
  )
  .help().argv;
