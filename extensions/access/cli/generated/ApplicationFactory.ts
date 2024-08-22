/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
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

export interface ApplicationFactoryInterface extends utils.Interface {
  functions: {
    "PRODUCT_FACTORY()": FunctionFragment;
    "createApplication(address,string,string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "PRODUCT_FACTORY" | "createApplication"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "PRODUCT_FACTORY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createApplication",
    values: [string, string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "PRODUCT_FACTORY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createApplication",
    data: BytesLike
  ): Result;

  events: {
    "ApplicationCreated(address,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApplicationCreated"): EventFragment;
}

export interface ApplicationCreatedEventObject {
  creator: string;
  applicationImpl: string;
  application: string;
}
export type ApplicationCreatedEvent = TypedEvent<
  [string, string, string],
  ApplicationCreatedEventObject
>;

export type ApplicationCreatedEventFilter =
  TypedEventFilter<ApplicationCreatedEvent>;

export interface ApplicationFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ApplicationFactoryInterface;

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
    PRODUCT_FACTORY(overrides?: CallOverrides): Promise<[string]>;

    createApplication(
      applicationImpl: string,
      name: string,
      symbol: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  PRODUCT_FACTORY(overrides?: CallOverrides): Promise<string>;

  createApplication(
    applicationImpl: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    PRODUCT_FACTORY(overrides?: CallOverrides): Promise<string>;

    createApplication(
      applicationImpl: string,
      name: string,
      symbol: string,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "ApplicationCreated(address,address,address)"(
      creator?: string | null,
      applicationImpl?: string | null,
      application?: string | null
    ): ApplicationCreatedEventFilter;
    ApplicationCreated(
      creator?: string | null,
      applicationImpl?: string | null,
      application?: string | null
    ): ApplicationCreatedEventFilter;
  };

  estimateGas: {
    PRODUCT_FACTORY(overrides?: CallOverrides): Promise<BigNumber>;

    createApplication(
      applicationImpl: string,
      name: string,
      symbol: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    PRODUCT_FACTORY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createApplication(
      applicationImpl: string,
      name: string,
      symbol: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
