import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getSingleUsers, getUsersIncomeHistory, planPackages, planPurchaseByAdmin, updateUserPassword } from '../api/serviceApi'
import profile from '../assets/profile/profile.png'
import message from '../assets/profile/message.png'
import phone from '../assets/profile/phone.png'
import edit from '../assets/profile/edit.png'
import usdt from '../assets/usdt.png'
import { useToast } from '../context/ToastContext'
import { FaRocket, FaFire, FaBolt, FaCrown, FaGem, FaStar, FaTrophy, FaShieldAlt, FaAtom, FaEye, FaEyeSlash } from 'react-icons/fa'

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
  const [showModal, setShowModal] = useState(false)
  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState('')
  const { showToast } = useToast()
  const [showEditModal, setShowEditModal] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [editLoading, setEditLoading] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const formatTime = (time) => {
    if (!time) return ''
    return time
  }

  const getPackageIcon = (type) => {
    const icons = {
      'SPARK': <FaRocket className="text-orange-500" />,
      'RISE': <FaFire className="text-red-500" />,
      'BOOST': <FaBolt className="text-yellow-500" />,
      'PRIME': <FaCrown className="text-purple-500" />,
      'ELITE': <FaGem className="text-blue-500" />,
      'ULTRA': <FaStar className="text-green-500" />,
      'TITAN': <FaTrophy className="text-amber-500" />,
      'ROYAL': <FaShieldAlt className="text-pink-500" />,
      'EMPEROR': <FaAtom className="text-indigo-500" />
    }
    return icons[type] || <FaRocket className="text-gray-500" />
  }
  const fetchallPlans = async () => {
    try {
      const res = await planPackages()
      if (res.success) {
        setPlans(res.data)
      }
    } catch (error) {
      console.error('Error fetching plan packages:', error)
    }
  }
  useEffect(() => {
    fetchallPlans()
  }, [])

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

  useEffect(() => {
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

  const handleSubmitPackagepurchase = async () => {
    try {
      const planData = plans.find(p => p.type === selectedPlan)
      if (!planData) return

      const res = await planPurchaseByAdmin(userId, planData)
      if (res.success) {
        showToast(res.message || `Package ${planData.type} purchased successfully`)
        setShowModal(false)
        setSelectedPlan('')
        fetchUserData()

      }
    } catch (error) {
      console.error('Error purchasing package:', error)
    }
  }

  const validatePassword = () => {
    if (!newPassword || newPassword.length < 6) {
      showToast('Password must be at least 6 characters')
      return false
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match')
      return false
    }
    return true
  }
  const handleSubmitEditPassword = async () => {
    if (!validatePassword()) return

    try {
      setEditLoading(true)


      const res = await updateUserPassword(userId, newPassword)

      if (res && res.success) {
        showToast(res.message || 'Password updated successfully')
        setShowEditModal(false)
        setNewPassword('')
        setConfirmPassword('')
        // optionally refetch user data if needed:
        fetchUserData()
      } else {
        // handle api error message if present
        showToast(res?.message || 'Failed to update password')
      }
    } catch (error) {
      console.error('Error updating password:', error)
      showToast('Something went wrong. Try again.')
    } finally {
      setEditLoading(false)
    }
  }


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
            <button
              onClick={() => setShowEditModal(true)}
              className="text-white font-semibold text-sm px-4.5 py-2.5 rounded-lg transition-all duration-300 hover:scale-95 whitespace-nowrap flex items-center gap-2 border border-[#4B5563]">
              <img src={edit} alt='edit' className='w-4' />
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-xl font-semibold">Purchased Packages</h2>
            <p className="text-sm text-gray-400 mt-1">Current Investment Packages And Returns.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#0d9c44ff] hover:bg-[#0b8a3c] text-white px-4 py-2 sm:py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
          >
            Add Package Manually
          </button>
        </div>
        <div className="space-y-4">
          {userData.packages && userData.packages.length > 0 ? (
            userData.packages.map((pkg, index) => (
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
            ))
          ) : (
            <div className="bg-[#050D0F] border border-[#1f2e2e] p-8 rounded-xl text-center">
              <p className="text-gray-400 text-sm">No packages purchased yet</p>
            </div>
          )}
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
              {incomHistory && incomHistory.length > 0 ? (
                incomHistory.map((item, index) => (
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
                    </div>
                    <p>{item?.description?.length > 40
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
                ))
              ) : (
                <div className="bg-[#050D0F] p-8 text-center">
                  <p className="text-gray-400 text-sm">No income transactions found</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination */}
        {incomHistory && incomHistory.length > 0 && totalPages > 1 && (
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

      {/* Add Package Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-auto max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white">Select Package</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-xl sm:text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 overflow-y-auto flex-1">
              {plans.map((plan, index) => {
                return (
                  <div
                    key={plan.type}
                    onClick={() => setSelectedPlan(plan.type)}
                    className={`flex items-center justify-between p-3 sm:p-4 rounded-xl cursor-pointer transition-all ${selectedPlan === plan.type
                      ? 'bg-[#0d9c44ff] bg-opacity-20 border border-[#0d9c44ff]'
                      : 'bg-[#2a2a2a] hover:bg-[#333333] border border-transparent'
                      }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="text-xl sm:text-2xl">
                        {getPackageIcon(plan.type)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm sm:text-base">{plan.type}</p>
                        <p className="text-gray-400 text-xs sm:text-sm">{plan.currency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <img src={usdt} alt="USDT" className="w-4 h-4 sm:w-5 sm:h-5" />
                      <p className="text-white font-semibold text-sm sm:text-base">{plan.amount.toLocaleString()}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 sm:py-3 rounded-xl transition-colors font-medium text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPackagepurchase}
                disabled={!selectedPlan}
                className="flex-1 bg-[#0d9c44ff] hover:bg-[#0b8a3c] disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 sm:py-3 rounded-xl transition-colors font-medium text-sm sm:text-base"
              >
                Add Package
              </button>
            </div>
          </div>
        </div>
      )}
      {/* user password Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-4 sm:p-6 w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white">Edit Password</h3>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setNewPassword('')
                  setConfirmPassword('')
                }}
                className="text-gray-400 hover:text-white text-xl sm:text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <label className="text-sm text-gray-300">New Password</label>
              <div className="relative">
                <input
                  type={showNewPass ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-white outline-none"
                  placeholder="Enter new password"
                />
                <span
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-white"
                >
                  {showNewPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>


              <label className="text-sm text-gray-300">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#111] border border-[#2a2a2a] rounded px-3 py-2 text-white outline-none"
                  placeholder="Confirm new password"
                />
                <span
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-white"
                >
                  {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setNewPassword('')
                  setConfirmPassword('')
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitEditPassword}
                disabled={editLoading}
                className="flex-1 bg-[#0d9c44ff] hover:bg-[#0b8a3c] disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl"
              >
                {editLoading ? 'Saving...' : 'Save Password'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  )
}

export default UserDetails