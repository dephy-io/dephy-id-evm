import { parseArgs } from 'util'
import * as edgedb from "edgedb"
import { Indexer } from '../src/indexer'
import e from "indexer-storage"
import { Address } from 'viem'

try {
    const { values: options } = parseArgs({
        strict: true,
        options: {
            database: {
                type: 'string',
                short: 'd',
                default: 'dephy-id-evm-indexer',
            },
            chainName: {
                type: 'string',
                short: 'c',
            },
            address: {
                type: 'string',
                short: 'a',
            },
            fromBlock: {
                type: 'string',
                short: 'f'
            },
            toBlock: {
                type: 'string',
                short: 't'
            },
        }
    })

    const fromBlock = BigInt(options.fromBlock!)
    const toBlock = BigInt(options.toBlock!)
    if (fromBlock > toBlock) {
        throw 'fromBlock must > toBlock'
    }

    const db = await edgedb.createClient(options.database).ensureConnected()

    const productFactory = await e.select(e.ProductFactory, (pf) => ({
        filter_single: e.op(e.op(pf.chain.name, '=', options.chainName!), 'and', e.op(pf.address, '=', options.address!)),
        chain: {
            name: true,
            chainId: true,
        },
        address: true,
        uptoBlock: true,
        active: true,
    })).run(db)

    if (productFactory) {
        console.log(productFactory)

        const indexer = new Indexer({
            db,
            chain: productFactory.chain,
            productFactory: { address: productFactory.address as Address, uptoBlock: productFactory.uptoBlock },
        })

        await indexer.fillEvents(fromBlock, toBlock)
        console.log('done')
        process.exit()
    } else {
        console.error(`Not found ${options.chainName} ${options.address}`)
    }
} catch (error) {
    console.error(error)
}
