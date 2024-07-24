import { parseArgs } from "util"
import * as edgedb from "edgedb"
import e from "indexer-storage"
import * as chains from "viem/chains";


try {
    const { values: options } = parseArgs({
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
            createdAtBlock: {
                type: 'string',
                short: 'b'
            },
        }
    })

    const chain = chains[options.chainName!]

    if (!chain) {
        throw `No chain named ${options.chainName}`
    }

    console.log(`adding ${options.chainName}: ${chain.id} ${chain.name}`)

    const db = await edgedb.createClient(options.database).ensureConnected()

    await e.insert(e.ProductFactory, {
        chain: e.insert(e.Chain, {
            name: options.chainName!,
            chainId: BigInt(chain.id),
            fullName: chain.name,
        }).unlessConflict(c => ({
            on: c.chainId,
            else: c
        })),
        address: options.address!.toLowerCase(),
        createdAt: BigInt(options.createdAtBlock!)
    }).run(db)

    console.log('Done')
} catch (error) {
    console.error(error)
}
