
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import tether from '../assets/withdraw/tether.png'
import { FaPlus } from 'react-icons/fa'
import close from '../assets/changepassword/close.png'
import upload from '../assets/changepassword/upload.png'
import { binaryCommission, supportTicketHistory } from '../api/serviceApi'
import { useToast } from '../context/ToastContext'


function BinaryCommissions() {

  const [historyData, sethistoryData] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const { showToast } = useToast();


  const getCommissionHistory = async (page = 1) => {
    try {
      const res = await binaryCommission(page);
      if (res.success) {
        sethistoryData(res.data.transactions || []);
        setTotalEarnings(res.data.totalEarnings || 0);
        setPagination(res.data.pagination || { page: 1, totalPages: 1, total: 0 });
      }
    } catch (error) {
      showToast('Failed to fetch commission data', 'error');
    }
  }

  useEffect(() => {
    getCommissionHistory(currentPage);
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }




  return (
    <div className="min-h-screen bg-black text-white px-2 md:px-20 py-6 md:py-12 space-y-10 mt-16">
      {/* Personal Details Section */}
      <div>
        <div className="flex justify-between items-start mb-1">
          <div>
            <h2 className="text-xl font-semibold">Binary Commission</h2>
            <p className="text-sm text-gray-400 mt-2">View Your Binary Commission </p>
          </div>
          {/* <button className="text-white font-semibold text-sm px-4.5 py-2.5 rounded-lg transition-all duration-300 hover:scale-95 whitespace-nowrap flex items-center gap-2 border border-[#4B5563]">
                <img src={edit} alt='edit' className='w-4' /> Edit
              </button> */}
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Earnings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
          >
            <div className='flex items-center'>
              <p className="text-md text-gray-400 mb-1">Total Earnings</p>
            </div>
            <div className="flex items-center gap-2 text-[#31BDD0] text-2xl font-bold max-md:text-white max-md:text-lg ml-3">
              <img src={tether} alt="tether" className="w-6 h-6" />
              <span>{totalEarnings}</span>
            </div>
          </motion.div>




        </div>
      </div>
      {/* ========== Withdrawal History Heading ========== */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-xl font-semibold">Transactions</h3>

      </div>

      {/* ========== Table Section ========== */}
      <div className="overflow-x-auto border border-[#1f2e2e] rounded-lg">
        <div className="min-w-[600px]">
          {/* Table Header */}
          <div className="grid grid-cols-5 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e]">
            <p>Amount</p>
            <p>Date</p>
            <p>Left Leg</p>
            <p>Right Leg</p>
            <p>Weaker Leg</p>
          </div>

          {/* Table Rows */}
          <AnimatePresence>
            {historyData.length > 0 ? historyData.map((item, index) => (
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
                className="grid grid-cols-5 items-center bg-[#050D0F] text-sm text-gray-300 px-5 py-3 border-b border-[#1f2e2e] hover:bg-[#112828] transition"
              >
                <div>
                  <div className="flex items-center gap-2 text-green-400 font-medium">
                    <img src={tether} alt="tether" className="w-4 h-4" />
                    <span>{item.amount}</span>
                  </div>
                </div>
                <div>
                  <p>{new Date(item.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">{new Date(item.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                </div>
                <div>
                  <p>{item.leftLeg}</p>
                </div>
                <div>
                  <p>{item.rightLeg}</p>
                </div>
                <div>
                  <p className="text-orange-400">{item.weakerLeg}</p>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-8 text-gray-400">
                No commission data available
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-[#050D0F] border border-[#1f2e2e] rounded-lg text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#112828] transition"
          >
            Previous
          </button>

          {[...Array(pagination.totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-lg transition ${currentPage === page
                    ? 'bg-green-600 text-white'
                    : 'bg-[#050D0F] border border-[#1f2e2e] text-gray-300 hover:bg-[#112828]'
                  }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="px-3 py-2 bg-[#050D0F] border border-[#1f2e2e] rounded-lg text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#112828] transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default BinaryCommissions