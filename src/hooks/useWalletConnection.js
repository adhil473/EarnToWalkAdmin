import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useMobileDetection } from './useMobileDetection'
import { useEffect, useState } from 'react'

export const useWalletConnection = () => {
  const { address, isConnected, isConnecting } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { open, close } = useWeb3Modal()
  const { isMobile, isIOS, isAndroid } = useMobileDetection()
  const [connectionAttempts, setConnectionAttempts] = useState(0)

  const handleMobileConnection = async (walletId) => {
    if (connectionAttempts >= 3) {
      console.warn('Max connection attempts reached')
      return
    }

    try {
      setConnectionAttempts(prev => prev + 1)
      
      if (isMobile) {
        // For mobile, try direct deep link first
        const connector = connectors.find(c => c.id === walletId)
        if (connector) {
          await connect({ connector })
        } else {
          // Fallback to Web3Modal
          await open()
        }
      } else {
        await open()
      }
    } catch (error) {
      console.error('Connection failed:', error)
      // Retry with Web3Modal as fallback
      if (connectionAttempts < 2) {
        setTimeout(() => open(), 1000)
      }
    }
  }

  const resetConnectionAttempts = () => {
    setConnectionAttempts(0)
  }

  useEffect(() => {
    if (isConnected) {
      resetConnectionAttempts()
      close()
    }
  }, [isConnected, close])

  return {
    address,
    isConnected,
    isConnecting,
    isMobile,
    isIOS,
    isAndroid,
    connect: handleMobileConnection,
    disconnect,
    openModal: open,
    closeModal: close,
    connectionAttempts,
    resetConnectionAttempts
  }
}