import React,{useEffect,useState} from 'react'
import { withdrawHistory } from '../api/serviceApi'
import { motion, AnimatePresence } from 'framer-motion'
import tether from '../assets/usdt.png'

function WithdrawLog() {
  const [historyData, setHistoryData] = useState([])
  const [pagination, setPagination] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

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

  return (
    <div className='md:p-8 space-y-10 mt-20 md:ml-2 p-2'>
      <div>
        <h3 className="text-white text-xl font-semibold mb-4">Withdraw Log</h3>
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
                      className="cursor-pointer hover:text-[#00d1b2] transition-colors"
                      onClick={() => copyToClipboard(item.userId.email)}
                      title="Click to copy"
                    >
                      {item.userId.email}
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
    </div>
  )
}

export default WithdrawLog