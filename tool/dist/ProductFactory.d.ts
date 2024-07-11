import { Signer, ethers } from "ethers";
import { ChainId } from "./types";
export declare class ProductFactory {
    private signer;
    private chainId;
    private instance;
    constructor({ signer, chainId, address, }: {
        signer: Signer;
        chainId: ChainId;
        address: string;
    });
    createProduct({ productImpl, name, symbol, baseTokenURI, }: {
        productImpl: string;
        name: string;
        symbol: string;
        baseTokenURI: string;
    }): Promise<string>;
    createDevices({ product, devices, }: {
        product: string;
        devices: string[];
    }): Promise<void>;
    createActivatedDevices({ product, devices, receivers, }: {
        product: string;
        devices: string[];
        receivers: string[];
    }): Promise<void>;
    activateDevice({ receiver, product, devicePrivatekey, }: {
        receiver?: string;
        product: string;
        devicePrivatekey: string;
    }): Promise<void>;
    getVendorByProduct(product: string): Promise<string>;
    getDeviceTokenId({ product, device, }: {
        product: string;
        device: string;
    }): Promise<ethers.BigNumber>;
    private _generateActivateDeviceSignature;
}
