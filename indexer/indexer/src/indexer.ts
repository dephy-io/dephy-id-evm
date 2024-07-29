import {
    Chain, createPublicClient, http, webSocket,
    PublicClient, Address, Hex,
} from 'viem'
import chains from './chains'
import { Client as DbClient } from "edgedb"
import { productFactoryAbi, ProductFactoryEventLog } from './productFactory'
import e from "indexer-storage"

const ProductFactoryEvents = productFactoryAbi.filter(a => a.type == 'event')

function toLower(hex: Hex): Hex {
    return hex.toLowerCase() as Hex
}

type IndexerConfig = {
    chain: { name: string; chainId: bigint; },
    productFactory: {
        address: Address,
        uptoBlock: bigint,
    },
    db: DbClient,
}

export class Indexer {
    client: PublicClient
    productFactory: { address: Address, uptoBlock: bigint }
    db: DbClient
    chainConfig: Chain
    chain: { name: string; chainId: bigint; }

    constructor(config: IndexerConfig) {
        this.chain = config.chain
        this.chainConfig = chains[config.chain.name as keyof typeof chains]!
        this.productFactory = config.productFactory
        this.db = config.db

        let transport
        const RPC_WS = process.env[`RPC_WS_${this.chain.name}`.toUpperCase()]
        const RPC_HTTP = process.env[`RPC_HTTP_${this.chain.name}`.toUpperCase()]
        if (RPC_WS) {
            transport = webSocket(RPC_WS)
        } else if (RPC_HTTP) {
            transport = http(RPC_HTTP)
        } else if (this.chainConfig.rpcUrls.default.webSocket) {
            transport = webSocket()
        } else {
            transport = http()
        }

        this.client = createPublicClient({
            chain: this.chainConfig,
            transport,
        })
    }

    chainQuery() {
        return e.select(e.Chain, () => ({
            filter_single: {
                chainId: this.chain.chainId
            }
        }))
    }

    log(...args: any[]) {
        console.log(`${this.chain.name}@${this.productFactory.address}`, ...args)
    }

    async run() {
        await this.fillMissingBlocks()
        await this.fillMissingEvents()

        this.client.watchContractEvent({
            address: this.productFactory.address,
            abi: productFactoryAbi,
            strict: true,
            onLogs: (logs) => this.handleLogs(logs as ProductFactoryEventLog[]),
        })

        this.log('running')
    }

    async fillMissingBlocks() {
        const blocksWithoutTimestamp = await e.select(e.Block, (b) => ({
            id: true,
            number: true,
            timestamp: true,
            filter: e.all(e.set(
                e.op(b.chain.chainId, '=', this.chain.chainId),
                e.op('not', e.op('exists', b.timestamp)),
            ))
        })).run(this.db)

        for (const { id, number: blockNumber } of blocksWithoutTimestamp) {
            const block = await this.client.getBlock({ blockNumber })
            await e.update(e.Block, () => ({
                filter_single: {
                    id
                },
                set: {
                    timestamp: Number(block.timestamp)
                }
            })).run(this.db)
        }

        this.log(`${blocksWithoutTimestamp.length} blocks fetched`)
    }

    async fillMissingEvents() {
        const chain = await e.select(e.Chain, () => ({
            latestEvent: {
                blockNumber: true,
            },
            filter_single: {
                chainId: this.chain.chainId
            }
        })).run(this.db)

        let fromBlock = this.productFactory.uptoBlock + 1n
        if (chain?.latestEvent?.blockNumber && chain.latestEvent.blockNumber >= fromBlock) {
            fromBlock = chain.latestEvent.blockNumber + 1n
        }

        let fetchLimit = 99n
        if (this.chainConfig.custom && 'fetchLimit' in this.chainConfig.custom) {
            fetchLimit = this.chainConfig.custom['fetchLimit'] as bigint
        }

        let latestBlock = await this.client.getBlock({ blockTag: 'latest' })
        this.log(`fetching events in ${latestBlock.number - fromBlock} blocks`)

        // in case the inner loop takes too long
        while (fromBlock <= latestBlock.number) {
            let toBlock
            while (fromBlock <= latestBlock.number) {
                toBlock = fromBlock + fetchLimit
                if (toBlock > latestBlock.number) {
                    toBlock = latestBlock.number
                }
                this.log(`fetching #${fromBlock}-${toBlock}`)
                const logs = await this.client.getLogs({
                    address: this.productFactory.address,
                    events: ProductFactoryEvents,
                    fromBlock,
                    toBlock,
                    strict: true,
                })
                await this.handleLogs(logs as ProductFactoryEventLog[])

                fromBlock = toBlock + 1n
            }

            await e.update(e.ProductFactory, () => ({
                filter_single: {
                    chain: this.chainQuery(),
                    address: this.productFactory.address,
                },
                set: {
                    uptoBlock: latestBlock.number
                }
            })).run(this.db)

            latestBlock = await this.client.getBlock({ blockTag: 'latest' })
        }

        this.log(`up to date: #${latestBlock.number}`)
    }

    async handleLogs(logs: ProductFactoryEventLog[]) {
        for (const log of logs) {
            this.log(log.eventName, log.args)

            switch (log.eventName) {
                case 'ProductCreated':
                    await e.insert(e.ProductCreated, {
                        chain: this.chainQuery(),
                        address: toLower(log.address),
                        blockNumber: log.blockNumber!,
                        blockHash: toLower(log.blockHash!),
                        logIndex: log.logIndex!,
                        txHash: toLower(log.transactionHash!),
                        product: toLower(log.args.product),
                        productImpl: toLower(log.args.productImpl),
                        vendor: toLower(log.args.vendor),
                    }).unlessConflict().run(this.db)
                    break

                case 'DeviceCreated':
                    await e.insert(e.DeviceCreated, {
                        chain: this.chainQuery(),
                        address: toLower(log.address),
                        blockNumber: log.blockNumber!,
                        blockHash: toLower(log.blockHash!),
                        logIndex: log.logIndex!,
                        txHash: toLower(log.transactionHash!),
                        product: toLower(log.args.product),
                        device: toLower(log.args.device),
                        tokenId: log.args.tokenId,
                    }).unlessConflict().run(this.db)
                    break

                case 'DeviceActivated':
                    await e.insert(e.DeviceActivated, {
                        chain: this.chainQuery(),
                        address: toLower(log.address),
                        blockNumber: log.blockNumber!,
                        blockHash: toLower(log.blockHash!),
                        logIndex: log.logIndex!,
                        txHash: toLower(log.transactionHash!),
                        product: toLower(log.args.product),
                        device: toLower(log.args.device),
                        receiver: toLower(log.args.receiver),
                    }).unlessConflict().run(this.db)
                    break

                case 'OwnershipTransferred':
                    await e.insert(e.OwnershipTransferred, {
                        chain: this.chainQuery(),
                        address: toLower(log.address),
                        blockNumber: log.blockNumber!,
                        blockHash: toLower(log.blockHash!),
                        logIndex: log.logIndex!,
                        txHash: toLower(log.transactionHash!),
                        previousOwner: toLower(log.args.previousOwner),
                        newOwner: toLower(log.args.newOwner)
                    }).unlessConflict().run(this.db)
                    break

                default:
                    break
            }
        }

        if (logs.length > 0) {
            await this.fillMissingBlocks()
        }
    }
}
