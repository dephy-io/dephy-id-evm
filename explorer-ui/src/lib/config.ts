import { bscTestnet, baseSepolia, type Chain } from "viem/chains";

import BNBLogo from '@/assets/bnb-logo.svg'
import BaseLogo from '@/assets/base-logo.svg'

export type ChainProp = Chain & {
  title?: string
  logo?: never
}

const chains = [
  {
    ...bscTestnet,
    logo: BNBLogo as unknown as never,
    title: 'BSC Testnet',
  },
  {
    ...baseSepolia,
    logo: BaseLogo as unknown as never,
    title: 'Base Sepolia'
  }
]

export {
  chains
}
