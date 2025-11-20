import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import tether from '../assets/withdraw/tether.png'
import { FaPlus, FaChevronLeft, FaChevronRight, FaEye } from 'react-icons/fa'
import close from '../assets/changepassword/close.png'
import upload from '../assets/changepassword/upload.png'
import { getTicketDetails, submitSupportTicket, supportTicketHistory, updateTicketStatus } from '../api/serviceApi'
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaIdCard, FaRegClock, FaFlag, FaClipboardList, FaImage } from "react-icons/fa";
import { useToast } from '../context/ToastContext'
import { Filter } from 'lucide-react'

const Support = () => {
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [historyData, sethistoryData] = useState([]);
    const { showToast } = useToast();
    const [showFilter, setShowFilter] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [status, setStatus] = useState('');
    const [data, setData] = useState();
    const [priority, setPriority] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showTicketDetails, setShowTicketDetails] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const fileInputRef = useRef(null);


    const getTicketHistory = async () => {
        try {
            setLoading(true);
            const res = await supportTicketHistory(page, limit, status, priority);
            if (res.success) {
                sethistoryData(res?.data?.tickets);
                setTotalPages(Math.ceil(res?.totalCount / limit) || 1);
                setData(res?.data)
            }
        } catch (error) {
            console.error('Error fetching ticket history:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTicketHistory();
    }, [page, status, priority])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showStatusDropdown && !event.target.closest('.status-dropdown')) {
                setShowStatusDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showStatusDropdown])

    const handleStatusFilter = (selectedStatus) => {
        setStatus(selectedStatus);
        setPage(1);
        setShowFilter(false);
    }

    const handlePriorityFilter = (selectedPriority) => {
        setPriority(selectedPriority);
        setPage(1);
        setShowFilter(false);
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    }

    const clearFilters = () => {
        setStatus('');
        setPriority('');
        setPage(1);
        setShowFilter(false);
    }

    const handleTicketClick = async (ticketId) => {
        try {
            const res = await getTicketDetails(ticketId);
            if (res.success) {
                setSelectedTicket(res.data);
                setShowTicketDetails(true);
            }
        } catch (error) {
            console.error('Error fetching ticket details:', error);
            showToast('Failed to load ticket details', 'error');
        }
    }

    const handleStatusUpdate = async (newStatus) => {
        try {
            const res = await updateTicketStatus(selectedTicket.id, newStatus);
            if (res.success) {
                setSelectedTicket({ ...selectedTicket, status: newStatus });
                setShowStatusDropdown(false);
                showToast('Ticket status updated successfully');
                getTicketHistory();
            } else {
                showToast(res.message || 'Failed to update ticket status', 'error');
            }
        } catch (error) {
            console.error('Error updating ticket status:', error);
            showToast('Failed to update ticket status', 'error');
        }
    }


    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         subject: 'Wallet not syncing',
    //         ticketid: "Sophia Clark",
    //         lastupdated: "2 hour Ago",
    //         status: "Completed",
    //         priority: 'High'

    //     },
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         subject: 'Wallet not syncing',
    //         ticketid: "Sophia Clark",
    //         lastupdated: "2 hour Ago",
    //         status: "Completed",
    //         priority: 'High'

    //     },
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         subject: 'Wallet not syncing',
    //         ticketid: "Sophia Clark",
    //         lastupdated: "2 hour Ago",
    //         status: "Completed",
    //         priority: 'High'

    //     },
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         subject: 'Wallet not syncing',
    //         ticketid: "Sophia Clark",
    //         lastupdated: "2 hour Ago",
    //         status: "Completed",
    //         priority: 'High'
    //     },
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         subject: 'Wallet not syncing',
    //         ticketid: "Sophia Clark",
    //         lastupdated: "2 hour Ago",
    //         status: "Completed",
    //         priority: 'High'
    //     },
    //     {
    //         date: "20 Jan 2024",
    //         time: "2:00 pm",
    //         subject: 'Wallet not syncing',
    //         ticketid: "Sophia Clark",
    //         lastupdated: "2 hour Ago",
    //         status: "Completed",
    //         priority: 'High'
    //     }
    // ];

    const handleSubmitTicket = async () => {
        try {
            if (!subject || !description || !selectedPriority) {
                alert('Please fill all fields before submitting');
                return;
            }

            // ✅ Create FormData here
            const formData = new FormData();
            formData.append('subject', subject);
            formData.append('description', description);
            formData.append('priority', selectedPriority);
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            const res = await submitSupportTicket(formData);

            if (res?.success) {
                showToast(res?.message || "Ticket created successfully");
                setShowTicketModal(false);
                setSubject('');
                setDescription('');
                setSelectedPriority('');
                setSelectedFile(null);
                getTicketHistory();
            } else {
                showToast(res?.message || 'Something went wrong!', 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('Failed to submit ticket', 'error');
        }
    };


    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6 md:py-12 space-y-10 mt-16">
            {/* Personal Details Section */}
            <div>
                <div className="flex justify-between items-start mb-1">
                    <div>
                        <h2 className="text-xl font-semibold">Support Ticket</h2>
                        <p className="text-sm text-gray-400 mt-2">View And Manage Your Support Tickets</p>
                    </div>
                    {/* <button className="text-white font-semibold text-sm px-4.5 py-2.5 rounded-lg transition-all duration-300 hover:scale-95 whitespace-nowrap flex items-center gap-2 border border-[#4B5563]">
               <img src={edit} alt='edit' className='w-4' /> Edit
             </button> */}
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Total Tickets */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
                    >
                        <div className='flex items-center'>
                            {/* <img src={profile} alt='profile.png' className='w-13' /> */}
                            <p className="text-md text-green-400 mb-1 items-center align-center justify-center">Total Tickets</p>
                        </div>
                        <p className="text-2xl font-medium ml-3">{data?.totalTickets}</p>
                    </motion.div>

                    {/* Open Tickets */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl min-h-[110px] md:min-h-[142px]"
                    >
                        <div className='flex items-center'>
                            {/* <img src={message} alt='profile.png' className='w-13' /> */}
                            <p className="text-md text-yellow-400 mb-1">Pending Tickets</p>
                        </div>
                        <p className="text-2xl font-medium ml-3">{data?.pending}</p>
                    </motion.div>

                    {/* Closed Tickets */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl flex justify-between items-start min-h-[110px] md:min-h-[142px]"
                    >
                        <div>
                            <div className='flex items-center'>
                                {/* <img src={phone} alt='profile.png' className='w-13' /> */}
                                <p className="text-md text-red-400 mb-1">Rejected Tickets</p>
                            </div>
                            <p className="text-2xl font-medium ml-3">{data?.rejected}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* ========== Withdrawal History Heading ========== */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-semibold">Ticket History Section</h3>
                {/* <button onClick={() => setShowTicketModal(true)} className="bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95 whitespace-nowrap flex items-center gap-2">
                    <FaPlus className="w-4 h-4" /> Create Ticket
                </button> */}
                <div className="flex gap-2">
                    {/* <button onClick={() => setShowTicketModal(true)} className="bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95 whitespace-nowrap flex items-center gap-2">
                        <FaPlus className="w-4 h-4" /> Create Ticket
                    </button> */}
                    <div className="relative">
                        <div
                            className="flex items-center gap-2 px-3 py-2 bg-[#050D0F] border border-[#1f2e2e] rounded-lg cursor-pointer hover:bg-[#112828] transition"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">Filter</span>
                        </div>

                        {showFilter && (
                            <div className="absolute right-0 top-12 bg-[#050D0F] border border-[#1f2e2e] rounded-lg p-4 w-64 z-50">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Status</label>
                                        <select
                                            value={status}
                                            onChange={(e) => handleStatusFilter(e.target.value)}
                                            className="w-full p-2 bg-[#112828] border border-[#1f2e2e] rounded text-white"
                                        >
                                            <option value="">All Status</option>
                                            <option value="Open">Open</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Resolved">Resolved</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Priority</label>
                                        <select
                                            value={priority}
                                            onChange={(e) => handlePriorityFilter(e.target.value)}
                                            className="w-full p-2 bg-[#112828] border border-[#1f2e2e] rounded text-white"
                                        >
                                            <option value="">All Priority</option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>

                                    <button
                                        onClick={clearFilters}
                                        className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ========== Table Section ========== */}
            <div className="overflow-x-auto border border-[#1f2e2e] rounded-lg">
                <div className="min-w-[600px]">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e]">
                        <p>Ticket ID</p>
                        <p>Date</p>
                        <p>Subject</p>
                        <p>Status</p>
                        <p>Priority</p>
                        <p>View</p>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-gray-400">Loading tickets...</div>
                        </div>
                    ) : historyData.length === 0 ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-gray-400">No tickets found</div>
                        </div>
                    ) : (
                        /* Table Rows */
                        <AnimatePresence>
                            {historyData.map((item, index) => {
                                const getStatusColor = (status) => {
                                    switch (status?.toLowerCase()) {
                                        case 'open': return { bg: '#1a1a0e', color: '#d4a853', border: '#d4a853' };
                                        case 'pending': return { bg: '#1a1a0e', color: '#d4a853', border: '#d4a853' };
                                        case 'in progress': return { bg: '#1a1a0e', color: '#d4a853', border: '#d4a853' };
                                        case 'resolved': return { bg: '#0e1a0e', color: '#0d9c44ff', border: '#0d9c44ff' };
                                        case 'closed': return { bg: '#1a0e0e', color: '#d61317ff', border: '#d81a1dff' };
                                        default: return { bg: '#1a1a1a', color: '#888', border: '#888' };
                                    }
                                };

                                const getPriorityColor = (priority) => {
                                    switch (priority?.toLowerCase()) {
                                        case 'high': return { bg: '#1a0e0e', color: '#d61317ff', border: '#d81a1dff' };
                                        case 'medium': return { bg: '#1a1a0e', color: '#d4a853', border: '#d4a853' };
                                        case 'low': return { bg: '#0e1a0e', color: '#0d9c44ff', border: '#0d9c44ff' };
                                        default: return { bg: '#1a1a1a', color: '#888', border: '#888' };
                                    }
                                };

                                const statusStyle = getStatusColor(item.status);
                                const priorityStyle = getPriorityColor(item.priority);

                                return (
                                    <motion.div
                                        key={item._id || index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeOut",
                                            delay: index * 0.1
                                        }}
                                        whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                        className="grid grid-cols-6 items-center bg-[#050D0F] text-sm text-gray-300 px-5 py-3 border-b border-[#1f2e2e] hover:bg-[#112828] transition"
                                        
                                    >
                                        <div>
                                            <p>TID: {item.id?.slice(-6).toUpperCase() || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p>{new Date(item.createdAt || item.date).toLocaleDateString()}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(item.createdAt || item.date).toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="truncate">{item.subject}</p>
                                        </div>
                                        <div>
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '4px 8px',
                                                backgroundColor: statusStyle.bg,
                                                color: statusStyle.color,
                                                border: `1px solid ${statusStyle.border}`,
                                                borderRadius: '8px',
                                                fontWeight: 500,
                                                fontSize: '12px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {item.status}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '4px 8px',
                                                backgroundColor: priorityStyle.bg,
                                                color: priorityStyle.color,
                                                border: `1px solid ${priorityStyle.border}`,
                                                borderRadius: '8px',
                                                fontWeight: 500,
                                                fontSize: '12px',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {item.priority}
                                            </div>
                                        </div>
                                        <div>
                                            
                                                <FaEye className='text-18 cursor-pointer'
                                                onClick={() => handleTicketClick(item.id)}/>
                                            
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {!loading && historyData.length > 0 && (
                <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-gray-400">
                        Showing page {page} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="flex items-center gap-2 px-3 py-2 bg-[#050D0F] border border-[#1f2e2e] rounded-lg text-sm text-gray-300 hover:bg-[#112828] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaChevronLeft className="w-3 h-3" />
                            Previous
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                                if (pageNum > totalPages) return null;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`px-3 py-2 rounded-lg text-sm transition ${page === pageNum
                                                ? 'bg-[#00d1b2] text-white'
                                                : 'bg-[#050D0F] border border-[#1f2e2e] text-gray-300 hover:bg-[#112828]'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="flex items-center gap-2 px-3 py-2 bg-[#050D0F] border border-[#1f2e2e] rounded-lg text-sm text-gray-300 hover:bg-[#112828] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                            <FaChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            )}

            {/* Create Ticket Modal */}
            {showTicketModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#050D0F] border border-[#1f2e2e] rounded-xl p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setShowTicketModal(false)} className="absolute top-4 right-4">
                            <img src={close} alt="close" className="w-6 h-6" />
                        </button>

                        <h2 className="text-xl font-semibold mb-2">Create A New Support Ticket</h2>
                        <p className="text-sm text-gray-400 mb-5">Fill in The Required Details To Raise A New Support Ticket</p>

                        <div className="space-y-4">
                            {/* Subject */}
                            <div>
                                <label className="text-sm text-gray-300 mb-2 block">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Enter ticket subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-sm text-gray-300 mb-2 block">Description</label>
                                <textarea
                                    placeholder="Describe your issue"
                                    rows="4"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4] resize-none"
                                />
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="text-sm text-gray-300 mb-2 block">Priority</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setSelectedPriority('High')}
                                        className={`py-2.5 rounded-lg font-semibold text-sm transition-all ${selectedPriority === 'High'
                                            ? 'bg-red-500 text-white border-2 border-red-500'
                                            : 'bg-transparent text-gray-300 border-2 border-[#1f2e2e] hover:border-red-500'
                                            }`}
                                    >
                                        High
                                    </button>
                                    <button
                                        onClick={() => setSelectedPriority('Medium')}
                                        className={`py-2.5 rounded-lg font-semibold text-sm transition-all ${selectedPriority === 'Medium'
                                            ? 'bg-yellow-500 text-white border-2 border-yellow-500'
                                            : 'bg-transparent text-gray-300 border-2 border-[#1f2e2e] hover:border-yellow-500'
                                            }`}
                                    >
                                        Medium
                                    </button>
                                    <button
                                        onClick={() => setSelectedPriority('Low')}
                                        className={`py-2.5 rounded-lg font-semibold text-sm transition-all ${selectedPriority === 'Low'
                                            ? 'bg-green-500 text-white border-2 border-green-500'
                                            : 'bg-transparent text-gray-300 border-2 border-[#1f2e2e] hover:border-green-500'
                                            }`}
                                    >
                                        Low
                                    </button>
                                </div>
                            </div>

                            {/* Attachment */}
                            <div>
                                <label className="text-sm text-gray-300 mb-2 block">Attachment</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-[#1f2e2e] rounded-lg p-6 text-center cursor-pointer hover:border-[#00bcd4] transition-colors"
                                >
                                    <img src={upload} alt="upload" className="w-12 h-12 mx-auto mb-2" />
                                    <p className="text-sm text-gray-400">{selectedFile ? selectedFile.name : 'Click to upload'}</p>
                                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, or PDF (Max 5MB each)</p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                    />
                                </div>
                                {/* ✅ Preview Section */}
                                {selectedFile && selectedFile.type.startsWith('image/') && (
                                    <div className="mt-4 flex justify-center">
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="Selected Preview"
                                            className="w-24 h-24 object-cover rounded-lg border border-[#1f2e2e]"
                                        />
                                    </div>
                                )}

                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setShowTicketModal(false)} className="flex-1 bg-transparent border border-[#4B5563] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-95">
                                    Cancel
                                </button>
                                <button onClick={() => handleSubmitTicket()} className="flex-1 bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95">
                                    Submit Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Ticket Details Modal */}
            <AnimatePresence>
                {showTicketDetails && selectedTicket && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                        onClick={() => setShowTicketDetails(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-black border border-[#1f2e2e] rounded-2xl p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6 border-b border-[#1f2e2e] pb-3">
                                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Ticket Details
                                </h3>
                                <button
                                    onClick={() => setShowTicketDetails(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <img src={close} alt="close" className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-6 text-sm text-gray-300">
                                {/* Ticket Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#050D0F] border border-[#1f2e2e] rounded-xl p-4">
                                    <div>
                                        <h4 className="text-lg font-medium mb-1 text-white">{selectedTicket.subject}</h4>
                                        <p className="text-gray-400">ID: {selectedTicket.id?.slice(-8).toUpperCase()}</p>
                                    </div>

                                    <div className="flex gap-2 justify-end sm:justify-start">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${selectedTicket.priority === "High"
                                                    ? "bg-red-500/20 text-red-300 border border-red-400/30"
                                                    : selectedTicket.priority === "Medium"
                                                        ? "bg-orange-500/20 text-orange-300 border border-orange-400/30"
                                                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                                                }`}
                                        >
                                            <FaFlag className="w-2.5 h-2.5 mr-1" />
                                            {selectedTicket.priority}
                                        </span>
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${selectedTicket.status === "Open"
                                                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                                                    : selectedTicket.status === "Closed"
                                                        ? "bg-slate-500/20 text-slate-300 border border-slate-400/30"
                                                        : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                                                }`}
                                        >
                                            {selectedTicket.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-300">
                                            Created:{" "}
                                            <span className="text-gray-400">
                                                {new Date(selectedTicket.createdAt).toLocaleString()}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span className="text-gray-300">
                                            Updated:{" "}
                                            <span className="text-gray-400">
                                                {new Date(selectedTicket.updatedAt).toLocaleString()}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="bg-[#050D0F] border border-[#1f2e2e] rounded-xl p-4">
                                    <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        User Information
                                    </h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            {selectedTicket.user?.name}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {selectedTicket.user?.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {selectedTicket.user?.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                            </svg>
                                            {selectedTicket.user?.userId}
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="bg-[#050D0F] border border-[#1f2e2e] rounded-xl p-4">
                                    <h5 className="font-medium text-white mb-3">Description</h5>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {selectedTicket.description || "No description provided"}
                                    </p>
                                </div>

                                {/* Attachment */}
                                {selectedTicket.imageUrl && (
                                    <div className="bg-[#050D0F] border border-[#1f2e2e] rounded-xl p-4">
                                        <h5 className="font-medium text-white mb-3">Attachment</h5>
                                        <div 
                                            className="w-20 h-20 rounded-lg border border-[#2a2a2a] cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                                            onClick={() => setShowImageViewer(true)}
                                        >
                                            <img
                                                src={selectedTicket.imageUrl}
                                                alt="Ticket attachment"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-[#1f2e2e]">
                                    <button
                                        onClick={() => setShowTicketDetails(false)}
                                        className="flex-1 px-4 py-2 border border-[#4B5563] rounded-lg text-sm hover:bg-[#1a1a1a] transition-colors text-white"
                                    >
                                        Close
                                    </button>
                                    <div className="relative flex-1 status-dropdown">
                                        <button 
                                            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                            className="w-full px-4 py-2 bg-gradient-to-r from-[#00d1b2] to-[#00a48c] hover:from-[#00a48c] hover:to-[#008f7a] rounded-lg text-sm transition-colors text-white flex items-center justify-center gap-2"
                                        >
                                            Update Status
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {showStatusDropdown && (
                                            <div className="absolute bottom-full mb-2 left-0 right-0 bg-[#050D0F] border border-[#1f2e2e] rounded-lg shadow-lg z-10">
                                                {['Open', 'In Progress', 'Resolved', 'Closed'].map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() => handleStatusUpdate(status)}
                                                        className="w-full px-4 py-2 text-left text-sm text-white hover:bg-[#1a1a1a] transition-colors first:rounded-t-lg last:rounded-b-lg"
                                                    >
                                                        {status}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Image Viewer Modal */}
            <AnimatePresence>
                {showImageViewer && selectedTicket?.imageUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4"
                        onClick={() => setShowImageViewer(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative w-[600px] h-[450px]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowImageViewer(false)}
                                className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
                            >
                                <img src={close} alt="close" className="w-6 h-6" />
                            </button>
                            <img
                                src={selectedTicket.imageUrl}
                                alt="Ticket attachment"
                                className="w-full h-full object-contain rounded-lg"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Support
