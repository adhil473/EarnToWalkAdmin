import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getSingleUsers, getUsersIncomeHistory } from '../api/serviceApi'
import profile from '../assets/profile/profile.png'
import message from '../assets/profile/message.png'
import phone from '../assets/profile/phone.png'
import usdt from '../assets/usdt.png'


const UserDetails = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [incomHistory, setIncomHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isActive, setIsActive] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)

  const formatTime = (time) => {
    if (!time) return ''
    return time
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getSingleUsers(userId)
        if (res.success) {
          setUserData(res.data)
          setIsActive(res.data.profile.status === 'Active')
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [userId])

  useEffect(() => {
    const fetchUserincomHistory = async () => {
      try {
        const res = await getUsersIncomeHistory(userId, currentPage, 10)
        if (res.success) {
          setIncomHistory(res?.data?.incomeHistory)
          setTotalPages(res?.data?.pagination?.totalPages || 1)
          setTotalRecords(res?.data?.pagination?.total || 0)
          console.log(res.data.incomeHistory)
        } else {
          setIncomHistory([])
        }
      } catch (error) {
        console.error('Error fetching income history:', error)
        setIncomHistory([])
      }
    }
    fetchUserincomHistory()
  }, [userId, currentPage])


  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>
  if (!userData) return <div className="min-h-screen bg-black text-white flex items-center justify-center">User not found</div>

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6 md:py-12 space-y-10 mt-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-4 mb-6"
      >
        <button onClick={() => navigate('/member')} className="text-[#31BDD0] hover:text-white">← Back</button>
        <div>
          <h2 className="text-xl font-semibold">User Details</h2>
          {/* <p className="text-sm text-gray-400 mt-1">View Complete User Information And Activity.</p> */}
        </div>
      </motion.div>

      {/* Personal Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className=" justify-between flex items-center mb-4">
          <div className="">
            <h2 className="text-xl font-semibold">Personal Details</h2>
            <p className="text-sm text-gray-400 mt-1 mb-4">User Profile And Contact Information.</p>
          </div>
          <div className="flex items-center gap-3">
            {/* <span className={`text-sm ${isActive ? 'text-gray-400' : 'text-red-800'}`}>Inactive</span>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${isActive ? 'bg-[#1de9a6]' : 'bg-gray-600'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${isActive ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm ${isActive ? 'text-green-800' : 'text-white'}`}>Active</span> */}

            <button
              onClick={() => navigate(`/treeStructure/${userId}`)}
              className="animated-tree-button"
            >
              <span>
                {"View Tree".split('').map((letter, index) => (
                  <b key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                    {letter === ' ' ? '\u00A0' : letter}
                  </b>
                ))}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
          >
            <div className="flex items-center">
              <img src={profile} alt='profile.png' className='w-13' />
              <p className="text-sm text-gray-400 mb-1 ml-2">Name</p>
            </div>
            <p className="text-md font-medium ml-3 mt-1 pt-2">{userData.profile.name}</p>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
          >
            <div className="flex items-center">
              <img src={message} alt='message.png' className='w-13' />
              <p className="text-sm text-gray-400 mb-1 ml-2">Email</p>
            </div>
            <p className="text-md font-medium ml-3 mt-1 pt-2">{userData.profile.email}</p>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
          >
            <div className="flex items-center">
              <img src={phone} alt='phone.png' className='w-13' />
              <p className="text-sm text-gray-400 mb-1 ml-2">Phone Number</p>
            </div>
            <p className="text-md font-medium ml-3 mt-1 pt-2">{userData.profile.phone}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
          >
            <div className="flex items-center">
              <img src={profile} alt='profile.png' className='w-13' />
              <p className="text-sm text-gray-400 mb-1 ml-2">Sponser & Position</p>
            </div>
            <p className="text-md font-medium ml-3 mt-1 pt-2">{userData?.profile?.sponsor?.name || 'no user'} / {userData?.profile?.position}</p>

          </motion.div>
        </div>
      </motion.div>

      {/* Financial Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold">Financial Summary</h2>
        <p className="text-sm text-gray-400 mt-1 mb-4">Complete Financial Overview And Earnings.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl"
          >
            <p className="text-sm text-gray-400 mb-2">Total Investment</p>
            <p className="text-lg font-semibold text-[#0d9c44ff]">{Number(userData.financialSummary.totalInvestment).toFixed(3)} USDT</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl"
          >
            <p className="text-sm text-gray-400 mb-2">Total ROI</p>
            <p className="text-lg font-semibold text-[#0d9c44ff]">{Number(userData.financialSummary.totalROI).toFixed(3)} USDT</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl"
          >
            <p className="text-sm text-gray-400 mb-2">Available Balance</p>
            <p className="text-lg font-semibold text-[#0d9c44ff]">{Number(userData.financialSummary.availableBalance).toFixed(3)} USDT</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl"
          >
            <p className="text-sm text-gray-400 mb-2">Total Earnings</p>
            <p className="text-lg font-semibold text-[#0d9c44ff]">{Number(userData?.financialSummary?.totalEarnings).toFixed(3)} USDT</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl"
          >
            <p className="text-sm text-gray-400 mb-2">Total Referral</p>
            <p className="text-lg font-semibold text-[#0d9c44ff]">{Number(userData?.financialSummary?.totalReferral).toFixed(3)} USDT</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl"
          >
            <p className="text-sm text-gray-400 mb-2">Total Binary</p>
            <p className="text-lg font-semibold text-[#0d9c44ff]">{Number(userData?.financialSummary?.totalBinary).toFixed(3)} USDT</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Binary Tree Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold">Binary Tree</h2>
        <p className="text-sm text-gray-400 mt-1 mb-4">Team Structure And Business Volume.</p>

        <div className="bg-[#050D0F] border border-[#1f2e2e] p-6 rounded-xl w-[50%]">
          <div className="flex justify-around text-center">
            <div className="bg-[#112828]  p-4 rounded border border-[#1f2e2e] w-[45%]">
              <p className="text-gray-400 text-xs mb-2">Left Leg</p>
              <p className="text-white font-medium">{userData.binaryTree.leftLeg.user ? userData.binaryTree.leftLeg.user.name : 'Empty'}</p>
              <p className="text-[#31BDD0] text-sm">BV: {userData.binaryTree.leftLeg.totalBV}</p>
            </div>
            <div className="bg-[#112828] p-4 rounded border border-[#1f2e2e] w-[45%]">
              <p className="text-gray-400 text-xs mb-2">Right Leg</p>
              <p className="text-white font-medium">{userData.binaryTree.rightLeg.user ? userData.binaryTree.rightLeg.user.name : 'Empty'}</p>
              <p className="text-[#31BDD0] text-sm">BV: {userData.binaryTree.rightLeg.totalBV}</p>
            </div>
          </div>
        </div>
      </motion.div> */}

      {/* Active Packages Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold">Purchased Packages</h2>
        <p className="text-sm text-gray-400 mt-1 mb-4">Current Investment Packages And Returns.</p>

        <div className="space-y-4">
          {userData.packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
              className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4"
            >
              <div>
                <div className="flex items-center">
                  <p className="text-md font-medium">{pkg.type}</p> {pkg.isActiveForBinary && <span className="text-xs text-green-500  px-2 py-0.5  ml-2"> BinaryActive</span>}
                </div>
                <p className="text-sm text-gray-400 mt-1">Package Amount: {pkg.amount} USDT</p>
              </div>
              <div className="md:text-right">
                <p className="text-[#0d9c44ff] font-semibold">{Number(pkg.totalROIEarned).toFixed(3)} USDT</p>
                <p className="text-sm text-gray-400">ROI Earned</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Income History Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold">Income History</h2>
        <p className="text-sm text-gray-400 mt-1 mb-4">Latest Income Transactions And Earnings.</p>
        <div className="overflow-x-auto border border-[#1f2e2e] rounded-lg">
          <div className="min-w-[600px]">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e]">
              <p>Date & Time</p>
              {/* <p>Name</p> */}
              <p>Detail</p>
              <p>Amount</p>
              <p>Status</p>
            </div>

            {/* Table Rows */}
            <AnimatePresence>
              {incomHistory.map((item, index) => (
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
                  className="grid grid-cols-4 items-center bg-[#050D0F] text-sm text-gray-300 px-5 py-3 border-b border-[#1f2e2e] hover:bg-[#112828] transition"
                >
                  <div>
                    <p>
                      {new Date(item?.date).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>

                    {/* <p className="text-xs text-gray-500">{formatTime(item?.time)}</p> */}
                  </div>
                  {/* <p>{item?.name}</p> */}
                  <p>  {item?.description?.length > 40
                    ? item.description.slice(0, 40) + '...'
                    : item.description}</p>
                  <div className='text-[#0d9c44ff] flex items-center gap-2'>
                    <img src={usdt} alt="usdt" className='w-6' /> {item?.amount}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    backgroundColor: '#0e1a0e',
                    color: '#0d9c44ff',
                    border: '1px solid #0d9c44ff',
                    borderRadius: '10px',
                    fontWeight: 500,
                    fontSize: '14px',
                    width: 'fit-content'
                  }}>
                    {item?.status}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-[#050D0F] border border-[#1f2e2e] text-gray-300 rounded-lg hover:bg-[#112828] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (totalPages <= 5 ||
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-2 rounded-lg transition ${currentPage === pageNumber
                      ? 'bg-[#0d9c44ff] text-white'
                      : 'bg-[#050D0F] border border-[#1f2e2e] text-gray-300 hover:bg-[#112828]'
                      }`}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            }).filter(Boolean)}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-[#050D0F] border border-[#1f2e2e] text-gray-300 rounded-lg hover:bg-[#112828] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}

      </motion.div>
    </div>
  )
}

export default UserDetails