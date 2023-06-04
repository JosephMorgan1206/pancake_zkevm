import { ethereumTokens } from '@pancakeswap/tokens'
import { FarmConfigV3, SerializedFarmConfig } from '@pancakeswap/farms'
import { FeeAmount, Pool } from '@pancakeswap/v3-sdk'

export const farmsV3 = [
  {
    pid: 1,
    lpSymbol: 'USDC-ETH LP',
    lpAddress: '0x72C6C85cd4f1d16Aec0154e5B3713019B2710790',
    token: ethereumTokens.weth,
    quoteToken: ethereumTokens.usdc,
    feeAmount: FeeAmount.LOW,
  }
] satisfies FarmConfigV3[]

const farms: SerializedFarmConfig[] = [
  {
    pid: 1,
    lpSymbol: 'USDC-ETH LP',
    lpAddress: '0x72C6C85cd4f1d16Aec0154e5B3713019B2710790',
    token: ethereumTokens.usdc,
    quoteToken: ethereumTokens.weth,
    feeAmount: FeeAmount.LOW,
  }
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms