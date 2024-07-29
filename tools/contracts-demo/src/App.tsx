import React, { useState, useEffect } from "react";
import { ContractTransaction, Signer, ethers } from "ethers";
import { ProductFactory, ChainId } from "../../contracts-sdk/dist";
import { BASE_SEPOLIA_PARAMS, BNB_TESTNET_PARAMS } from "./constants";
import ADDRESS_JSON from "../../../addresses.json";
import "./App.scss";

function App() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState<Signer>();
  const [productFactory, setProductFactory] = useState<ProductFactory>();
  const [currentNetwork, setCurrentNetwork] = useState<string>("BNBTestnet");
  const [chainParams, setChainParams] = useState<any>(BNB_TESTNET_PARAMS);

  const [productName, setProductName] = useState("");
  const [productSymbol, setProductSymbol] = useState("");
  const [baseTokenURI, setBaseTokenURI] = useState("");
  const [productAddress, setProductAddress] = useState("");
  const [deviceAddresses, setDeviceAddresses] = useState<string[]>([]);
  const [receiverAddresses, setReceiverAddresses] = useState<string[]>([]);
  const [devicePrivateKey, setDevicePrivateKey] = useState("");

  const [createProductTx, setCreateProductTx] = useState("");
  const [createDevicesTx, setCreateDevicesTx] = useState("");
  const [createActivatedDevicesTx, setCreateActivatedDevicesTx] = useState("");
  const [activatedDeviceTx, setActivatedDeviceTx] = useState("");

  useEffect(() => {
    (async () => {
      if (signer) {
        const params = currentNetwork === "BaseSepolia" ? BASE_SEPOLIA_PARAMS : BNB_TESTNET_PARAMS;
        setChainParams(params);

        try {
          await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: params.chainId }],
          });
        } catch (switchError) {
          if ((switchError as any).code === 4902) {
            try {
              await (window as any).ethereum.request({
                method: "wallet_addEthereumChain",
                params: [params],
              });
            } catch (addError) {
              console.error("Failed to add the network to MetaMask:", addError);
            }
          } else {
            console.error("Failed to switch the network:", switchError);
          }
        }

        const chainId = currentNetwork === "BaseSepolia" ? ChainId.BaseSepolia : ChainId.BNBTestnet;
        const productFactoryAddress = currentNetwork === "BaseSepolia" ? ADDRESS_JSON.BaseSepolia.ProductFactory : ADDRESS_JSON.BNBTestnet.ProductFactory;

        const productFactory = new ProductFactory({
          signer,
          chainId,
          address: productFactoryAddress,
        });
        setProductFactory(productFactory);
      }
    })();
  }, [signer, currentNetwork]);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("Please install MetaMask first!");
      return;
    }
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    setAccount(account);
    setSigner(signer);
  };

  const createProduct = async () => {
    if (productFactory) {
      const onPending = (tx: ContractTransaction) => {
        setCreateProductTx(tx.hash);
      };
      const product = await productFactory.createProduct(
        {
          productImpl: currentNetwork === "BaseSepolia" ? ADDRESS_JSON.BaseSepolia.ProductImpl : ADDRESS_JSON.BNBTestnet.ProductImpl,
          name: productName,
          symbol: productSymbol,
          baseTokenURI,
        },
        onPending
      );
      setProductAddress(product);
      alert("Product created!");
    }
  };

  const createDevices = async () => {
    if (productFactory) {
      const onPending = (tx: ContractTransaction) => {
        setCreateDevicesTx(tx.hash);
      };
      await productFactory.createDevices(
        {
          product: productAddress,
          devices: deviceAddresses,
        },
        onPending
      );
      alert("Devices created!");
    }
  };

  const createActivatedDevices = async () => {
    if (productFactory) {
      const onPending = (tx: ContractTransaction) => {
        setCreateActivatedDevicesTx(tx.hash);
      };
      await productFactory.createActivatedDevices(
        {
          product: productAddress,
          devices: deviceAddresses,
          receivers: receiverAddresses,
        },
        onPending
      );
      alert("Activated devices created!");
    }
  };

  const activateDevice = async () => {
    if (productFactory) {
      const onPending = (tx: ContractTransaction) => {
        setActivatedDeviceTx(tx.hash);
      };
      await productFactory.activateDevice(
        {
          product: productAddress,
          devicePrivatekey: devicePrivateKey,
        },
        onPending
      );
      alert("Device activated!");
    }
  };

  const switchNetwork = (network: string) => {
    setCurrentNetwork(network);
  };

  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>
      <div className="blackText">{account}</div>
      <hr />
      <div>
        <select onChange={(e) => switchNetwork(e.target.value)} value={currentNetwork}>
          <option value="BaseSepolia">Base Sepolia Testnet</option>
          <option value="BNBTestnet">BNB Testnet</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Symbol"
          value={productSymbol}
          onChange={(e) => setProductSymbol(e.target.value)}
        />
        <input
          type="text"
          placeholder="Base Token URI"
          value={baseTokenURI}
          onChange={(e) => setBaseTokenURI(e.target.value)}
        />
        <button onClick={createProduct}>Create Product</button>
        <a
          className="blackText"
          target="_blank"
          href={`${chainParams.blockExplorerUrls[0]}/tx/${createProductTx}`}
        >
          {createProductTx}
        </a>
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Product Address"
          value={productAddress}
          onChange={(e) => setProductAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Device Addresses"
          value={deviceAddresses.join(",")}
          onChange={(e) => setDeviceAddresses(e.target.value.split(","))}
        />
        <button onClick={createDevices}>Create Devices</button>
        <a
          className="blackText"
          target="_blank"
          href={`${chainParams.blockExplorerUrls[0]}/tx/${createDevicesTx}`}
        >
          {createDevicesTx}
        </a>
        <input
          type="text"
          placeholder="Receiver Addresses"
          value={receiverAddresses.join(",")}
          onChange={(e) => setReceiverAddresses(e.target.value.split(","))}
        />
        <button onClick={createActivatedDevices}>
          Create Activated Devices
        </button>
        <a
          className="blackText"
          target="_blank"
          href={`${chainParams.blockExplorerUrls[0]}/tx/${createActivatedDevicesTx}`}
        >
          {createActivatedDevicesTx}
        </a>
      </div>
      <br />
      <div>
        <input
          type="text"
          placeholder="Product Address"
          value={productAddress}
          onChange={(e) => setProductAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Device Private Key"
          value={devicePrivateKey}
          onChange={(e) => setDevicePrivateKey(e.target.value)}
        />
        <button onClick={activateDevice}>Activate Device</button>
        <a
          className="blackText"
          target="_blank"
          href={`${chainParams.blockExplorerUrls[0]}/tx/${activatedDeviceTx}`}
        >
          {activatedDeviceTx}
        </a>
      </div>
      <br />
    </div>
  );
}

export default App;
