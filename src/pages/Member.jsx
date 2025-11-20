import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../api/serviceApi';
import { Filter, Eye } from 'lucide-react';

const Member = () => {
  const navigate = useNavigate()
  const [usersData, setUsersData] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [status, setStatus] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  const getallmembers = async () => {
    try {
      const res = await getUsers(page, limit, search,status);
      if (res.success) {
        setUsersData(res.data.users);
        setTotalPages(res.data.totalPages || 1);
        setTotalUsers(res.data.totalUsers || 0);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  useEffect(() => {
    getallmembers();
  }, [page, search, status])

  const handleStatusFilter = (selectedStatus) => {
    setStatus(selectedStatus)
    setPage(1)
    setShowFilter(false)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handlesingleuser = (id) => {
    navigate(`/user-details/${id}`)
  }


  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6 md:py-2 space-y-10 ">
      <div className='md:p-8 space-y-4 mt-20'>
        <div>
          <h3 className="text-white text-xl font-semibold  pl-2">User List</h3>
        </div>
        <div className='flex w-full justify-end gap-2 items-center'>
          
          <input 
            type="text" 
            placeholder='Search users...' 
            value={search}
            onChange={handleSearch}
            className='border border-[#1f2e2e] bg-black text-white py-2 px-4 w-full md:w-[30%] rounded focus:border-[#1de9a6] focus:outline-none'
          />
          <div className="relative">
            <Filter 
              className="w-4 h-4 cursor-pointer hover:text-[#1de9a6] transition" 
              onClick={() => setShowFilter(!showFilter)}
            />
            {showFilter && (
              <div className="absolute right-0 top-8 bg-[#050D0F] border border-[#1f2e2e] rounded-lg p-2 min-w-[120px] z-10">
                <div 
                  className="px-3 py-2 hover:bg-[#112828] cursor-pointer rounded text-sm"
                  onClick={() => handleStatusFilter('')}
                >
                  All Users
                </div>
                <div 
                  className="px-3 py-2 hover:bg-[#112828] cursor-pointer rounded text-sm text-[#0d9c44ff]"
                  onClick={() => handleStatusFilter('active')}
                >
                  Active
                </div>
                <div 
                  className="px-3 py-2 hover:bg-[#112828] cursor-pointer rounded text-sm text-[#dc2626]"
                  onClick={() => handleStatusFilter('inactive')}
                >
                  Inactive
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto border border-[#1f2e2e] rounded-lg">
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-7 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e]">
              {/* <p>User ID</p> */}
              <p>Username</p>
              <p>Wallet Address</p>
              <p>Sponsor ID</p>
              <p>Active Package</p>
              <p>Total Earnings</p>
              <p>Status</p>
              <p>view</p>
            </div>

            {/* Table Rows */}
            <AnimatePresence>
              {usersData && usersData.length > 0 ? usersData.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: index * 0.1
                  }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  onClick={() => handlesingleuser(user.id)}
                  className="grid grid-cols-7 items-center bg-[#050D0F] text-sm text-gray-300 px-5 py-3 border-b border-[#1f2e2e] hover:bg-[#112828] transition cursor-pointer"
                >
                  {/* <p>{user.id.length > 8 ? user.id.substring(0, 8) + '...' : user.id}</p> */}
                  <p>{user.name}</p>
                  <p 
                    className="cursor-pointer hover:text-[#1de9a6] transition relative"
                    title="Click to copy"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(user.walletAddress);
                    }}
                  >
                    {user.walletAddress?.length > 10 
                      ? `${user.walletAddress.substring(0, 12)}...${user.walletAddress.substring(user.walletAddress.length - 0)}` 
                      : user.walletAddress
                    }
                  </p>
                  <p>{user.sponsorId}</p>
                  <p className='text-[#31BDD0]'>{user.activePackage} USDT</p>
                  <p className='text-[#0d9c44ff]'>{Number(user?.totalEarnings).toFixed(3)} USDT</p>
                  <div style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    backgroundColor: user.status === 'Active' ? '#0e1a0e' : user.status === 'Suspended' ? '#1a0e0e' : '#1a1a0e',
                    color: user.status === 'Active' ? '#0d9c44ff' : user.status === 'Suspended' ? '#dc2626' : '#f59e0b',
                    border: `1px solid ${user.status === 'Active' ? '#0d9c44ff' : user.status === 'Suspended' ? '#dc2626' : '#f59e0b'}`,
                    borderRadius: '10px',
                    fontWeight: 500,
                    fontSize: '14px',
                    width: 'fit-content'
                  }}>
                    {user.status}
                  </div>
                  <Eye 
                    className="w-4 h-4 cursor-pointer hover:text-[#1de9a6] transition" 
                    onClick={() => handlesingleuser(user.id)}
                  />
                </motion.div>
              )) : (
                <div className="text-center py-8 text-gray-400">
                  No members found
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center space-x-2 mt-6'>
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className='px-3 py-2 border border-[#1f2e2e] rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#1de9a6] transition'
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (pageNum === 1 || pageNum === totalPages || (pageNum >= page - 1 && pageNum <= page + 1)) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-2 border rounded text-sm transition ${
                      page === pageNum 
                        ? 'bg-[#1de9a6] border-[#1de9a6] text-black' 
                        : 'border-[#1f2e2e] hover:border-[#1de9a6]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (pageNum === page - 2 || pageNum === page + 2) {
                return <span key={pageNum} className='text-gray-500'>...</span>;
              }
              return null;
            })}
            
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className='px-3 py-2 border border-[#1f2e2e] rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#1de9a6] transition'
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Member