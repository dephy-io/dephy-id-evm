/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IProductFactory,
  IProductFactoryInterface,
} from "../IProductFactory";

const _abi = [
  {
    type: "function",
    name: "activateDevice",
    inputs: [
      {
        name: "args",
        type: "tuple",
        internalType: "struct IProductFactory.ActivateDeviceArgs",
        components: [
          {
            name: "product",
            type: "address",
            internalType: "address",
          },
          {
            name: "device",
            type: "address",
            internalType: "address",
          },
          {
            name: "deviceSignature",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "deviceDeadline",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "signature",
        type: "tuple",
        internalType: "struct IProductFactory.EIP712Signature",
        components: [
          {
            name: "signer",
            type: "address",
            internalType: "address",
          },
          {
            name: "v",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "r",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "s",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "deadline",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createActivatedDevice",
    inputs: [
      {
        name: "args",
        type: "tuple",
        internalType: "struct IProductFactory.CreateActivatedDeviceArgs",
        components: [
          {
            name: "product",
            type: "address",
            internalType: "address",
          },
          {
            name: "device",
            type: "address",
            internalType: "address",
          },
          {
            name: "receiver",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createActivatedDevices",
    inputs: [
      {
        name: "args",
        type: "tuple",
        internalType: "struct IProductFactory.CreateActivatedDevicesArgs",
        components: [
          {
            name: "product",
            type: "address",
            internalType: "address",
          },
          {
            name: "devices",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "receivers",
            type: "address[]",
            internalType: "address[]",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createDevice",
    inputs: [
      {
        name: "args",
        type: "tuple",
        internalType: "struct IProductFactory.CreateDeviceArgs",
        components: [
          {
            name: "product",
            type: "address",
            internalType: "address",
          },
          {
            name: "device",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createDevices",
    inputs: [
      {
        name: "args",
        type: "tuple",
        internalType: "struct IProductFactory.CreateDevicesArgs",
        components: [
          {
            name: "product",
            type: "address",
            internalType: "address",
          },
          {
            name: "devices",
            type: "address[]",
            internalType: "address[]",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createProduct",
    inputs: [
      {
        name: "args",
        type: "tuple",
        internalType: "struct IProductFactory.CreateProductArgs",
        components: [
          {
            name: "productImpl",
            type: "address",
            internalType: "address",
          },
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "symbol",
            type: "string",
            internalType: "string",
          },
          {
            name: "baseTokenURI",
            type: "string",
            internalType: "string",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getDeviceTokenId",
    inputs: [
      {
        name: "product",
        type: "address",
        internalType: "address",
      },
      {
        name: "device",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDomainSeparator",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVendorByProduct",
    inputs: [
      {
        name: "product",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "DeviceActivated",
    inputs: [
      {
        name: "product",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "device",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "receiver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DeviceCreated",
    inputs: [
      {
        name: "product",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "device",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProductCreated",
    inputs: [
      {
        name: "vendor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "productImpl",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "product",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "DeviceAlreadyCreated",
    inputs: [],
  },
  {
    type: "error",
    name: "DeviceSignatureExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "DeviceSignatureMismatch",
    inputs: [],
  },
  {
    type: "error",
    name: "EIP712SignatureExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "EIP712SignatureMismatch",
    inputs: [],
  },
  {
    type: "error",
    name: "NotProductTemplate",
    inputs: [],
  },
  {
    type: "error",
    name: "NotVendor",
    inputs: [],
  },
  {
    type: "error",
    name: "TokenIdMismatch",
    inputs: [],
  },
] as const;

export class IProductFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IProductFactoryInterface {
    return new utils.Interface(_abi) as IProductFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IProductFactory {
    return new Contract(address, _abi, signerOrProvider) as IProductFactory;
  }
}
