import {
  ProductFactory as ProductFactoryRaw,
  ProductFactory__factory,
} from "./typechain";
import { Signer, Wallet, ethers } from "ethers";
import { ChainId } from "./types";
import { oneDayLater } from "./utils/timestamp";

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

  public async createProduct({
    productImpl,
    name,
    symbol,
    baseTokenURI,
  }: {
    productImpl: string;
    name: string;
    symbol: string;
    baseTokenURI: string;
  }) {
    const args: ProductFactoryRaw.CreateProductArgsStruct = {
      productImpl,
      name,
      symbol,
      baseTokenURI,
    };
    const tx = await this.instance.createProduct(args);
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

  public async createDevices({
    product,
    devices,
  }: {
    product: string;
    devices: string[];
  }) {
    const vendor = await this.getVendorByProduct(product);
    if (vendor !== (await this.signer.getAddress())) {
      throw new Error("Signer not product vendor");
    }
    const args: ProductFactoryRaw.CreateDevicesArgsStruct = {
      product,
      devices,
    };
    const tx = await this.instance.createDevices(args);
    await tx.wait();
  }

  public async createActivatedDevices({
    product,
    devices,
    receivers,
  }: {
    product: string;
    devices: string[];
    receivers: string[];
  }) {
    const vendor = await this.getVendorByProduct(product);
    if (vendor !== (await this.signer.getAddress())) {
      throw new Error("Signer not product vendor");
    }
    const args: ProductFactoryRaw.CreateActivatedDevicesArgsStruct = {
      product,
      devices,
      receivers,
    };
    const tx = await this.instance.createActivatedDevices(args);
    await tx.wait();
  }

  public async activateDevice({
    receiver,
    product,
    devicePrivatekey,
  }: {
    receiver?: string;
    product: string;
    devicePrivatekey: string;
  }) {
    if (!receiver) {
      receiver = await this.signer.getAddress();
    }
    const deviceWallet = new ethers.Wallet(devicePrivatekey);
    const tokenId = await this.getDeviceTokenId({
      product,
      device: deviceWallet.address,
    });
    const args: ProductFactoryRaw.ActivateDeviceArgsStruct = {
      receiver,
      product,
      tokenId,
    };
    const signature = await this._generateActivateDeviceSignature({
      wallet: deviceWallet,
      product,
    });
    const tx = await this.instance.activateDevice(args, signature);
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

  private async _generateActivateDeviceSignature({
    wallet,
    product,
  }: {
    wallet: Wallet;
    product: string;
  }) {
    const { name, version } = await this.instance.eip712Domain();
    const deadline = oneDayLater();

    const msgParams = {
      types: {
        ActivateDevice: [
          { name: "product", type: "address" },
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
        product,
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

    const sig: ProductFactoryRaw.EIP712SignatureStruct = {
      signer: await wallet.getAddress(),
      v,
      r,
      s,
      deadline,
    };

    return sig;
  }
}
