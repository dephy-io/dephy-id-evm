import { parseArgs } from "util"
import { Address } from "viem"
import * as edgedb from "edgedb"
import { Indexer } from './src/indexer'
import e from "indexer-storage"


try {
    const { values: options } = parseArgs({
        options: {
            database: {
                type: 'string',
                short: 'd',
                default: 'dephy-id-evm-indexer',
            },
        }
    })

    const db = await edgedb.createClient(options.database).ensureConnected()

    const productFactories = await e.select(e.ProductFactory, () => ({
        id: true,
        chain: {
            name: true,
            chainId: true,
        },
        address: true,
        uptoBlock: true,
        active: true,
    })).run(db)

    let indexeres: Indexer[] = []
    for (const { id, chain, address, uptoBlock, active } of productFactories) {
        if (!active) {
            console.log(`${chain.name}@${address} is inactive`)
            continue
        }
        const indexer = new Indexer({
            db,
            chain,
            productFactory: { id, address: address as Address, uptoBlock },
        })
        indexeres.push(indexer)
    }

    for (const indexer of indexeres) {
        indexer.run()
    }

    process.on("SIGINT", () => {
        console.log("Exiting...")
        process.exit()
    })

} catch (error) {
    console.error(error)
}
