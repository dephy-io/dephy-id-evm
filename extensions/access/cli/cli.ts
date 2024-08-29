import { ConnectionIdentities__factory } from "./generated";
import { ethers, ContractFactory } from "ethers";
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
    "deploy-connection-identities",
    "Deploy ConnectionIdentities contract",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
    },
    async (args) => {
      execSync(
        "forge build --contracts ./extensions/access -o ./extensions/access/out"
      );

      console.log("contracts has been built, reading artifacts from out dir...");

      const contractArtifactPath = path.resolve(
        __dirname,
        "../out/ConnectionIdentities.sol/ConnectionIdentities.json"
      );
      const contractArtifact = JSON.parse(
        fs.readFileSync(contractArtifactPath, "utf-8")
      );

      const wallet = new ethers.Wallet(
        args.privatekey,
        new ethers.providers.JsonRpcProvider(args.rpc)
      );
      const factory = new ContractFactory(
        contractArtifact.abi,
        contractArtifact.bytecode.object,
        wallet
      );

      const contract = await factory.deploy();
      console.log("contract deploying...");
      await contract.deployed();
      console.log(
        `ConnectionIdentities contract deployed at ${contract.address}`
      );

      updateAddressFile({ ConnectionIdentities: contract.address });
      console.log(
        `ConnectionIdentities contract address stored in ./tmp/address.json`
      );
    }
  )
  .command(
    "get-identities",
    "Get all identities for a user",
    {
      rpc: { type: "string", demandOption: true },
      connectionIdentities: { type: "string", demandOption: false },
      user: { type: "string", demandOption: true },
    },
    async (args) => {
      let contractAddress = args.connectionIdentities;
      if(!contractAddress) {
        const addressJson = JSON.parse(fs.readFileSync(addressFilePath, "utf-8"));
        contractAddress = addressJson.ConnectionIdentities;
        if (!contractAddress) {
          throw new Error("ConnectionIdentities address not found in tmp/address.json");
        }
      }

      const contract = ConnectionIdentities__factory.connect(contractAddress, new ethers.providers.JsonRpcProvider(args.rpc));

      const identities = await contract.getIdentities(args.user);
      console.log("Identities:", identities);
    }
  )
  .command(
    "add-identity",
    "Add an identity",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      connectionIdentities: { type: "string", demandOption: false },
      prefix: { type: "string", demandOption: true },
      digest: { type: "string", demandOption: true },
    },
    async (args) => {
      let contractAddress = args.connectionIdentities;
      if(!contractAddress) {
        const addressJson = JSON.parse(fs.readFileSync(addressFilePath, "utf-8"));
        contractAddress = addressJson.ConnectionIdentities;
        if (!contractAddress) {
          throw new Error("ConnectionIdentities address not found in tmp/address.json");
        }
      }

      const wallet = new ethers.Wallet(
        args.privatekey,
        new ethers.providers.JsonRpcProvider(args.rpc)
      );

      const contract = ConnectionIdentities__factory.connect(contractAddress, wallet);

      const tx = await contract.addIdentity(args.prefix, args.digest);
      console.log("Transaction hash:", tx.hash);
      await tx.wait();
      console.log("Identity added successfully");
    }
  )
  .command(
    "remove-identity",
    "Remove an identity by index",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      connectionIdentities: { type: "string", demandOption: false },
      index: { type: "number", demandOption: true },
    },
    async (args) => {
      let contractAddress = args.connectionIdentities;
      if(!contractAddress) {
        const addressJson = JSON.parse(fs.readFileSync(addressFilePath, "utf-8"));
        contractAddress = addressJson.ConnectionIdentities;
        if (!contractAddress) {
          throw new Error("ConnectionIdentities address not found in tmp/address.json");
        }
      }

      const wallet = new ethers.Wallet(
        args.privatekey,
        new ethers.providers.JsonRpcProvider(args.rpc)
      );

      const contract = ConnectionIdentities__factory.connect(contractAddress, wallet);

      const tx = await contract.removeIdentity(args.index);
      console.log("Transaction hash:", tx.hash);
      await tx.wait();
      console.log("Identity removed successfully");
    }
  )
  .help().argv;
