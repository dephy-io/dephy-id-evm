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
        chain: {
            name: true,
            chainId: true,
        },
        address: true,
        createdAt: true,
    })).run(db)

    let indexeres: Indexer[] = []
    for (const { chain, address, createdAt } of productFactories) {
        const indexer = new Indexer({
            db,
            chain,
            productFactory: { address: address as Address, createdAt },
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
