import React, { useState, useEffect } from 'react'
import { signUp } from '../api/authApi'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import eyeopen from '../assets/changepassword/eyeopen.png'
import eyeclose from '../assets/changepassword/eyeclose.png'

const SignUp = ({ onSwitchToSignIn }) => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    referralCode: ''
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const ref = searchParams.get('ref')
    if (ref) {
      setFormData(prev => ({ ...prev, referralCode: ref }))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      }
      if (formData.referralCode) {
        submitData.referralCode = formData.referralCode
      }
      const response = await signUp(submitData)
      console.log('Signup successful:', response)
      login()
      navigate('/dashboard')
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border border-[#1f2e2e] rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-2">Create Account</h2>
        <p className="text-sm text-gray-400 mb-6">Sign up to get started</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
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
            <label className="text-sm text-gray-300 mb-2 block">Referral Code</label>
            <input
              type="text"
              placeholder="Enter referral code (optional)"
              value={formData.referralCode}
              onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
              className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-[#00bcd4] focus:outline-none focus:border-[#00bcd4]"
            />
          </div>

          <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95 mt-6">
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{' '}
            <button onClick={() => navigate('/signin')} className="text-[#00bcd4] hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default SignUp
