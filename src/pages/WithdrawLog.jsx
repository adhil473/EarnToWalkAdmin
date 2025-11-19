import React,{useEffect,useState} from 'react'
import { withdrawAllAccept, withdrawHistory } from '../api/serviceApi'
import { motion, AnimatePresence } from 'framer-motion'
import tether from '../assets/usdt.png'
import { useToast } from '../context/ToastContext'
function WithdrawLog() {
  const { showToast } = useToast()
  const [historyData, setHistoryData] = useState([])
  const [pagination, setPagination] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handlegetHistory = async(page = 1) => {
    try {
      const res = await withdrawHistory(page);
      setHistoryData(res.data.withdrawals)
      setPagination(res.data.pagination)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch withdrawal history:', error)
    }
  }

  const handlePageChange = (page) => {
    handlegetHistory(page)
  }

  useEffect(() => {
    handlegetHistory()
  }, [])

  const handlewithdrawAll=async()=>{
    try {
      const res =await withdrawAllAccept();
       if(res.success){
        showToast(res.message || 'All withdrawals approved successfully')
        handlegetHistory(currentPage)
        handlegetHistory()
       }
    } catch (error) {
      
    }
    setShowConfirmModal(false)
  }

  return (
    <div className='md:p-8 space-y-10 mt-20 md:ml-2 p-2'>
      <div>
        <h3 className="text-white text-xl font-semibold mb-4">Withdraw Log</h3>
        <div className="flex justify-end mb-4">
          <button 
            className="bg-[#00d1b2] hover:bg-[#00b89f] text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
            onClick={() => setShowConfirmModal(true)}
          >
            Accept All
          </button>
        </div>
      </div>
      {/* Table Section */}
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
                      onClick={() => copyToClipboard(item.userId._id)}
                      title="Click to copy"
                    >
                      {item.userId._id.slice(0, 8)}...
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
                      onClick={() => copyToClipboard(item.calculationDetails?.walletAddress)}
                      title="Click to copy"
                    >
                      {item.calculationDetails?.walletAddress ?
                        `${item.calculationDetails.walletAddress.slice(0, 6)}...${item.calculationDetails.walletAddress.slice(-4)}`
                        : 'N/A'
                      }
                    </div>
                    <div
                      className="cursor-pointer hover:text-[#00d1b2] transition-colors"
                      onClick={() => copyToClipboard(item.calculationDetails?.transactionHash)}
                      title="Click to copy"
                    >
                      {item.calculationDetails?.transactionHash ?
                        `${item.calculationDetails.transactionHash.slice(0, 6)}...${item.calculationDetails.transactionHash.slice(-4)}`
                        : 'N/A'
                      }
                    </div>
                    <div
                      className="cursor-pointer hover:text-[#00d1b2] transition-colors"
                      onClick={() => copyToClipboard(item.calculationDetails?.blockNumber?.toString())}
                      title="Click to copy"
                    >
                      {item.calculationDetails?.blockNumber || 'N/A'}
                    </div>
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

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 p-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-[#1a2c2c] text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a3c3c]"
          >
            Previous
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${currentPage === page
                  ? 'bg-[#00d1b2] text-white'
                  : 'bg-[#1a2c2c] text-gray-300 hover:bg-[#2a3c3c]'
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="px-3 py-1 bg-[#1a2c2c] text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a3c3c]"
          >
            Next
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#050D0F] border border-[#1f2e2e] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-semibold mb-4">Confirm Action</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to accept all pending withdrawals?</p>
            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#00d1b2] hover:bg-[#00b89f] text-white rounded-lg transition-colors"
                onClick={handlewithdrawAll}
              >
                Yes, Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WithdrawLog