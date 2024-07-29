import { parseArgs } from "util"
import * as edgedb from "edgedb"
import e from "indexer-storage"
import * as chains from "viem/chains";


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
            active: {
                type: 'boolean',
            },
        }
    })

    const chain = chains[options.chainName!]

    if (!chain) {
        throw `No chain named ${options.chainName}`
    }

    console.log(`set ${options.chainName!}@${options.address} active: ${!!options.active}`)

    const db = await edgedb.createClient(options.database).ensureConnected()

    await e.update(e.ProductFactory, (pf) => ({
        filter_single: {
            chain: e.select(e.Chain, () => ({
                filter_single: {
                    name: options.chainName!,
                }
            })),
            address: options.address!.toLowerCase(),
        },
        set: {
            active: !!options.active!,
        }
    })).run(db)

    console.log('Done')
} catch (error) {
    console.error(error)
}
