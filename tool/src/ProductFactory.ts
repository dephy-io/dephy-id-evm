import {
  IProductFactory,
  ProductFactory__factory,
} from "./generated";
import { ContractTransaction, Signer, Wallet, ethers } from "ethers";
import { ChainId } from "./types";
import { oneDayLater, oneHourLater } from "./utils/timestamp";

export class ProductFactory {
  private signer: Signer;
  private chainId: ChainId;
  private instance;

  constructor({
    signer,
    chainId,
    address,
  }: {
    signer: Signer;
    chainId: ChainId;
    address: string;
  }) {
    this.signer = signer;
    this.chainId = chainId;
    this.instance = ProductFactory__factory.connect(address, signer);
  }

  public async createProduct(
    {
      productImpl,
      name,
      symbol,
      baseTokenURI,
    }: {
      productImpl: string;
      name: string;
      symbol: string;
      baseTokenURI: string;
    },
    onPending?: (tx: ContractTransaction) => void
  ) {
    const args: IProductFactory.CreateProductArgsStruct = {
      productImpl,
      name,
      symbol,
      baseTokenURI,
    };
    const tx = await this.instance.createProduct(args);
    if (onPending) {
      onPending(tx);
    }
    const receipt = await tx.wait();
    const targetEvents = receipt.events?.filter(
      (e) => e.event === "ProductCreated"
    );
    if (!targetEvents || targetEvents.length === 0 || !targetEvents[0].args) {
      throw new Error("Filter ProductCreated event failed");
    }
    const product: string = targetEvents[0].args[2];
    return product;
  }

  public async createDevices(
    {
      product,
      devices,
    }: {
      product: string;
      devices: string[];
    },
    onPending?: (tx: ContractTransaction) => void
  ) {
    const vendor = await this.getVendorByProduct(product);
    if (vendor !== (await this.signer.getAddress())) {
      throw new Error("Signer not product vendor");
    }
    const args: IProductFactory.CreateDevicesArgsStruct = {
      product,
      devices,
    };
    const tx = await this.instance.createDevices(args);
    if (onPending) {
      onPending(tx);
    }
    await tx.wait();
  }

  public async createActivatedDevices(
    {
      product,
      devices,
      receivers,
    }: {
      product: string;
      devices: string[];
      receivers: string[];
    },
    onPending?: (tx: ContractTransaction) => void
  ) {
    const vendor = await this.getVendorByProduct(product);
    if (vendor !== (await this.signer.getAddress())) {
      throw new Error("Signer not product vendor");
    }
    const args: IProductFactory.CreateActivatedDevicesArgsStruct = {
      product,
      devices,
      receivers,
    };
    const tx = await this.instance.createActivatedDevices(args);
    if (onPending) {
      onPending(tx);
    }
    await tx.wait();
  }

  public async activateDevice(
    {
      product,
      devicePrivatekey,
    }: {
      product: string;
      devicePrivatekey: string;
    },
    onPending?: (tx: ContractTransaction) => void
  ) {
    const deviceWallet = new ethers.Wallet(devicePrivatekey);
    const deviceSignedParams = await this._generateDeviceSignature(
      deviceWallet
    );
    const activateDeviceArgs: IProductFactory.ActivateDeviceArgsStruct = {
      product,
      device: deviceWallet.address,
      ...deviceSignedParams,
    };

    const signature = await this._generateActivateDeviceSignature({
      wallet: this.signer as Wallet,
      activateDeviceArgs,
    });
    const tx = await this.instance.activateDevice(
      activateDeviceArgs,
      signature
    );
    if (onPending) {
      onPending(tx);
    }
    await tx.wait();
  }

  public async getVendorByProduct(product: string) {
    return this.instance.getVendorByProduct(product);
  }

  public async getDeviceTokenId({
    product,
    device,
  }: {
    product: string;
    device: string;
  }) {
    return this.instance.getDeviceTokenId(product, device);
  }

  private async _generateDeviceSignature(wallet: Wallet) {
    const deviceDeadline = oneHourLater();

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

    return {
      deviceDeadline,
      deviceSignature,
    };
  }

  private async _generateActivateDeviceSignature({
    wallet,
    activateDeviceArgs,
  }: {
    wallet: Wallet;
    activateDeviceArgs: IProductFactory.ActivateDeviceArgsStruct;
  }) {
    const { name, version } = await this.instance.eip712Domain();
    const deadline = oneDayLater();

    const msgParams = {
      types: {
        ActivateDevice: [
          { name: "product", type: "address" },
          { name: "device", type: "address" },
          { name: "deviceSignature", type: "bytes" },
          { name: "deviceDeadline", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      },
      domain: {
        name,
        version,
        chainId: this.chainId,
        verifyingContract: this.instance.address,
      },
      value: {
        product: activateDeviceArgs.product,
        device: activateDeviceArgs.device,
        deviceSignature: activateDeviceArgs.deviceSignature,
        deviceDeadline: activateDeviceArgs.deviceDeadline,
        deadline,
      },
    };

    const { v, r, s } = ethers.utils.splitSignature(
      await wallet._signTypedData(
        msgParams.domain,
        msgParams.types,
        msgParams.value
      )
    );

    const sig: IProductFactory.EIP712SignatureStruct = {
      signer: await wallet.getAddress(),
      v,
      r,
      s,
      deadline,
    };

    return sig;
  }
}
