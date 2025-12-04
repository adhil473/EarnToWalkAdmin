import React,{useState,useEffect} from 'react'
import { adminDashboard, adminProfile,   } from '../api/serviceApi'
import { FaGem } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion'
import usdt from '../assets/usdt.png'
import overviewImage from '../assets/overviewimage.png'
import { useNavigate } from "react-router-dom";

const Overview = () => {
      const [adminData, setAdminData] = useState('')            
      const [dashboardData, setdashboardData] = useState('')            
    
   const navigate = useNavigate();
    useEffect(()=>{
        const fetchAdminProfile  = async()  =>{
          try {
            const response = await adminProfile()
            console.log(response)
            setAdminData(response?.data?.admin)
          } catch (error) {
         console.error('failed to fetch profile');  
          }
        }
        fetchAdminProfile();
      },[])

      useEffect(()=>{
        const getdashboardData  = async()  =>{
          try {
            const response = await adminDashboard()
            console.log(response)
            setdashboardData(response.data)
          } catch (error) {
         console.error('failed to fetch profile');  
          }
        }
        getdashboardData();
      },[])
      const stats = [
        { title: "Total Users", value:dashboardData?.totalUsers|| 0, showIcon: false },
        { title: "Active Users", value: dashboardData?.activeUsers, showIcon: false },
        // { title: "System Wallet Balance", value: "1239.00", showIcon: true },
        { title: "Total Withdraw", value: dashboardData?.totalWithdraw, showIcon: true },
        { title: "Pending Withdrawals", value:  dashboardData?.pendingWithdrawals, showIcon: true },
        { title: "Total Invest",  value: dashboardData?.totalInvestment, showIcon: true },
        { title: "Total KYC",  value: dashboardData?.pendingKYC, showIcon: true },
        { title: "Total pending tickets", value: dashboardData?.pendingTickets, showIcon: true },
        // { title: "Total Left", value: dashboardData?.tree?.totalLeftMembers , showIcon: false },
        // { title: "Total Right", value: dashboardData?.tree?.totalRightMembers , showIcon: false },
        { title: "Today Total Bussiness", value: dashboardData?.todayTotalBusiness, showIcon: true },
        // { title: "Total Left Bussiness", value: dashboardData?.tree?.leftTotalAmount  , showIcon: true },
        // { title: "Total Right Bussiness", value: dashboardData?.tree?.rightTotalAmount , showIcon: true },
    ];
    return (
        <div className="bg-black text-white md:p-8 font-inter mt-20 md:ml-2">
            {/* Header Card */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gradient-to-r from-[#050D0F] to-[#123c3c] rounded-xl p-6 shadow-lg  min-h-[110px] md:min-h-[160px]"
            >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1a3f3f] flex items-center justify-center text-lg font-semibold flex-shrink-0">
                            AP
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold">Welcome Back, {adminData?.name}</h1>
                            <p className="text-gray-300 text-sm mt-1">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] text-center transition-all duration-300 hover:scale-95 whitespace-nowrap self-start md:self-center">
                       PROTOCOL ID: {adminData?.id?.slice(0, 8)}
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <AnimatePresence>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {stats.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#050D0F] rounded-xl p-6 border border-[#1f2e2e] shadow-inner min-h-[110px] md:min-h-[142px]"
                        >
                            <p className="text-gray-400 text-sm mb-4">{item.title}</p>
                            <div className="flex items-center gap-2 text-[#00bcd4] text-xl font-semibold">
                                {item.showIcon && <img src={usdt} alt="usdt" className='w-6' />}
                                {typeof item.value === 'number' && item.showIcon  ? item.value.toFixed(3) : item.value || '0'}
                            </div>
                        </motion.div>
                    ))}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: stats.length * 0.1 }}
                        onClick={()=>{navigate('/members')}}
                        className="bg-[#050D0F] rounded-xl p-6 border border-[#1f2e2e] shadow-inner min-h-[110px] md:min-h-[142px] relative overflow-hidden"
                    >
                        <div className='relative z-[2]'>
                            <h3 className="text-white text-lg font-semibold mb-2">Explore More Plan</h3>
                            <p className="text-gray-200 text-sm">Scale your business with flexible plans</p>
                            <p className="text-gray-200 text-sm">Exclusive benefits</p>
                        </div>
                        <img src={overviewImage} alt="overview" className="w-24 h-24 object-contain absolute bottom-0 -right-1" />
                    </motion.div>
                </div>
            </AnimatePresence>
        </div>
    )
}

export default Overview
