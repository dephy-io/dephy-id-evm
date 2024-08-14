import * as chains from "viem/chains"

// custom chain settings here
chains.foundry.custom = {
    fetchLimit: 10n,
}

chains.bscTestnet.custom = {
    pollingInterval: 5_000,
}

chains.baseSepolia.custom = {
    fetchLimit: 1000n,
    pollingInterval: 500,
}

export default chains
