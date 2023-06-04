import { ChainId, WETH9, ERC20Token } from '@pancakeswap/sdk'

import { CAKE, USDC, USDT } from './common'

export const ethereumTokens = {
  weth: WETH9[ChainId.ETHEREUM],
  usdt: USDT[ChainId.ETHEREUM],
  usdc: USDC[ChainId.ETHEREUM],
  cake: CAKE[ChainId.ETHEREUM],
}