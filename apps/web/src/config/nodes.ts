import { ChainId } from '@pancakeswap/sdk'
import { getNodeRealUrlV2 } from 'utils/nodeReal'

export const SERVER_NODES = {
  [ChainId.BSC]: process.env.NEXT_PUBLIC_NODE_PRODUCTION,
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  [ChainId.ETHEREUM]: 'https://zkevm-rpc.com',
  [ChainId.GOERLI]: getNodeRealUrlV2(ChainId.GOERLI, process.env.SERVER_NODE_REAL_API_GOERLI),
} satisfies Record<ChainId, string>

export const PUBLIC_NODES = {
  [ChainId.BSC]: process.env.NEXT_PUBLIC_NODE_PRODUCTION,
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  [ChainId.ETHEREUM]: 'https://zkevm-rpc.com',
  [ChainId.GOERLI]: getNodeRealUrlV2(ChainId.GOERLI, process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI),
} satisfies Record<ChainId, string>
