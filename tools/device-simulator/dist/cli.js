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
// Function to write JSON data to a file
function writeJsonToFile(filePath, data) {
    fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
// Define the paths for the private key and signature files relative to the current working directory
const tmpDir = path_1.default.resolve(process.cwd(), "./tmp");
const privateKeyFilePath = path_1.default.join(tmpDir, "privatekey.json");
const signatureFilePath = path_1.default.join(tmpDir, "signature.json");
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .command("create", "Create a new private key and save it to a file. If a private key already exists, the command will exit with a message.", () => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the tmp directory exists
    if (!fs_1.default.existsSync(tmpDir)) {
        fs_1.default.mkdirSync(tmpDir);
    }
    // Check if the private key file already exists
    if (fs_1.default.existsSync(privateKeyFilePath)) {
        console.log("A private key already exists in ./tmp/privatekey.json. Exiting without creating a new key.");
        process.exit(1);
    }
    // Generate a new private key
    const wallet = ethers_1.ethers.Wallet.createRandom();
    const privateKeyData = {
        privateKey: wallet.privateKey,
        address: wallet.address,
    };
    // Write the private key to the file
    writeJsonToFile(privateKeyFilePath, privateKeyData);
    console.log("A new private key has been created and saved to:", privateKeyFilePath);
}))
    .command("sign", "Sign a message using the existing private key. The signature and the message expiration time will be saved to a file.", {
    expiration: {
        type: "number",
        demandOption: false,
        description: "The expiration time for the message signature in seconds. Defaults to 3600 seconds (1 hour).",
    },
}, (args) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure the tmp directory exists
    if (!fs_1.default.existsSync(tmpDir)) {
        fs_1.default.mkdirSync(tmpDir);
    }
    // Check if the private key file exists
    if (!fs_1.default.existsSync(privateKeyFilePath)) {
        console.log("No private key found. Please create a private key first using the 'create' command.");
        process.exit(1);
    }
    // Read the private key from the file
    const privateKeyData = JSON.parse(fs_1.default.readFileSync(privateKeyFilePath, "utf-8"));
    const wallet = new ethers_1.ethers.Wallet(privateKeyData.privateKey);
    // Set default expiration time if not provided
    if (!args.expiration) {
        args.expiration = 3600;
    }
    // Calculate the device deadline
    const deviceDeadline = (Math.floor(Date.now() / 1000) + args.expiration).toString();
    // Hash the message
    const hashedMessage = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.defaultAbiCoder.encode(["uint256"], [deviceDeadline]));
    const digest = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.solidityPack(["string", "bytes32"], ["DEPHY_ID_SIGNED_MESSAGE:", hashedMessage]));
    const { v, r, s } = wallet._signingKey().signDigest(digest);
    const deviceSignature = ethers_1.ethers.utils.solidityPack(["bytes32", "bytes32", "uint8"], [r, s, v]);
    const signatureData = {
        deviceSignature,
        deviceDeadline,
    };
    writeJsonToFile(signatureFilePath, signatureData);
    console.log("The message has been signed and the signature has been saved to:", signatureFilePath);
}))
    .help().argv;
