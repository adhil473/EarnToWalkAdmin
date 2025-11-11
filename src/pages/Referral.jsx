import React, { useState, useEffect } from 'react'
import { referralHistory, ReferralLinks } from '../api/serviceApi';
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowDownToLine, Wallet, Gem, Copy, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from '../context/ToastContext';
import usdt from '../assets/withdraw/usdt.png'
import tether from '../assets/withdraw/tether.png'
import referraluser from '../assets/bvlog/referraluser.png'
import whatsapp from '../assets/share/whatsapp.png'
import linkedin from '../assets/share/linkedin.png'
import facebook from '../assets/share/facebook.png'
import messanger from '../assets/share/messanger.png'
import x from '../assets/share/x.png'
import close from '../assets/share/close.png'
import cornerimage from '../assets/bvlog/cornerimage.png'

const Referral = () => {
    const { showToast } = useToast();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [currentShareLink, setCurrentShareLink] = useState('');
    const [referralLink, setReferralLink] = useState('')
    const [historyData, sethistoryData] = useState([])
    const [referralData, setreferralData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState({})
    const [loading, setLoading] = useState(false)



    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            showToast('Link copied!');
        } catch (error) {
            // Fallback for clipboard permissions policy violation
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('Link copied!');
        }
    };

    const handleShareClick = (link) => {
        setCurrentShareLink(link);
        setIsShareModalOpen(true);
    };
 
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         name: "Sophia Clark",
    //         amount: "12300.00",
    //         status: "Completed",
    //     },
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         name: "Sophia Clark",
    //         amount: "12300.00",
    //         status: "Completed",
    //     },
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         name: "Sophia Clark",
    //         amount: "12300.00",
    //         status: "Completed",
    //     },
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         name: "Sophia Clark",
    //         amount: "12300.00",
    //         status: "Completed",
    //     },
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         name: "Sophia Clark",
    //         amount: "12300.00",
    //         status: "Completed",
    //     },
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         name: "Sophia Clark",
    //         amount: "12300.00",
    //         status: "Completed",
    //     },
    // ];

    useEffect(() => {
        const fetchReferrals = async () => {
            try {
                const response = await ReferralLinks()
                console.log(response)
                setReferralLink(response.data)
            } catch (error) {
                console.error('failed to fetch referrals');
            }
        }
        fetchReferrals();
    }, [])

    const fetchReferralHistory = async (page = 1) => {
        setLoading(true)
        try {
            const response = await referralHistory(page, 10)
            console.log(response)
            sethistoryData(response?.data?.transactions)
            setreferralData(response)
            setPagination(response?.data?.pagination)
        } catch (error) {
            console.error('failed to fetch referrals');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReferralHistory(currentPage);
    }, [currentPage])

    return (
        <div className="md:p-8 space-y-10 mt-20 md:ml-2">
            {/* ========== Withdraw Funds Box ========== */}
            <div className="md:bg-gradient-to-b md:from-[#0b2b2b] md:to-[#000000] md:rounded-2xl md:p-12 md:shadow-lg md:border md:border-[#1f2e2e]">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-white text-2xl font-semibold mb-2">Invites Friends & Earn Rewards</h2>
                    <p className="text-gray-400 text-sm">
                        Share Your Referral Link with Friends And Earn Rewards When They Sign Up And Complete Their First Purchase
                    </p>
                </div>

                {/* Info Boxes */}
                <div className="grid md:grid-cols-3 gap-6 items-center">
                    {/* Left Section: 2 columns wide */}
                    <div className="md:col-span-2 space-y-4">
                        {/* Row 1: Join Left */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-[#050D0F] rounded-xl border border-[#1a2c2c] p-6 shadow-inner"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <img src={referraluser} alt='referral' className='w-13' />
                                <p className="text-gray-400 text-sm font-medium">Join Left</p>
                            </div>
                            <div className="flex items-end gap-2">
                                <div className="relative flex-1">
                                    <label className='text-gray-400 text-sm block mb-1'>Link</label>
                                    <input
                                        type="text"
                                        value={referralLink?.leftLink}
                                        readOnly
                                        className="w-full bg-black border border-[#1a2c2c] rounded-lg px-4 py-2.5 pr-10 text-gray-400 text-sm focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleCopy(`${referralLink?.leftLink}`)}
                                        className="absolute right-3 top-8 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleShareClick(`${referralLink?.leftLink}`)}
                                    className="cursor-pointer bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95 whitespace-nowrap"
                                >
                                    Share
                                </button>
                            </div>
                        </motion.div>

                        {/* Row 2: Join Right */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-[#050D0F] rounded-xl border border-[#1a2c2c] p-6 shadow-inner"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <img src={referraluser} alt='referral' className='w-13' />
                                <p className="text-gray-400 text-sm font-medium">Join Right</p>
                            </div>
                            <div className="flex items-end gap-2">
                                <div className="relative flex-1">
                                    <label className='text-gray-400 text-sm block mb-1'>Link</label>
                                    <input
                                        type="text"
                                        value={referralLink?.rightLink}
                                        readOnly
                                        className="w-full bg-black border border-[#1a2c2c] rounded-lg px-4 py-2.5 pr-10 text-gray-400 text-sm focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleCopy(`${referralLink?.rightLink}`)}
                                        className="absolute right-3 top-8 text-gray-400 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleShareClick(`${referralLink?.rightLink}`)}
                                    className="cursor-pointer bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95 whitespace-nowrap"
                                >
                                    Share
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Withdrawal Time */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="bg-[#050D0F] rounded-xl border border-[#1a2c2c] p-5 shadow-inner flex flex-col justify-center relative"
                    >
                        <img src={cornerimage} alt="corner" className="absolute top-0 right-0 w-45  rounded-tr-xl " />
                        <div className="flex items-center gap-3 mb-3">
                            <img src={usdt} alt='usdt.png' className='w-13 ' />
                            <p className="text-gray-400 text-sm font-medium">Referral Earnings</p>
                        </div>

                        <div className="flex items-center justify-around bg-[#121e1e] rounded-lg py-5 mt-6 relative">

                            <div className="text-center">
                                <p className="text-gray-400 text-xs uppercase">Total Users</p>
                                <p className="text-[#31BDD0] text-2xl font-bold max-md:text-white max-md:text-lg">{referralData?.data?.totalReferred}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-xs uppercase">Total Earnings</p>
                                <div className="flex justify-center items-center gap-2 text-[#31BDD0] text-2xl font-bold max-md:text-white max-md:text-lg">
                                    <img src={tether} alt="tether" className="w-6 h-6" />
                                    <span>{referralData?.data?.totalReferralEarnings}</span>
                                </div>
                            </div>

                        </div>

                    </motion.div>
                </div>
            </div>


            {/* ========== Withdrawal History Heading ========== */}
            <div>
                <h3 className="text-white text-xl font-semibold mb-4 pl-2">Referral History</h3>
            </div>

            {/* ========== Table Section ========== */}
            <div className="overflow-x-auto border border-[#1f2e2e] rounded-lg">
                <div className="min-w-[600px]">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e]">
                        <p>Date & Time</p>
                        <p>Name</p>
                        <p>Amount</p>
                        <p>Status</p>
                    </div>

                    {/* Table Rows */}
                    <AnimatePresence>
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="text-gray-400">Loading...</div>
                            </div>
                        ) : historyData?.length > 0 ? (
                            historyData?.map((item, index) => (
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
                                    className="grid grid-cols-4 items-center bg-[#050D0F] text-sm text-gray-300 px-5 py-3 border-b border-[#1f2e2e] hover:bg-[#112828] transition"
                                >
                                    <div>
                                        <p>{new Date(item.date).toLocaleDateString()}</p>
                                        <p className="text-xs text-gray-500">{new Date(item.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                                    </div>
                                    <p>{item.name}</p>
                                    <div className="flex items-center gap-2 text-[#00c896] font-semibold">
                                        <img src={tether} alt='tether' className='w-4' />
                                        {item.amount}
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
                                        {item.status}
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center py-8">
                                <div className="text-gray-400">No referral history found</div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Pagination Controls */}
            {pagination?.totalPages > 1 && (
                <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-4 mt-6">
                    <span className="text-gray-400 text-sm order-2 md:order-none">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <div className="flex space-x-3 w-full md:w-auto order-1 md:order-none">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={!pagination.hasPrev}
                            className="flex-1 md:flex-none md:px-4 py-3 md:py-2 bg-[#1f2e2e] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a3f3f] transition text-sm font-medium"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                            disabled={!pagination.hasNext}
                            className="flex-1 md:flex-none md:px-4 py-3 md:py-2 bg-[#1f2e2e] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a3f3f] transition text-sm font-medium"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            {isShareModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className=" border border-[#1f2e2e] rounded-xl p-6 w-96">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white text-lg font-semibold">Share</h3>
                            <button onClick={() => setIsShareModalOpen(false)}>
                                <img src={close} alt="close" className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Referral Link */}
                        <div className="mb-6">
                            <p className="text-gray-400 text-sm mb-2">Referral Link</p>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={currentShareLink}
                                    readOnly
                                    className="w-full bg-black border border-[#1a2c2c] rounded-lg px-4 py-2.5 pr-10 text-gray-400 text-sm focus:outline-none"
                                />
                                <button
                                    onClick={() => handleCopy(currentShareLink)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <Copy size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex justify-center gap-4">
                            <img src={whatsapp} alt="WhatsApp" className="w-14  cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src={linkedin} alt="LinkedIn" className="w-14 cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src={facebook} alt="Facebook" className="w-14 cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src={messanger} alt="Messenger" className="w-14 cursor-pointer hover:opacity-80 transition-opacity" />
                            <img src={x} alt="X" className="w-14 cursor-pointer hover:opacity-80 transition-opacity" />
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Referral
