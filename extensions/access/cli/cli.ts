import { ethers, ContractFactory } from "ethers";
import { ApplicationFactory__factory } from "./generated";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const addressFilePath = path.resolve(process.cwd(), "./tmp/address.json");

function updateAddressFile(newData: Record<string, string>) {
  let existingData = {};
  if (fs.existsSync(addressFilePath)) {
    existingData = JSON.parse(fs.readFileSync(addressFilePath, "utf-8"));
  }
  const updatedData = { ...existingData, ...newData };
  fs.writeFileSync(addressFilePath, JSON.stringify(updatedData, null, 2));
}

yargs(hideBin(process.argv))
  .command(
    "deploy-application-factory",
    "Deploy ApplicationFactory contract",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      productFactory: { type: "string", demandOption: true },
    },
    async (args) => {
      execSync(
        "forge build --contracts ./extensions/access -o ./extensions/access/out"
      );

      const factoryArtifactPath = path.resolve(
        __dirname,
        "../out/ApplicationFactory.sol/ApplicationFactory.json"
      );
      const factoryArtifact = JSON.parse(
        fs.readFileSync(factoryArtifactPath, "utf-8")
      );

      const wallet = new ethers.Wallet(
        args.privatekey,
        new ethers.providers.JsonRpcProvider(args.rpc)
      );
      const factory = new ContractFactory(
        factoryArtifact.abi,
        factoryArtifact.bytecode.object,
        wallet
      );

      const contract = await factory.deploy(args.productFactory);
      console.log("contract deploying...");
      await contract.deployed();
      console.log(
        `ApplicationFactory contract deployed at ${contract.address}`
      );

      updateAddressFile({ ApplicationFactory: contract.address });
      console.log(
        `ApplicationFactory contract address stored in ./tmp/address.json`
      );
    }
  )
  .command(
    "deploy-application-impl",
    "Deploy ApplicationImpl contract",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
    },
    async (args) => {
      execSync(
        "forge build --contracts ./extensions/access -o ./extensions/access/out"
      );

      const implArtifactPath = path.resolve(
        __dirname,
        "../out/Application.sol/Application.json"
      );
      const implArtifact = JSON.parse(
        fs.readFileSync(implArtifactPath, "utf-8")
      );

      const wallet = new ethers.Wallet(
        args.privatekey,
        new ethers.providers.JsonRpcProvider(args.rpc)
      );
      const factory = new ContractFactory(
        implArtifact.abi,
        implArtifact.bytecode.object,
        wallet
      );

      const contract = await factory.deploy();
      console.log("contract deploying...");
      await contract.deployed();
      console.log(`ApplicationImpl contract deployed at ${contract.address}`);

      updateAddressFile({ ApplicationImpl: contract.address });
      console.log(
        `ApplicationImpl contract address stored in ./tmp/address.json`
      );
    }
  )
  .command(
    "create-application",
    "Create Application for accessing",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      applicationFactory: { type: "string", demandOption: false },
      applicationImpl: { type: "string", demandOption: false },
      name: { type: "string", demandOption: true },
      symbol: { type: "string", demandOption: true },
    },
    async (args) => {
      let applicationFactoryAddress = args.applicationFactory;
      let applicationImplAddress = args.applicationImpl;

      if (!fs.existsSync(addressFilePath)) {
        throw new Error(
          "Address file not found, please deploy contracts first."
        );
      }

      const addressJson = JSON.parse(fs.readFileSync(addressFilePath, "utf-8"));

      if (!applicationFactoryAddress) {
        applicationFactoryAddress = addressJson.ApplicationFactory;
        if (!applicationFactoryAddress) {
          throw new Error(
            "ApplicationFactory address not found in ./tmp/address.json"
          );
        }
      }

      if (!applicationImplAddress) {
        applicationImplAddress = addressJson.ApplicationImpl;
        if (!applicationImplAddress) {
          throw new Error(
            "ApplicationImpl address not found in ./tmp/address.json"
          );
        }
      }

      const contract = ApplicationFactory__factory.connect(
        applicationFactoryAddress,
        new ethers.Wallet(
          args.privatekey,
          new ethers.providers.JsonRpcProvider(args.rpc)
        )
      );

      const tx = await contract.createApplication(
        applicationImplAddress,
        args.name,
        args.symbol
      );
      console.log("tx hash:", tx.hash);

      const receipt = await tx.wait();
      const targetEvents = receipt.events?.filter(
        (e) => e.event === "ApplicationCreated"
      );
      if (!targetEvents || targetEvents.length === 0 || !targetEvents[0].args) {
        throw new Error("Filter ApplicationCreated event failed");
      }

      const application: string = targetEvents[0].args[2];
      console.log(`Application <${args.name}> created: ${application}`);
    }
  )
  .help().argv;
