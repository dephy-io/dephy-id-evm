import { ContractFactory, ethers } from "ethers";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
// import Wallet from "./typechain/Wallet"; // 使用 Typechain 生成的类型定义
import { Wallet__factory, Wallet } from "./generated";
import { execSync } from "child_process";

// Utility function to write JSON data to a file
function writeJsonToFile(filePath: string, data: object) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Utility function to read JSON data from a file
function readJsonFromFile(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Define the paths for the address file
const addressFilePath = path.resolve(process.cwd(), "./tmp/address.json");

yargs(hideBin(process.argv))
  .command(
    "deploy",
    "Deploy the Wallet contract",
    {
      privatekey: { type: "string", demandOption: true },
      rpc: { type: "string", demandOption: true },
      product: { type: "string", demandOption: true },
      tokenId: { type: "number", demandOption: true },
      device: { type: "string", demandOption: true },
    },
    async (args) => {
      // Step 1: Run `forge build --contracts ./extensions/wallet`
      execSync("forge build --contracts ./extensions/wallet");

      // Step 2: Read ABI and bytecode from `./out/Wallet.sol/Wallet.json`
      const walletArtifactPath = path.resolve(
        __dirname,
        "../../../out/Wallet.sol/Wallet.json"
      );
      const walletArtifact = JSON.parse(
        fs.readFileSync(walletArtifactPath, "utf-8")
      );

      const provider = new ethers.providers.JsonRpcProvider(args.rpc);
      const wallet = new ethers.Wallet(args.privatekey, provider);

      const factory = new ContractFactory(
        walletArtifact.abi,
        walletArtifact.bytecode.object,
        wallet
      );

      const contract = await factory.deploy(
        args.device,
        args.product,
        args.tokenId
      );
      console.log("contract deploying...");
      await contract.deployed();
      console.log(`Wallet contract deployed at ${contract.address}`);

      const addressData = { Wallet: contract.address };
      if (!fs.existsSync(path.dirname(addressFilePath))) {
        fs.mkdirSync(path.dirname(addressFilePath), { recursive: true });
      }
      writeJsonToFile(addressFilePath, addressData);
      console.log("Wallet contract address stored in ./tmp/address.json");
    }
  )
  .command(
    "setBeneficiary",
    "Set beneficiary for Wallet",
    {
      rpc: { type: "string", demandOption: true },
      privatekey: { type: "string", demandOption: true },
      beneficiary: { type: "string", demandOption: true },
      contract: { type: "string", demandOption: false },
    },
    async (args) => {
      const provider = new ethers.providers.JsonRpcProvider(args.rpc);
      const wallet = new ethers.Wallet(args.privatekey, provider);
      let contractAddress = args.contract;
      if (!contractAddress) {
        const addressData = readJsonFromFile(addressFilePath);
        contractAddress = addressData.Wallet;
      }
      const contract = Wallet__factory.connect(contractAddress!, wallet);

      const tx = await contract.setBeneficiary(args.beneficiary);
      console.log(`Transaction hash: ${tx.hash}`);
      await tx.wait();

      console.log("Beneficiary set:", args.beneficiary);
    }
  )
  .command(
    "send",
    "Send ETH or ERC20 tokens to the Wallet contract",
    {
      privatekey: { type: "string", demandOption: true },
      rpc: { type: "string", demandOption: true },
      amount: { type: "string", demandOption: true },
      token: { type: "string", demandOption: false },
      contract: { type: "string", demandOption: false },
    },
    async (args) => {
      const provider = new ethers.providers.JsonRpcProvider(args.rpc);
      const wallet = new ethers.Wallet(args.privatekey, provider);

      let contractAddress = args.contract;
      if (!contractAddress) {
        const addressData = readJsonFromFile(addressFilePath);
        contractAddress = addressData.Wallet;
      }

      if (args.token) {
        const erc20 = new ethers.Contract(
          args.token,
          [
            {
              type: "function",
              name: "balanceOf",
              inputs: [
                { name: "account", type: "address", internalType: "address" },
              ],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "transfer",
              inputs: [
                { name: "to", type: "address", internalType: "address" },
                { name: "value", type: "uint256", internalType: "uint256" },
              ],
              outputs: [{ name: "", type: "bool", internalType: "bool" }],
              stateMutability: "nonpayable",
            },
          ],
          wallet
        );
        const tx = await erc20.transfer(
          contractAddress,
          ethers.utils.parseUnits(args.amount)
        );
        console.log(`Transaction hash: ${tx.hash}`);
        await tx.wait();
        console.log(
          `Sent ${args.amount} tokens to the contract at ${contractAddress}`
        );
      } else {
        const tx = await wallet.sendTransaction({
          to: contractAddress,
          value: ethers.utils.parseEther(args.amount),
        });
        console.log(`Transaction hash: ${tx.hash}`);
        await tx.wait();
        console.log(
          `Sent ${args.amount} ETH to the contract at ${contractAddress}`
        );
      }
    }
  )
  .command(
    "withdraw",
    "Withdraw tokens or ETH from the Wallet contract",
    {
      privatekey: { type: "string", demandOption: true },
      rpc: { type: "string", demandOption: true },
      receiver: { type: "string", demandOption: true },
      amount: { type: "string", demandOption: true },
      token: { type: "string", demandOption: false },
      contract: { type: "string", demandOption: false },
    },
    async (args) => {
      const provider = new ethers.providers.JsonRpcProvider(args.rpc);
      const wallet = new ethers.Wallet(args.privatekey, provider);

      let contractAddress = args.contract;
      if (!contractAddress) {
        const addressData = readJsonFromFile(addressFilePath);
        contractAddress = addressData.Wallet;
      }

      const contract = Wallet__factory.connect(contractAddress!, wallet);

      const tokenAddress = args.token || ethers.constants.AddressZero;
      const tx = await contract.withdraw(
        tokenAddress,
        args.receiver,
        ethers.utils.parseEther(args.amount)
      );
      console.log(`Transaction hash: ${tx.hash}`);
      await tx.wait();
      console.log(
        `Withdrawn ${args.amount} tokens to ${args.receiver} from the contract at ${contractAddress}`
      );
    }
  )
  .command(
    "proxyCall",
    "Invoke the proxyCall function on the Wallet contract",
    {
      privatekey: { type: "string", demandOption: true },
      rpc: { type: "string", demandOption: true },
      target: { type: "string", demandOption: true },
      data: { type: "string", demandOption: true },
      msgValue: { type: "string", demandOption: false },
      walletValue: { type: "string", demandOption: false },
      deadline: { type: "number", demandOption: false },
      signature: { type: "string", demandOption: false },
      contract: { type: "string", demandOption: false },
    },
    async (args) => {
      if(!args.walletValue) {
        args.walletValue = "0";
      }
      if(!args.msg_value) {
        args.msgValue = "0";
      }
      if (!args.deadline) {
        args.deadline = 0;
      }
      if (!args.signature) {
        args.signature = "0x";
      }
      const provider = new ethers.providers.JsonRpcProvider(args.rpc);
      const wallet = new ethers.Wallet(args.privatekey, provider);

      let contractAddress = args.contract;
      if (!contractAddress) {
        const addressData = readJsonFromFile(addressFilePath);
        contractAddress = addressData.Wallet;
      }

      const contract = Wallet__factory.connect(contractAddress!, wallet);

      const tx = await contract.proxyCall(
        args.target,
        ethers.utils.arrayify(args.data),
        ethers.utils.parseEther(args.walletValue),
        args.deadline,
        ethers.utils.arrayify(args.signature),
        {
            value: args.msgValue
        }
      );
      console.log(`Transaction hash: ${tx.hash}`);
      await tx.wait();
      console.log(
        `Proxy call to ${args.target} with walletValue ${args.walletValue} ETH was successful`
      );
    }
  )
  .help().argv;
