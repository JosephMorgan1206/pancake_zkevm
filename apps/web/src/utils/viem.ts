import { ChainId } from '@pancakeswap/sdk'
import { OnChainProvider } from '@pancakeswap/smart-router/evm'
import { CHAINS } from 'config/chains'
import { PUBLIC_NODES } from 'config/nodes'
import { createPublicClient, http } from 'viem'
// eslint-disable-next-line
// const clients = CHAINS.reduce((prev, cur) => {
//   return {
//     ...prev,
//     [cur.id]: createPublicClient({
//       chain: cur,
//       transport: http(PUBLIC_NODES[cur.id], {
//         timeout: 15_000,
//       }),
//     }),
//   }
// }, {} as Record<ChainId, ReturnType<typeof createPublicClient>>)
const clients = {
    [CHAINS[0].id]: createPublicClient({
      chain: CHAINS[0],
      transport: http(PUBLIC_NODES[CHAINS[0].id], {
        timeout: 15_000,
      }),
    }),
  }

// @ts-ignore
export const viemClients: OnChainProvider = ({ chainId }: { chainId?: ChainId }) => {
  return clients[chainId]
}
