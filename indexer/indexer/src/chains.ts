import * as chains from "viem/chains"

// custom chain settings here
chains.foundry.custom = {
    fetchLimit: 10n,
}

export default chains
