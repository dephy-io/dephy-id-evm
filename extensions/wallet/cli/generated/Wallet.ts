/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface WalletInterface extends utils.Interface {
  functions: {
    "DEPHY_PREFIX()": FunctionFragment;
    "DEVICE()": FunctionFragment;
    "NATIVE_TOKEN()": FunctionFragment;
    "PRODUCT()": FunctionFragment;
    "TOKEN_ID()": FunctionFragment;
    "beneficiary()": FunctionFragment;
    "proxyCall(address,bytes,uint256,uint256,bytes)": FunctionFragment;
    "setBeneficiary(address)": FunctionFragment;
    "withdraw(address,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEPHY_PREFIX"
      | "DEVICE"
      | "NATIVE_TOKEN"
      | "PRODUCT"
      | "TOKEN_ID"
      | "beneficiary"
      | "proxyCall"
      | "setBeneficiary"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEPHY_PREFIX",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "DEVICE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "NATIVE_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "PRODUCT", values?: undefined): string;
  encodeFunctionData(functionFragment: "TOKEN_ID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "beneficiary",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proxyCall",
    values: [string, BytesLike, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setBeneficiary",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEPHY_PREFIX",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "DEVICE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "NATIVE_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "PRODUCT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "TOKEN_ID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "beneficiary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "proxyCall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setBeneficiary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "BeneficiarySet(address)": EventFragment;
    "ProxyCalled(address,uint256,bytes,bytes)": EventFragment;
    "Withdraw(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BeneficiarySet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ProxyCalled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface BeneficiarySetEventObject {
  newBeneficiary: string;
}
export type BeneficiarySetEvent = TypedEvent<
  [string],
  BeneficiarySetEventObject
>;

export type BeneficiarySetEventFilter = TypedEventFilter<BeneficiarySetEvent>;

export interface ProxyCalledEventObject {
  target: string;
  value: BigNumber;
  data: string;
  returnedData: string;
}
export type ProxyCalledEvent = TypedEvent<
  [string, BigNumber, string, string],
  ProxyCalledEventObject
>;

export type ProxyCalledEventFilter = TypedEventFilter<ProxyCalledEvent>;

export interface WithdrawEventObject {
  token: string;
  receiver: string;
  amount: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, string, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface Wallet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WalletInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DEPHY_PREFIX(overrides?: CallOverrides): Promise<[string]>;

    DEVICE(overrides?: CallOverrides): Promise<[string]>;

    NATIVE_TOKEN(overrides?: CallOverrides): Promise<[string]>;

    PRODUCT(overrides?: CallOverrides): Promise<[string]>;

    TOKEN_ID(overrides?: CallOverrides): Promise<[BigNumber]>;

    beneficiary(overrides?: CallOverrides): Promise<[string]>;

    proxyCall(
      target: string,
      data: BytesLike,
      value: BigNumberish,
      deadline: BigNumberish,
      signature: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    setBeneficiary(
      beneficiary_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    withdraw(
      token: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  DEPHY_PREFIX(overrides?: CallOverrides): Promise<string>;

  DEVICE(overrides?: CallOverrides): Promise<string>;

  NATIVE_TOKEN(overrides?: CallOverrides): Promise<string>;

  PRODUCT(overrides?: CallOverrides): Promise<string>;

  TOKEN_ID(overrides?: CallOverrides): Promise<BigNumber>;

  beneficiary(overrides?: CallOverrides): Promise<string>;

  proxyCall(
    target: string,
    data: BytesLike,
    value: BigNumberish,
    deadline: BigNumberish,
    signature: BytesLike,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  setBeneficiary(
    beneficiary_: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  withdraw(
    token: string,
    receiver: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEPHY_PREFIX(overrides?: CallOverrides): Promise<string>;

    DEVICE(overrides?: CallOverrides): Promise<string>;

    NATIVE_TOKEN(overrides?: CallOverrides): Promise<string>;

    PRODUCT(overrides?: CallOverrides): Promise<string>;

    TOKEN_ID(overrides?: CallOverrides): Promise<BigNumber>;

    beneficiary(overrides?: CallOverrides): Promise<string>;

    proxyCall(
      target: string,
      data: BytesLike,
      value: BigNumberish,
      deadline: BigNumberish,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    setBeneficiary(
      beneficiary_: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      token: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BeneficiarySet(address)"(
      newBeneficiary?: string | null
    ): BeneficiarySetEventFilter;
    BeneficiarySet(newBeneficiary?: string | null): BeneficiarySetEventFilter;

    "ProxyCalled(address,uint256,bytes,bytes)"(
      target?: string | null,
      value?: null,
      data?: null,
      returnedData?: null
    ): ProxyCalledEventFilter;
    ProxyCalled(
      target?: string | null,
      value?: null,
      data?: null,
      returnedData?: null
    ): ProxyCalledEventFilter;

    "Withdraw(address,address,uint256)"(
      token?: string | null,
      receiver?: string | null,
      amount?: null
    ): WithdrawEventFilter;
    Withdraw(
      token?: string | null,
      receiver?: string | null,
      amount?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    DEPHY_PREFIX(overrides?: CallOverrides): Promise<BigNumber>;

    DEVICE(overrides?: CallOverrides): Promise<BigNumber>;

    NATIVE_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;

    PRODUCT(overrides?: CallOverrides): Promise<BigNumber>;

    TOKEN_ID(overrides?: CallOverrides): Promise<BigNumber>;

    beneficiary(overrides?: CallOverrides): Promise<BigNumber>;

    proxyCall(
      target: string,
      data: BytesLike,
      value: BigNumberish,
      deadline: BigNumberish,
      signature: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    setBeneficiary(
      beneficiary_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    withdraw(
      token: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEPHY_PREFIX(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    DEVICE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    NATIVE_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PRODUCT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TOKEN_ID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    beneficiary(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proxyCall(
      target: string,
      data: BytesLike,
      value: BigNumberish,
      deadline: BigNumberish,
      signature: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setBeneficiary(
      beneficiary_: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    withdraw(
      token: string,
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
