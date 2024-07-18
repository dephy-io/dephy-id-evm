/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Vendor, VendorInterface } from "../Vendor";

const _abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "initialOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "productFactoryAddress",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "activateDevice",
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
      {
        name: "customChallenge",
        type: "bytes",
        internalType: "bytes",
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
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createActivatedDevices",
    inputs: [
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
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createProduct",
    inputs: [
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
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isDeviceRegistered",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
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
    type: "function",
    name: "productFactory",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IProductFactory",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerDevice",
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
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registerDevices",
    inputs: [
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
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610df5380380610df583398101604081905261002f916100fa565b816001600160a01b03811661005e57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6100678161008e565b50600180546001600160a01b0319166001600160a01b03929092169190911790555061012d565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146100f557600080fd5b919050565b6000806040838503121561010d57600080fd5b610116836100de565b9150610124602084016100de565b90509250929050565b610cb98061013c6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c806384e8776c1161007157806384e8776c14610104578063888ab528146101475780638da5cb5b1461015a578063dbba9a551461017f578063f2fde38b14610192578063f62eb417146101a557600080fd5b80631ad90491146100ae5780631e7054b3146100c357806336cbf046146100d65780636de29730146100e9578063715018a6146100fc575b600080fd5b6100c16100bc3660046106fd565b6101b8565b005b6100c16100d1366004610849565b610316565b6100c16100e43660046108f0565b6103b8565b6100c16100f73660046109b5565b6103f4565b6100c161047e565b6101326101123660046108f0565b600260209081526000928352604080842090915290825290205460ff1681565b60405190151581526020015b60405180910390f35b6100c1610155366004610a30565b610492565b6000546001600160a01b03165b6040516001600160a01b03909116815260200161013e565b6100c161018d366004610a7b565b610542565b6100c16101a0366004610acb565b6105c5565b600154610167906001600160a01b031681565b6001600160a01b0380851660009081526002602090815260408083209387168352929052205460ff1661022a5760405162461bcd60e51b815260206004820152601560248201527411195d9a58d948139bdd08149959da5cdd195c9959605a1b60448201526064015b60405180910390fd5b61026982828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061060392505050565b600154604080516060810182526001600160a01b03878116825286811660208301908152338385019081529351631595406d60e21b81529251821660048401525181166024830152915182166044820152600092919091169063565501b4906064016020604051808303816000875af11580156102ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061030e9190610aef565b505050505050565b61031e61066b565b600154604080516080810182526001600160a01b038781168252602082018790528183018690526060820185905291516205943360e31b81529190921691622ca1989161036e9190600401610b4e565b6020604051808303816000875af115801561038d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b19190610bc0565b5050505050565b6103c061066b565b6001600160a01b0391821660009081526002602090815260408083209390941682529190915220805460ff19166001179055565b6103fc61066b565b600154604080516060810182526001600160a01b038681168252602082018690528183018590529151634be60db360e01b81529190921691634be60db3916104479190600401610c22565b600060405180830381600087803b15801561046157600080fd5b505af1158015610475573d6000803e3d6000fd5b50505050505050565b61048661066b565b6104906000610698565b565b61049a61066b565b600154604080516060810182526001600160a01b038681168252858116602083019081528582168385019081529351631595406d60e21b8152925182166004840152518116602483015291518216604482015291169063565501b4906064016020604051808303816000875af1158015610518573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053c9190610aef565b50505050565b61054a61066b565b60005b81518110156105c0576001600160a01b038316600090815260026020526040812083516001929085908590811061058657610586610c6d565b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff191691151591909117905560010161054d565b505050565b6105cd61066b565b6001600160a01b0381166105f757604051631e4fbdf760e01b815260006004820152602401610221565b61060081610698565b50565b8060008151811061061657610616610c6d565b6020910101516001600160f81b031916602160f91b146106005760405162461bcd60e51b815260206004820152601060248201526f10da185b1b195b99d94811985a5b195960821b6044820152606401610221565b6000546001600160a01b031633146104905760405163118cdaa760e01b8152336004820152602401610221565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b038116811461060057600080fd5b6000806000806060858703121561071357600080fd5b843561071e816106e8565b9350602085013561072e816106e8565b9250604085013567ffffffffffffffff81111561074a57600080fd5b8501601f8101871361075b57600080fd5b803567ffffffffffffffff81111561077257600080fd5b87602082840101111561078457600080fd5b949793965060200194505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156107d1576107d1610792565b604052919050565b600082601f8301126107ea57600080fd5b813567ffffffffffffffff81111561080457610804610792565b610817601f8201601f19166020016107a8565b81815284602083860101111561082c57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806000806080858703121561085f57600080fd5b843561086a816106e8565b9350602085013567ffffffffffffffff81111561088657600080fd5b610892878288016107d9565b935050604085013567ffffffffffffffff8111156108af57600080fd5b6108bb878288016107d9565b925050606085013567ffffffffffffffff8111156108d857600080fd5b6108e4878288016107d9565b91505092959194509250565b6000806040838503121561090357600080fd5b823561090e816106e8565b9150602083013561091e816106e8565b809150509250929050565b600082601f83011261093a57600080fd5b813567ffffffffffffffff81111561095457610954610792565b8060051b610964602082016107a8565b9182526020818501810192908101908684111561098057600080fd5b6020860192505b838310156109ab57823561099a816106e8565b825260209283019290910190610987565b9695505050505050565b6000806000606084860312156109ca57600080fd5b83356109d5816106e8565b9250602084013567ffffffffffffffff8111156109f157600080fd5b6109fd86828701610929565b925050604084013567ffffffffffffffff811115610a1a57600080fd5b610a2686828701610929565b9150509250925092565b600080600060608486031215610a4557600080fd5b8335610a50816106e8565b92506020840135610a60816106e8565b91506040840135610a70816106e8565b809150509250925092565b60008060408385031215610a8e57600080fd5b8235610a99816106e8565b9150602083013567ffffffffffffffff811115610ab557600080fd5b610ac185828601610929565b9150509250929050565b600060208284031215610add57600080fd5b8135610ae8816106e8565b9392505050565b600060208284031215610b0157600080fd5b5051919050565b6000815180845260005b81811015610b2e57602081850181015186830182015201610b12565b506000602082860101526020601f19601f83011685010191505092915050565b602080825282516001600160a01b03168282015282015160806040830152600090610b7c60a0840182610b08565b90506040840151601f19848303016060850152610b998282610b08565b9150506060840151601f19848303016080850152610bb78282610b08565b95945050505050565b600060208284031215610bd257600080fd5b8151610ae8816106e8565b600081518084526020840193506020830160005b82811015610c185781516001600160a01b0316865260209586019590910190600101610bf1565b5093949350505050565b602080825282516001600160a01b03168282015282015160606040830152600090610c506080840182610bdd565b90506040840151601f19848303016060850152610bb78282610bdd565b634e487b7160e01b600052603260045260246000fdfea26469706673582212204dc6b0ee27b02d398e6d28054fa15b06ca046b18a4aeb513e2aac35f0faa996f64736f6c634300081a0033";

type VendorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VendorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Vendor__factory extends ContractFactory {
  constructor(...args: VendorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    initialOwner: string,
    productFactoryAddress: string,
    overrides?: Overrides & { from?: string }
  ): Promise<Vendor> {
    return super.deploy(
      initialOwner,
      productFactoryAddress,
      overrides || {}
    ) as Promise<Vendor>;
  }
  override getDeployTransaction(
    initialOwner: string,
    productFactoryAddress: string,
    overrides?: Overrides & { from?: string }
  ): TransactionRequest {
    return super.getDeployTransaction(
      initialOwner,
      productFactoryAddress,
      overrides || {}
    );
  }
  override attach(address: string): Vendor {
    return super.attach(address) as Vendor;
  }
  override connect(signer: Signer): Vendor__factory {
    return super.connect(signer) as Vendor__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VendorInterface {
    return new utils.Interface(_abi) as VendorInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Vendor {
    return new Contract(address, _abi, signerOrProvider) as Vendor;
  }
}
