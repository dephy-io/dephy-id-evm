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
const generated_1 = require("../generated");
const yargs_1 = __importDefault(require("yargs"));
class Vendor {
    constructor({ rpc, vendorAddress, vendorPrivatekey, }) {
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpc);
        this.signer = new ethers_1.ethers.Wallet(vendorPrivatekey, provider);
        this.instance = generated_1.Vendor__factory.connect(vendorAddress, this.signer);
    }
    createProduct(productImpl, name, symbol, baseTokenURI) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.instance.createProduct(productImpl, name, symbol, baseTokenURI);
            yield tx.wait();
            console.log("Product created:", tx.hash);
        });
    }
    registerDevice(product, device) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.instance.registerDevice(product, device);
            yield tx.wait();
            console.log("Device registered:", tx.hash);
        });
    }
    registerDevices(product, devices) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.instance.registerDevices(product, devices);
            yield tx.wait();
            console.log("Devices registered:", tx.hash);
        });
    }
    activateDevice(product, device, customChallenge) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield this.instance.activateDevice(product, device, ethers_1.ethers.utils.arrayify(customChallenge));
            yield tx.wait();
            console.log("Device activated:", tx.hash);
        });
    }
}
const argv = yargs_1.default
    .command("createProduct", "Create a new product", {
    rpc: { type: "string", demandOption: true },
    vendorAddress: { type: "string", demandOption: true },
    vendorPrivatekey: { type: "string", demandOption: true },
    productImpl: { type: "string", demandOption: true },
    name: { type: "string", demandOption: true },
    symbol: { type: "string", demandOption: true },
    baseTokenURI: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = new Vendor(args);
    yield vendor.createProduct(args.productImpl, args.name, args.symbol, args.baseTokenURI);
}))
    .command("registerDevice", "Register a new device", {
    rpc: { type: "string", demandOption: true },
    vendorAddress: { type: "string", demandOption: true },
    vendorPrivatekey: { type: "string", demandOption: true },
    product: { type: "string", demandOption: true },
    device: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = new Vendor(args);
    yield vendor.registerDevice(args.product, args.device);
}))
    .command("registerDevices", "Register multiple devices", {
    rpc: { type: "string", demandOption: true },
    vendorAddress: { type: "string", demandOption: true },
    vendorPrivatekey: { type: "string", demandOption: true },
    product: { type: "string", demandOption: true },
    devices: { type: "array", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = new Vendor(args);
    yield vendor.registerDevices(args.product, args.devices);
}))
    .command("activateDevice", "Activate a device", {
    rpc: { type: "string", demandOption: true },
    vendorAddress: { type: "string", demandOption: true },
    vendorPrivatekey: { type: "string", demandOption: true },
    product: { type: "string", demandOption: true },
    device: { type: "string", demandOption: true },
    customChallenge: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = new Vendor(args);
    yield vendor.activateDevice(args.product, args.device, args.customChallenge);
}))
    .help().argv;
