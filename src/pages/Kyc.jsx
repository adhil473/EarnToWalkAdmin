import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowDownToLine, Wallet, Gem, Filter, ChevronLeft, ChevronRight, FileText, X, Check, XIcon } from "lucide-react";
import time from '../assets/withdraw/time.png'
import usdt from '../assets/withdraw/usdt.png'
import withdraw from '../assets/withdraw/withdraw.png'
import tether from '../assets/withdraw/tether.png'
import { getUsersKYCDetails, verifyKYC } from '../api/serviceApi';
import { useToast } from '../context/ToastContext'


const Kyc = () => {
  const [historyData, setKycdata] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const { showToast } = useToast()
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState('')

  const handleStatusFilter = (selectedStatus) => {
    setStatus(selectedStatus)
    setPage(1)
    setShowFilter(false)
  }

  const openDocumentModal = (documentUrl) => {
    setSelectedDocument(documentUrl)
    setShowModal(true)
  }

  const handleKYCAction = async (id, action) => {
    try {
      const res = await verifyKYC(id, action)
      console.log('API Response:', res) // Debug log
      if(res?.success) {
        showToast(res.message || `KYC ${action} successfully`)
      } else {
        showToast(res?.message || 'Action failed', 'error')
      }
    } catch (error) {
      console.error('KYC Action Error:', error)
      showToast('Something went wrong', 'error')
    } finally {
      getKYCDeatils()
    }
  }


  const getKYCDeatils = async() => {
    setLoading(true)
    try {
      const params = {
        page,
        limit: 10,
        ...(status && { status })
      }
      const res = await getUsersKYCDetails(params)
      if(res.success) {
        setKycdata(res?.data?.submissions)
        setPagination(res?.data?.pagination)
      }
    } catch (error) {
      console.error('Error fetching KYC details:', error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getKYCDeatils()
  }, [page, status])

  const [timeLeft, setTimeLeft] = useState({
    hours: 9,
    minutes: 23,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
          return prev;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="md:p-8 p-2 space-y-10 mt-20 ml-2">


      {/* ========== KYC History Heading ========== */}
      <div className="flex items-center justify-between">
        <h3 className="text-white text-xl font-semibold">KYC History</h3>
        <div className="relative">
          <div 
            className="flex items-center gap-2 px-3 py-2 bg-[#050D0F] border border-[#1f2e2e] rounded-lg cursor-pointer hover:bg-[#112828] transition"
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-gray-300">Filter</span>
          </div>
          {showFilter && (
            <div className="absolute right-0 top-12 bg-[#050D0F] border border-[#1f2e2e] rounded-lg p-2 min-w-[120px] z-10">
              <div 
                className="px-3 py-2 hover:bg-[#112828] cursor-pointer rounded text-sm text-gray-300"
                onClick={() => handleStatusFilter('')}
              >
                All 
              </div>
              <div 
                className="px-3 py-2 hover:bg-[#112828] cursor-pointer rounded text-sm text-[#d4a853]"
                onClick={() => handleStatusFilter('pending')}
              >
                Pending
              </div>
              <div 
                className="px-3 py-2 hover:bg-[#112828] cursor-pointer rounded text-sm text-[#0d9c44ff]"
                onClick={() => handleStatusFilter('approved')}
              >
                Approved
              </div>
              <div 
                className="px-3 py-2 hover:bg-[#112828] cursor-pointer rounded text-sm text-[#dc2626]"
                onClick={() => handleStatusFilter('rejected')}
              >
                Rejected
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========== Table Section ========== */}
      <div className="overflow-x-auto border border-[#1f2e2e] rounded-lg">
        <div className="min-w-[1000px]">
          {/* Table Header */}
          <div className="grid grid-cols-8 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e]">
            <p>User Name</p>
            <p>Email</p>
            <p>Document Type</p>
            <p>Document Number</p>
            <p>Submitted At</p>
            <p>Status</p>
            <p>Document</p>
            <p>Actions</p>
          </div>

          {/* Table Rows */}
          <AnimatePresence>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-400">Loading...</div>
              </div>
            ) : historyData.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-400">No KYC submissions found</div>
              </div>
            ) : (
              historyData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeOut",
                    delay: index * 0.1 
                  }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="grid grid-cols-8 items-center bg-[#050D0F] text-sm text-gray-300 px-5 py-3 border-b border-[#1f2e2e] hover:bg-[#112828] transition"
                >
                  <p>{item.user?.name || 'N/A'}</p>
                  <p>{item.user?.email || 'N/A'}</p>
                  <p className="capitalize">{item.documentType?.replace('_', ' ')}</p>
                  <p>{item.documentNumber}</p>
                  <p>{new Date(item.submittedAt).toLocaleDateString()}</p>
                  <div style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    backgroundColor: item.status === 'pending' ? '#1a1a0e' : item.status === 'verified' ? '#0e1a0e' : '#1a0e0e',
                    color: item.status === 'pending' ? '#d4a853' : item.status === 'verified' ? '#0d9c44ff' : '#dc2626',
                    border: `1px solid ${item.status === 'pending' ? '#d4a853' : item.status === 'verified' ? '#0d9c44ff' : '#dc2626'}`,
                    borderRadius: '10px',
                    fontWeight: 500,
                    fontSize: '14px',
                    width: 'fit-content'
                  }}>
                    {item.status}
                  </div>
                  <div className="flex items-center">
                    {item.documentImageUrl ? (
                      <button 
                        onClick={() => openDocumentModal(item.documentImageUrl)}
                        className="text-[#1de9a6] hover:text-[#16c784] transition cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    ) : (
                      <FileText className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === 'pending' ? (
                      <>
                        <button 
                          onClick={() => handleKYCAction(item.id, 'verified')}
                          className="px-2 py-1 bg-[#0e1a0e] text-[#0d9c44ff] border border-[#0d9c44ff] rounded hover:bg-[#0d9c44ff] hover:text-white transition text-xs"
                        >
                          Verify
                        </button>
                        <button 
                          onClick={() => handleKYCAction(item.id, 'rejected')}
                          className="px-2 py-1 bg-[#1a0e0e] text-[#dc2626] border border-[#dc2626] rounded hover:bg-[#dc2626] hover:text-white transition text-xs"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-500">-</span>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            Showing {((pagination.page - 1) * 10) + 1} to {Math.min(pagination.page * 10, pagination.total)} of {pagination.total} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-[#050D0F] border border-[#1f2e2e] rounded-lg hover:bg-[#112828] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(pagination.totalPages)].map((_, i) => {
                const pageNum = i + 1
                if (pageNum === 1 || pageNum === pagination.totalPages || (pageNum >= page - 1 && pageNum <= page + 1)) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-3 py-2 text-sm rounded-lg transition ${
                        page === pageNum
                          ? 'bg-[#1de9a6] text-black font-medium'
                          : 'bg-[#050D0F] border border-[#1f2e2e] hover:bg-[#112828]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                } else if (pageNum === page - 2 || pageNum === page + 2) {
                  return <span key={pageNum} className="px-2 text-gray-500">...</span>
                }
                return null
              })}
            </div>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm bg-[#050D0F] border border-[#1f2e2e] rounded-lg hover:bg-[#112828] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Document Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#050D0F] border border-[#1f2e2e] rounded-lg w-[90%] h-[90%] max-w-4xl relative">
            <div className="flex items-center justify-between p-4 border-b border-[#1f2e2e]">
              <h3 className="text-white text-lg font-semibold">KYC Document</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 h-[calc(100%-80px)]">
              <img 
                src={selectedDocument} 
                alt="KYC Document"
                className="w-full h-full object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Kyc
