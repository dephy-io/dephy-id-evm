import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace ProductFactory {
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
export interface ProductFactoryInterface extends utils.Interface {
    functions: {
        "ACTIVATE_DEVICE_TYPEHASH()": FunctionFragment;
        "activateDevice((address,address,bytes,uint256),(address,uint8,bytes32,bytes32,uint256))": FunctionFragment;
        "createActivatedDevices((address,address[],address[]))": FunctionFragment;
        "createDevices((address,address[]))": FunctionFragment;
        "createProduct((address,string,string,string))": FunctionFragment;
        "eip712Domain()": FunctionFragment;
        "getDeviceTokenId(address,address)": FunctionFragment;
        "getDomainSeparator()": FunctionFragment;
        "getVendorByProduct(address)": FunctionFragment;
        "owner()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ACTIVATE_DEVICE_TYPEHASH" | "activateDevice" | "createActivatedDevices" | "createDevices" | "createProduct" | "eip712Domain" | "getDeviceTokenId" | "getDomainSeparator" | "getVendorByProduct" | "owner" | "renounceOwnership" | "transferOwnership"): FunctionFragment;
    encodeFunctionData(functionFragment: "ACTIVATE_DEVICE_TYPEHASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "activateDevice", values: [
        ProductFactory.ActivateDeviceArgsStruct,
        ProductFactory.EIP712SignatureStruct
    ]): string;
    encodeFunctionData(functionFragment: "createActivatedDevices", values: [ProductFactory.CreateActivatedDevicesArgsStruct]): string;
    encodeFunctionData(functionFragment: "createDevices", values: [ProductFactory.CreateDevicesArgsStruct]): string;
    encodeFunctionData(functionFragment: "createProduct", values: [ProductFactory.CreateProductArgsStruct]): string;
    encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
    encodeFunctionData(functionFragment: "getDeviceTokenId", values: [string, string]): string;
    encodeFunctionData(functionFragment: "getDomainSeparator", values?: undefined): string;
    encodeFunctionData(functionFragment: "getVendorByProduct", values: [string]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    decodeFunctionResult(functionFragment: "ACTIVATE_DEVICE_TYPEHASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "activateDevice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createActivatedDevices", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createDevices", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createProduct", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDeviceTokenId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDomainSeparator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getVendorByProduct", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "DeviceActivated(address,address)": EventFragment;
        "DeviceCreated(address,address,uint256)": EventFragment;
        "EIP712DomainChanged()": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "ProductCreated(address,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "DeviceActivated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DeviceCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProductCreated"): EventFragment;
}
export interface DeviceActivatedEventObject {
    product: string;
    device: string;
}
export type DeviceActivatedEvent = TypedEvent<[
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
export interface EIP712DomainChangedEventObject {
}
export type EIP712DomainChangedEvent = TypedEvent<[
], EIP712DomainChangedEventObject>;
export type EIP712DomainChangedEventFilter = TypedEventFilter<EIP712DomainChangedEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
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
export interface ProductFactory extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ProductFactoryInterface;
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
        ACTIVATE_DEVICE_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;
        activateDevice(args: ProductFactory.ActivateDeviceArgsStruct, signature: ProductFactory.EIP712SignatureStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        createActivatedDevices(args: ProductFactory.CreateActivatedDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        createDevices(args: ProductFactory.CreateDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        createProduct(args: ProductFactory.CreateProductArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        eip712Domain(overrides?: CallOverrides): Promise<[
            string,
            string,
            string,
            BigNumber,
            string,
            string,
            BigNumber[]
        ] & {
            fields: string;
            name: string;
            version: string;
            chainId: BigNumber;
            verifyingContract: string;
            salt: string;
            extensions: BigNumber[];
        }>;
        getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        getDomainSeparator(overrides?: CallOverrides): Promise<[string]>;
        getVendorByProduct(product: string, overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
    };
    ACTIVATE_DEVICE_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    activateDevice(args: ProductFactory.ActivateDeviceArgsStruct, signature: ProductFactory.EIP712SignatureStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    createActivatedDevices(args: ProductFactory.CreateActivatedDevicesArgsStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    createDevices(args: ProductFactory.CreateDevicesArgsStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    createProduct(args: ProductFactory.CreateProductArgsStruct, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    eip712Domain(overrides?: CallOverrides): Promise<[
        string,
        string,
        string,
        BigNumber,
        string,
        string,
        BigNumber[]
    ] & {
        fields: string;
        name: string;
        version: string;
        chainId: BigNumber;
        verifyingContract: string;
        salt: string;
        extensions: BigNumber[];
    }>;
    getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<BigNumber>;
    getDomainSeparator(overrides?: CallOverrides): Promise<string>;
    getVendorByProduct(product: string, overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    callStatic: {
        ACTIVATE_DEVICE_TYPEHASH(overrides?: CallOverrides): Promise<string>;
        activateDevice(args: ProductFactory.ActivateDeviceArgsStruct, signature: ProductFactory.EIP712SignatureStruct, overrides?: CallOverrides): Promise<void>;
        createActivatedDevices(args: ProductFactory.CreateActivatedDevicesArgsStruct, overrides?: CallOverrides): Promise<void>;
        createDevices(args: ProductFactory.CreateDevicesArgsStruct, overrides?: CallOverrides): Promise<void>;
        createProduct(args: ProductFactory.CreateProductArgsStruct, overrides?: CallOverrides): Promise<string>;
        eip712Domain(overrides?: CallOverrides): Promise<[
            string,
            string,
            string,
            BigNumber,
            string,
            string,
            BigNumber[]
        ] & {
            fields: string;
            name: string;
            version: string;
            chainId: BigNumber;
            verifyingContract: string;
            salt: string;
            extensions: BigNumber[];
        }>;
        getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<BigNumber>;
        getDomainSeparator(overrides?: CallOverrides): Promise<string>;
        getVendorByProduct(product: string, overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "DeviceActivated(address,address)"(product?: string | null, device?: string | null): DeviceActivatedEventFilter;
        DeviceActivated(product?: string | null, device?: string | null): DeviceActivatedEventFilter;
        "DeviceCreated(address,address,uint256)"(product?: string | null, device?: string | null, tokenId?: BigNumberish | null): DeviceCreatedEventFilter;
        DeviceCreated(product?: string | null, device?: string | null, tokenId?: BigNumberish | null): DeviceCreatedEventFilter;
        "EIP712DomainChanged()"(): EIP712DomainChangedEventFilter;
        EIP712DomainChanged(): EIP712DomainChangedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        "ProductCreated(address,address,address)"(vendor?: string | null, productImpl?: string | null, product?: string | null): ProductCreatedEventFilter;
        ProductCreated(vendor?: string | null, productImpl?: string | null, product?: string | null): ProductCreatedEventFilter;
    };
    estimateGas: {
        ACTIVATE_DEVICE_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
        activateDevice(args: ProductFactory.ActivateDeviceArgsStruct, signature: ProductFactory.EIP712SignatureStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        createActivatedDevices(args: ProductFactory.CreateActivatedDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        createDevices(args: ProductFactory.CreateDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        createProduct(args: ProductFactory.CreateProductArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        eip712Domain(overrides?: CallOverrides): Promise<BigNumber>;
        getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<BigNumber>;
        getDomainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
        getVendorByProduct(product: string, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        ACTIVATE_DEVICE_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        activateDevice(args: ProductFactory.ActivateDeviceArgsStruct, signature: ProductFactory.EIP712SignatureStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        createActivatedDevices(args: ProductFactory.CreateActivatedDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        createDevices(args: ProductFactory.CreateDevicesArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        createProduct(args: ProductFactory.CreateProductArgsStruct, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        eip712Domain(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDomainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getVendorByProduct(product: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
    };
}
