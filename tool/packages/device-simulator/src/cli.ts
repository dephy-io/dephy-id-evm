import { ethers } from "ethers";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";

// Function to write JSON data to a file
function writeJsonToFile(filePath: string, data: object) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Define the paths for the private key and signature files relative to the current working directory
const tmpDir = path.resolve(process.cwd(), "./tmp");
const privateKeyFilePath = path.join(tmpDir, "privatekey.json");
const signatureFilePath = path.join(tmpDir, "signature.json");

yargs(hideBin(process.argv))
  .command(
    "create",
    "Create a new private key and save it to a file. If a private key already exists, the command will exit with a message.",
    async () => {
      // Ensure the tmp directory exists
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }

      // Check if the private key file already exists
      if (fs.existsSync(privateKeyFilePath)) {
        console.log(
          "A private key already exists in ./tmp/privatekey.json. Exiting without creating a new key."
        );
        process.exit(1);
      }

      // Generate a new private key
      const wallet = ethers.Wallet.createRandom();
      const privateKeyData = {
        privateKey: wallet.privateKey,
        address: wallet.address,
      };

      // Write the private key to the file
      writeJsonToFile(privateKeyFilePath, privateKeyData);
      console.log(
        "A new private key has been created and saved to:",
        privateKeyFilePath
      );
    }
  )
  .command(
    "sign",
    "Sign a message using the existing private key. The signature and the message expiration time will be saved to a file.",
    {
      expiration: {
        type: "number",
        demandOption: false,
        description:
          "The expiration time for the message signature in seconds. Defaults to 3600 seconds (1 hour).",
      },
    },
    async (args) => {
      // Ensure the tmp directory exists
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }

      // Check if the private key file exists
      if (!fs.existsSync(privateKeyFilePath)) {
        console.log(
          "No private key found. Please create a private key first using the 'create' command."
        );
        process.exit(1);
      }

      // Read the private key from the file
      const privateKeyData = JSON.parse(
        fs.readFileSync(privateKeyFilePath, "utf-8")
      );
      const wallet = new ethers.Wallet(privateKeyData.privateKey);

      // Set default expiration time if not provided
      if (!args.expiration) {
        args.expiration = 3600;
      }

      // Calculate the device deadline
      const deviceDeadline = (
        Math.floor(Date.now() / 1000) + args.expiration
      ).toString();

      // Hash the message
      const hashedMessage = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(["uint256"], [deviceDeadline])
      );
      const digest = ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["string", "bytes32"],
          ["DEPHY_ID_SIGNED_MESSAGE:", hashedMessage]
        )
      );

      const { v, r, s } = wallet._signingKey().signDigest(digest);
      const deviceSignature = ethers.utils.solidityPack(
        ["bytes32", "bytes32", "uint8"],
        [r, s, v]
      );

      const signatureData = {
        deviceSignature,
        deviceDeadline,
      };
      writeJsonToFile(signatureFilePath, signatureData);
      console.log(
        "The message has been signed and the signature has been saved to:",
        signatureFilePath
      );
    }
  )
  .help().argv;
