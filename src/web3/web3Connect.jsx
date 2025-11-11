import { useAccount, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'

export default function ConnectWeb3() {
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { open } = useWeb3Modal()

    if (isConnected) {
        return (
            <div 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    disconnect();
                }}
                className='border border-[#1f2e2e] px-3 py-2 rounded-md font-semibold text-sm cursor-pointer hover:border-[#00bcd4] transition-colors'
            >
                <span className='text-[#00bcd4]'>Wallet ID</span>
                <span className='text-[#D1D5DB]'>: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </div>
        )
    }
    return (
        <button 
            onClick={() => open()}
            className=" shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] font-semibold text-sm tracking-wide transition-all duration-300 bg-gradient-to-r from-[#1de9a6] via-[#2df0b3] to-[#00bfa5] text-black hover:scale-95 focus:outline-none hover:bg-[#6BE094] text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
            Connect Wallet
        </button>
    )
}