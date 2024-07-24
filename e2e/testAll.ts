import { spawn, ChildProcess } from 'child_process';
import {
  createTestClient, getContract, Hash, http, publicActions, walletActions,
  toBytes, encodePacked, keccak256, serializeSignature, parseSignature,
  Address,
  encodeFunctionData,
} from 'viem';
import { foundry } from 'viem/chains';
import { generatePrivateKey, privateKeyToAccount, sign } from 'viem/accounts';

import Product from '../out/Product.sol/Product.json';
import ProductFactory from '../out/ProductFactory.sol/ProductFactory.json';
import ERC1967Proxy from '../out/ERC1967Proxy.sol/ERC1967Proxy.json';

let anvil: ChildProcess | undefined;

try {
  anvil = spawn('anvil');

  const client = createTestClient({
    chain: foundry,
    mode: 'anvil',
    transport: http(),
  })
    .extend(publicActions)
    .extend(walletActions);

  const getReceipt = async (contractCall: Promise<Hash>) => {
    const hash = await contractCall;
    return await client.waitForTransactionReceipt({ hash });
  };

  // deploy contracts
  const admin = privateKeyToAccount('0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356');
  const productTx = await getReceipt(client.deployContract({
    account: admin.address,
    abi: Product.abi,
    chain: foundry,
    bytecode: Product.bytecode.object as `0x${string}`,
  }));
  const productImplAddress = productTx.contractAddress;
  console.log('ProductImpl:', productImplAddress);

  const productFactoryImplTx = await getReceipt(client.deployContract({
    account: admin.address,
    abi: ProductFactory.abi,
    chain: foundry,
    bytecode: ProductFactory.bytecode.object as `0x${string}`,
    args: [],
  }));
  const productFactoryImplAddress = productFactoryImplTx.contractAddress;
  console.log('ProductFactoryImpl:', productFactoryImplAddress);

  const productFactoryProxyTx = await getReceipt(client.deployContract({
    account: admin.address,
    abi: ERC1967Proxy.abi,
    chain: foundry,
    bytecode: ERC1967Proxy.bytecode.object as `0x${string}`,
    args: [productFactoryImplAddress, encodeFunctionData({
      abi: ProductFactory.abi,
      functionName: 'initialize',
      args: [admin.address]
    })],
  }));

  const productFactoryProxyAddress = productFactoryProxyTx.contractAddress;
  console.log('ProductFactoryProxy:', productFactoryProxyAddress);

  const productFactory = getContract({
    address: productFactoryProxyAddress!,
    abi: ProductFactory.abi,
    client,
  });

  const logEvents = (events: any[]) => {
    for (const { eventName, args } of events) {
      console.log(eventName, args);
    }
  };

  // create product
  const vendor = privateKeyToAccount('0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97');

  await getReceipt(productFactory.write.createProduct([{
    productImpl: productImplAddress,
    name: 'Test Product',
    symbol: 'TPRD',
    baseTokenURI: 'https://example.com/test_product/',
  }], {
    account: vendor,
  }));

  let [{ args: { product: productAddress } }] = (await productFactory.getEvents.ProductCreated()) as any;
  console.log('Create Product:', productAddress);

  const product = getContract({
    address: productAddress as Address,
    abi: Product.abi,
    client,
  });

  console.log(await product.read.name());

  // create activated device
  const user = privateKeyToAccount('0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6');
  const device = privateKeyToAccount(generatePrivateKey());

  await getReceipt(productFactory.write.createActivatedDevices([{
    product: productAddress,
    devices: [device.address],
    receivers: [user.address],
  }], {
    account: vendor,
  }));

  logEvents(await productFactory.getEvents.DeviceCreated());
  logEvents(await productFactory.getEvents.DeviceActivated());

  // create then activate
  const device2PrivKey = generatePrivateKey();
  const device2 = privateKeyToAccount(device2PrivKey);

  await getReceipt(productFactory.write.createDevices([{
    product: productAddress,
    devices: [device2.address],
  }], {
    account: vendor,
  }));

  logEvents(await productFactory.getEvents.DeviceCreated());

  const latestBlock = await client.getBlock();
  const deviceDeadline = latestBlock.timestamp + 60n;
  const deadline = deviceDeadline;

  const deviceRawMessage = keccak256(encodePacked(
    ['string', 'bytes32'],
    ['DEPHY_ID_SIGNED_MESSAGE:', keccak256(toBytes(deviceDeadline, { size: 32 }))],
  ));
  const deviceSignature = serializeSignature(await sign({ hash: deviceRawMessage, privateKey: device2PrivKey }));
  console.log('deviceSignature', deviceSignature);

  const signature = await user.signTypedData({
    types: {
      ActivateDevice: [
        { name: 'product', type: 'address' },
        { name: 'device', type: 'address' },
        { name: 'deviceSignature', type: 'bytes' },
        { name: 'deviceDeadline', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
      ],
    },
    primaryType: 'ActivateDevice',
    domain: {
      name: 'ProductFactory',
      version: '1',
      chainId: client.chain.id,
      verifyingContract: productFactoryProxyAddress!,
    },
    message: {
      product: productAddress,
      device: device2.address,
      deviceSignature,
      deviceDeadline,
      deadline,
    },
  });

  console.log('signature', signature);
  const { r, s, v } = parseSignature(signature);

  await getReceipt(productFactory.write.activateDevice([{
    product: productAddress,
    device: device2.address,
    deviceSignature,
    deviceDeadline,
  }, {
    signer: user.address,
    r, s, v,
    deadline,
  }], {
    account: user,
  }));
  logEvents(await productFactory.getEvents.DeviceActivated());
} finally {
  if (anvil) {
    anvil.kill();
  }
}
