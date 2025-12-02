
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pendingWithdrawal, withdrawAllAccept, withdrawHistory } from '../api/serviceApi';
import tether from '../assets/usdt.png'
import { useToast } from '../context/ToastContext'
function DepositLog() {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [status, setStatus] = useState([])
  const [historyData, setHistoryData] = useState([])
  const [pagination, setPagination] = useState(null)
  const [isAccepting, setIsAccepting] = useState(false)
  const { showToast } = useToast()
  const handlegetHistory = async (page = 1) => {
    try {
      const res = await withdrawHistory(page);
      

    } catch (error) {
      console.error('Failed to fetch withdrawal history:', error)
    }
  }

  const handlePageChange = (page) => {
    handlegetHistory(page)
  }
  const getpendingwithdrawals = async () => {
    try {
      const res = await pendingWithdrawal()
      if (res.success) {
        setHistoryData(res.data.withdrawals)
        setStatus(res.data)
        setPagination(res.data.pagination)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handlegetHistory()
    getpendingwithdrawals()
  }, [])


  const handlewithdrawAll = async () => {
    if (isAccepting) return;
    
    setIsAccepting(true);
    try {
      const res = await withdrawAllAccept();
      if (res.success) {
          showToast(res.message )
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsAccepting(false);
      setShowConfirmModal(false)
    }
  }
  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6 md:py-12 space-y-10 mt-16">
      <h3 className='text-xl font-semibold'>Withdraw</h3>
      <div className=" flex justify-end ">
        <button
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3 rounded-full font-medium transition-all duration-200 hover:bg-white/20 hover:border-white/30 w-full md:w-auto self-end"
          onClick={() => setShowConfirmModal(true)}
        >
          Accept All
        </button>
      </div>
      <div className=" flex flex-col md:flex-row justify-between items-start gap-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px] w-full md:flex-1 md:max-w-xs"
        >
          <div className='flex items-center'>
            <p className="text-md text-green-400 mb-1">Total Pending Amount</p>
          </div>
          <div className="flex items-center mt-2">
            <img src={tether} alt='tether' className='w-8 mr-2' />
            <p className="text-2xl font-medium">{status.totalPendingAmount}</p>
          </div>
        </motion.div>

      </div>

      {/* Pending Withdrawals Table */}
      <div className="overflow-x-auto border border-[#1f2e2e] rounded-lg">
        <div className="min-w-[1200px]">
          {/* Table Header */}
          <div className="grid grid-cols-9 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e]">
            <p>Date & Time</p>
            <p>User ID</p>
            <p>Name</p>
            <p>Email</p>
            <p>Amount</p>
            <p>Wallet Address</p>
            <p>Transaction Hash</p>
            <p>Block Number</p>
            <p>Status</p>
          </div>

          {/* Table Rows */}
          <AnimatePresence>
            {historyData.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-gray-400">
                <p>No records available</p>
              </div>
            ) : (
              historyData.map((item, index) => {
                const copyToClipboard = (text) => {
                  navigator.clipboard.writeText(text)
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.1
                    }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="grid grid-cols-9 items-center bg-[#050D0F] text-sm text-gray-300 px-5 py-3 border-b border-[#1f2e2e] hover:bg-[#112828] transition"
                  >
                    <div>
                      <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                    </div>
                    <div
                      className="cursor-pointer hover:text-[#00d1b2] transition-colors"
                      onClick={() => copyToClipboard(item.userId._id || item._id)}
                      title="Click to copy"
                    >
                      {(item.userId._id || item._id).slice(0, 8)}...
                    </div>
                    <div>{item.userId.name}</div>
                    <div
                      className="cursor-pointer hover:text-[#00d1b2] transition-colors truncate"
                      onClick={() => copyToClipboard(item.userId.email)}
                      title={item.userId.email}
                    >
                      {item.userId.email.length > 20 ? `${item.userId.email.slice(0, 20)}...` : item.userId.email}
                    </div>
                    <div className="flex items-center gap-2 text-[#00c896] font-semibold">
                      <img src={tether} alt='tether' className='w-4' />
                      {item.amount}
                    </div>
                    <div
                      className="cursor-pointer hover:text-[#00d1b2] transition-colors"
                      onClick={() => copyToClipboard(item.userId.walletAddress)}
                      title="Click to copy"
                    >
                      {item.userId.walletAddress ?
                        `${item.userId.walletAddress.slice(0, 6)}...${item.userId.walletAddress.slice(-4)}`
                        : 'N/A'
                      }
                    </div>
                    <div className="text-gray-500">N/A</div>
                    <div className="text-gray-500">N/A</div>
                    <div>
                      <div style={{
                        display: 'inline-block',
                        padding: '5px 12px',
                        backgroundColor: item.status === 'FAILED' ? '#1a0e0e' : '#0e1a0e',
                        color: item.status === 'FAILED' ? '#dc2626' : '#0d9c44ff',
                        border: item.status === 'FAILED' ? '1px solid #dc2626' : '1px solid #0d9c44ff',
                        borderRadius: '10px',
                        fontWeight: 500,
                        fontSize: '14px',
                        width: 'fit-content'
                      }}>
                        {item.status}
                      </div>
                    </div>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#050D0F] border border-[#1f2e2e] rounded-xl p-6 max-w-sm w-full"
            >
              <h3 className="text-white text-lg font-semibold mb-4">Confirm Action</h3>
              <p className="text-gray-300 mb-6">Are you sure you want to accept all withdrawals?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  No
                </button>
                <button
                  onClick={handlewithdrawAll}
                  disabled={isAccepting}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center ${
                    isAccepting 
                      ? 'bg-green-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isAccepting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Yes'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DepositLog