import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Bigint: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  Int64: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

/** Root object type. */
export type BaseObject = {
  id: Scalars['ID']['output'];
};

export type Block = {
  chain: Chain;
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['Bigint']['output'];
  timestamp?: Maybe<Scalars['Int64']['output']>;
};


export type BlockChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type Block_Type = BaseObject & Block & Object & {
  __typename?: 'Block_Type';
  chain: Chain;
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['Bigint']['output'];
  timestamp?: Maybe<Scalars['Int64']['output']>;
};


export type Block_TypeChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type Chain = {
  blocks?: Maybe<Array<Block>>;
  chainId: Scalars['Bigint']['output'];
  events?: Maybe<Array<EthEvent>>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latestEvent?: Maybe<EthEvent>;
  name: Scalars['String']['output'];
};


export type ChainBlocksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type ChainEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};


export type ChainLatestEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};

export type Chain_Type = BaseObject & Chain & Object & {
  __typename?: 'Chain_Type';
  blocks?: Maybe<Array<Block>>;
  chainId: Scalars['Bigint']['output'];
  events?: Maybe<Array<EthEvent>>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latestEvent?: Maybe<EthEvent>;
  name: Scalars['String']['output'];
};


export type Chain_TypeBlocksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type Chain_TypeEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};


export type Chain_TypeLatestEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};

export type Device = {
  activateEvent?: Maybe<EthEvent>;
  address: Scalars['String']['output'];
  createEvent: EthEvent;
  id: Scalars['ID']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  product: Product;
  tokenId: Scalars['Bigint']['output'];
};


export type DeviceActivateEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};


export type DeviceCreateEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};


export type DeviceProductArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProduct>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProduct>;
};

export type DeviceActivated = {
  address: Scalars['String']['output'];
  block?: Maybe<Block>;
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Bigint']['output'];
  chain: Chain;
  device: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  product: Scalars['String']['output'];
  receiver: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
};


export type DeviceActivatedBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type DeviceActivatedChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type DeviceActivated_Type = BaseObject & DeviceActivated & EthEvent & Object & {
  __typename?: 'DeviceActivated_Type';
  address: Scalars['String']['output'];
  block?: Maybe<Block>;
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Bigint']['output'];
  chain: Chain;
  device: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  product: Scalars['String']['output'];
  receiver: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
};


export type DeviceActivated_TypeBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type DeviceActivated_TypeChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type DeviceCreated = {
  address: Scalars['String']['output'];
  block?: Maybe<Block>;
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Bigint']['output'];
  chain: Chain;
  device: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  product: Scalars['String']['output'];
  tokenId: Scalars['Bigint']['output'];
  txHash: Scalars['String']['output'];
};


export type DeviceCreatedBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type DeviceCreatedChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type DeviceCreated_Type = BaseObject & DeviceCreated & EthEvent & Object & {
  __typename?: 'DeviceCreated_Type';
  address: Scalars['String']['output'];
  block?: Maybe<Block>;
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Bigint']['output'];
  chain: Chain;
  device: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  product: Scalars['String']['output'];
  tokenId: Scalars['Bigint']['output'];
  txHash: Scalars['String']['output'];
};


export type DeviceCreated_TypeBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type DeviceCreated_TypeChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type Device_Type = BaseObject & Device & Object & {
  __typename?: 'Device_Type';
  activateEvent?: Maybe<EthEvent>;
  address: Scalars['String']['output'];
  createEvent: EthEvent;
  id: Scalars['ID']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  product: Product;
  tokenId: Scalars['Bigint']['output'];
};


export type Device_TypeActivateEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};


export type Device_TypeCreateEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};


export type Device_TypeProductArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProduct>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProduct>;
};

export enum Endian {
  Big = 'Big',
  Little = 'Little'
}

export type EthEvent = {
  address: Scalars['String']['output'];
  block?: Maybe<Block>;
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Bigint']['output'];
  chain: Chain;
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  txHash: Scalars['String']['output'];
};


export type EthEventBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type EthEventChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type FilterBaseObject = {
  and?: InputMaybe<Array<FilterBaseObject>>;
  id?: InputMaybe<FilterId>;
  not?: InputMaybe<FilterBaseObject>;
  or?: InputMaybe<Array<FilterBaseObject>>;
};

export type FilterBigint = {
  eq?: InputMaybe<Scalars['Bigint']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Bigint']['input']>;
  gte?: InputMaybe<Scalars['Bigint']['input']>;
  in?: InputMaybe<Array<Scalars['Bigint']['input']>>;
  lt?: InputMaybe<Scalars['Bigint']['input']>;
  lte?: InputMaybe<Scalars['Bigint']['input']>;
  neq?: InputMaybe<Scalars['Bigint']['input']>;
};

export type FilterBlock = {
  and?: InputMaybe<Array<FilterBlock>>;
  chain?: InputMaybe<NestedFilterChain>;
  hash?: InputMaybe<FilterString>;
  id?: InputMaybe<FilterId>;
  not?: InputMaybe<FilterBlock>;
  number?: InputMaybe<FilterBigint>;
  or?: InputMaybe<Array<FilterBlock>>;
  timestamp?: InputMaybe<FilterInt64>;
};

export type FilterBoolean = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FilterChain = {
  and?: InputMaybe<Array<FilterChain>>;
  blocks?: InputMaybe<NestedFilterBlock>;
  chainId?: InputMaybe<FilterBigint>;
  events?: InputMaybe<NestedFilterEthEvent>;
  fullName?: InputMaybe<FilterString>;
  id?: InputMaybe<FilterId>;
  latestEvent?: InputMaybe<NestedFilterEthEvent>;
  name?: InputMaybe<FilterString>;
  not?: InputMaybe<FilterChain>;
  or?: InputMaybe<Array<FilterChain>>;
};

export type FilterDecimal = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
};

export type FilterDevice = {
  activateEvent?: InputMaybe<NestedFilterEthEvent>;
  address?: InputMaybe<FilterString>;
  and?: InputMaybe<Array<FilterDevice>>;
  createEvent?: InputMaybe<NestedFilterEthEvent>;
  id?: InputMaybe<FilterId>;
  not?: InputMaybe<FilterDevice>;
  or?: InputMaybe<Array<FilterDevice>>;
  owner?: InputMaybe<FilterString>;
  product?: InputMaybe<NestedFilterProduct>;
  tokenId?: InputMaybe<FilterBigint>;
};

export type FilterDeviceActivated = {
  address?: InputMaybe<FilterString>;
  and?: InputMaybe<Array<FilterDeviceActivated>>;
  block?: InputMaybe<NestedFilterBlock>;
  blockHash?: InputMaybe<FilterString>;
  blockNumber?: InputMaybe<FilterBigint>;
  chain?: InputMaybe<NestedFilterChain>;
  device?: InputMaybe<FilterString>;
  id?: InputMaybe<FilterId>;
  logIndex?: InputMaybe<FilterInt>;
  not?: InputMaybe<FilterDeviceActivated>;
  or?: InputMaybe<Array<FilterDeviceActivated>>;
  product?: InputMaybe<FilterString>;
  receiver?: InputMaybe<FilterString>;
  txHash?: InputMaybe<FilterString>;
};

export type FilterDeviceCreated = {
  address?: InputMaybe<FilterString>;
  and?: InputMaybe<Array<FilterDeviceCreated>>;
  block?: InputMaybe<NestedFilterBlock>;
  blockHash?: InputMaybe<FilterString>;
  blockNumber?: InputMaybe<FilterBigint>;
  chain?: InputMaybe<NestedFilterChain>;
  device?: InputMaybe<FilterString>;
  id?: InputMaybe<FilterId>;
  logIndex?: InputMaybe<FilterInt>;
  not?: InputMaybe<FilterDeviceCreated>;
  or?: InputMaybe<Array<FilterDeviceCreated>>;
  product?: InputMaybe<FilterString>;
  tokenId?: InputMaybe<FilterBigint>;
  txHash?: InputMaybe<FilterString>;
};

export type FilterEndian = {
  eq?: InputMaybe<Endian>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Endian>;
  gte?: InputMaybe<Endian>;
  in?: InputMaybe<Array<Endian>>;
  lt?: InputMaybe<Endian>;
  lte?: InputMaybe<Endian>;
  neq?: InputMaybe<Endian>;
};

export type FilterEthEvent = {
  address?: InputMaybe<FilterString>;
  and?: InputMaybe<Array<FilterEthEvent>>;
  block?: InputMaybe<NestedFilterBlock>;
  blockHash?: InputMaybe<FilterString>;
  blockNumber?: InputMaybe<FilterBigint>;
  chain?: InputMaybe<NestedFilterChain>;
  id?: InputMaybe<FilterId>;
  logIndex?: InputMaybe<FilterInt>;
  not?: InputMaybe<FilterEthEvent>;
  or?: InputMaybe<Array<FilterEthEvent>>;
  txHash?: InputMaybe<FilterString>;
};

export type FilterFloat = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

export type FilterId = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  neq?: InputMaybe<Scalars['ID']['input']>;
};

export type FilterInt = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

export type FilterInt64 = {
  eq?: InputMaybe<Scalars['Int64']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Int64']['input']>;
  gte?: InputMaybe<Scalars['Int64']['input']>;
  in?: InputMaybe<Array<Scalars['Int64']['input']>>;
  lt?: InputMaybe<Scalars['Int64']['input']>;
  lte?: InputMaybe<Scalars['Int64']['input']>;
  neq?: InputMaybe<Scalars['Int64']['input']>;
};

export type FilterJson = {
  eq?: InputMaybe<Scalars['JSON']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<Scalars['JSON']['input']>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  neq?: InputMaybe<Scalars['JSON']['input']>;
};

export type FilterJsonEmpty = {
  eq?: InputMaybe<JsonEmpty>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<JsonEmpty>;
  gte?: InputMaybe<JsonEmpty>;
  in?: InputMaybe<Array<JsonEmpty>>;
  lt?: InputMaybe<JsonEmpty>;
  lte?: InputMaybe<JsonEmpty>;
  neq?: InputMaybe<JsonEmpty>;
};

export type FilterObject = {
  and?: InputMaybe<Array<FilterObject>>;
  id?: InputMaybe<FilterId>;
  not?: InputMaybe<FilterObject>;
  or?: InputMaybe<Array<FilterObject>>;
};

export type FilterOwnershipTransferred = {
  address?: InputMaybe<FilterString>;
  and?: InputMaybe<Array<FilterOwnershipTransferred>>;
  block?: InputMaybe<NestedFilterBlock>;
  blockHash?: InputMaybe<FilterString>;
  blockNumber?: InputMaybe<FilterBigint>;
  chain?: InputMaybe<NestedFilterChain>;
  id?: InputMaybe<FilterId>;
  logIndex?: InputMaybe<FilterInt>;
  newOwner?: InputMaybe<FilterString>;
  not?: InputMaybe<FilterOwnershipTransferred>;
  or?: InputMaybe<Array<FilterOwnershipTransferred>>;
  previousOwner?: InputMaybe<FilterString>;
  txHash?: InputMaybe<FilterString>;
};

export type FilterProduct = {
  address?: InputMaybe<FilterString>;
  and?: InputMaybe<Array<FilterProduct>>;
  createEvent?: InputMaybe<NestedFilterEthEvent>;
  devices?: InputMaybe<NestedFilterDevice>;
  devices_count?: InputMaybe<FilterInt64>;
  factory?: InputMaybe<NestedFilterProductFactory>;
  id?: InputMaybe<FilterId>;
  impl?: InputMaybe<FilterString>;
  name?: InputMaybe<FilterString>;
  not?: InputMaybe<FilterProduct>;
  or?: InputMaybe<Array<FilterProduct>>;
  symbol?: InputMaybe<FilterString>;
  vendor?: InputMaybe<FilterString>;
};

export type FilterProductCreated = {
  address?: InputMaybe<FilterString>;
  and?: InputMaybe<Array<FilterProductCreated>>;
  block?: InputMaybe<NestedFilterBlock>;
  blockHash?: InputMaybe<FilterString>;
  blockNumber?: InputMaybe<FilterBigint>;
  chain?: InputMaybe<NestedFilterChain>;
  id?: InputMaybe<FilterId>;
  logIndex?: InputMaybe<FilterInt>;
  not?: InputMaybe<FilterProductCreated>;
  or?: InputMaybe<Array<FilterProductCreated>>;
  product?: InputMaybe<FilterString>;
  productImpl?: InputMaybe<FilterString>;
  txHash?: InputMaybe<FilterString>;
  vendor?: InputMaybe<FilterString>;
};

export type FilterProductFactory = {
  active?: InputMaybe<FilterBoolean>;
  address?: InputMaybe<FilterString>;
  and?: InputMaybe<Array<FilterProductFactory>>;
  chain?: InputMaybe<NestedFilterChain>;
  devices_count?: InputMaybe<FilterInt64>;
  id?: InputMaybe<FilterId>;
  not?: InputMaybe<FilterProductFactory>;
  or?: InputMaybe<Array<FilterProductFactory>>;
  owner?: InputMaybe<FilterString>;
  products?: InputMaybe<NestedFilterProduct>;
  products_count?: InputMaybe<FilterInt64>;
  uptoBlock?: InputMaybe<FilterBigint>;
  vendors?: InputMaybe<FilterString>;
  vendors_count?: InputMaybe<FilterInt64>;
};

export type FilterString = {
  eq?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
};

export type InsertBlock = {
  chain: NestedInsertChain;
  hash: Scalars['String']['input'];
  number: Scalars['Bigint']['input'];
  timestamp?: InputMaybe<Scalars['Int64']['input']>;
};

export type InsertChain = {
  chainId: Scalars['Bigint']['input'];
  fullName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type InsertDevice = {
  activateEvent?: InputMaybe<NestedInsertEthEvent>;
  address: Scalars['String']['input'];
  createEvent: NestedInsertEthEvent;
  owner?: InputMaybe<Scalars['String']['input']>;
  product: NestedInsertProduct;
  tokenId: Scalars['Bigint']['input'];
};

export type InsertDeviceActivated = {
  address: Scalars['String']['input'];
  blockHash: Scalars['String']['input'];
  blockNumber: Scalars['Bigint']['input'];
  chain: NestedInsertChain;
  device: Scalars['String']['input'];
  logIndex: Scalars['Int']['input'];
  product: Scalars['String']['input'];
  receiver: Scalars['String']['input'];
  txHash: Scalars['String']['input'];
};

export type InsertDeviceCreated = {
  address: Scalars['String']['input'];
  blockHash: Scalars['String']['input'];
  blockNumber: Scalars['Bigint']['input'];
  chain: NestedInsertChain;
  device: Scalars['String']['input'];
  logIndex: Scalars['Int']['input'];
  product: Scalars['String']['input'];
  tokenId: Scalars['Bigint']['input'];
  txHash: Scalars['String']['input'];
};

export type InsertOwnershipTransferred = {
  address: Scalars['String']['input'];
  blockHash: Scalars['String']['input'];
  blockNumber: Scalars['Bigint']['input'];
  chain: NestedInsertChain;
  logIndex: Scalars['Int']['input'];
  newOwner: Scalars['String']['input'];
  previousOwner: Scalars['String']['input'];
  txHash: Scalars['String']['input'];
};

export type InsertProduct = {
  address: Scalars['String']['input'];
  createEvent: NestedInsertEthEvent;
  factory: NestedInsertProductFactory;
  impl: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  vendor: Scalars['String']['input'];
};

export type InsertProductCreated = {
  address: Scalars['String']['input'];
  blockHash: Scalars['String']['input'];
  blockNumber: Scalars['Bigint']['input'];
  chain: NestedInsertChain;
  logIndex: Scalars['Int']['input'];
  product: Scalars['String']['input'];
  productImpl: Scalars['String']['input'];
  txHash: Scalars['String']['input'];
  vendor: Scalars['String']['input'];
};

export type InsertProductFactory = {
  active: Scalars['Boolean']['input'];
  address: Scalars['String']['input'];
  chain: NestedInsertChain;
  owner?: InputMaybe<Scalars['String']['input']>;
  uptoBlock: Scalars['Bigint']['input'];
};

export enum JsonEmpty {
  DeleteKey = 'DeleteKey',
  Error = 'Error',
  ReturnEmpty = 'ReturnEmpty',
  ReturnTarget = 'ReturnTarget',
  UseNull = 'UseNull'
}

export type Mutation = {
  __typename?: 'Mutation';
  delete_Block?: Maybe<Array<Block_Type>>;
  delete_Chain?: Maybe<Array<Chain_Type>>;
  delete_Device?: Maybe<Array<Device_Type>>;
  delete_DeviceActivated?: Maybe<Array<DeviceActivated_Type>>;
  delete_DeviceCreated?: Maybe<Array<DeviceCreated_Type>>;
  delete_OwnershipTransferred?: Maybe<Array<OwnershipTransferred_Type>>;
  delete_Product?: Maybe<Array<Product_Type>>;
  delete_ProductCreated?: Maybe<Array<ProductCreated_Type>>;
  delete_ProductFactory?: Maybe<Array<ProductFactory_Type>>;
  insert_Block?: Maybe<Array<Block_Type>>;
  insert_Chain?: Maybe<Array<Chain_Type>>;
  insert_Device?: Maybe<Array<Device_Type>>;
  insert_DeviceActivated?: Maybe<Array<DeviceActivated_Type>>;
  insert_DeviceCreated?: Maybe<Array<DeviceCreated_Type>>;
  insert_OwnershipTransferred?: Maybe<Array<OwnershipTransferred_Type>>;
  insert_Product?: Maybe<Array<Product_Type>>;
  insert_ProductCreated?: Maybe<Array<ProductCreated_Type>>;
  insert_ProductFactory?: Maybe<Array<ProductFactory_Type>>;
  update_Block?: Maybe<Array<Block>>;
  update_Chain?: Maybe<Array<Chain>>;
  update_Device?: Maybe<Array<Device>>;
  update_DeviceActivated?: Maybe<Array<DeviceActivated>>;
  update_DeviceCreated?: Maybe<Array<DeviceCreated>>;
  update_EthEvent?: Maybe<Array<EthEvent>>;
  update_OwnershipTransferred?: Maybe<Array<OwnershipTransferred>>;
  update_Product?: Maybe<Array<Product>>;
  update_ProductCreated?: Maybe<Array<ProductCreated>>;
  update_ProductFactory?: Maybe<Array<ProductFactory>>;
};


export type MutationDelete_BlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type MutationDelete_ChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};


export type MutationDelete_DeviceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterDevice>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDevice>;
};


export type MutationDelete_DeviceActivatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterDeviceActivated>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDeviceActivated>;
};


export type MutationDelete_DeviceCreatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterDeviceCreated>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDeviceCreated>;
};


export type MutationDelete_OwnershipTransferredArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterOwnershipTransferred>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderOwnershipTransferred>;
};


export type MutationDelete_ProductArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProduct>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProduct>;
};


export type MutationDelete_ProductCreatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProductCreated>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProductCreated>;
};


export type MutationDelete_ProductFactoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProductFactory>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProductFactory>;
};


export type MutationInsert_BlockArgs = {
  data: Array<InsertBlock>;
};


export type MutationInsert_ChainArgs = {
  data: Array<InsertChain>;
};


export type MutationInsert_DeviceArgs = {
  data: Array<InsertDevice>;
};


export type MutationInsert_DeviceActivatedArgs = {
  data: Array<InsertDeviceActivated>;
};


export type MutationInsert_DeviceCreatedArgs = {
  data: Array<InsertDeviceCreated>;
};


export type MutationInsert_OwnershipTransferredArgs = {
  data: Array<InsertOwnershipTransferred>;
};


export type MutationInsert_ProductArgs = {
  data: Array<InsertProduct>;
};


export type MutationInsert_ProductCreatedArgs = {
  data: Array<InsertProductCreated>;
};


export type MutationInsert_ProductFactoryArgs = {
  data: Array<InsertProductFactory>;
};


export type MutationUpdate_BlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: UpdateBlock;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type MutationUpdate_ChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: UpdateChain;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};


export type MutationUpdate_DeviceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: UpdateDevice;
  filter?: InputMaybe<FilterDevice>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDevice>;
};


export type MutationUpdate_DeviceActivatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: UpdateDeviceActivated;
  filter?: InputMaybe<FilterDeviceActivated>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDeviceActivated>;
};


export type MutationUpdate_DeviceCreatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: UpdateDeviceCreated;
  filter?: InputMaybe<FilterDeviceCreated>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDeviceCreated>;
};


export type MutationUpdate_EthEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: UpdateEthEvent;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};


export type MutationUpdate_OwnershipTransferredArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: UpdateOwnershipTransferred;
  filter?: InputMaybe<FilterOwnershipTransferred>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderOwnershipTransferred>;
};


export type MutationUpdate_ProductArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: UpdateProduct;
  filter?: InputMaybe<FilterProduct>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProduct>;
};


export type MutationUpdate_ProductCreatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: UpdateProductCreated;
  filter?: InputMaybe<FilterProductCreated>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProductCreated>;
};


export type MutationUpdate_ProductFactoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data: UpdateProductFactory;
  filter?: InputMaybe<FilterProductFactory>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProductFactory>;
};

export type NestedFilterBlock = {
  chain?: InputMaybe<NestedFilterChain>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  hash?: InputMaybe<FilterString>;
  id?: InputMaybe<FilterId>;
  number?: InputMaybe<FilterBigint>;
  timestamp?: InputMaybe<FilterInt64>;
};

export type NestedFilterChain = {
  blocks?: InputMaybe<NestedFilterBlock>;
  chainId?: InputMaybe<FilterBigint>;
  events?: InputMaybe<NestedFilterEthEvent>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  fullName?: InputMaybe<FilterString>;
  id?: InputMaybe<FilterId>;
  latestEvent?: InputMaybe<NestedFilterEthEvent>;
  name?: InputMaybe<FilterString>;
};

export type NestedFilterDevice = {
  activateEvent?: InputMaybe<NestedFilterEthEvent>;
  address?: InputMaybe<FilterString>;
  createEvent?: InputMaybe<NestedFilterEthEvent>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<FilterId>;
  owner?: InputMaybe<FilterString>;
  product?: InputMaybe<NestedFilterProduct>;
  tokenId?: InputMaybe<FilterBigint>;
};

export type NestedFilterEthEvent = {
  address?: InputMaybe<FilterString>;
  block?: InputMaybe<NestedFilterBlock>;
  blockHash?: InputMaybe<FilterString>;
  blockNumber?: InputMaybe<FilterBigint>;
  chain?: InputMaybe<NestedFilterChain>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<FilterId>;
  logIndex?: InputMaybe<FilterInt>;
  txHash?: InputMaybe<FilterString>;
};

export type NestedFilterProduct = {
  address?: InputMaybe<FilterString>;
  createEvent?: InputMaybe<NestedFilterEthEvent>;
  devices?: InputMaybe<NestedFilterDevice>;
  devices_count?: InputMaybe<FilterInt64>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  factory?: InputMaybe<NestedFilterProductFactory>;
  id?: InputMaybe<FilterId>;
  impl?: InputMaybe<FilterString>;
  name?: InputMaybe<FilterString>;
  symbol?: InputMaybe<FilterString>;
  vendor?: InputMaybe<FilterString>;
};

export type NestedFilterProductFactory = {
  active?: InputMaybe<FilterBoolean>;
  address?: InputMaybe<FilterString>;
  chain?: InputMaybe<NestedFilterChain>;
  devices_count?: InputMaybe<FilterInt64>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<FilterId>;
  owner?: InputMaybe<FilterString>;
  products?: InputMaybe<NestedFilterProduct>;
  products_count?: InputMaybe<FilterInt64>;
  uptoBlock?: InputMaybe<FilterBigint>;
  vendors?: InputMaybe<FilterString>;
  vendors_count?: InputMaybe<FilterInt64>;
};

export type NestedInsertChain = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<InsertChain>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type NestedInsertEthEvent = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};

export type NestedInsertProduct = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<InsertProduct>;
  filter?: InputMaybe<FilterProduct>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProduct>;
};

export type NestedInsertProductFactory = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<InsertProductFactory>;
  filter?: InputMaybe<FilterProductFactory>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProductFactory>;
};

export type NestedUpdateChain = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type NestedUpdateEthEvent = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};

export type NestedUpdateProduct = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProduct>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProduct>;
};

export type NestedUpdateProductFactory = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProductFactory>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProductFactory>;
};

/** Root object type for user-defined types */
export type Object = {
  id: Scalars['ID']['output'];
};

export type OrderBaseObject = {
  id?: InputMaybe<Ordering>;
};

export type OrderBlock = {
  chain?: InputMaybe<OrderChain>;
  hash?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  number?: InputMaybe<Ordering>;
  timestamp?: InputMaybe<Ordering>;
};

export type OrderChain = {
  chainId?: InputMaybe<Ordering>;
  fullName?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  latestEvent?: InputMaybe<OrderEthEvent>;
  name?: InputMaybe<Ordering>;
};

export type OrderDevice = {
  activateEvent?: InputMaybe<OrderEthEvent>;
  address?: InputMaybe<Ordering>;
  createEvent?: InputMaybe<OrderEthEvent>;
  id?: InputMaybe<Ordering>;
  owner?: InputMaybe<Ordering>;
  product?: InputMaybe<OrderProduct>;
  tokenId?: InputMaybe<Ordering>;
};

export type OrderDeviceActivated = {
  address?: InputMaybe<Ordering>;
  block?: InputMaybe<OrderBlock>;
  blockHash?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  chain?: InputMaybe<OrderChain>;
  device?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  product?: InputMaybe<Ordering>;
  receiver?: InputMaybe<Ordering>;
  txHash?: InputMaybe<Ordering>;
};

export type OrderDeviceCreated = {
  address?: InputMaybe<Ordering>;
  block?: InputMaybe<OrderBlock>;
  blockHash?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  chain?: InputMaybe<OrderChain>;
  device?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  product?: InputMaybe<Ordering>;
  tokenId?: InputMaybe<Ordering>;
  txHash?: InputMaybe<Ordering>;
};

export type OrderEthEvent = {
  address?: InputMaybe<Ordering>;
  block?: InputMaybe<OrderBlock>;
  blockHash?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  chain?: InputMaybe<OrderChain>;
  id?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  txHash?: InputMaybe<Ordering>;
};

export type OrderObject = {
  id?: InputMaybe<Ordering>;
};

export type OrderOwnershipTransferred = {
  address?: InputMaybe<Ordering>;
  block?: InputMaybe<OrderBlock>;
  blockHash?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  chain?: InputMaybe<OrderChain>;
  id?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  newOwner?: InputMaybe<Ordering>;
  previousOwner?: InputMaybe<Ordering>;
  txHash?: InputMaybe<Ordering>;
};

export type OrderProduct = {
  address?: InputMaybe<Ordering>;
  createEvent?: InputMaybe<OrderEthEvent>;
  devices_count?: InputMaybe<Ordering>;
  factory?: InputMaybe<OrderProductFactory>;
  id?: InputMaybe<Ordering>;
  impl?: InputMaybe<Ordering>;
  name?: InputMaybe<Ordering>;
  symbol?: InputMaybe<Ordering>;
  vendor?: InputMaybe<Ordering>;
};

export type OrderProductCreated = {
  address?: InputMaybe<Ordering>;
  block?: InputMaybe<OrderBlock>;
  blockHash?: InputMaybe<Ordering>;
  blockNumber?: InputMaybe<Ordering>;
  chain?: InputMaybe<OrderChain>;
  id?: InputMaybe<Ordering>;
  logIndex?: InputMaybe<Ordering>;
  product?: InputMaybe<Ordering>;
  productImpl?: InputMaybe<Ordering>;
  txHash?: InputMaybe<Ordering>;
  vendor?: InputMaybe<Ordering>;
};

export type OrderProductFactory = {
  active?: InputMaybe<Ordering>;
  address?: InputMaybe<Ordering>;
  chain?: InputMaybe<OrderChain>;
  devices_count?: InputMaybe<Ordering>;
  id?: InputMaybe<Ordering>;
  owner?: InputMaybe<Ordering>;
  products_count?: InputMaybe<Ordering>;
  uptoBlock?: InputMaybe<Ordering>;
  vendors_count?: InputMaybe<Ordering>;
};

export type Ordering = {
  dir: DirectionEnum;
  nulls?: InputMaybe<NullsOrderingEnum>;
};

export type OwnershipTransferred = {
  address: Scalars['String']['output'];
  block?: Maybe<Block>;
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Bigint']['output'];
  chain: Chain;
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  newOwner: Scalars['String']['output'];
  previousOwner: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
};


export type OwnershipTransferredBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type OwnershipTransferredChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type OwnershipTransferred_Type = BaseObject & EthEvent & Object & OwnershipTransferred & {
  __typename?: 'OwnershipTransferred_Type';
  address: Scalars['String']['output'];
  block?: Maybe<Block>;
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Bigint']['output'];
  chain: Chain;
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  newOwner: Scalars['String']['output'];
  previousOwner: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
};


export type OwnershipTransferred_TypeBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type OwnershipTransferred_TypeChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type Product = {
  address: Scalars['String']['output'];
  createEvent: EthEvent;
  devices?: Maybe<Array<Device>>;
  devices_count: Scalars['Int64']['output'];
  factory: ProductFactory;
  id: Scalars['ID']['output'];
  impl: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  vendor: Scalars['String']['output'];
};


export type ProductCreateEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};


export type ProductDevicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterDevice>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDevice>;
};


export type ProductFactoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProductFactory>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProductFactory>;
};

export type ProductCreated = {
  address: Scalars['String']['output'];
  block?: Maybe<Block>;
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Bigint']['output'];
  chain: Chain;
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  product: Scalars['String']['output'];
  productImpl: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
  vendor: Scalars['String']['output'];
};


export type ProductCreatedBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type ProductCreatedChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type ProductCreated_Type = BaseObject & EthEvent & Object & ProductCreated & {
  __typename?: 'ProductCreated_Type';
  address: Scalars['String']['output'];
  block?: Maybe<Block>;
  blockHash: Scalars['String']['output'];
  blockNumber: Scalars['Bigint']['output'];
  chain: Chain;
  id: Scalars['ID']['output'];
  logIndex: Scalars['Int']['output'];
  product: Scalars['String']['output'];
  productImpl: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
  vendor: Scalars['String']['output'];
};


export type ProductCreated_TypeBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type ProductCreated_TypeChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};

export type ProductFactory = {
  active: Scalars['Boolean']['output'];
  address: Scalars['String']['output'];
  chain: Chain;
  devices_count: Scalars['Int64']['output'];
  id: Scalars['ID']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Product>>;
  products_count: Scalars['Int64']['output'];
  uptoBlock: Scalars['Bigint']['output'];
  vendors?: Maybe<Array<Scalars['String']['output']>>;
  vendors_count: Scalars['Int64']['output'];
};


export type ProductFactoryChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};


export type ProductFactoryProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProduct>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProduct>;
};

export type ProductFactory_Type = BaseObject & Object & ProductFactory & {
  __typename?: 'ProductFactory_Type';
  active: Scalars['Boolean']['output'];
  address: Scalars['String']['output'];
  chain: Chain;
  devices_count: Scalars['Int64']['output'];
  id: Scalars['ID']['output'];
  owner?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Product>>;
  products_count: Scalars['Int64']['output'];
  uptoBlock: Scalars['Bigint']['output'];
  vendors?: Maybe<Array<Scalars['String']['output']>>;
  vendors_count: Scalars['Int64']['output'];
};


export type ProductFactory_TypeChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};


export type ProductFactory_TypeProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProduct>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProduct>;
};

export type Product_Type = BaseObject & Object & Product & {
  __typename?: 'Product_Type';
  address: Scalars['String']['output'];
  createEvent: EthEvent;
  devices?: Maybe<Array<Device>>;
  devices_count: Scalars['Int64']['output'];
  factory: ProductFactory;
  id: Scalars['ID']['output'];
  impl: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  vendor: Scalars['String']['output'];
};


export type Product_TypeCreateEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};


export type Product_TypeDevicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterDevice>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDevice>;
};


export type Product_TypeFactoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProductFactory>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProductFactory>;
};

export type Query = {
  __typename?: 'Query';
  BaseObject?: Maybe<Array<BaseObject>>;
  Block?: Maybe<Array<Block>>;
  Chain?: Maybe<Array<Chain>>;
  Device?: Maybe<Array<Device>>;
  DeviceActivated?: Maybe<Array<DeviceActivated>>;
  DeviceCreated?: Maybe<Array<DeviceCreated>>;
  EthEvent?: Maybe<Array<EthEvent>>;
  Object?: Maybe<Array<Object>>;
  OwnershipTransferred?: Maybe<Array<OwnershipTransferred>>;
  Product?: Maybe<Array<Product>>;
  ProductCreated?: Maybe<Array<ProductCreated>>;
  ProductFactory?: Maybe<Array<ProductFactory>>;
};


export type QueryBaseObjectArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBaseObject>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBaseObject>;
};


export type QueryBlockArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterBlock>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderBlock>;
};


export type QueryChainArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterChain>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderChain>;
};


export type QueryDeviceArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterDevice>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDevice>;
};


export type QueryDeviceActivatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterDeviceActivated>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDeviceActivated>;
};


export type QueryDeviceCreatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterDeviceCreated>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderDeviceCreated>;
};


export type QueryEthEventArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterEthEvent>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderEthEvent>;
};


export type QueryObjectArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterObject>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderObject>;
};


export type QueryOwnershipTransferredArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterOwnershipTransferred>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderOwnershipTransferred>;
};


export type QueryProductArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProduct>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProduct>;
};


export type QueryProductCreatedArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProductCreated>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProductCreated>;
};


export type QueryProductFactoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<FilterProductFactory>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OrderProductFactory>;
};

export type UpdateBlock = {
  chain?: InputMaybe<UpdateOp_Chain_Block>;
  hash?: InputMaybe<UpdateOp_Hash_Block>;
  number?: InputMaybe<UpdateOp_Number_Block>;
  timestamp?: InputMaybe<UpdateOp_Timestamp_Block>;
};

export type UpdateChain = {
  chainId?: InputMaybe<UpdateOp_ChainId_Chain>;
  fullName?: InputMaybe<UpdateOp_FullName_Chain>;
  name?: InputMaybe<UpdateOp_Name_Chain>;
};

export type UpdateDevice = {
  activateEvent?: InputMaybe<UpdateOp_ActivateEvent_Device>;
  address?: InputMaybe<UpdateOp_Address_Device>;
  createEvent?: InputMaybe<UpdateOp_CreateEvent_Device>;
  owner?: InputMaybe<UpdateOp_Owner_Device>;
  product?: InputMaybe<UpdateOp_Product_Device>;
  tokenId?: InputMaybe<UpdateOp_TokenId_Device>;
};

export type UpdateDeviceActivated = {
  address?: InputMaybe<UpdateOp_Address_DeviceActivated>;
  blockHash?: InputMaybe<UpdateOp_BlockHash_DeviceActivated>;
  blockNumber?: InputMaybe<UpdateOp_BlockNumber_DeviceActivated>;
  chain?: InputMaybe<UpdateOp_Chain_DeviceActivated>;
  device?: InputMaybe<UpdateOp_Device_DeviceActivated>;
  logIndex?: InputMaybe<UpdateOp_LogIndex_DeviceActivated>;
  product?: InputMaybe<UpdateOp_Product_DeviceActivated>;
  receiver?: InputMaybe<UpdateOp_Receiver_DeviceActivated>;
  txHash?: InputMaybe<UpdateOp_TxHash_DeviceActivated>;
};

export type UpdateDeviceCreated = {
  address?: InputMaybe<UpdateOp_Address_DeviceCreated>;
  blockHash?: InputMaybe<UpdateOp_BlockHash_DeviceCreated>;
  blockNumber?: InputMaybe<UpdateOp_BlockNumber_DeviceCreated>;
  chain?: InputMaybe<UpdateOp_Chain_DeviceCreated>;
  device?: InputMaybe<UpdateOp_Device_DeviceCreated>;
  logIndex?: InputMaybe<UpdateOp_LogIndex_DeviceCreated>;
  product?: InputMaybe<UpdateOp_Product_DeviceCreated>;
  tokenId?: InputMaybe<UpdateOp_TokenId_DeviceCreated>;
  txHash?: InputMaybe<UpdateOp_TxHash_DeviceCreated>;
};

export type UpdateEthEvent = {
  address?: InputMaybe<UpdateOp_Address_EthEvent>;
  blockHash?: InputMaybe<UpdateOp_BlockHash_EthEvent>;
  blockNumber?: InputMaybe<UpdateOp_BlockNumber_EthEvent>;
  chain?: InputMaybe<UpdateOp_Chain_EthEvent>;
  logIndex?: InputMaybe<UpdateOp_LogIndex_EthEvent>;
  txHash?: InputMaybe<UpdateOp_TxHash_EthEvent>;
};

export type UpdateOp_ActivateEvent_Device = {
  clear?: InputMaybe<Scalars['Boolean']['input']>;
  set?: InputMaybe<NestedUpdateEthEvent>;
};

export type UpdateOp_Active_ProductFactory = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateOp_Address_Device = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Address_DeviceActivated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Address_DeviceCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Address_EthEvent = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Address_OwnershipTransferred = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Address_Product = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Address_ProductCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Address_ProductFactory = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_BlockHash_DeviceActivated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_BlockHash_DeviceCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_BlockHash_EthEvent = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_BlockHash_OwnershipTransferred = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_BlockHash_ProductCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_BlockNumber_DeviceActivated = {
  decrement?: InputMaybe<Scalars['Bigint']['input']>;
  increment?: InputMaybe<Scalars['Bigint']['input']>;
  set?: InputMaybe<Scalars['Bigint']['input']>;
};

export type UpdateOp_BlockNumber_DeviceCreated = {
  decrement?: InputMaybe<Scalars['Bigint']['input']>;
  increment?: InputMaybe<Scalars['Bigint']['input']>;
  set?: InputMaybe<Scalars['Bigint']['input']>;
};

export type UpdateOp_BlockNumber_EthEvent = {
  decrement?: InputMaybe<Scalars['Bigint']['input']>;
  increment?: InputMaybe<Scalars['Bigint']['input']>;
  set?: InputMaybe<Scalars['Bigint']['input']>;
};

export type UpdateOp_BlockNumber_OwnershipTransferred = {
  decrement?: InputMaybe<Scalars['Bigint']['input']>;
  increment?: InputMaybe<Scalars['Bigint']['input']>;
  set?: InputMaybe<Scalars['Bigint']['input']>;
};

export type UpdateOp_BlockNumber_ProductCreated = {
  decrement?: InputMaybe<Scalars['Bigint']['input']>;
  increment?: InputMaybe<Scalars['Bigint']['input']>;
  set?: InputMaybe<Scalars['Bigint']['input']>;
};

export type UpdateOp_ChainId_Chain = {
  decrement?: InputMaybe<Scalars['Bigint']['input']>;
  increment?: InputMaybe<Scalars['Bigint']['input']>;
  set?: InputMaybe<Scalars['Bigint']['input']>;
};

export type UpdateOp_Chain_Block = {
  set?: InputMaybe<NestedUpdateChain>;
};

export type UpdateOp_Chain_DeviceActivated = {
  set?: InputMaybe<NestedUpdateChain>;
};

export type UpdateOp_Chain_DeviceCreated = {
  set?: InputMaybe<NestedUpdateChain>;
};

export type UpdateOp_Chain_EthEvent = {
  set?: InputMaybe<NestedUpdateChain>;
};

export type UpdateOp_Chain_OwnershipTransferred = {
  set?: InputMaybe<NestedUpdateChain>;
};

export type UpdateOp_Chain_ProductCreated = {
  set?: InputMaybe<NestedUpdateChain>;
};

export type UpdateOp_Chain_ProductFactory = {
  set?: InputMaybe<NestedUpdateChain>;
};

export type UpdateOp_CreateEvent_Device = {
  set?: InputMaybe<NestedUpdateEthEvent>;
};

export type UpdateOp_CreateEvent_Product = {
  set?: InputMaybe<NestedUpdateEthEvent>;
};

export type UpdateOp_Device_DeviceActivated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Device_DeviceCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Factory_Product = {
  set?: InputMaybe<NestedUpdateProductFactory>;
};

export type UpdateOp_FullName_Chain = {
  append?: InputMaybe<Scalars['String']['input']>;
  clear?: InputMaybe<Scalars['Boolean']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Hash_Block = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Impl_Product = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_LogIndex_DeviceActivated = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOp_LogIndex_DeviceCreated = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOp_LogIndex_EthEvent = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOp_LogIndex_OwnershipTransferred = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOp_LogIndex_ProductCreated = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOp_Name_Chain = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Name_Product = {
  append?: InputMaybe<Scalars['String']['input']>;
  clear?: InputMaybe<Scalars['Boolean']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_NewOwner_OwnershipTransferred = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Number_Block = {
  decrement?: InputMaybe<Scalars['Bigint']['input']>;
  increment?: InputMaybe<Scalars['Bigint']['input']>;
  set?: InputMaybe<Scalars['Bigint']['input']>;
};

export type UpdateOp_Owner_Device = {
  append?: InputMaybe<Scalars['String']['input']>;
  clear?: InputMaybe<Scalars['Boolean']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Owner_ProductFactory = {
  append?: InputMaybe<Scalars['String']['input']>;
  clear?: InputMaybe<Scalars['Boolean']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_PreviousOwner_OwnershipTransferred = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_ProductImpl_ProductCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Product_Device = {
  set?: InputMaybe<NestedUpdateProduct>;
};

export type UpdateOp_Product_DeviceActivated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Product_DeviceCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Product_ProductCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Receiver_DeviceActivated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Symbol_Product = {
  append?: InputMaybe<Scalars['String']['input']>;
  clear?: InputMaybe<Scalars['Boolean']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Timestamp_Block = {
  clear?: InputMaybe<Scalars['Boolean']['input']>;
  decrement?: InputMaybe<Scalars['Int64']['input']>;
  increment?: InputMaybe<Scalars['Int64']['input']>;
  set?: InputMaybe<Scalars['Int64']['input']>;
};

export type UpdateOp_TokenId_Device = {
  decrement?: InputMaybe<Scalars['Bigint']['input']>;
  increment?: InputMaybe<Scalars['Bigint']['input']>;
  set?: InputMaybe<Scalars['Bigint']['input']>;
};

export type UpdateOp_TokenId_DeviceCreated = {
  decrement?: InputMaybe<Scalars['Bigint']['input']>;
  increment?: InputMaybe<Scalars['Bigint']['input']>;
  set?: InputMaybe<Scalars['Bigint']['input']>;
};

export type UpdateOp_TxHash_DeviceActivated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_TxHash_DeviceCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_TxHash_EthEvent = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_TxHash_OwnershipTransferred = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_TxHash_ProductCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_UptoBlock_ProductFactory = {
  decrement?: InputMaybe<Scalars['Bigint']['input']>;
  increment?: InputMaybe<Scalars['Bigint']['input']>;
  set?: InputMaybe<Scalars['Bigint']['input']>;
};

export type UpdateOp_Vendor_Product = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOp_Vendor_ProductCreated = {
  append?: InputMaybe<Scalars['String']['input']>;
  prepend?: InputMaybe<Scalars['String']['input']>;
  set?: InputMaybe<Scalars['String']['input']>;
  slice?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateOwnershipTransferred = {
  address?: InputMaybe<UpdateOp_Address_OwnershipTransferred>;
  blockHash?: InputMaybe<UpdateOp_BlockHash_OwnershipTransferred>;
  blockNumber?: InputMaybe<UpdateOp_BlockNumber_OwnershipTransferred>;
  chain?: InputMaybe<UpdateOp_Chain_OwnershipTransferred>;
  logIndex?: InputMaybe<UpdateOp_LogIndex_OwnershipTransferred>;
  newOwner?: InputMaybe<UpdateOp_NewOwner_OwnershipTransferred>;
  previousOwner?: InputMaybe<UpdateOp_PreviousOwner_OwnershipTransferred>;
  txHash?: InputMaybe<UpdateOp_TxHash_OwnershipTransferred>;
};

export type UpdateProduct = {
  address?: InputMaybe<UpdateOp_Address_Product>;
  createEvent?: InputMaybe<UpdateOp_CreateEvent_Product>;
  factory?: InputMaybe<UpdateOp_Factory_Product>;
  impl?: InputMaybe<UpdateOp_Impl_Product>;
  name?: InputMaybe<UpdateOp_Name_Product>;
  symbol?: InputMaybe<UpdateOp_Symbol_Product>;
  vendor?: InputMaybe<UpdateOp_Vendor_Product>;
};

export type UpdateProductCreated = {
  address?: InputMaybe<UpdateOp_Address_ProductCreated>;
  blockHash?: InputMaybe<UpdateOp_BlockHash_ProductCreated>;
  blockNumber?: InputMaybe<UpdateOp_BlockNumber_ProductCreated>;
  chain?: InputMaybe<UpdateOp_Chain_ProductCreated>;
  logIndex?: InputMaybe<UpdateOp_LogIndex_ProductCreated>;
  product?: InputMaybe<UpdateOp_Product_ProductCreated>;
  productImpl?: InputMaybe<UpdateOp_ProductImpl_ProductCreated>;
  txHash?: InputMaybe<UpdateOp_TxHash_ProductCreated>;
  vendor?: InputMaybe<UpdateOp_Vendor_ProductCreated>;
};

export type UpdateProductFactory = {
  active?: InputMaybe<UpdateOp_Active_ProductFactory>;
  address?: InputMaybe<UpdateOp_Address_ProductFactory>;
  chain?: InputMaybe<UpdateOp_Chain_ProductFactory>;
  owner?: InputMaybe<UpdateOp_Owner_ProductFactory>;
  uptoBlock?: InputMaybe<UpdateOp_UptoBlock_ProductFactory>;
};

/** Enum value used to specify ordering direction. */
export enum DirectionEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Enum value used to specify how nulls are ordered. */
export enum NullsOrderingEnum {
  Biggest = 'BIGGEST',
  Smallest = 'SMALLEST'
}

export type GetChainsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetChainsQuery = { __typename?: 'Query', Chain?: Array<{ __typename?: 'Chain_Type', chainId: any, fullName?: string | null, name: string }> | null };

export type GetProductsQueryVariables = Exact<{
  chainId?: InputMaybe<Scalars['Bigint']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', Product?: Array<{ __typename?: 'Product_Type', id: string, address: string, impl: string, name?: string | null, symbol?: string | null, devices_count: any, vendor: string, factory: { __typename?: 'ProductFactory_Type', id: string, address: string, uptoBlock: any, owner?: string | null, active: boolean, products_count: any, vendors?: Array<string> | null, vendors_count: any, devices_count: any, chain: { __typename?: 'Chain_Type', id: string, name: string, chainId: any } } }> | null };

export type GetProductQueryVariables = Exact<{
  chainId?: InputMaybe<Scalars['Bigint']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductQuery = { __typename?: 'Query', Product?: Array<{ __typename?: 'Product_Type', id: string, address: string, impl: string, name?: string | null, symbol?: string | null, devices_count: any, vendor: string, factory: { __typename?: 'ProductFactory_Type', id: string, address: string, uptoBlock: any, owner?: string | null, active: boolean, products_count: any, vendors?: Array<string> | null, vendors_count: any, devices_count: any, chain: { __typename?: 'Chain_Type', name: string, chainId: any } }, devices?: Array<{ __typename?: 'Device_Type', address: string, owner?: string | null, tokenId: any }> | null }> | null };

export type GetDeviceQueryVariables = Exact<{
  chainId?: InputMaybe<Scalars['Bigint']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetDeviceQuery = { __typename?: 'Query', Device?: Array<{ __typename?: 'Device_Type', id: string, address: string, owner?: string | null, tokenId: any, product: { __typename?: 'Product_Type', address: string } }> | null };

export type GetProductFactoryQueryVariables = Exact<{
  chainId?: InputMaybe<Scalars['Bigint']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductFactoryQuery = { __typename?: 'Query', ProductFactory?: Array<{ __typename?: 'ProductFactory_Type', active: boolean, address: string, devices_count: any, id: string, owner?: string | null, products_count: any, uptoBlock: any, vendors?: Array<string> | null, vendors_count: any, chain: { __typename?: 'Chain_Type', chainId: any, fullName?: string | null, id: string, name: string } }> | null };


export const GetChainsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChains"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Chain"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetChainsQuery, GetChainsQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Bigint"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"factory"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chain"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chainId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}}}]}}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"uptoBlock"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"products_count"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}},{"kind":"Field","name":{"kind":"Name","value":"vendors_count"}},{"kind":"Field","name":{"kind":"Name","value":"devices_count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"impl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"devices_count"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Bigint"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"factory"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chain"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chainId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}}}]}}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"uptoBlock"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"products_count"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}},{"kind":"Field","name":{"kind":"Name","value":"vendors_count"}},{"kind":"Field","name":{"kind":"Name","value":"devices_count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"impl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"devices_count"}},{"kind":"Field","name":{"kind":"Name","value":"vendor"}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetDeviceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDevice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Bigint"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Device"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"product"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"factory"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chain"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chainId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}}}]}}]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}}]}}]}}]}}]} as unknown as DocumentNode<GetDeviceQuery, GetDeviceQueryVariables>;
export const GetProductFactoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProductFactory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Bigint"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ProductFactory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chain"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chainId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainId"}}}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"devices_count"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"products_count"}},{"kind":"Field","name":{"kind":"Name","value":"uptoBlock"}},{"kind":"Field","name":{"kind":"Name","value":"vendors"}},{"kind":"Field","name":{"kind":"Name","value":"vendors_count"}}]}}]}}]} as unknown as DocumentNode<GetProductFactoryQuery, GetProductFactoryQueryVariables>;