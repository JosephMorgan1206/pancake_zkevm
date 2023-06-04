import { ChainId } from '@pancakeswap/sdk'

// = 1 << 23 or 100000000000000000000000
export const V2_FEE_PATH_PLACEHOLDER = 8388608

export const MSG_SENDER = '0x0000000000000000000000000000000000000001'
export const ADDRESS_THIS = '0x0000000000000000000000000000000000000002'

export const MIXED_ROUTE_QUOTER_ADDRESSES = {
  [ChainId.ETHEREUM]: '0x8B08e6e1EeAE036E1A9F3277329a94545319E20a',
  [ChainId.GOERLI]: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
  [ChainId.BSC]: '0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86',
  [ChainId.BSC_TESTNET]: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
} as const

export const V3_QUOTER_ADDRESSES = {
  [ChainId.ETHEREUM]: '0xD2dE044b819929803c876bD65054064450cf3870',
  [ChainId.GOERLI]: '0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2',
  [ChainId.BSC]: '0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997',
  [ChainId.BSC_TESTNET]: '0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2',
} as const