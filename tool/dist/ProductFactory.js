var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ProductFactory__factory, } from "./typechain";
import { ethers } from "ethers";
import { oneDayLater } from "./utils/timestamp";
export class ProductFactory {
    constructor({ signer, chainId, address, }) {
        this.signer = signer;
        this.chainId = chainId;
        this.instance = ProductFactory__factory.connect(address, signer);
    }
    createProduct({ productImpl, name, symbol, baseTokenURI, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                productImpl,
                name,
                symbol,
                baseTokenURI,
            };
            const tx = yield this.instance.createProduct(args);
            const receipt = yield tx.wait();
            const targetEvents = (_a = receipt.events) === null || _a === void 0 ? void 0 : _a.filter((e) => e.event === "ProductCreated");
            if (!targetEvents || targetEvents.length === 0 || !targetEvents[0].args) {
                throw new Error("Filter ProductCreated event failed");
            }
            const product = targetEvents[0].args[2];
            return product;
        });
    }
    createDevices({ product, devices, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.getVendorByProduct(product);
            if (vendor !== (yield this.signer.getAddress())) {
                throw new Error("Signer not product vendor");
            }
            const args = {
                product,
                devices,
            };
            const tx = yield this.instance.createDevices(args);
            yield tx.wait();
        });
    }
    createActivatedDevices({ product, devices, receivers, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.getVendorByProduct(product);
            if (vendor !== (yield this.signer.getAddress())) {
                throw new Error("Signer not product vendor");
            }
            const args = {
                product,
                devices,
                receivers,
            };
            const tx = yield this.instance.createActivatedDevices(args);
            yield tx.wait();
        });
    }
    activateDevice({ receiver, product, devicePrivatekey, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!receiver) {
                receiver = yield this.signer.getAddress();
            }
            const deviceWallet = new ethers.Wallet(devicePrivatekey);
            const tokenId = yield this.getDeviceTokenId({
                product,
                device: deviceWallet.address,
            });
            const args = {
                receiver,
                product,
                tokenId,
            };
            const signature = yield this._generateActivateDeviceSignature({
                wallet: deviceWallet,
                product,
            });
            const tx = yield this.instance.activateDevice(args, signature);
            yield tx.wait();
        });
    }
    getVendorByProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.instance.getVendorByProduct(product);
        });
    }
    getDeviceTokenId({ product, device, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.instance.getDeviceTokenId(product, device);
        });
    }
    _generateActivateDeviceSignature({ wallet, product, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, version } = yield this.instance.eip712Domain();
            const deadline = oneDayLater();
            const msgParams = {
                types: {
                    ActivateDevice: [
                        { name: "product", type: "address" },
                        { name: "deadline", type: "uint256" },
                    ],
                },
                domain: {
                    name,
                    version,
                    chainId: this.chainId,
                    verifyingContract: this.instance.address,
                },
                value: {
                    product,
                    deadline,
                },
            };
            const { v, r, s } = ethers.utils.splitSignature(yield wallet._signTypedData(msgParams.domain, msgParams.types, msgParams.value));
            const sig = {
                signer: yield wallet.getAddress(),
                v,
                r,
                s,
                deadline,
            };
            return sig;
        });
    }
}
