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
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Function to write JSON data to a file
function writeJsonToFile(filePath, data) {
    fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
// Define the paths for the contract address files relative to the current working directory
const tmpDir = path_1.default.resolve(process.cwd(), "./tmp");
const contractAddressFilePath = path_1.default.join(tmpDir, "address.json");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command("deploy", "Deploy the contract as a proxy and save the contract address to a file.", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    productImpl: { type: "string", demandOption: true },
    name: { type: "string", default: "Test Product" },
    symbol: { type: "string", default: "TP" },
    baseTokenURI: { type: "string", default: "https://test-product.com" },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the tmp directory exists
    if (!fs_1.default.existsSync(tmpDir)) {
        fs_1.default.mkdirSync(tmpDir);
    }
    (0, child_process_1.execSync)("forge build");
    const productArtifactPath = path_1.default.resolve(__dirname, "../../../out/Product.sol/Product.json");
    const productArtifact = JSON.parse(fs_1.default.readFileSync(productArtifactPath, "utf-8"));
    const erc1967ProxyArtifactPath = path_1.default.resolve(__dirname, "../../../out/ERC1967Proxy.sol/ERC1967Proxy.json");
    const erc1967ProxyArtifact = JSON.parse(fs_1.default.readFileSync(erc1967ProxyArtifactPath, "utf-8"));
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc));
    // Create the initialization data for the proxy contract
    const productInterface = new ethers_1.ethers.utils.Interface(productArtifact.abi);
    const initData = productInterface.encodeFunctionData("initialize", [
        args.name,
        args.symbol,
        args.baseTokenURI,
    ]);
    console.log("abi:", erc1967ProxyArtifact.abi);
    console.log("bytecode:", erc1967ProxyArtifact.bytecode.object);
    const erc1967ProxyFactory = new ethers_1.ContractFactory(erc1967ProxyArtifact.abi, erc1967ProxyArtifact.bytecode.object, wallet);
    console.log("ProductProxy deploying...");
    const erc1967Proxy = yield erc1967ProxyFactory.deploy(args.productImpl, initData);
    yield erc1967Proxy.deployed();
    console.log(`ProductProxy contract deployed at ${erc1967Proxy.address}`);
    const contractAddressData = {
        ProductProxy: erc1967Proxy.address,
        ProductImpl: args.productImpl,
    };
    writeJsonToFile(contractAddressFilePath, contractAddressData);
    console.log("The contract has been deployed and the addresses have been saved to:", contractAddressFilePath);
}))
    .command("mint", "Mint a new token to the specified address.", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    to: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Ensure the tmp directory exists
    if (!fs_1.default.existsSync(tmpDir)) {
        fs_1.default.mkdirSync(tmpDir);
    }
    // Check if the contract address file exists
    if (!fs_1.default.existsSync(contractAddressFilePath)) {
        console.log("No contract address found. Please deploy the contract first using the 'deploy' command.");
        process.exit(1);
    }
    // Read the contract address from the file
    const contractAddressData = JSON.parse(fs_1.default.readFileSync(contractAddressFilePath, "utf-8"));
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc));
    // Get the contract instance
    const productArtifactPath = path_1.default.resolve(__dirname, "../../../out/Product.sol/Product.json");
    const productArtifact = JSON.parse(fs_1.default.readFileSync(productArtifactPath, "utf-8"));
    const productFactory = new ethers_1.ContractFactory(productArtifact.abi, productArtifact.bytecode.object, wallet);
    const product = productFactory.attach(contractAddressData.ProductProxy);
    // Mint a new token
    const tx = yield product.mint(args.to);
    const receipt = yield tx.wait();
    const targetEvents = (_a = receipt.events) === null || _a === void 0 ? void 0 : _a.filter((e) => e.event === "Transfer");
    if (!targetEvents || targetEvents.length === 0 || !targetEvents[0].args) {
        throw new Error("Filter Transfer event failed");
    }
    const tokenId = ethers_1.ethers.BigNumber.from(targetEvents[0].args[2]).toString();
    console.log(`A new token (id: ${tokenId}) has been minted to: ${args.to}`);
}))
    .help().argv;
