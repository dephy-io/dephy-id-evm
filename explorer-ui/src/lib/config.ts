import { bscTestnet, type Chain } from "viem/chains";

import { env } from "@/env"

import BNBLogo from '@/assets/bnb-logo.svg'

type ChainProps = Record<number, string>

export type ChainProp = Chain & {
  title?: string
  logo?: never
}

const chainsDev: ChainProps = {
  97: "https://indexer-bnb-testnet-api.dephy.id/graphql"
}

const chainsProd: ChainProps = {
  97: "https://indexer-bnb-testnet-api.dephy.id/graphql"
}

const chainConfig: ChainProps = env.NEXT_PUBLIC_ENV === "production" ? chainsProd : chainsDev

const chains = [
  {
    ...bscTestnet,
    logo: BNBLogo as unknown as never,
    title: 'BSC Testnet',
  }
]

export {
  chainConfig,
  chains
}
