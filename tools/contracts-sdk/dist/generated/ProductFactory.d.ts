import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export interface ProductFactoryInterface extends utils.Interface {
    functions: {
        "ACTIVATE_DEVICE_TYPEHASH()": FunctionFragment;
        "DEPHY_PREFIX()": FunctionFragment;
        "UPGRADE_INTERFACE_VERSION()": FunctionFragment;
        "activateDevice((address,address,bytes,uint256),(address,uint8,bytes32,bytes32,uint256))": FunctionFragment;
        "createActivatedDevice((address,address,address))": FunctionFragment;
        "createActivatedDevices((address,address[],address[]))": FunctionFragment;
        "createDevice((address,address))": FunctionFragment;
        "createDevices((address,address[]))": FunctionFragment;
        "createProduct((address,string,string,string))": FunctionFragment;
        "eip712Domain()": FunctionFragment;
        "getDeviceTokenId(address,address)": FunctionFragment;
        "getDomainSeparator()": FunctionFragment;
        "getVendorByProduct(address)": FunctionFragment;
        "initialize(address)": FunctionFragment;
        "owner()": FunctionFragment;
        "paused()": FunctionFragment;
        "proxiableUUID()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "upgradeToAndCall(address,bytes)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ACTIVATE_DEVICE_TYPEHASH" | "DEPHY_PREFIX" | "UPGRADE_INTERFACE_VERSION" | "activateDevice" | "createActivatedDevice" | "createActivatedDevices" | "createDevice" | "createDevices" | "createProduct" | "eip712Domain" | "getDeviceTokenId" | "getDomainSeparator" | "getVendorByProduct" | "initialize" | "owner" | "paused" | "proxiableUUID" | "renounceOwnership" | "transferOwnership" | "upgradeToAndCall"): FunctionFragment;
    encodeFunctionData(functionFragment: "ACTIVATE_DEVICE_TYPEHASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEPHY_PREFIX", values?: undefined): string;
    encodeFunctionData(functionFragment: "UPGRADE_INTERFACE_VERSION", values?: undefined): string;
    encodeFunctionData(functionFragment: "activateDevice", values: [
        IProductFactory.ActivateDeviceArgsStruct,
        IProductFactory.EIP712SignatureStruct
    ]): string;
    encodeFunctionData(functionFragment: "createActivatedDevice", values: [IProductFactory.CreateActivatedDeviceArgsStruct]): string;
    encodeFunctionData(functionFragment: "createActivatedDevices", values: [IProductFactory.CreateActivatedDevicesArgsStruct]): string;
    encodeFunctionData(functionFragment: "createDevice", values: [IProductFactory.CreateDeviceArgsStruct]): string;
    encodeFunctionData(functionFragment: "createDevices", values: [IProductFactory.CreateDevicesArgsStruct]): string;
    encodeFunctionData(functionFragment: "createProduct", values: [IProductFactory.CreateProductArgsStruct]): string;
    encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
    encodeFunctionData(functionFragment: "getDeviceTokenId", values: [string, string]): string;
    encodeFunctionData(functionFragment: "getDomainSeparator", values?: undefined): string;
    encodeFunctionData(functionFragment: "getVendorByProduct", values: [string]): string;
    encodeFunctionData(functionFragment: "initialize", values: [string]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "proxiableUUID", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    encodeFunctionData(functionFragment: "upgradeToAndCall", values: [string, BytesLike]): string;
    decodeFunctionResult(functionFragment: "ACTIVATE_DEVICE_TYPEHASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEPHY_PREFIX", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "UPGRADE_INTERFACE_VERSION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "activateDevice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createActivatedDevice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createActivatedDevices", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createDevice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createDevices", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "createProduct", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDeviceTokenId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDomainSeparator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getVendorByProduct", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proxiableUUID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "upgradeToAndCall", data: BytesLike): Result;
    events: {
        "DeviceActivated(address,address,address)": EventFragment;
        "DeviceCreated(address,address,uint256)": EventFragment;
        "EIP712DomainChanged()": EventFragment;
        "Initialized(uint64)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "Paused(address)": EventFragment;
        "ProductCreated(address,address,address)": EventFragment;
        "Unpaused(address)": EventFragment;
        "Upgraded(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "DeviceActivated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DeviceCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProductCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
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
export interface EIP712DomainChangedEventObject {
}
export type EIP712DomainChangedEvent = TypedEvent<[
], EIP712DomainChangedEventObject>;
export type EIP712DomainChangedEventFilter = TypedEventFilter<EIP712DomainChangedEvent>;
export interface InitializedEventObject {
    version: BigNumber;
}
export type InitializedEvent = TypedEvent<[BigNumber], InitializedEventObject>;
export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface PausedEventObject {
    account: string;
}
export type PausedEvent = TypedEvent<[string], PausedEventObject>;
export type PausedEventFilter = TypedEventFilter<PausedEvent>;
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
export interface UnpausedEventObject {
    account: string;
}
export type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;
export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;
export interface UpgradedEventObject {
    implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;
export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;
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
        DEPHY_PREFIX(overrides?: CallOverrides): Promise<[string]>;
        UPGRADE_INTERFACE_VERSION(overrides?: CallOverrides): Promise<[string]>;
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
        initialize(initialOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        paused(overrides?: CallOverrides): Promise<[boolean]>;
        proxiableUUID(overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        upgradeToAndCall(newImplementation: string, data: BytesLike, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<ContractTransaction>;
    };
    ACTIVATE_DEVICE_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    DEPHY_PREFIX(overrides?: CallOverrides): Promise<string>;
    UPGRADE_INTERFACE_VERSION(overrides?: CallOverrides): Promise<string>;
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
    initialize(initialOwner: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<string>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    proxiableUUID(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    upgradeToAndCall(newImplementation: string, data: BytesLike, overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    callStatic: {
        ACTIVATE_DEVICE_TYPEHASH(overrides?: CallOverrides): Promise<string>;
        DEPHY_PREFIX(overrides?: CallOverrides): Promise<string>;
        UPGRADE_INTERFACE_VERSION(overrides?: CallOverrides): Promise<string>;
        activateDevice(args: IProductFactory.ActivateDeviceArgsStruct, signature: IProductFactory.EIP712SignatureStruct, overrides?: CallOverrides): Promise<void>;
        createActivatedDevice(args: IProductFactory.CreateActivatedDeviceArgsStruct, overrides?: CallOverrides): Promise<BigNumber>;
        createActivatedDevices(args: IProductFactory.CreateActivatedDevicesArgsStruct, overrides?: CallOverrides): Promise<void>;
        createDevice(args: IProductFactory.CreateDeviceArgsStruct, overrides?: CallOverrides): Promise<void>;
        createDevices(args: IProductFactory.CreateDevicesArgsStruct, overrides?: CallOverrides): Promise<void>;
        createProduct(args: IProductFactory.CreateProductArgsStruct, overrides?: CallOverrides): Promise<string>;
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
        initialize(initialOwner: string, overrides?: CallOverrides): Promise<void>;
        owner(overrides?: CallOverrides): Promise<string>;
        paused(overrides?: CallOverrides): Promise<boolean>;
        proxiableUUID(overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
        upgradeToAndCall(newImplementation: string, data: BytesLike, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "DeviceActivated(address,address,address)"(product?: string | null, device?: string | null, receiver?: null): DeviceActivatedEventFilter;
        DeviceActivated(product?: string | null, device?: string | null, receiver?: null): DeviceActivatedEventFilter;
        "DeviceCreated(address,address,uint256)"(product?: string | null, device?: string | null, tokenId?: BigNumberish | null): DeviceCreatedEventFilter;
        DeviceCreated(product?: string | null, device?: string | null, tokenId?: BigNumberish | null): DeviceCreatedEventFilter;
        "EIP712DomainChanged()"(): EIP712DomainChangedEventFilter;
        EIP712DomainChanged(): EIP712DomainChangedEventFilter;
        "Initialized(uint64)"(version?: null): InitializedEventFilter;
        Initialized(version?: null): InitializedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        "Paused(address)"(account?: null): PausedEventFilter;
        Paused(account?: null): PausedEventFilter;
        "ProductCreated(address,address,address)"(vendor?: string | null, productImpl?: string | null, product?: string | null): ProductCreatedEventFilter;
        ProductCreated(vendor?: string | null, productImpl?: string | null, product?: string | null): ProductCreatedEventFilter;
        "Unpaused(address)"(account?: null): UnpausedEventFilter;
        Unpaused(account?: null): UnpausedEventFilter;
        "Upgraded(address)"(implementation?: string | null): UpgradedEventFilter;
        Upgraded(implementation?: string | null): UpgradedEventFilter;
    };
    estimateGas: {
        ACTIVATE_DEVICE_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
        DEPHY_PREFIX(overrides?: CallOverrides): Promise<BigNumber>;
        UPGRADE_INTERFACE_VERSION(overrides?: CallOverrides): Promise<BigNumber>;
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
        eip712Domain(overrides?: CallOverrides): Promise<BigNumber>;
        getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<BigNumber>;
        getDomainSeparator(overrides?: CallOverrides): Promise<BigNumber>;
        getVendorByProduct(product: string, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(initialOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        paused(overrides?: CallOverrides): Promise<BigNumber>;
        proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        upgradeToAndCall(newImplementation: string, data: BytesLike, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        ACTIVATE_DEVICE_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        DEPHY_PREFIX(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        UPGRADE_INTERFACE_VERSION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
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
        eip712Domain(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDeviceTokenId(product: string, device: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDomainSeparator(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getVendorByProduct(product: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(initialOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        upgradeToAndCall(newImplementation: string, data: BytesLike, overrides?: PayableOverrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
    };
}
