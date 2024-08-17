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
const generated_1 = require("./generated");
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const addressFilePath = path_1.default.resolve(process.cwd(), "./tmp/address.json");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command("deploy", "Deploy public vendor contract", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    productFactory: { type: "string", demandOption: true },
    productImpl: { type: "string", demandOption: true },
    name: { type: "string", demandOption: true },
    symbol: { type: "string", demandOption: true },
    baseTokenURI: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Run `forge build --contracts ./examples/public-vendor -o ./examples/public-vendor/out`
    (0, child_process_1.execSync)("forge build --contracts ./examples/public-vendor -o ./examples/public-vendor/out");
    // Step 2: Read ABI and bytecode from `./out/PublicVendor.sol/PublicVendor.json`
    const vendorArtifactPath = path_1.default.resolve(__dirname, "./out/PublicVendor.sol/PublicVendor.json");
    const vendorArtifact = JSON.parse(fs_1.default.readFileSync(vendorArtifactPath, "utf-8"));
    // Step 3: Deploy contract with your wallet
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc));
    const factory = new ethers_1.ContractFactory(vendorArtifact.abi, vendorArtifact.bytecode.object, wallet);
    const contract = yield factory.deploy(args.productFactory, args.productImpl, args.name, args.symbol, args.baseTokenURI);
    console.log("contract deploying...");
    yield contract.deployed();
    console.log(`PublicVendor contract deployed at ${contract.address}`);
    // Step 4: Write deployed contract address to `./tmp/address.json`
    const addressDir = path_1.default.dirname(addressFilePath);
    if (!fs_1.default.existsSync(addressDir)) {
        fs_1.default.mkdirSync(addressDir, { recursive: true });
    }
    fs_1.default.writeFileSync(addressFilePath, JSON.stringify({ PublicVendor: contract.address }, null, 2));
    console.log(`PublicVendor contract address stored in ./tmp/address.json`);
}))
    .command("create-activated-device", "Create a activated device", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: false },
    device: { type: "string", demandOption: true },
    receiver: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // If vendor is not provided, read it from address.json
    let vendorAddress = args.vendor;
    if (!vendorAddress) {
        if (!fs_1.default.existsSync(addressFilePath)) {
            throw new Error("PublicVendor address not provided and address.json not found");
        }
        const addressJson = JSON.parse(fs_1.default.readFileSync(addressFilePath, "utf-8"));
        vendorAddress = addressJson.PublicVendor;
        if (!vendorAddress) {
            throw new Error("PublicVendor address not found in address.json");
        }
    }
    const contract = generated_1.PublicVendor__factory.connect(vendorAddress, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.createActivatedDevice(args.device, args.receiver);
    console.log("tx hash:", tx.hash);
    yield tx.wait();
    console.log("activated device created");
}))
    .command("create-activated-devices", "Create multiple activated devices", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: false },
    devices: { type: "string", demandOption: true },
    receivers: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // If vendor is not provided, read it from address.json
    let vendorAddress = args.vendor;
    if (!vendorAddress) {
        if (!fs_1.default.existsSync(addressFilePath)) {
            throw new Error("PublicVendor address not provided and address.json not found");
        }
        const addressJson = JSON.parse(fs_1.default.readFileSync(addressFilePath, "utf-8"));
        vendorAddress = addressJson.PublicVendor;
        if (!vendorAddress) {
            throw new Error("PublicVendor address not found in address.json");
        }
    }
    const contract = generated_1.PublicVendor__factory.connect(vendorAddress, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.createActivatedDevices(args.devices.split(","), args.receivers.split(","));
    console.log("tx hash:", tx.hash);
    yield tx.wait();
    console.log("activated devices created");
}))
    .help().argv;
