"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// import Wallet from "./typechain/Wallet"; // 使用 Typechain 生成的类型定义
const generated_1 = require("./generated");
const child_process_1 = require("child_process");
// Utility function to write JSON data to a file
function writeJsonToFile(filePath, data) {
    fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
// Utility function to read JSON data from a file
function readJsonFromFile(filePath) {
    return JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
}
// Define the paths for the address file
const addressFilePath = path_1.default.resolve(process.cwd(), "./tmp/address.json");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command("deploy", "Deploy the Wallet contract", {
    privatekey: { type: "string", demandOption: true },
    rpc: { type: "string", demandOption: true },
    product: { type: "string", demandOption: true },
    tokenId: { type: "number", demandOption: true },
    device: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Run `forge build --contracts ./extensions/wallet`
    (0, child_process_1.execSync)("forge build --contracts ./extensions/wallet");
    // Step 2: Read ABI and bytecode from `./out/Wallet.sol/Wallet.json`
    const walletArtifactPath = path_1.default.resolve(__dirname, "../../../out/Wallet.sol/Wallet.json");
    const walletArtifact = JSON.parse(fs_1.default.readFileSync(walletArtifactPath, "utf-8"));
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.rpc);
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, provider);
    const factory = new ethers_1.ContractFactory(walletArtifact.abi, walletArtifact.bytecode.object, wallet);
    const contract = yield factory.deploy(args.device, args.product, args.tokenId);
    console.log("contract deploying...");
    yield contract.deployed();
    console.log(`Wallet contract deployed at ${contract.address}`);
    const addressData = { Wallet: contract.address };
    if (!fs_1.default.existsSync(path_1.default.dirname(addressFilePath))) {
        fs_1.default.mkdirSync(path_1.default.dirname(addressFilePath), { recursive: true });
    }
    writeJsonToFile(addressFilePath, addressData);
    console.log("Wallet contract address stored in ./tmp/address.json");
}))
    .command("setBeneficiary", "Set beneficiary for Wallet", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    beneficiary: { type: "string", demandOption: true },
    contract: { type: "string", demandOption: false },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.rpc);
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, provider);
    let contractAddress = args.contract;
    if (!contractAddress) {
        const addressData = readJsonFromFile(addressFilePath);
        contractAddress = addressData.Wallet;
    }
    const contract = generated_1.Wallet__factory.connect(contractAddress, wallet);
    const tx = yield contract.setBeneficiary(args.beneficiary);
    console.log(`Transaction hash: ${tx.hash}`);
    yield tx.wait();
    console.log("Beneficiary set:", args.beneficiary);
}))
    .command("send", "Send ETH or ERC20 tokens to the Wallet contract", {
    privatekey: { type: "string", demandOption: true },
    rpc: { type: "string", demandOption: true },
    amount: { type: "string", demandOption: true },
    token: { type: "string", demandOption: false },
    contract: { type: "string", demandOption: false },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.rpc);
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, provider);
    let contractAddress = args.contract;
    if (!contractAddress) {
        const addressData = readJsonFromFile(addressFilePath);
        contractAddress = addressData.Wallet;
    }
    if (args.token) {
        const erc20 = new ethers_1.ethers.Contract(args.token, [
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
        ], wallet);
        const tx = yield erc20.transfer(contractAddress, ethers_1.ethers.utils.parseUnits(args.amount));
        console.log(`Transaction hash: ${tx.hash}`);
        yield tx.wait();
        console.log(`Sent ${args.amount} tokens to the contract at ${contractAddress}`);
    }
    else {
        const tx = yield wallet.sendTransaction({
            to: contractAddress,
            value: ethers_1.ethers.utils.parseEther(args.amount),
        });
        console.log(`Transaction hash: ${tx.hash}`);
        yield tx.wait();
        console.log(`Sent ${args.amount} ETH to the contract at ${contractAddress}`);
    }
}))
    .command("withdraw", "Withdraw tokens or ETH from the Wallet contract", {
    privatekey: { type: "string", demandOption: true },
    rpc: { type: "string", demandOption: true },
    receiver: { type: "string", demandOption: true },
    amount: { type: "string", demandOption: true },
    token: { type: "string", demandOption: false },
    contract: { type: "string", demandOption: false },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.rpc);
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, provider);
    let contractAddress = args.contract;
    if (!contractAddress) {
        const addressData = readJsonFromFile(addressFilePath);
        contractAddress = addressData.Wallet;
    }
    const contract = generated_1.Wallet__factory.connect(contractAddress, wallet);
    const tokenAddress = args.token || ethers_1.ethers.constants.AddressZero;
    const tx = yield contract.withdraw(tokenAddress, args.receiver, ethers_1.ethers.utils.parseEther(args.amount));
    console.log(`Transaction hash: ${tx.hash}`);
    yield tx.wait();
    console.log(`Withdrawn ${args.amount} tokens to ${args.receiver} from the contract at ${contractAddress}`);
}))
    .command("proxyCall", "Invoke the proxyCall function on the Wallet contract", {
    privatekey: { type: "string", demandOption: true },
    rpc: { type: "string", demandOption: true },
    target: { type: "string", demandOption: true },
    data: { type: "string", demandOption: true },
    value: { type: "string", demandOption: false },
    deadline: { type: "number", demandOption: false },
    signature: { type: "string", demandOption: false },
    contract: { type: "string", demandOption: false },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    if (!args.value) {
        args.value = "0";
    }
    if (!args.deadline) {
        args.deadline = 0;
    }
    if (!args.signature) {
        args.signature = "0x";
    }
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(args.rpc);
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, provider);
    let contractAddress = args.contract;
    if (!contractAddress) {
        const addressData = readJsonFromFile(addressFilePath);
        contractAddress = addressData.Wallet;
    }
    const contract = generated_1.Wallet__factory.connect(contractAddress, wallet);
    const tx = yield contract.proxyCall(args.target, ethers_1.ethers.utils.arrayify(args.data), ethers_1.ethers.utils.parseEther(args.value), args.deadline, ethers_1.ethers.utils.arrayify(args.signature));
    console.log(`Transaction hash: ${tx.hash}`);
    yield tx.wait();
    console.log(`Proxy call to ${args.target} with value ${args.value} ETH was successful`);
}))
    .help().argv;
