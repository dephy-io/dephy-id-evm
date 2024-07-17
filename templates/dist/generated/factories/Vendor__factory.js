"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
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
];
const _bytecode = "0x608060405234801561001057600080fd5b50604051610b16380380610b1683398101604081905261002f916100fa565b816001600160a01b03811661005e57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6100678161008e565b50600180546001600160a01b0319166001600160a01b03929092169190911790555061012d565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80516001600160a01b03811681146100f557600080fd5b919050565b6000806040838503121561010d57600080fd5b610116836100de565b9150610124602084016100de565b90509250929050565b6109da8061013c6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c806384e8776c1161006657806384e8776c146100db5780638da5cb5b1461011e578063dbba9a5514610143578063f2fde38b14610156578063f62eb4171461016957600080fd5b80631ad90491146100985780631e7054b3146100ad57806336cbf046146100c0578063715018a6146100d3575b600080fd5b6100ab6100a6366004610582565b61017c565b005b6100ab6100bb3660046106ce565b6102da565b6100ab6100ce366004610775565b610377565b6100ab6103b3565b6101096100e9366004610775565b600260209081526000928352604080842090915290825290205460ff1681565b60405190151581526020015b60405180910390f35b6000546001600160a01b03165b6040516001600160a01b039091168152602001610115565b6100ab6101513660046107ae565b6103c7565b6100ab61016436600461087c565b61044a565b60015461012b906001600160a01b031681565b6001600160a01b0380851660009081526002602090815260408083209387168352929052205460ff166101ee5760405162461bcd60e51b815260206004820152601560248201527411195d9a58d948139bdd08149959da5cdd195c9959605a1b60448201526064015b60405180910390fd5b61022d82828080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061048892505050565b600154604080516060810182526001600160a01b03878116825286811660208301908152338385019081529351631595406d60e21b81529251821660048401525181166024830152915182166044820152600092919091169063565501b4906064016020604051808303816000875af11580156102ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d291906108a0565b505050505050565b6102e26104f0565b600154604080516080810182526001600160a01b038781168252602082018790528183018690526060820185905291516205943360e31b81526000939290921691622ca19891610334916004016108ff565b6020604051808303816000875af1158015610353573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d29190610971565b61037f6104f0565b6001600160a01b0391821660009081526002602090815260408083209390941682529190915220805460ff19166001179055565b6103bb6104f0565b6103c5600061051d565b565b6103cf6104f0565b60005b8151811015610445576001600160a01b038316600090815260026020526040812083516001929085908590811061040b5761040b61098e565b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff19169115159190911790556001016103d2565b505050565b6104526104f0565b6001600160a01b03811661047c57604051631e4fbdf760e01b8152600060048201526024016101e5565b6104858161051d565b50565b8060008151811061049b5761049b61098e565b6020910101516001600160f81b031916602160f91b146104855760405162461bcd60e51b815260206004820152601060248201526f10da185b1b195b99d94811985a5b195960821b60448201526064016101e5565b6000546001600160a01b031633146103c55760405163118cdaa760e01b81523360048201526024016101e5565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b038116811461048557600080fd5b6000806000806060858703121561059857600080fd5b84356105a38161056d565b935060208501356105b38161056d565b9250604085013567ffffffffffffffff8111156105cf57600080fd5b8501601f810187136105e057600080fd5b803567ffffffffffffffff8111156105f757600080fd5b87602082840101111561060957600080fd5b949793965060200194505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561065657610656610617565b604052919050565b600082601f83011261066f57600080fd5b813567ffffffffffffffff81111561068957610689610617565b61069c601f8201601f191660200161062d565b8181528460208386010111156106b157600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080608085870312156106e457600080fd5b84356106ef8161056d565b9350602085013567ffffffffffffffff81111561070b57600080fd5b6107178782880161065e565b935050604085013567ffffffffffffffff81111561073457600080fd5b6107408782880161065e565b925050606085013567ffffffffffffffff81111561075d57600080fd5b6107698782880161065e565b91505092959194509250565b6000806040838503121561078857600080fd5b82356107938161056d565b915060208301356107a38161056d565b809150509250929050565b600080604083850312156107c157600080fd5b82356107cc8161056d565b9150602083013567ffffffffffffffff8111156107e857600080fd5b8301601f810185136107f957600080fd5b803567ffffffffffffffff81111561081357610813610617565b8060051b6108236020820161062d565b9182526020818401810192908101908884111561083f57600080fd5b6020850194505b8385101561086d578435925061085b8361056d565b82825260209485019490910190610846565b80955050505050509250929050565b60006020828403121561088e57600080fd5b81356108998161056d565b9392505050565b6000602082840312156108b257600080fd5b5051919050565b6000815180845260005b818110156108df576020818501810151868301820152016108c3565b506000602082860101526020601f19601f83011685010191505092915050565b602080825282516001600160a01b0316828201528201516080604083015260009061092d60a08401826108b9565b90506040840151601f1984830301606085015261094a82826108b9565b9150506060840151601f1984830301608085015261096882826108b9565b95945050505050565b60006020828403121561098357600080fd5b81516108998161056d565b634e487b7160e01b600052603260045260246000fdfea2646970667358221220fa0a30f046d02a9f0e143fe8a0b97b6cdb8dbca1516cc9c2944c5d7de9ec388064736f6c634300081a0033";
const isSuperArgs = (xs) => xs.length > 1;
class Vendor__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(initialOwner, productFactoryAddress, overrides) {
        return super.deploy(initialOwner, productFactoryAddress, overrides || {});
    }
    getDeployTransaction(initialOwner, productFactoryAddress, overrides) {
        return super.getDeployTransaction(initialOwner, productFactoryAddress, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
Vendor__factory.bytecode = _bytecode;
Vendor__factory.abi = _abi;
exports.Vendor__factory = Vendor__factory;
