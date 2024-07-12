import {
  createTestClient, getContract, Hash, http, publicActions, walletActions,
  toBytes,
  encodePacked,
  keccak256,
  serializeSignature,
  parseSignature,
} from 'viem'
import { foundry } from 'viem/chains'
import { generatePrivateKey, privateKeyToAccount, sign } from 'viem/accounts'

import Product from '../out/Product.sol/Product.json'
import ProductFactory from '../out/ProductFactory.sol/ProductFactory.json'

let anvil

try {
  anvil = Bun.spawn(['anvil']);

  const client = createTestClient({
    chain: foundry,
    mode: 'anvil',
    transport: http(),
  })
    .extend(publicActions)
    .extend(walletActions)

  const getReceipt = async (contractCall: Promise<Hash>) => {
    const hash = await contractCall
    return await client.waitForTransactionReceipt({ hash })
  }

  // deploy contracts
  const admin = privateKeyToAccount('0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356')
  const productTx = await getReceipt(client.deployContract({
    account: admin,
    abi: Product.abi,
    bytecode: Product.bytecode.object,
  }))
  const productImplAddress = productTx.contractAddress
  console.log('ProductImpl:', productImplAddress)

  const productFactoryTx = await getReceipt(client.deployContract({
    account: admin,
    abi: ProductFactory.abi,
    bytecode: ProductFactory.bytecode.object,
    args: [admin.address],
  }))
  const productFactoryAddress = productFactoryTx.contractAddress
  console.log('ProductFactory:', productFactoryAddress)

  const productFactory = getContract({
    address: productFactoryAddress,
    abi: ProductFactory.abi,
    client
  })

  const logEvents = (events) => {
    for (const { eventName, args } of events) {
      console.log(eventName, args)
    }
  }

  // create product
  const vendor = privateKeyToAccount('0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97')

  await getReceipt(productFactory.write.createProduct([{
    productImpl: productImplAddress,
    name: 'Test Product',
    symbol: 'TPRD',
    baseTokenURI: 'https://example.com/test_product/',
  }], {
    account: vendor
  }))

  let [{ args: { product: productAddress } }] = await productFactory.getEvents.ProductCreated()
  console.log('Create Product:', productAddress)

  const product = getContract({
    address: productAddress,
    abi: Product.abi,
    client
  })

  console.log(await product.read.name())

  // create activated device
  const user = privateKeyToAccount('0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6')
  const device = privateKeyToAccount(generatePrivateKey())

  await getReceipt(productFactory.write.createActivatedDevices([{
    product: productAddress,
    devices: [device.address],
    receivers: [user.address],
  }], {
    account: vendor
  }))

  logEvents(await productFactory.getEvents.DeviceCreated())
  logEvents(await productFactory.getEvents.DeviceActivated())


  // create then activate
  const divice2PrivKey = generatePrivateKey()
  const device2 = privateKeyToAccount(divice2PrivKey)

  await getReceipt(productFactory.write.createDevices([{
    product: productAddress,
    devices: [device2.address],
  }], {
    account: vendor
  }))

  logEvents(await productFactory.getEvents.DeviceCreated())

  const latestBlock = await client.getBlock()
  const deviceDeadline = latestBlock.timestamp + 60n
  const deadline = deviceDeadline

  const deviceRawMessage = keccak256(encodePacked(
    ['string', 'bytes32'],
    ["DEPHY_ID_SIGNED_MESSAGE:", keccak256(toBytes(deviceDeadline, { size: 32 }))]
  ))
  const deviceSignature = serializeSignature(await sign({ hash: deviceRawMessage, privateKey: divice2PrivKey }))
  console.log('deviceSignature', deviceSignature)

  const signature = await user.signTypedData({
    types: {
      ActivateDevice: [
        { name: "product", type: "address" },
        { name: "device", type: "address" },
        { name: "deviceSignature", type: "bytes" },
        { name: "deviceDeadline", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    primaryType: 'ActivateDevice',
    domain: {
      name: 'ProductFactory',
      version: '1',
      chainId: client.chain.id,
      verifyingContract: productFactoryAddress,
    },
    message: {
      product: productAddress,
      device: device2.address,
      deviceSignature,
      deviceDeadline,
      deadline,
    },
  })

  console.log('signature', signature)
  const { r, s, v } = parseSignature(signature)

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
    account: user
  }))
  logEvents(await productFactory.getEvents.DeviceActivated())
} finally {
  anvil?.kill()
}

