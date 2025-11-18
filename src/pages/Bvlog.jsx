import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getbvlogData } from '../api/serviceApi'
import tether from '../assets/withdraw/tether.png'

const Bvlog = () => {
  const [data, setData] = useState([])

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  const handleGetData = async () => {
    try {
      const res = await getbvlogData();
      const responseData = res.data || res;
      setData(Array.isArray(responseData) ? responseData : []);
    } catch (error) {
      console.error('Error fetching bvlog data:', error);
      setData([]);
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <div className='md:p-8 space-y-10 mt-20 '>
      <div>
        <h3 className="text-white text-xl font-semibold mb-4 pl-2">BV Log</h3>
      </div>
      <div className="overflow-x-auto border border-[#1f2e2e] rounded-lg">
        <div className="min-w-[600px]">
          {/* Table Header */}
          <div className="grid grid-cols-5 bg-[#050D0F] text-gray-300 text-sm font-medium py-3 px-5 border-b border-[#1f2e2e]">
            <p>Date & Time</p>
            <p>Name</p>
            <p>Detail</p>
            <p>Position</p>
            <p>BV</p>
          </div>

          {/* Table Rows */}
          <AnimatePresence>
            {Array.isArray(data) && data.map((item, index) => (
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
                  <p>{item.date}</p>
                  <p className="text-xs text-gray-500">{formatTime(item.time)}</p>
                </div>
                <p>{item.name}</p>
                <p>{item.details}</p>
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
                  {item.position}
                </div>
                <div className='text-[#0d9c44ff]'>
                  {item.BV}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Bvlog
