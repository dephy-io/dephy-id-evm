import { ContractTransaction, Signer, ethers } from "ethers";
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
    }, onPending?: (tx: ContractTransaction) => void): Promise<string>;
    createDevices({ product, devices, }: {
        product: string;
        devices: string[];
    }, onPending?: (tx: ContractTransaction) => void): Promise<void>;
    createActivatedDevices({ product, devices, receivers, }: {
        product: string;
        devices: string[];
        receivers: string[];
    }, onPending?: (tx: ContractTransaction) => void): Promise<void>;
    activateDevice({ product, devicePrivatekey, }: {
        product: string;
        devicePrivatekey: string;
    }, onPending?: (tx: ContractTransaction) => void): Promise<void>;
    getVendorByProduct(product: string): Promise<string>;
    getDeviceTokenId({ product, device, }: {
        product: string;
        device: string;
    }): Promise<ethers.BigNumber>;
    private _generateDeviceSignature;
    private _generateActivateDeviceSignature;
}
