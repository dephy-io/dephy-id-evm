import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IProductFactory, IProductFactoryInterface } from "../IProductFactory";
export declare class IProductFactory__factory {
    static readonly abi: readonly [{
        readonly type: "function";
        readonly name: "activateDevice";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.ActivateDeviceArgs";
            readonly components: readonly [{
                readonly name: "device";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "deviceSignature";
                readonly type: "bytes";
                readonly internalType: "bytes";
            }, {
                readonly name: "deviceDeadline";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
        }, {
            readonly name: "signature";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.EIP712Signature";
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
        readonly name: "createActivatedDevice";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.CreateActivatedDeviceArgs";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "device";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "receiver";
                readonly type: "address";
                readonly internalType: "address";
            }];
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "createActivatedDevices";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.CreateActivatedDevicesArgs";
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
        readonly name: "createDevice";
        readonly inputs: readonly [{
            readonly name: "args";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.CreateDeviceArgs";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "device";
                readonly type: "address";
                readonly internalType: "address";
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
            readonly internalType: "struct IProductFactory.CreateDevicesArgs";
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
            readonly internalType: "struct IProductFactory.CreateProductArgs";
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
        readonly name: "getDeviceBinding";
        readonly inputs: readonly [{
            readonly name: "device";
            readonly type: "address";
            readonly internalType: "address";
        }];
        readonly outputs: readonly [{
            readonly name: "";
            readonly type: "tuple";
            readonly internalType: "struct IProductFactory.DeviceBinding";
            readonly components: readonly [{
                readonly name: "product";
                readonly type: "address";
                readonly internalType: "address";
            }, {
                readonly name: "tokenId";
                readonly type: "uint256";
                readonly internalType: "uint256";
            }];
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
        }, {
            readonly name: "receiver";
            readonly type: "address";
            readonly indexed: false;
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
        readonly name: "DeviceSignatureExpired";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "DeviceSignatureMismatch";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "EIP712SignatureExpired";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "EIP712SignatureMismatch";
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
        readonly name: "TokenIdMismatch";
        readonly inputs: readonly [];
    }];
    static createInterface(): IProductFactoryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IProductFactory;
}
