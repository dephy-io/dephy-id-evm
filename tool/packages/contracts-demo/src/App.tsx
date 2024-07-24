import { useState, useEffect } from "react";
import "./App.scss";
import { ContractTransaction, Signer, ethers } from "ethers";
import { ProductFactory, ChainId } from "../../contracts-sdk/dist";
import ADDRESS_JSON from "../../../../addresses.json";

const BASE_SEPOLIA_PARAMS = {
  chainId: "0x14a34",
  chainName: "Base Sepolia Testnet",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://base-sepolia-rpc.publicnode.com"], // Replace with actual Sepolia RPC URL
  blockExplorerUrls: ["https://sepolia.basescan.org/"],
};

function App() {
  const [account, setAccount] = useState("");
  const [signer, setSigner] = useState<Signer>();
  const [productFactory, setProductFactory] = useState<ProductFactory>();

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
        try {
          await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x14a34" }],
          });
        } catch (switchError) {
          if ((switchError as any).code === 4902) {
            try {
              await (window as any).ethereum.request({
                method: "wallet_addEthereumChain",
                params: [BASE_SEPOLIA_PARAMS],
              });
            } catch (addError) {
              console.error("Failed to add the network to MetaMask:", addError);
            }
          } else {
            console.error("Failed to switch the network:", switchError);
          }
        }

        const productFactory = new ProductFactory({
          signer,
          chainId: ChainId.BaseSepolia,
          address: ADDRESS_JSON.BaseSepolia.ProductFactory,
        });
        setProductFactory(productFactory);
      }
    })();
  }, [signer]);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("Please install MetaMask first!");
      return
    }
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
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
          productImpl: ADDRESS_JSON.BaseSepolia.ProductImpl,
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

  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>
      <div className="blackText">{account}</div>
      <hr />
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
          href={`https://sepolia.basescan.org/tx/${createProductTx}`}
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
          href={`https://sepolia.basescan.org/tx/${createDevicesTx}`}
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
          href={`https://sepolia.basescan.org/tx/${createActivatedDevicesTx}`}
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
          href={`https://sepolia.basescan.org/tx/${activatedDeviceTx}`}
        >
          {activatedDeviceTx}
        </a>
      </div>
      <br />
    </div>
  );
}

export default App;
