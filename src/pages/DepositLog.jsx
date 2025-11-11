
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { transactions } from '../api/serviceApi';
import tether from '../assets/withdraw/tether.png'

function DepositLog() {
   const [historyData, setData] = useState([])
   const [pagination, setPagination] = useState(null)
   const [currentPage, setCurrentPage] = useState(1)
 
   const handlegetTransactions = async (page = 1) => {
     try {
       const res = await transactions(page);
       if (res?.success) {
         setData(res?.data?.transactions)
         setPagination(res?.data?.pagination)
         console.log(res.data);
       }
     } catch (error) {
       console.log(error);
     }
   }
 
   const truncateDescription = (text, maxLength = 50) => {
     return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
   }
 
   const truncateDescriptionMobile = (text, maxLength = 30) => {
     return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
   }
 
   useEffect(() => {
     handlegetTransactions(currentPage);
   }, [currentPage])
   return (
     <div className='p-4 md:p-8 space-y-6 md:space-y-10 mt-16 md:mt-20 md:ml-2'>
       <div>
         <h3 className="text-white text-lg md:text-xl font-semibold mb-4">Deposit Log</h3>
       </div>
       
       {/* Desktop Table Layout */}
       <div className="hidden md:block overflow-x-auto border border-[#1f2e2e] rounded-lg">
         <div className="min-w-[600px]">
           {/* Table Header */}
           <div className="grid grid-cols-5 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e]">
             <p>Date & Time</p>
             <p>Description</p>  
             <p>Details</p>
             <p>Amount</p>
             <p>Status</p>
           </div>
 
           {/* Table Rows */}
           <AnimatePresence>
             {historyData.map((item, index) => (
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
                   <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                   <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                 </div>
                 <p title={item.description}>{truncateDescription(item.description)}</p>
                 <p>{item.type}</p>
                 <div className='  flex items-center gap-2 text-[#0d9c44ff] font-semibold'>
                   <img src={tether} alt='tether' className='w-4' />{item.amount}
                 </div>
                 <div className="inline-block px-3 py-1 bg-[#0e1a0e] text-[#0d9c44ff] border border-[#0d9c44ff] rounded-lg font-medium text-sm w-fit">
                   {item.status}
                 </div>
               </motion.div>
             ))}
           </AnimatePresence>
         </div>
       </div>
       
       {/* Mobile Card Layout */}
       <div className="md:hidden space-y-3">
         <AnimatePresence>
           {historyData.map((item, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ 
                 duration: 0.4, 
                 ease: "easeOut",
                 delay: index * 0.05 
               }}
               className="bg-[#050D0F] border border-[#1f2e2e] rounded-lg p-4 space-y-3"
             >
               {/* Header Row */}
               <div className="flex justify-between items-start">
                 <div className="flex-1">
                   <p className="text-gray-400 text-xs mb-1">Date & Time</p>
                   <p className="text-white text-sm">{new Date(item.createdAt).toLocaleDateString()}</p>
                   <p className="text-gray-500 text-xs">{new Date(item.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
                 </div>
                 <div className="px-3 py-1 bg-[#0e1a0e] border border-[#0d9c44ff] rounded-full">
                   <span className="text-[#0d9c44ff] text-xs font-medium">{item.status}</span>
                 </div>
               </div>
               
               {/* Description */}
               <div>
                 <p className="text-gray-400 text-xs mb-1">Description</p>
                 <p className="text-gray-300 text-sm" title={item.description}>
                   {truncateDescriptionMobile(item.description)}
                 </p>
               </div>
               
               {/* Bottom Row */}
               <div className="flex justify-between items-center pt-2 border-t border-[#1f2e2e]">
                 <div>
                   <p className="text-gray-400 text-xs">Type</p>
                   <p className="text-gray-300 text-sm">{item.type}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-gray-400 text-xs">Amount</p>
                   <p className=" flex items-center gap-2 text-[#0d9c44ff] font-semibold text-lg"><img src={tether} alt='tether' className='w-4' />{item.amount}</p>
                 </div>
               </div>
             </motion.div>
           ))}
         </AnimatePresence>
       </div>
 
       {/* Pagination */}
       {pagination && pagination.totalPages > 1 && (
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
     </div>
   )
 }

export default DepositLog