import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace IProductFactory {
    type ActivateDeviceArgsStruct = {
        product: string;
        device: string;
        deviceSignature: BytesLike;
        deviceDeadline: BigNumberish;
    };
    type ActivateDeviceArgsStructOutput = [
        string,
        string,
        string,
        BigNumber
    ] & {
        product: string;
        device: string;
        deviceSignature: string;
        deviceDeadline: BigNumber;
    };
    type EIP712SignatureStruct = {
        signer: string;
        v: BigNumberish;
        r: BytesLike;
        s: BytesLike;
        deadline: BigNumberish;
    };
    type EIP712SignatureStructOutput = [
        string,
        number,
        string,
        string,
        BigNumber
    ] & {
        signer: string;
        v: number;
        r: string;
        s: string;
        deadline: BigNumber;
    };
    type CreateActivatedDeviceArgsStruct = {
        product: string;
        device: string;
        receiver: string;
    };
    type CreateActivatedDeviceArgsStructOutput = [
        string,
        string,
        string
    ] & {
        product: string;
        device: string;
        receiver: string;
    };
    type CreateActivatedDevicesArgsStruct = {
        product: string;
        devices: string[];
        receivers: string[];
    };
    type CreateActivatedDevicesArgsStructOutput = [
        string,
        string[],
        string[]
    ] & {
        product: string;
        devices: string[];
        receivers: string[];
    };
    type CreateDeviceArgsStruct = {
        product: string;
        device: string;
    };
    type CreateDeviceArgsStructOutput = [string, string] & {
        product: string;
        device: string;
    };
    type CreateDevicesArgsStruct = {
        product: string;
        devices: string[];
    };
    type CreateDevicesArgsStructOutput = [string, string[]] & {
        product: string;
        devices: string[];
    };
    type CreateProductArgsStruct = {
        productImpl: string;
        name: string;
        symbol: string;
        baseTokenURI: string;
    };
    type CreateProductArgsStructOutput = [
        string,
        string,
        string,
        string
    ] & {
        productImpl: string;
        name: string;
        symbol: string;
        baseTokenURI: string;
    };
}
export interface IProductFactoryInterface extends utils.Interface {
    functions: {
        "activateDevice((address,address,bytes,uint256),(address,uint8,bytes32,bytes32,uint256))": FunctionFragment;
        "createActivatedDevice((address,address,address))": FunctionFragment;
        "createActivatedDevices((address,address[],address[]))": FunctionFragment;
        "createDevice((address,address))": FunctionFragment;
        "createDevices((address,address[]))": FunctionFragment;
        "createProduct((address,string,string,string))": FunctionFragment;
        "getDeviceTokenId(address,address)": FunctionFragment;
        "getDomainSeparator()": FunctionFragment;
        "getVendorByProduct(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "activateDevice" | "createActivatedDevice" | "createActivatedDevices" | "createDevice" | "createDevices" | "createProduct" | "getDeviceTokenId" | "getDomainSeparator" | "getVendorByProduct"): FunctionFragment;
    encodeFunctionData(functionFragment: "activateDevice", values: [
        IProductFactory.ActivateDeviceArgsStruct,
        IProductFactory.EIP712SignatureStruct
    ]): string;
    encodeFunctionData(functionFragment: "createActivatedDevice", values: [IProductFactory.CreateActivatedDeviceArgsStruct]): string;
    encodeFunctionData(functionFragment: "createActivatedDevices", values: [IProductFactory.CreateActivatedDevicesArgsStruct]): string;
    encodeFunctionData(functionFragment: "createDevice", values: [IProductFactory.CreateDeviceArgsStruct]): string;
    encodeFunctionData(functionFragment: "createDevices", values: [IProductFactory.CreateDevicesArgsStruct]): string;
    encodeFunctionData(functionFragment: "createProduct", values: [IProductFactory.CreateProductArgsStruct]): string;
    encodeFunctionData(functionFragment: "getDeviceTokenId", values: [string, string]): string;
    encodeFunctionData(functionFragment: "getDomainSeparator", values?: undefined): string;
    encodeFunctionData(functionFragment: "getVendorByProduct", values: [string]): string;
    decodeFunctionResult(functionFragment: "activateDevice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createActivatedDevice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createActivatedDevices", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createDevice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createDevices", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createProduct", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDeviceTokenId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDomainSeparator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getVendorByProduct", data: BytesLike): Result;
    events: {
        "DeviceActivated(address,address,address)": EventFragment;
        "DeviceCreated(address,address,uint256)": EventFragment;
        "ProductCreated(address,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "DeviceActivated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DeviceCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProductCreated"): EventFragment;
}
export interface DeviceActivatedEventObject {
    product: string;
    device: string;
    receiver: string;
}
export type DeviceActivatedEvent = TypedEvent<[
    string,
    string,
    string
], DeviceActivatedEventObject>;
export type DeviceActivatedEventFilter = TypedEventFilter<DeviceActivatedEvent>;
export interface DeviceCreatedEventObject {
    product: string;
    device: string;
    tokenId: BigNumber;
}
export type DeviceCreatedEvent = TypedEvent<[
    string,
    string,
    BigNumber
], DeviceCreatedEventObject>;
export type DeviceCreatedEventFilter = TypedEventFilter<DeviceCreatedEvent>;
export interface ProductCreatedEventObject {
    vendor: string;
    productImpl: string;
    product: string;
}
export type ProductCreatedEvent = TypedEvent<[
    string,
    string,
    string
], ProductCreatedEventObject>;
export type ProductCreatedEventFilter = TypedEventFilter<ProductCreatedEvent>;
export interface IProductFactory extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IProductFactoryInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        activateDevice(args: IProductFactory.ActivateDeviceArgsStruct, signature: IProductFactory.EIP712SignatureStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        createActivatedDevice(args: IProductFactory.CreateActivatedDeviceArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        createActivatedDevices(args: IProductFactory.CreateActivatedDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        createDevice(args: IProductFactory.CreateDeviceArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        createDevices(args: IProductFactory.CreateDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        createProduct(args: IProductFactory.CreateProductArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        getDomainSeparator(overrides?: CallOverrides): Promise<[string]>;
        getVendorByProduct(product: string, overrides?: CallOverrides): Promise<[string]>;
    };
    activateDevice(args: IProductFactory.ActivateDeviceArgsStruct, signature: IProductFactory.EIP712SignatureStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    createActivatedDevice(args: IProductFactory.CreateActivatedDeviceArgsStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    createActivatedDevices(args: IProductFactory.CreateActivatedDevicesArgsStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    createDevice(args: IProductFactory.CreateDeviceArgsStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    createDevices(args: IProductFactory.CreateDevicesArgsStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    createProduct(args: IProductFactory.CreateProductArgsStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<BigNumber>;
    getDomainSeparator(overrides?: CallOverrides): Promise<string>;
    getVendorByProduct(product: string, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        activateDevice(args: IProductFactory.ActivateDeviceArgsStruct, signature: IProductFactory.EIP712SignatureStruct, overrides?: CallOverrides): Promise<void>;
        createActivatedDevice(args: IProductFactory.CreateActivatedDeviceArgsStruct, overrides?: CallOverrides): Promise<BigNumber>;
        createActivatedDevices(args: IProductFactory.CreateActivatedDevicesArgsStruct, overrides?: CallOverrides): Promise<void>;
        createDevice(args: IProductFactory.CreateDeviceArgsStruct, overrides?: CallOverrides): Promise<void>;
        createDevices(args: IProductFactory.CreateDevicesArgsStruct, overrides?: CallOverrides): Promise<void>;
        createProduct(args: IProductFactory.CreateProductArgsStruct, overrides?: CallOverrides): Promise<string>;
        getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<BigNumber>;
        getDomainSeparator(overrides?: CallOverrides): Promise<string>;
        getVendorByProduct(product: string, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "DeviceActivated(address,address,address)"(product?: string | null, device?: string | null, receiver?: null): DeviceActivatedEventFilter;
        DeviceActivated(product?: string | null, device?: string | null, receiver?: null): DeviceActivatedEventFilter;
        "DeviceCreated(address,address,uint256)"(product?: string | null, device?: string | null, tokenId?: BigNumberish | null): DeviceCreatedEventFilter;
        DeviceCreated(product?: string | null, device?: string | null, tokenId?: BigNumberish | null): DeviceCreatedEventFilter;
        "ProductCreated(address,address,address)"(vendor?: string | null, productImpl?: string | null, product?: string | null): ProductCreatedEventFilter;
        ProductCreated(vendor?: string | null, productImpl?: string | null, product?: string | null): ProductCreatedEventFilter;
    };
    estimateGas: {
        activateDevice(args: IProductFactory.ActivateDeviceArgsStruct, signature: IProductFactory.EIP712SignatureStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        createActivatedDevice(args: IProductFactory.CreateActivatedDeviceArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        createActivatedDevices(args: IProductFactory.CreateActivatedDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        createDevice(args: IProductFactory.CreateDeviceArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        createDevices(args: IProductFactory.CreateDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        createProduct(args: IProductFactory.CreateProductArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<BigNumber>;
        getDomainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
        getVendorByProduct(product: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        activateDevice(args: IProductFactory.ActivateDeviceArgsStruct, signature: IProductFactory.EIP712SignatureStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        createActivatedDevice(args: IProductFactory.CreateActivatedDeviceArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        createActivatedDevices(args: IProductFactory.CreateActivatedDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        createDevice(args: IProductFactory.CreateDeviceArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        createDevices(args: IProductFactory.CreateDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        createProduct(args: IProductFactory.CreateProductArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDomainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getVendorByProduct(product: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
