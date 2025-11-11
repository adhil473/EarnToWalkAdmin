// Utility functions for wallet connections
export const isMobileWallet = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const getWalletDeepLink = (walletId, uri) => {
  const deepLinks = {
    metamask: `metamask://wc?uri=${encodeURIComponent(uri)}`,
    trust: `trust://wc?uri=${encodeURIComponent(uri)}`,
    rainbow: `rainbow://wc?uri=${encodeURIComponent(uri)}`,
    coinbase: `cbwallet://wc?uri=${encodeURIComponent(uri)}`
  }
  
  return deepLinks[walletId] || uri
}

export const handleMobileWalletConnection = async (walletId, connectFunction) => {
  const maxRetries = 3
  let attempts = 0
  
  while (attempts < maxRetries) {
    try {
      await connectFunction()
      return true
    } catch (error) {
      attempts++
      console.warn(`Connection attempt ${attempts} failed:`, error)
      
      if (attempts < maxRetries) {
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts))
      }
    }
  }
  
  throw new Error('Failed to connect after maximum retries')
}

export const checkWalletAvailability = () => {
  const wallets = {
    metamask: !!window.ethereum?.isMetaMask,
    trust: !!window.ethereum?.isTrust,
    coinbase: !!window.ethereum?.isCoinbaseWallet
  }
  
  return wallets
}