/* eslint-disable camelcase */
import {
  Currency,
  CurrencyAmount,
  Pair,
  WETH,
  WETH9,
} from '@pancakeswap/sdk'
import useSWRImmutable from 'swr/immutable'
import useSWR from 'swr'
import BigNumber from 'bignumber.js'
import { fetchCommonTokenUSDValue } from '@pancakeswap/farms/src/fetchFarmsV3'
import { CAKE } from '@pancakeswap/tokens'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { priceHelperTokens, CAKE_WETH_LP_MAINNET } from '@pancakeswap/farms/constants/common'
import { usePairContract } from 'hooks/useContract'
import { useProvider } from 'wagmi'
import { multiplyPriceByAmount } from 'utils/prices'

import { BIG_ZERO } from './bigNumber'

export const useCakePrice = () => {
  return useSWRImmutable(
    ['cake-usd-price'],
    async () => {
      const cake = await (await fetch('https://farms-api.pancakeswap.com/price/cake')).json()
      return cake.price as string
    },
    {
      refreshInterval: 1_000 * 10,
    },
  )
}

// for migration to bignumber.js to avoid breaking changes
export const useCakePriceAsBN = () => {
  const { chainId } = useActiveChainId()
  const cakebnbPrice = usePriceByPairs(WETH9[chainId], CAKE[chainId])

  const { data } = useSWRImmutable(
    ['cake-usd-price-bn'],
    async () => {
      const commonPrice = await fetchCommonTokenUSDValue(priceHelperTokens[chainId])
      
      const wbnb_price = Number(commonPrice['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'])
      const usdAmount = multiplyPriceByAmount(cakebnbPrice, wbnb_price)
      // const cake = await (await fetch('https://farms-api.pancakeswap.com/price/cake')).json()
      return new BigNumber(usdAmount.toFixed(2))
    },
    {
      compare: (a, b) => {
        if (!a && !b) return true
        if (!a || !b) return false
        return a.eq(b)
      },
      refreshInterval: 1_000 * 10,
    },
  )

  return data ?? BIG_ZERO
}

export const usePriceByPairs = (currencyA?: Currency, currencyB?: Currency) => {
  const [tokenA, tokenB] = [currencyA?.wrapped, currencyB?.wrapped]
  const pairContract = usePairContract(CAKE_WETH_LP_MAINNET)
  const provider = useProvider({ chainId: currencyA.chainId })

  const { data: price } = useSWR(
    currencyA && currencyB && ['pair-price', currencyA, currencyB],
    async () => {
      const reserves = await pairContract.connect(provider).getReserves()
      if (!reserves) {
        return null
      }
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

      const pair = new Pair(
        CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
        CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
      )

      return pair.priceOf(tokenB)
    }
  )

  return price
}
