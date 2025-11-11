import React from 'react'
import { FaExchangeAlt } from "react-icons/fa";

function TokenModal({ onClose ,planAmount}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#0c0f11] border border-[#1f2e2e] rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Add Token</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2"> USDT</label>
            <input 
              type="text" 
              className="w-full bg-[#14181c] border border-[#00d1b2] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#31BDD0]"
              placeholder="Enter USDT amount"
              value={planAmount}
              disabled
            />
          </div>
          <div className="w-full flex justify-center items-center "><FaExchangeAlt className="text-lg animate-pulse text-[#00d1b2] rotate-90" /></div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Token</label>
            <input 
              type="text" 
              className="w-full bg-[#14181c] border border-[#00d1b2] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#31BDD0]"
              value={'9999'}
              disabled
            />
          </div>
          <button className="w-full mt-4 py-2.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] hover:scale-95 transition-all duration-300">
            Add Token
          </button>
        </div>
      </div>
    </div>
  )
}

export default TokenModal