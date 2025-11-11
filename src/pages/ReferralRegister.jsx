import React, { useState } from 'react'
import { motion } from 'framer-motion'
import eyeopen from '../assets/changepassword/eyeopen.png'
import eyeclose from '../assets/changepassword/eyeclose.png'

const ReferralRegister = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" border border-[#1f2e2e] rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-2">Referral Registration</h2>
        <p className="text-sm text-gray-400 mb-6">Register with referral code</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <img src={showPassword ? eyeopen : eyeclose} alt="toggle" className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Package Type</label>
            <select className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]">
              <option value="">Select package type</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Referral Code</label>
            <input
              type="text"
              placeholder="Enter referral code"
              className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95 mt-6">
            Register
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ReferralRegister
