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
function updateAddressFile(newData) {
    let existingData = {};
    if (fs_1.default.existsSync(addressFilePath)) {
        existingData = JSON.parse(fs_1.default.readFileSync(addressFilePath, "utf-8"));
    }
    const updatedData = Object.assign(Object.assign({}, existingData), newData);
    fs_1.default.writeFileSync(addressFilePath, JSON.stringify(updatedData, null, 2));
}
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command("deploy-application-factory", "Deploy ApplicationFactory contract", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    productFactory: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    (0, child_process_1.execSync)("forge build --contracts ./extensions/access -o ./extensions/access/out");
    const factoryArtifactPath = path_1.default.resolve(__dirname, "../out/ApplicationFactory.sol/ApplicationFactory.json");
    const factoryArtifact = JSON.parse(fs_1.default.readFileSync(factoryArtifactPath, "utf-8"));
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc));
    const factory = new ethers_1.ContractFactory(factoryArtifact.abi, factoryArtifact.bytecode.object, wallet);
    const contract = yield factory.deploy(args.productFactory);
    console.log("contract deploying...");
    yield contract.deployed();
    console.log(`ApplicationFactory contract deployed at ${contract.address}`);
    updateAddressFile({ ApplicationFactory: contract.address });
    console.log(`ApplicationFactory contract address stored in ./tmp/address.json`);
}))
    .command("deploy-application-impl", "Deploy ApplicationImpl contract", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    (0, child_process_1.execSync)("forge build --contracts ./extensions/access -o ./extensions/access/out");
    const implArtifactPath = path_1.default.resolve(__dirname, "../out/Application.sol/Application.json");
    const implArtifact = JSON.parse(fs_1.default.readFileSync(implArtifactPath, "utf-8"));
    const wallet = new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc));
    const factory = new ethers_1.ContractFactory(implArtifact.abi, implArtifact.bytecode.object, wallet);
    const contract = yield factory.deploy();
    console.log("contract deploying...");
    yield contract.deployed();
    console.log(`ApplicationImpl contract deployed at ${contract.address}`);
    updateAddressFile({ ApplicationImpl: contract.address });
    console.log(`ApplicationImpl contract address stored in ./tmp/address.json`);
}))
    .command("create-application", "Create Application for accessing", {
    rpc: { type: "string", demandOption: true },
    privatekey: { type: "string", demandOption: true },
    applicationFactory: { type: "string", demandOption: false },
    applicationImpl: { type: "string", demandOption: false },
    name: { type: "string", demandOption: true },
    symbol: { type: "string", demandOption: true },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let applicationFactoryAddress = args.applicationFactory;
    let applicationImplAddress = args.applicationImpl;
    if (!fs_1.default.existsSync(addressFilePath)) {
        throw new Error("Address file not found, please deploy contracts first.");
    }
    const addressJson = JSON.parse(fs_1.default.readFileSync(addressFilePath, "utf-8"));
    if (!applicationFactoryAddress) {
        applicationFactoryAddress = addressJson.ApplicationFactory;
        if (!applicationFactoryAddress) {
            throw new Error("ApplicationFactory address not found in ./tmp/address.json");
        }
    }
    if (!applicationImplAddress) {
        applicationImplAddress = addressJson.ApplicationImpl;
        if (!applicationImplAddress) {
            throw new Error("ApplicationImpl address not found in ./tmp/address.json");
        }
    }
    const contract = generated_1.ApplicationFactory__factory.connect(applicationFactoryAddress, new ethers_1.ethers.Wallet(args.privatekey, new ethers_1.ethers.providers.JsonRpcProvider(args.rpc)));
    const tx = yield contract.createApplication(applicationImplAddress, args.name, args.symbol);
    console.log("tx hash:", tx.hash);
    const receipt = yield tx.wait();
    const targetEvents = (_a = receipt.events) === null || _a === void 0 ? void 0 : _a.filter((e) => e.event === "ApplicationCreated");
    if (!targetEvents || targetEvents.length === 0 || !targetEvents[0].args) {
        throw new Error("Filter ApplicationCreated event failed");
    }
    const application = targetEvents[0].args[2];
    console.log(`Application <${args.name}> created: ${application}`);
}))
    .help().argv;
