"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
    {
        type: "constructor",
        inputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "PRODUCT_FACTORY",
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
        name: "approve",
        inputs: [
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "balanceOf",
        inputs: [
            {
                name: "owner",
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
        name: "burn",
        inputs: [
            {
                name: "instanceId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "burn",
        inputs: [
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
        name: "getAppDeviceOwner",
        inputs: [
            {
                name: "device",
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
        type: "function",
        name: "getApproved",
        inputs: [
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
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
        type: "function",
        name: "getDeviceBinding",
        inputs: [
            {
                name: "device",
                type: "address",
                internalType: "address",
            },
        ],
        outputs: [
            {
                name: "product",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "getDeviceByInstanceId",
        inputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256",
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
        type: "function",
        name: "getInstanceIdByDevice",
        inputs: [
            {
                name: "",
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
        name: "initialize",
        inputs: [
            {
                name: "productFactory",
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
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "isAccessible",
        inputs: [
            {
                name: "device",
                type: "address",
                internalType: "address",
            },
            {
                name: "user",
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
        name: "isApprovedForAll",
        inputs: [
            {
                name: "owner",
                type: "address",
                internalType: "address",
            },
            {
                name: "operator",
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
        name: "mint",
        inputs: [
            {
                name: "to",
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
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "name",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "ownerOf",
        inputs: [
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
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
        type: "function",
        name: "safeTransferFrom",
        inputs: [
            {
                name: "from",
                type: "address",
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "safeTransferFrom",
        inputs: [
            {
                name: "from",
                type: "address",
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "data",
                type: "bytes",
                internalType: "bytes",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "setApprovalForAll",
        inputs: [
            {
                name: "operator",
                type: "address",
                internalType: "address",
            },
            {
                name: "approved",
                type: "bool",
                internalType: "bool",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "supportsInterface",
        inputs: [
            {
                name: "interfaceId",
                type: "bytes4",
                internalType: "bytes4",
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
        name: "symbol",
        inputs: [],
        outputs: [
            {
                name: "",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "tokenURI",
        inputs: [
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                name: "",
                type: "string",
                internalType: "string",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "transferFrom",
        inputs: [
            {
                name: "from",
                type: "address",
                internalType: "address",
            },
            {
                name: "to",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "event",
        name: "Approval",
        inputs: [
            {
                name: "owner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "approved",
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
        name: "ApprovalForAll",
        inputs: [
            {
                name: "owner",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "operator",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "approved",
                type: "bool",
                indexed: false,
                internalType: "bool",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Initialized",
        inputs: [
            {
                name: "version",
                type: "uint64",
                indexed: false,
                internalType: "uint64",
            },
        ],
        anonymous: false,
    },
    {
        type: "event",
        name: "Transfer",
        inputs: [
            {
                name: "from",
                type: "address",
                indexed: true,
                internalType: "address",
            },
            {
                name: "to",
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
        type: "error",
        name: "ERC721IncorrectOwner",
        inputs: [
            {
                name: "sender",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
            {
                name: "owner",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InsufficientApproval",
        inputs: [
            {
                name: "operator",
                type: "address",
                internalType: "address",
            },
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InvalidApprover",
        inputs: [
            {
                name: "approver",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InvalidOperator",
        inputs: [
            {
                name: "operator",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InvalidOwner",
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
        name: "ERC721InvalidReceiver",
        inputs: [
            {
                name: "receiver",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721InvalidSender",
        inputs: [
            {
                name: "sender",
                type: "address",
                internalType: "address",
            },
        ],
    },
    {
        type: "error",
        name: "ERC721NonexistentToken",
        inputs: [
            {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
            },
        ],
    },
    {
        type: "error",
        name: "InvalidInitialization",
        inputs: [],
    },
    {
        type: "error",
        name: "NotInitializing",
        inputs: [],
    },
    {
        type: "error",
        name: "NotProductDeviceOwner",
        inputs: [],
    },
];
const _bytecode = "0x6080604052348015600f57600080fd5b506016601a565b60ca565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00805468010000000000000000900460ff161560695760405163f92ee8a960e01b815260040160405180910390fd5b80546001600160401b039081161460c75780546001600160401b0319166001600160401b0390811782556040519081527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b50565b611962806100d96000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c806370a08231116100c3578063b88d4fde1161007c578063b88d4fde1461030b578063c1898c181461031e578063c87b56dd14610331578063c9bf71be14610344578063e985e9c514610357578063ee1fe2ad1461036a57600080fd5b806370a08231146102855780637741139f1461029857806389afcb44146102ca57806390657147146102dd57806395d89b41146102f0578063a22cb465146102f857600080fd5b806325226a871161011557806325226a87146101e257806342842e0e1461020b57806342966c681461021e5780635a6922e7146102315780636352211e1461025f57806363ca2ffe1461027257600080fd5b806301ffc9a71461015257806306fdde031461017a578063081812fc1461018f578063095ea7b3146101ba57806323b872dd146101cf575b600080fd5b610165610160366004611356565b61037d565b60405190151581526020015b60405180910390f35b6101826103a8565b60405161017191906113c3565b6101a261019d3660046113d6565b61044c565b6040516001600160a01b039091168152602001610171565b6101cd6101c8366004611404565b610461565b005b6101cd6101dd366004611430565b610470565b6101a26101f03660046113d6565b6003602052600090815260409020546001600160a01b031681565b6101cd610219366004611430565b610500565b6101cd61022c3660046113d6565b610520565b61025161023f366004611471565b60026020526000908152604090205481565b604051908152602001610171565b6101a261026d3660046113d6565b610541565b6000546101a2906001600160a01b031681565b610251610293366004611471565b61054c565b6102ab6102a6366004611471565b6105a8565b604080516001600160a01b039093168352602083019190915201610171565b6101cd6102d8366004611471565b61062c565b6101cd6102eb36600461153e565b61072f565b610182610861565b6101cd6103063660046115b9565b6108a0565b6101cd6103193660046115f7565b6108ab565b61016561032c366004611677565b6108c2565b61018261033f3660046113d6565b6108e8565b6101a2610352366004611471565b61095d565b610165610365366004611677565b61097f565b610251610378366004611677565b6109cc565b60006001600160e01b0319821663b57f929f60e01b14806103a257506103a282610ad7565b92915050565b60008051602061190d83398151915280546060919081906103c8906116a5565b80601f01602080910402602001604051908101604052809291908181526020018280546103f4906116a5565b80156104415780601f1061041657610100808354040283529160200191610441565b820191906000526020600020905b81548152906001019060200180831161042457829003601f168201915b505050505091505090565b600061045782610b27565b506103a282610b5f565b61046c828233610b99565b5050565b6001600160a01b03821661049f57604051633250574960e11b8152600060048201526024015b60405180910390fd5b60006104ac838333610ba6565b9050836001600160a01b0316816001600160a01b0316146104fa576040516364283d7b60e01b81526001600160a01b0380861660048301526024820184905282166044820152606401610496565b50505050565b61051b838383604051806020016040528060008152506108ab565b505050565b6000818152600360205260409020546001600160a01b031661046c8161062c565b60006103a282610b27565b600060008051602061190d8339815191526001600160a01b038316610587576040516322718ad960e21b815260006004820152602401610496565b6001600160a01b039092166000908152600390920160205250604090205490565b60008054604051637741139f60e01b81526001600160a01b03848116600483015283928392911690637741139f906024016040805180830381865afa1580156105f5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061061991906116df565b8051602090910151909590945092505050565b80600080610639836105a8565b6040516331a9108f60e11b815260048101829052919350915033906001600160a01b03841690636352211e90602401602060405180830381865afa158015610685573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a99190611739565b6001600160a01b0316146106d057604051638b85aa6960e01b815260040160405180910390fd5b6001600160a01b0384166000908152600260205260409020546106f281610cb0565b6001600160a01b039094166000908152600260209081526040808320839055958252600390529390932080546001600160a01b0319169055505050565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff166000811580156107755750825b905060008267ffffffffffffffff1660011480156107925750303b155b9050811580156107a0575080155b156107be5760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff1916600117855583156107e857845460ff60401b1916600160401b1785555b600080546001600160a01b0319166001600160a01b038a1617905561080d8787610ceb565b60018055831561085757845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050565b7f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab0079301805460609160008051602061190d833981519152916103c8906116a5565b61046c338383610cfd565b6108b6848484610470565b6104fa84848484610dae565b6000816001600160a01b03166108d78461095d565b6001600160a01b0316149392505050565b60606108f382610b27565b50600061090b60408051602081019091526000815290565b9050600081511161092b5760405180602001604052806000815250610956565b8061093584610ed7565b604051602001610946929190611756565b6040516020818303038152906040525b9392505050565b6001600160a01b03811660009081526002602052604081205461095681610f6a565b6001600160a01b0391821660009081527f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab00793056020908152604080832093909416825291909152205460ff1690565b6000816000806109db836105a8565b6040516331a9108f60e11b815260048101829052919350915033906001600160a01b03841690636352211e90602401602060405180830381865afa158015610a27573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a4b9190611739565b6001600160a01b031614610a7257604051638b85aa6960e01b815260040160405180910390fd5b6001805460009182610a8383611785565b919050559050610a938782610fa4565b6001600160a01b03861660008181526002602090815260408083208590558483526003909152902080546001600160a01b0319169091179055935050505092915050565b60006001600160e01b031982166380ac58cd60e01b1480610b0857506001600160e01b03198216635b5e139f60e01b145b806103a257506301ffc9a760e01b6001600160e01b03198316146103a2565b600080610b3383610f6a565b90506001600160a01b0381166103a257604051637e27328960e01b815260048101849052602401610496565b60009081527f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab007930460205260409020546001600160a01b031690565b61051b8383836001611009565b600060008051602061190d83398151915281610bc185610f6a565b90506001600160a01b03841615610bdd57610bdd81858761111f565b6001600160a01b03811615610c1d57610bfa600086600080611009565b6001600160a01b0381166000908152600383016020526040902080546000190190555b6001600160a01b03861615610c4e576001600160a01b03861660009081526003830160205260409020805460010190555b600085815260028301602052604080822080546001600160a01b0319166001600160a01b038a811691821790925591518893918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a495945050505050565b6000610cbf6000836000610ba6565b90506001600160a01b03811661046c57604051637e27328960e01b815260048101839052602401610496565b610cf3611183565b61046c82826111ce565b60008051602061190d8339815191526001600160a01b038316610d3e57604051630b61174360e31b81526001600160a01b0384166004820152602401610496565b6001600160a01b038481166000818152600584016020908152604080832094881680845294825291829020805460ff191687151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a350505050565b6001600160a01b0383163b156104fa57604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290610df09033908890879087906004016117ac565b6020604051808303816000875af1925050508015610e2b575060408051601f3d908101601f19168201909252610e28918101906117e9565b60015b610e94573d808015610e59576040519150601f19603f3d011682016040523d82523d6000602084013e610e5e565b606091505b508051600003610e8c57604051633250574960e11b81526001600160a01b0385166004820152602401610496565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b14610ed057604051633250574960e11b81526001600160a01b0385166004820152602401610496565b5050505050565b60606000610ee4836111ff565b600101905060008167ffffffffffffffff811115610f0457610f0461148e565b6040519080825280601f01601f191660200182016040528015610f2e576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610f3857509392505050565b60009081527f80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab007930260205260409020546001600160a01b031690565b6001600160a01b038216610fce57604051633250574960e11b815260006004820152602401610496565b6000610fdc83836000610ba6565b90506001600160a01b0381161561051b576040516339e3563760e11b815260006004820152602401610496565b60008051602061190d833981519152818061102c57506001600160a01b03831615155b156110ee57600061103c85610b27565b90506001600160a01b038416158015906110685750836001600160a01b0316816001600160a01b031614155b801561107b5750611079818561097f565b155b156110a45760405163a9fbf51f60e01b81526001600160a01b0385166004820152602401610496565b82156110ec5784866001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b600093845260040160205250506040902080546001600160a01b0319166001600160a01b0392909216919091179055565b61112a8383836112d7565b61051b576001600160a01b03831661115857604051637e27328960e01b815260048101829052602401610496565b60405163177e802f60e01b81526001600160a01b038316600482015260248101829052604401610496565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff166111cc57604051631afcd79f60e31b815260040160405180910390fd5b565b6111d6611183565b60008051602061190d833981519152806111f0848261184d565b50600181016104fa838261184d565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b831061123e5772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef8100000000831061126a576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061128857662386f26fc10000830492506010015b6305f5e10083106112a0576305f5e100830492506008015b61271083106112b457612710830492506004015b606483106112c6576064830492506002015b600a83106103a25760010192915050565b60006001600160a01b038316158015906113355750826001600160a01b0316846001600160a01b031614806113115750611311848461097f565b806113355750826001600160a01b031661132a83610b5f565b6001600160a01b0316145b949350505050565b6001600160e01b03198116811461135357600080fd5b50565b60006020828403121561136857600080fd5b81356109568161133d565b60005b8381101561138e578181015183820152602001611376565b50506000910152565b600081518084526113af816020860160208601611373565b601f01601f19169290920160200192915050565b6020815260006109566020830184611397565b6000602082840312156113e857600080fd5b5035919050565b6001600160a01b038116811461135357600080fd5b6000806040838503121561141757600080fd5b8235611422816113ef565b946020939093013593505050565b60008060006060848603121561144557600080fd5b8335611450816113ef565b92506020840135611460816113ef565b929592945050506040919091013590565b60006020828403121561148357600080fd5b8135610956816113ef565b634e487b7160e01b600052604160045260246000fd5b60008067ffffffffffffffff8411156114bf576114bf61148e565b50604051601f19601f85018116603f0116810181811067ffffffffffffffff821117156114ee576114ee61148e565b60405283815290508082840185101561150657600080fd5b83836020830137600060208583010152509392505050565b600082601f83011261152f57600080fd5b610956838335602085016114a4565b60008060006060848603121561155357600080fd5b833561155e816113ef565b9250602084013567ffffffffffffffff81111561157a57600080fd5b6115868682870161151e565b925050604084013567ffffffffffffffff8111156115a357600080fd5b6115af8682870161151e565b9150509250925092565b600080604083850312156115cc57600080fd5b82356115d7816113ef565b9150602083013580151581146115ec57600080fd5b809150509250929050565b6000806000806080858703121561160d57600080fd5b8435611618816113ef565b93506020850135611628816113ef565b925060408501359150606085013567ffffffffffffffff81111561164b57600080fd5b8501601f8101871361165c57600080fd5b61166b878235602084016114a4565b91505092959194509250565b6000806040838503121561168a57600080fd5b8235611695816113ef565b915060208301356115ec816113ef565b600181811c908216806116b957607f821691505b6020821081036116d957634e487b7160e01b600052602260045260246000fd5b50919050565b600060408284031280156116f257600080fd5b506040805190810167ffffffffffffffff811182821017156117165761171661148e565b6040528251611724816113ef565b81526020928301519281019290925250919050565b60006020828403121561174b57600080fd5b8151610956816113ef565b60008351611768818460208801611373565b83519083019061177c818360208801611373565b01949350505050565b6000600182016117a557634e487b7160e01b600052601160045260246000fd5b5060010190565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906117df90830184611397565b9695505050505050565b6000602082840312156117fb57600080fd5b81516109568161133d565b601f82111561051b57806000526020600020601f840160051c8101602085101561182d5750805b601f840160051c820191505b81811015610ed05760008155600101611839565b815167ffffffffffffffff8111156118675761186761148e565b61187b8161187584546116a5565b84611806565b6020601f8211600181146118af57600083156118975750848201515b600019600385901b1c1916600184901b178455610ed0565b600084815260208120601f198516915b828110156118df57878501518255602094850194600190920191016118bf565b50848210156118fd5786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fe80bb2b638cc20bc4d0a60d66940f3ab4a00c1d7b313497ca82fb0b4ab0079300a2646970667358221220b1d69aca14c4c334c25921a4bc08a36a3bb52157829a612c1a9e1f76fdac51f664736f6c634300081a0033";
const isSuperArgs = (xs) => xs.length > 1;
class Application__factory extends ethers_1.ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
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
Application__factory.bytecode = _bytecode;
Application__factory.abi = _abi;
exports.Application__factory = Application__factory;
