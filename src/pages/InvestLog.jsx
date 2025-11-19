import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { investHistory, investStatus } from '../api/serviceApi'
import tether from '../assets/usdt.png'

function InvestLog() {
  const [historyData, setHistoryData] = useState([])
  const [statusData, setStatusData] = useState({})
  const [pagination, setPagination] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const handlegetHistory = async (page = 1) => {
    try {
      setLoading(true)
      const res = await investHistory(page)
      setHistoryData(res.data.purchases || [])
      setPagination(res.data.pagination)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch purchase history:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handlegetStatus = async () => {
    try {
      const res = await investStatus()
      setStatusData(res.data || {})
    } catch (error) {
      console.error('Failed to fetch purchase status:', error)
    }
  }

  const handlePageChange = (page) => {
    handlegetHistory(page)
  }

  useEffect(() => {
    handlegetHistory()
    handlegetStatus()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6 md:py-12 space-y-10 mt-16">
      {/* Header Section */}
      <div>
        <div className="flex justify-between items-start mb-1">
          <div>
            <h2 className="text-xl font-semibold">Investment Log</h2>
            <p className="text-sm text-gray-400 mt-2">View And Manage Your Investment History</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Total Investments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
          >
            <div className='flex items-center'>
              <p className="text-md text-gray-400 mb-1">Total Investments</p>
            </div>
            <p className="text-2xl font-medium ml-3">{statusData.totalCount || 0}</p>
          </motion.div>

          {/* Total Amount */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
          >
            <div className='flex items-center'>
              <p className="text-md text-gray-400 mb-1">Total Amount</p>
            </div>
            <div className="flex items-center ml-3">
              <img src={tether} alt='tether' className='w-4 mr-2' />
              <p className="text-2xl font-medium">{statusData.totalAmount || 0}</p>
            </div>
          </motion.div>

          {/* Today's Investments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
          >
            <div className='flex items-center'>
              <p className="text-md text-gray-400 mb-1">Today's Count</p>
            </div>
            <p className="text-2xl font-medium ml-3">{statusData.todayCount || 0}</p>
          </motion.div>

          {/* Today's Amount */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
          >
            <div className='flex items-center'>
              <p className="text-md text-gray-400 mb-1">Today's Amount</p>
            </div>
            <div className="flex items-center ml-3">
              <img src={tether} alt='tether' className='w-4 mr-2' />
              <p className="text-2xl font-medium">{statusData.todayAmount || 0}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Investment History Heading */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-xl font-semibold">Investment History</h3>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border border-[#1f2e2e] rounded-lg">
        <div className="w-full">
          {/* Table Header */}
          <div className="grid grid-cols-11 gap-2 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e] min-w-[1400px]">
            <p>Transaction ID</p>
            <p>Date</p>
            <p>User ID</p>
            <p>Name</p>
            <p>Email</p>
            <p>Referral ID</p>
            <p>Package Type</p>
            <p>Amount</p>
            <p>Status</p>
            <p>Method</p>
            <p>Transaction Hash</p>
          </div>

          {/* Table Rows */}
          <AnimatePresence>
            {loading ? (
              <div className="bg-[#050D0F] text-center py-12 px-5">
                <div className="text-gray-400">
                  <p className="text-lg mb-2">Loading...</p>
                </div>
              </div>
            ) : historyData.length > 0 ? (
              historyData.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1
                  }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="grid grid-cols-11 gap-2 items-center bg-[#050D0F] text-sm text-gray-300 px-5 py-3 border-b border-[#1f2e2e] hover:bg-[#112828] transition min-w-[1400px]"
                >
                  <div>
                    <p>TXN: {item._id?.slice(-6).toUpperCase()}</p>
                  </div>
                  <div>
                    <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                  </div>
                  <div>
                    <p title={item.userId?._id}>
                      {item.userId?._id?.slice(-6).toUpperCase() || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p>{item.userId?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p title={item.userId?.email}>
                      {item.userId?.email || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p>{item.userId?.ownReferalId || 'N/A'}</p>
                  </div>
                  <div>
                    <p>{item.calculationDetails?.packageType || 'N/A'}</p>
                  </div>
                  <div className="flex items-center">
                    <img src={tether} alt='tether' className='w-4 mr-2' />
                    <p>{item.amount}</p>
                  </div>
                  <div>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: item.status === 'SUCCESS' ? '#0e1a0e' : '#1a0e0e',
                      color: item.status === 'SUCCESS' ? '#0d9c44ff' : '#d61317ff',
                      border: item.status === 'SUCCESS' ? '1px solid #0d9c44ff' : '1px solid #d81a1dff',
                      borderRadius: '8px',
                      fontWeight: 500,
                      fontSize: '12px',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.status}
                    </div>
                  </div>
                  <div>
                    <p>{item.calculationDetails?.purchaseMethod || 'N/A'}</p>
                  </div>
                  <div>
                    <p title={item.calculationDetails?.transactionHash}>
                      {item.calculationDetails?.transactionHash ? 
                        `${item.calculationDetails.transactionHash.slice(0, 8)}...${item.calculationDetails.transactionHash.slice(-8)}` 
                        : 'N/A'
                      }
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-[#050D0F] text-center py-12 px-5">
                <div className="text-gray-400">
                  <p className="text-lg mb-2">No Investment Records Found</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrev}
            className="px-3 py-2 bg-[#050D0F] border border-[#1f2e2e] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#112828] transition"
          >
            Previous
          </button>
          
          <span className="text-gray-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNext}
            className="px-3 py-2 bg-[#050D0F] border border-[#1f2e2e] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#112828] transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default InvestLog