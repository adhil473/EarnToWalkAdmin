import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { bsc } from 'wagmi/chains'
// Get projectId from https://cloud.walletconnect.com
export const projectId = '6e2a0b3bfca4d9509beb19d48f85941f'

if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'WinFlood',
  description: 'WinFlood DApp',
  url: 'https://winflood.com',
  icons: ['https://winflood.com/favicon.ico']
}

// Create wagmiConfig
const chains = [bsc]
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
})