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
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command("deploy-vendor", "Deploy vendor contract", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    productFactory: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Run `forge build --contracts ./templates`
    (0, child_process_1.execSync)("forge build --contracts ./templates");
    // Step 2: Read ABI and bytecode from `./out/Vendor.sol/Vendor.json`
    const vendorArtifactPath = path_1.default.resolve(__dirname, "../../out/Vendor.sol/Vendor.json");
    const vendorArtifact = JSON.parse(fs_1.default.readFileSync(vendorArtifactPath, "utf-8"));
    // Step 3: Deploy contract with your wallet
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc));
    const factory = new ethers_1.ContractFactory(vendorArtifact.abi, vendorArtifact.bytecode.object, wallet);
    const contract = yield factory.deploy(wallet.address, args.productFactory);
    console.log("contract deploying...");
    yield contract.deployed();
    console.log(`Vendor contract deployed at ${contract.address}`);
    // Step 4: Write deployed contract address to `./templates/tmp/address.json`
    const addressPath = path_1.default.resolve(__dirname, "../../templates/tmp/address.json");
    const addressDir = path_1.default.dirname(addressPath);
    if (!fs_1.default.existsSync(addressDir)) {
        fs_1.default.mkdirSync(addressDir, { recursive: true });
    }
    fs_1.default.writeFileSync(addressPath, JSON.stringify({ Vendor: contract.address }, null, 2));
    console.log(`Vendor contract address stored in ./templates/tmp/address.json`);
}))
    .command("create-product", "Create a new product", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: false },
    productImpl: { type: "string", demandOption: true },
    name: { type: "string", demandOption: true },
    symbol: { type: "string", demandOption: true },
    baseTokenURI: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // If vendor is not provided, read it from address.json
    let vendorAddress = args.vendor;
    if (!vendorAddress) {
        const addressPath = path_1.default.resolve(__dirname, "../../templates/tmp/address.json");
        if (!fs_1.default.existsSync(addressPath)) {
            throw new Error("Vendor address not provided and address.json not found");
        }
        const addressJson = JSON.parse(fs_1.default.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
            throw new Error("Vendor address not found in address.json");
        }
    }
    const contract = generated_1.Vendor__factory.connect(vendorAddress, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.createProduct(args.productImpl, args.name, args.symbol, args.baseTokenURI);
    console.log("tx hash:", tx.hash);
    const receipt = yield tx.wait();
    const targetEvents = (_a = receipt.events) === null || _a === void 0 ? void 0 : _a.filter((e) => e.topics[0] ===
        "0x0d516d8b14b989f8763b7f1b93e8e08f0f5ff06e0b833b8d080f0f1f33f9f302");
    if (!targetEvents ||
        targetEvents.length === 0 ||
        !targetEvents[0].topics) {
        throw new Error("Filter ProductCreated event failed");
    }
    const product = ethers_1.ethers.utils.getAddress("0x" + targetEvents[0].topics[3].slice(26));
    console.log("product created:", product);
}))
    .command("register-device", "Register a new device", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: false },
    product: { type: "string", demandOption: true },
    device: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // If vendor is not provided, read it from address.json
    let vendorAddress = args.vendor;
    if (!vendorAddress) {
        const addressPath = path_1.default.resolve(__dirname, "../../templates/tmp/address.json");
        if (!fs_1.default.existsSync(addressPath)) {
            throw new Error("Vendor address not provided and address.json not found");
        }
        const addressJson = JSON.parse(fs_1.default.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
            throw new Error("Vendor address not found in address.json");
        }
    }
    const contract = generated_1.Vendor__factory.connect(vendorAddress, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.registerDevice(args.product, args.device);
    console.log("tx hash:", tx.hash);
    yield tx.wait();
    console.log("device registered");
}))
    .command("register-devices", "Register multiple devices", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: false },
    product: { type: "string", demandOption: true },
    devices: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // If vendor is not provided, read it from address.json
    let vendorAddress = args.vendor;
    if (!vendorAddress) {
        const addressPath = path_1.default.resolve(__dirname, "../../templates/tmp/address.json");
        if (!fs_1.default.existsSync(addressPath)) {
            throw new Error("Vendor address not provided and address.json not found");
        }
        const addressJson = JSON.parse(fs_1.default.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
            throw new Error("Vendor address not found in address.json");
        }
    }
    const contract = generated_1.Vendor__factory.connect(vendorAddress, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.registerDevices(args.product, args.devices.split(","));
    console.log("tx hash:", tx.hash);
    yield tx.wait();
    console.log("devices registered");
}))
    .command("activate-device", "Activate a device", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: false },
    product: { type: "string", demandOption: true },
    device: { type: "string", demandOption: true },
    customChallenge: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // If vendor is not provided, read it from address.json
    let vendorAddress = args.vendor;
    if (!vendorAddress) {
        const addressPath = path_1.default.resolve(__dirname, "../../templates/tmp/address.json");
        if (!fs_1.default.existsSync(addressPath)) {
            throw new Error("Vendor address not provided and address.json not found");
        }
        const addressJson = JSON.parse(fs_1.default.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
            throw new Error("Vendor address not found in address.json");
        }
    }
    const contract = generated_1.Vendor__factory.connect(vendorAddress, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.activateDevice(args.product, args.device, args.customChallenge);
    console.log("tx hash:", tx.hash);
    yield tx.wait();
    console.log("device activated");
}))
    .command("create-activated-device", "Create a activated device", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: false },
    product: { type: "string", demandOption: true },
    device: { type: "string", demandOption: true },
    receiver: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // If vendor is not provided, read it from address.json
    let vendorAddress = args.vendor;
    if (!vendorAddress) {
        const addressPath = path_1.default.resolve(__dirname, "../../templates/tmp/address.json");
        if (!fs_1.default.existsSync(addressPath)) {
            throw new Error("Vendor address not provided and address.json not found");
        }
        const addressJson = JSON.parse(fs_1.default.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
            throw new Error("Vendor address not found in address.json");
        }
    }
    const contract = generated_1.Vendor__factory.connect(vendorAddress, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.createActivatedDevice(args.product, args.device, args.receiver);
    console.log("tx hash:", tx.hash);
    yield tx.wait();
    console.log("activated device created");
}))
    .command("create-activated-devices", "Create multiple activated devices", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: false },
    product: { type: "string", demandOption: true },
    devices: { type: "string", demandOption: true },
    receivers: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // If vendor is not provided, read it from address.json
    let vendorAddress = args.vendor;
    if (!vendorAddress) {
        const addressPath = path_1.default.resolve(__dirname, "../../templates/tmp/address.json");
        if (!fs_1.default.existsSync(addressPath)) {
            throw new Error("Vendor address not provided and address.json not found");
        }
        const addressJson = JSON.parse(fs_1.default.readFileSync(addressPath, "utf-8"));
        vendorAddress = addressJson.Vendor;
        if (!vendorAddress) {
            throw new Error("Vendor address not found in address.json");
        }
    }
    const contract = generated_1.Vendor__factory.connect(vendorAddress, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.createActivatedDevices(args.product, args.devices.split(","), args.receivers.split(","));
    console.log("tx hash:", tx.hash);
    yield tx.wait();
    console.log("activated devices created");
}))
    .help().argv;
