import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ProductFactory, ProductFactoryInterface } from "../ProductFactory";
type ProductFactoryConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ProductFactory__factory extends ContractFactory {
    constructor(...args: ProductFactoryConstructorParams);
    deploy(initialOwner: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ProductFactory>;
    getDeployTransaction(initialOwner: string, overrides?: Overrides & {
        from?: string;
    }): TransactionRequest;
    attach(address: string): ProductFactory;
    connect(signer: Signer): ProductFactory__factory;
    static readonly bytecode = "0x61016060405234801561001157600080fd5b50604051611a81380380611a818339810160408190526100309161021f565b604080518082018252600e81526d50726f64756374466163746f727960901b602080830191909152825180840190935260018352603160f81b9083015290826001600160a01b03811661009e57604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b6100a78161015e565b506100b38260016101ae565b610120526100c28160026101ae565b61014052815160208084019190912060e052815190820120610100524660a05261014f60e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c0525061041e565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020835110156101ca576101c3836101e1565b90506101db565b816101d584826102ee565b5060ff90505b92915050565b600080829050601f8151111561020c578260405163305a27a960e01b815260040161009591906103ac565b8051610217826103fa565b179392505050565b60006020828403121561023157600080fd5b81516001600160a01b038116811461024857600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061027957607f821691505b60208210810361029957634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156102e957806000526020600020601f840160051c810160208510156102c65750805b601f840160051c820191505b818110156102e657600081556001016102d2565b50505b505050565b81516001600160401b038111156103075761030761024f565b61031b816103158454610265565b8461029f565b6020601f82116001811461034f57600083156103375750848201515b600019600385901b1c1916600184901b1784556102e6565b600084815260208120601f198516915b8281101561037f578785015182556020948501946001909201910161035f565b508482101561039d5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b602081526000825180602084015260005b818110156103da57602081860181015160408684010152016103bd565b506000604082850101526040601f19601f83011684010191505092915050565b805160208083015191908110156102995760001960209190910360031b1b16919050565b60805160a05160c05160e0516101005161012051610140516116096104786000396000610bd001526000610ba301526000610d9501526000610d6d01526000610cc801526000610cf201526000610d1c01526116096000f3fe608060405234801561001057600080fd5b50600436106100b35760003560e01c80638da5cb5b116100715780638da5cb5b14610154578063904b55a514610165578063b063cb5414610191578063e191bb9914610199578063ed24911d146101ac578063f2fde38b146101b457600080fd5b80622ca198146100b85780633a7eece8146100e85780634be60db3146100fd5780635d25e63214610110578063715018a61461013157806384b0196e14610139575b600080fd5b6100cb6100c6366004611030565b6101c7565b6040516001600160a01b0390911681526020015b60405180910390f35b6100fb6100f636600461118f565b610339565b005b6100fb61010b36600461122c565b61054f565b61012361011e3660046112d7565b6107f4565b6040519081526020016100df565b6100fb610821565b610141610835565b6040516100df9796959493929190611350565b6000546001600160a01b03166100cb565b6100cb6101733660046113e8565b6001600160a01b039081166000908152600360205260409020541690565b61012361087b565b6100fb6101a736600461140a565b61089e565b610123610a5b565b6100fb6101c23660046113e8565b610a6a565b80516040516301ffc9a760e01b815263360ff5e360e01b60048201526000916001600160a01b0316906301ffc9a790602401602060405180830381865afa158015610216573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061023a91906114c5565b61025757604051630fb9181b60e11b815260040160405180910390fd5b60006102668360000151610aad565b9050806001600160a01b0316635c6d8da1846020015185604001518660600151306040518563ffffffff1660e01b81526004016102a694939291906114e7565b600060405180830381600087803b1580156102c057600080fd5b505af11580156102d4573d6000803e3d6000fd5b5050506001600160a01b0380831660008181526003602052604080822080546001600160a01b0319163390811790915588519151939550931692917f0d516d8b14b989f8763b7f1b93e8e08f0f5ff06e0b833b8d080f0f1f33f9f3029190a492915050565b80516001600160a01b0380821660009081526003602052604090205416331461037557604051630143454560e01b815260040160405180910390fd5b60005b82602001515181101561054a5782516001600160a01b031660009081526004602090815260408220908501518051839190859081106103b9576103b961153a565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020541115610401576040516353eadbf760e11b815260040160405180910390fd5b82516040516335313c2160e11b81523060048201526000916001600160a01b031690636a627842906024016020604051808303816000875af115801561044b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046f9190611550565b9050806004600086600001516001600160a01b03166001600160a01b031681526020019081526020016000206000866020015185815181106104b3576104b361153a565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000208190555080846020015183815181106104f6576104f661153a565b60200260200101516001600160a01b031685600001516001600160a01b03167f9f8ee02843e6d9d43d51ce2e6063a09267f22193680a24600bf13e4efca5d0c760405160405180910390a450600101610378565b505050565b80516001600160a01b0380821660009081526003602052604090205416331461058b57604051630143454560e01b815260040160405180910390fd5b60005b82602001515181101561054a5782516001600160a01b031660009081526004602090815260408220908501518051839190859081106105cf576105cf61153a565b60200260200101516001600160a01b03166001600160a01b03168152602001908152602001600020541115610617576040516353eadbf760e11b815260040160405180910390fd5b600083600001516001600160a01b0316636a627842856040015184815181106106425761064261153a565b60200260200101516040518263ffffffff1660e01b815260040161067591906001600160a01b0391909116815260200190565b6020604051808303816000875af1158015610694573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b89190611550565b9050806004600086600001516001600160a01b03166001600160a01b031681526020019081526020016000206000866020015185815181106106fc576106fc61153a565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002081905550808460200151838151811061073f5761073f61153a565b60200260200101516001600160a01b031685600001516001600160a01b03167f9f8ee02843e6d9d43d51ce2e6063a09267f22193680a24600bf13e4efca5d0c760405160405180910390a4836040015182815181106107a0576107a061153a565b60200260200101516001600160a01b031684600001516001600160a01b03167ff297737e991455288ddb7481b53c270d8821275ddfdf4e82af900234f8e2925960405160405180910390a35060010161058e565b6001600160a01b038083166000908152600460209081526040808320938516835292905220545b92915050565b610829610b1f565b6108336000610b4c565b565b600060608060008060006060610849610b9c565b610851610bc9565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b6040518060600160405280603081526020016115a4603091398051906020012081565b60006109186109126040518060600160405280603081526020016115a46030913980516020918201208682015160808701516040516108f794019283526001600160a01b03919091166020830152604082015260600190565b60405160208183030381529060405280519060200120610bf6565b83610c23565b9050806001600160a01b031682600001516001600160a01b03161461095057604051630e751dc360e31b815260040160405180910390fd5b6040808401516020808601516001600160a01b039081166000908152600483528481209186168152915291909120541461099d57604051633101a57160e01b815260040160405180910390fd5b6020830151835160408086015190516323b872dd60e01b81523060048201526001600160a01b03928316602482015260448101919091529116906323b872dd90606401600060405180830381600087803b1580156109fa57600080fd5b505af1158015610a0e573d6000803e3d6000fd5b50505050806001600160a01b031683602001516001600160a01b03167ff297737e991455288ddb7481b53c270d8821275ddfdf4e82af900234f8e2925960405160405180910390a3505050565b6000610a65610cbb565b905090565b610a72610b1f565b6001600160a01b038116610aa157604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b610aaa81610b4c565b50565b6000763d602d80600a3d3981f3363d3d373d3d3d363d730000008260601b60e81c176000526e5af43d82803e903d91602b57fd5bf38260781b17602052603760096000f090506001600160a01b038116610b1a576040516330be1a3d60e21b815260040160405180910390fd5b919050565b6000546001600160a01b031633146108335760405163118cdaa760e01b8152336004820152602401610a98565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6060610a657f00000000000000000000000000000000000000000000000000000000000000006001610de6565b6060610a657f00000000000000000000000000000000000000000000000000000000000000006002610de6565b600061081b610c03610cbb565b8360405161190160f01b8152600281019290925260228201526042902090565b60004282608001511015610c4a57604051630819bdcd60e01b815260040160405180910390fd5b602080830151604080850151606080870151835160008082529681018086528a905260ff90951693850193909352830152608082015260019060a0016020604051602081039080840390855afa158015610ca8573d6000803e3d6000fd5b5050604051601f19015195945050505050565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148015610d1457507f000000000000000000000000000000000000000000000000000000000000000046145b15610d3e57507f000000000000000000000000000000000000000000000000000000000000000090565b610a65604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b606060ff8314610e0057610df983610e91565b905061081b565b818054610e0c90611569565b80601f0160208091040260200160405190810160405280929190818152602001828054610e3890611569565b8015610e855780601f10610e5a57610100808354040283529160200191610e85565b820191906000526020600020905b815481529060010190602001808311610e6857829003601f168201915b5050505050905061081b565b60606000610e9e83610ed0565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b600060ff8216601f81111561081b57604051632cd44ac360e21b815260040160405180910390fd5b634e487b7160e01b600052604160045260246000fd5b604051608081016001600160401b0381118282101715610f3057610f30610ef8565b60405290565b604051606081016001600160401b0381118282101715610f3057610f30610ef8565b60405160a081016001600160401b0381118282101715610f3057610f30610ef8565b604051601f8201601f191681016001600160401b0381118282101715610fa257610fa2610ef8565b604052919050565b80356001600160a01b0381168114610b1a57600080fd5b600082601f830112610fd257600080fd5b81356001600160401b03811115610feb57610feb610ef8565b610ffe601f8201601f1916602001610f7a565b81815284602083860101111561101357600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561104257600080fd5b81356001600160401b0381111561105857600080fd5b82016080818503121561106a57600080fd5b611072610f0e565b61107b82610faa565b815260208201356001600160401b0381111561109657600080fd5b6110a286828501610fc1565b60208301525060408201356001600160401b038111156110c157600080fd5b6110cd86828501610fc1565b60408301525060608201356001600160401b038111156110ec57600080fd5b6110f886828501610fc1565b606083015250949350505050565b600082601f83011261111757600080fd5b81356001600160401b0381111561113057611130610ef8565b8060051b61114060208201610f7a565b9182526020818501810192908101908684111561115c57600080fd5b6020860192505b838310156111855761117483610faa565b825260209283019290910190611163565b9695505050505050565b6000602082840312156111a157600080fd5b81356001600160401b038111156111b757600080fd5b8201604081850312156111c957600080fd5b604080519081016001600160401b03811182821017156111eb576111eb610ef8565b6040526111f782610faa565b815260208201356001600160401b0381111561121257600080fd5b61121e86828501611106565b602083015250949350505050565b60006020828403121561123e57600080fd5b81356001600160401b0381111561125457600080fd5b82016060818503121561126657600080fd5b61126e610f36565b61127782610faa565b815260208201356001600160401b0381111561129257600080fd5b61129e86828501611106565b60208301525060408201356001600160401b038111156112bd57600080fd5b6112c986828501611106565b604083015250949350505050565b600080604083850312156112ea57600080fd5b6112f383610faa565b915061130160208401610faa565b90509250929050565b6000815180845260005b8181101561133057602081850181015186830182015201611314565b506000602082860101526020601f19601f83011685010191505092915050565b60ff60f81b8816815260e06020820152600061136f60e083018961130a565b8281036040840152611381818961130a565b606084018890526001600160a01b038716608085015260a0840186905283810360c08501528451808252602080870193509091019060005b818110156113d75783518352602093840193909201916001016113b9565b50909b9a5050505050505050505050565b6000602082840312156113fa57600080fd5b61140382610faa565b9392505050565b60008082840361010081121561141f57600080fd5b606081121561142d57600080fd5b611435610f36565b61143e85610faa565b815261144c60208601610faa565b602082015260408581013590820152925060a0605f198201121561146f57600080fd5b50611478610f58565b61148460608501610faa565b8152608084013560ff8116811461149a57600080fd5b602082015260a0840135604082015260c0840135606082015260e09093013560808401525092909150565b6000602082840312156114d757600080fd5b8151801515811461140357600080fd5b6080815260006114fa608083018761130a565b828103602084015261150c818761130a565b90508281036040840152611520818661130a565b91505060018060a01b038316606083015295945050505050565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561156257600080fd5b5051919050565b600181811c9082168061157d57607f821691505b60208210810361159d57634e487b7160e01b600052602260045260246000fd5b5091905056fe416374697661746544657669636528616464726573732070726f647563742c75696e7432353620646561646c696e6529a2646970667358221220c090185ac5ee0f3d45ec30324db266620dd7d0f5ecb31c0c48286d20c9b7be3964736f6c634300081a0033";
    static readonly abi: readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [{
            readonly name: "initialOwner";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "ACTIVATE_DEVICE_TYPEHASH";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "activateDevice";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct ProductFactory.ActivateDeviceArgs";
            readonly components: readonly [{
                readonly name: "receiver";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "tokenId";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
        }, {
            readonly name: "signature";
            readonly type: "tuple";
            readonly internalType: "struct ProductFactory.EIP712Signature";
            readonly components: readonly [{
                readonly name: "signer";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "v";
                readonly type: "uint8";
                readonly internalType: "uint8";
            }, {
                readonly name: "r";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "s";
                readonly type: "bytes32";
                readonly internalType: "bytes32";
            }, {
                readonly name: "deadline";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "createActivatedDevices";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct ProductFactory.CreateActivatedDevicesArgs";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "devices";
                readonly type: "address[]";
                readonly internalType: "address[]";
            }, {
                readonly name: "receivers";
                readonly type: "address[]";
                readonly internalType: "address[]";
            }];
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "createDevices";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct ProductFactory.CreateDevicesArgs";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "devices";
                readonly type: "address[]";
                readonly internalType: "address[]";
            }];
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "createProduct";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct ProductFactory.CreateProductArgs";
            readonly components: readonly [{
                readonly name: "productImpl";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "name";
                readonly type: "string";
                readonly internalType: "string";
            }, {
                readonly name: "symbol";
                readonly type: "string";
                readonly internalType: "string";
            }, {
                readonly name: "baseTokenURI";
                readonly type: "string";
                readonly internalType: "string";
            }];
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "eip712Domain";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "fields";
            readonly type: "bytes1";
            readonly internalType: "bytes1";
        }, {
            readonly name: "name";
            readonly type: "string";
            readonly internalType: "string";
        }, {
            readonly name: "version";
            readonly type: "string";
            readonly internalType: "string";
        }, {
            readonly name: "chainId";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "verifyingContract";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "salt";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "extensions";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "getDeviceTokenId";
        readonly inputs: readonly [{
            readonly name: "product";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "device";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "getDomainSeparator";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "getVendorByProduct";
        readonly inputs: readonly [{
            readonly name: "product";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "owner";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "renounceOwnership";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "transferOwnership";
        readonly inputs: readonly [{
            readonly name: "newOwner";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "event";
        readonly name: "DeviceActivated";
        readonly inputs: readonly [{
            readonly name: "product";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "device";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "DeviceCreated";
        readonly inputs: readonly [{
            readonly name: "product";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "device";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "tokenId";
            readonly type: "uint256";
            readonly indexed: true;
            readonly internalType: "uint256";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "EIP712DomainChanged";
        readonly inputs: readonly [];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "OwnershipTransferred";
        readonly inputs: readonly [{
            readonly name: "previousOwner";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "newOwner";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "ProductCreated";
        readonly inputs: readonly [{
            readonly name: "vendor";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "productImpl";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }, {
            readonly name: "product";
            readonly type: "address";
            readonly indexed: true;
            readonly internalType: "address";
        }];
        readonly anonymous: false;
    }, {
        readonly type: "error";
        readonly name: "DeviceAlreadyCreated";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "ERC1167FailedCreateClone";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "InvalidShortString";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "NotProductTemplate";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "NotVendor";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "OwnableInvalidOwner";
        readonly inputs: readonly [{
            readonly name: "owner";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "OwnableUnauthorizedAccount";
        readonly inputs: readonly [{
            readonly name: "account";
            readonly type: "address";
            readonly internalType: "address";
        }];
    }, {
        readonly type: "error";
        readonly name: "SignatureExpired";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "SignatureMismatch";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "StringTooLong";
        readonly inputs: readonly [{
            readonly name: "str";
            readonly type: "string";
            readonly internalType: "string";
        }];
    }, {
        readonly type: "error";
        readonly name: "TokenIdMismatch";
        readonly inputs: readonly [];
    }];
    static createInterface(): ProductFactoryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ProductFactory;
}
export {};
