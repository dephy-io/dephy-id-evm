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
yargs_1.default
    .command("create-product", "Create a new product", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: true },
    productImpl: { type: "string", demandOption: true },
    name: { type: "string", demandOption: true },
    symbol: { type: "string", demandOption: true },
    baseTokenURI: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const contract = generated_1.Vendor__factory.connect(args.vendor, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
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
    vendor: { type: "string", demandOption: true },
    product: { type: "string", demandOption: true },
    device: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = generated_1.Vendor__factory.connect(args.vendor, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.registerDevice(args.product, args.device);
    console.log("tx hash:", tx.hash);
    yield tx.wait();
    console.log("device registered");
}))
    .command("register-devices", "Register multiple devices", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: true },
    product: { type: "string", demandOption: true },
    devices: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = generated_1.Vendor__factory.connect(args.vendor, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.registerDevices(args.product, args.devices.split(','));
    console.log("tx hash:", tx.hash);
    yield tx.wait();
    console.log("devices registered");
}))
    .command("activate-device", "Activate a device", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    vendor: { type: "string", demandOption: true },
    product: { type: "string", demandOption: true },
    device: { type: "string", demandOption: true },
    customChallenge: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = generated_1.Vendor__factory.connect(args.vendor, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.activateDevice(args.product, args.device, args.customChallenge);
    console.log("tx hash:", tx.hash);
    yield tx.wait();
    console.log("device activated");
}))
    .help().argv;
