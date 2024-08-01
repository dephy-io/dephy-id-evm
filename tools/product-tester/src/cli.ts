import { ethers, ContractFactory } from "ethers";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Function to write JSON data to a file
function writeJsonToFile(filePath: string, data: object) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Define the paths for the contract address files relative to the current working directory
const tmpDir = path.resolve(process.cwd(), "./tmp");
const contractAddressFilePath = path.join(tmpDir, "address.json");

yargs(hideBin(process.argv))
  .command(
    "deploy",
    "Deploy the contract as a proxy and save the contract address to a file.",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      productImpl: { type: "string", demandOption: true },
      name: { type: "string", default: "Test Product" },
      symbol: { type: "string", default: "TP" },
      baseTokenURI: { type: "string", default: "https://test-product.com" },
    },
    async (args) => {
      // Ensure the tmp directory exists
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }

      execSync("forge build");

      const productArtifactPath = path.resolve(
        __dirname,
        "../../../out/Product.sol/Product.json"
      );
      const productArtifact = JSON.parse(
        fs.readFileSync(productArtifactPath, "utf-8")
      );
      const erc1967ProxyArtifactPath = path.resolve(
        __dirname,
        "../../../out/ERC1967Proxy.sol/ERC1967Proxy.json"
      );
      const erc1967ProxyArtifact = JSON.parse(
        fs.readFileSync(erc1967ProxyArtifactPath, "utf-8")
      );

      const wallet = new ethers.Wallet(
        args.privatekey,
        new ethers.providers.JsonRpcProvider(args.rpc)
      );

      // Create the initialization data for the proxy contract
      const productInterface = new ethers.utils.Interface(productArtifact.abi);
      const initData = productInterface.encodeFunctionData("initialize", [
        args.name,
        args.symbol,
        args.baseTokenURI,
      ]);

      console.log("abi:", erc1967ProxyArtifact.abi)
      console.log("bytecode:", erc1967ProxyArtifact.bytecode.object)

      const erc1967ProxyFactory = new ContractFactory(
        erc1967ProxyArtifact.abi,
        erc1967ProxyArtifact.bytecode.object,
        wallet
      );
      console.log("ProductProxy deploying...");
      const erc1967Proxy = await erc1967ProxyFactory.deploy(
        args.productImpl,
        initData
      );
      await erc1967Proxy.deployed();
      console.log(`ProductProxy contract deployed at ${erc1967Proxy.address}`);

      const contractAddressData = {
        ProductProxy: erc1967Proxy.address,
        ProductImpl: args.productImpl,
      };
      writeJsonToFile(contractAddressFilePath, contractAddressData);
      console.log(
        "The contract has been deployed and the addresses have been saved to:",
        contractAddressFilePath
      );
    }
  )
  .command(
    "mint",
    "Mint a new token to the specified address.",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      to: { type: "string", demandOption: true },
    },
    async (args) => {
      // Ensure the tmp directory exists
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }

      // Check if the contract address file exists
      if (!fs.existsSync(contractAddressFilePath)) {
        console.log(
          "No contract address found. Please deploy the contract first using the 'deploy' command."
        );
        process.exit(1);
      }

      // Read the contract address from the file
      const contractAddressData = JSON.parse(
        fs.readFileSync(contractAddressFilePath, "utf-8")
      );
      const wallet = new ethers.Wallet(
        args.privatekey,
        new ethers.providers.JsonRpcProvider(args.rpc)
      );

      // Get the contract instance
      const productArtifactPath = path.resolve(
        __dirname,
        "../../../out/Product.sol/Product.json"
      );
      const productArtifact = JSON.parse(
        fs.readFileSync(productArtifactPath, "utf-8")
      );
      const productFactory = new ContractFactory(
        productArtifact.abi,
        productArtifact.bytecode.object,
        wallet
      );
      const product = productFactory.attach(contractAddressData.ProductProxy);

      // Mint a new token
      const tx = await product.mint(args.to);
      const receipt = await tx.wait();
      const targetEvents = receipt.events?.filter(
        (e: any) => e.event === "Transfer"
      );
      if (!targetEvents || targetEvents.length === 0 || !targetEvents[0].args) {
        throw new Error("Filter Transfer event failed");
      }
      const tokenId: string = ethers.BigNumber.from(targetEvents[0].args[2]).toString();

      console.log(`A new token (id: ${tokenId}) has been minted to: ${args.to}`);
    }
  )
  .help().argv;
