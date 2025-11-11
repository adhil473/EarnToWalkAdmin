import React, { useState, useRef, useEffect } from 'react'
import { submitUpdateKYC, updateuserProfile, adminProfile } from '../api/serviceApi'
import { changePassword } from '../api/authApi'
import { motion, AnimatePresence } from 'framer-motion'
import profile from '../assets/profile/profile.png'
import message from '../assets/profile/message.png'
import phone from '../assets/profile/phone.png'
import password from '../assets/profile/password.png'
import kyc from '../assets/profile/kyc.png'
import clock from '../assets/profile/clock.png'
import verified from '../assets/profile/verified.png'
import edit from '../assets/profile/edit.png'
import close from '../assets/changepassword/close.png'
import eyeopen from '../assets/changepassword/eyeopen.png'
import eyeclose from '../assets/changepassword/eyeclose.png'
import upload from '../assets/changepassword/upload.png'
import { useToast } from '../context/ToastContext'


const Profile = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setdocumentType] = useState(null);
  const [documentNumber, setdocumentNumber] = useState(null);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();
  const [userData, setUserData] = useState('')
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    name: '',
    email: '',
    phone: ''
  });


  const fetchUserProfile = async () => {
    try {
      const response = await adminProfile()
      console.log(response)
      setUserData(response.data)
      setEditableData({
        name: response.data?.name || '',
        email: response.data?.email || '',
        phone: response.data?.phone || ''
      });
    } catch (error) {
      console.error('failed to fetch profile');
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, [])

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('New password and confirm password do not match');
      return;
    }
    try {
      const response = await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      });
      console.log('Password changed successfully:', response);
      setShowPasswordModal(false);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Password change failed:', error);
    }
  }

  const handleSubmitKYC = async () => {
    try {
      if (!documentType || !documentNumber || !selectedFile) {
        showToast('Please fill all fields before submitting');
        return;
      }
  
      const formData = new FormData();
      formData.append('documentType', documentType);
      formData.append('documentNumber', documentNumber);
      formData.append('document', selectedFile);
  
      const res = await submitUpdateKYC(formData);
  
      if (res?.success) {
        showToast(res?.message || "KYC submitted successfully");
        setShowKYCModal(false);
        setdocumentType('');
        setdocumentNumber('');
        setSelectedFile(null);
      } else {
        showToast(res?.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
      showToast('Failed to submit KYC');
    }
  };

  const updateprofile= async()=>{
    try {
      const res= await updateuserProfile(editableData)
      if (res?.success) {
        showToast(res?.message || "Profile updated successfully");
        fetchUserProfile()
        
      } else {
        showToast(res?.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-20 py-6 md:py-12 space-y-10 mt-16">
      {/* Personal Details Section */}
      {/* Personal Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-between items-start mb-1">
          <div>
            <h2 className="text-xl font-semibold">Personal Details</h2>
            <p className="text-sm text-gray-400 mt-1">Manage Your Profile And Contact Information.</p>
          </div>

          {/* Edit / Save Toggle */}
          <button
            onClick={() => {
              if (isEditing) {
                if (editableData.phone.length !== 10) {
                  showToast('Phone number must be exactly 10 digits');
                  return;
                }
                updateprofile();
              }
              setIsEditing((prev) => !prev);
            }}
            className="text-white font-semibold text-sm px-4.5 py-2.5 rounded-lg transition-all duration-300 hover:scale-95 whitespace-nowrap flex items-center gap-2 border border-[#4B5563]"
          >
            <img src={edit} alt='edit' className='w-4' /> {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            {isEditing ? (
              <input
                type="text"
                value={editableData.name}
                onChange={(e) => setEditableData({ ...editableData, name: e.target.value })}
                className="w-full bg-transparent border border-[#1f2e2e] rounded-lg px-3 py-2 mt-2 text-white focus:outline-none focus:border-[#00bcd4]"
              />
            ) : (
              <p className="text-md font-medium ml-3 mt-1 pt-2">{userData?.name}</p>
            )}
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
            {isEditing ? (
              <input
                type="email"
                value={editableData.email}
                disabled
                className="w-full bg-transparent border border-[#1f2e2e] rounded-lg px-3 py-2 mt-2 text-gray-500 cursor-not-allowed"
              />
            ) : (
              <p className="text-md font-medium ml-3 mt-1 pt-2">{userData?.email}</p>
            )}
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
            {isEditing ? (
              <input
                type="text"
                value={editableData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setEditableData({ ...editableData, phone: value });
                }}
                maxLength={10}
                className="w-full bg-transparent border border-[#1f2e2e] rounded-lg px-3 py-2 mt-2 text-white focus:outline-none focus:border-[#00bcd4]"
              />
            ) : (
              <p className="text-md font-medium ml-3 mt-1 pt-2">{userData?.phone}</p>
            )}
          </motion.div>
        </div>
      </motion.div>


      {/* Security Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold">Security Details</h2>
        <p className="text-sm text-gray-400 mt-1">Update Your Password, KYC, And Security Preferences Anytime.</p>

        <div className="mt-4 space-y-4">
          {/* Password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 min-h-[110px] md:min-h-[142px]"
          >
            <div className="flex items-center gap-3">
              <img src={password} alt='profile.png' className='w-14' />
              <div>
                <p className="text-md font-medium">Password</p>
                <p className="text-sm text-gray-400 mt-2">Used For Secure Login</p>
              </div>
            </div>
            <button onClick={() => setShowPasswordModal(true)} className="w-full md:w-40 bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95 whitespace-nowrap">
              Change Password
            </button>
          </motion.div>

          {/* KYC Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-[#050D0F] border border-[#1f2e2e] p-4 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 min-h-[110px] md:min-h-[142px]"
          >
            <div className="flex items-center gap-3">
              <img src={kyc} alt='profile.png' className='w-14' />
              <div>
                <p className="text-md font-medium flex items-center gap-2">
                  KYC Details
                  {isVerified ? (
                    <span className="mt-2 text-green-400 border border-green-300 text-xs px-1.5 py-0.5 rounded-xl">
                      <img src={verified} alt='verified' className='w-4 inline-block' /> Verified
                    </span>
                  ) : (
                    <span className="mt-2 text-yellow-400 border border-yellow-300 text-xs px-1.5 py-0.5 rounded-xl">
                      <img src={clock} alt='clock' className='w-4 inline-block' /> Verification Pending
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-400">
                  Verify Your Identity To Activate Full Access To Earnings And Service Features
                </p>
              </div>
            </div>
            {isVerified ? (
              <button className="w-full md:w-auto text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-95 whitespace-nowrap flex items-center justify-center gap-2 border border-[#4B5563]">
                <img src={edit} alt='edit' className='w-4' /> Edit
              </button>
            ) : (
              <button onClick={() => setShowKYCModal(true)} className="w-full md:w-40 bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95 whitespace-nowrap">
                Update KYC
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Change Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className=" border border-[#1f2e2e] rounded-xl p-6 w-full max-w-md relative"
            >
              <button onClick={() => setShowPasswordModal(false)} className="absolute top-4 right-4">
                <img src={close} alt="close" className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-semibold mb-2">Change Password</h2>
              <p className="text-sm text-gray-400 mb-6">Update your password regularly for better security</p>

              <div className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Current Your Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter your current password"
                      value={passwordData.oldPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                      className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
                    />
                    <button
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <img src={showCurrentPassword ? eyeopen : eyeclose} alt="toggle" className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <img src={showNewPassword ? eyeopen : eyeclose} alt="toggle" className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
                    />
                    <button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <img src={showConfirmPassword ? eyeopen : eyeclose} alt="toggle" className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <button onClick={handlePasswordChange} className="w-full bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95 mt-6">
                  Update Password
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KYC Verification Modal */}
      <AnimatePresence>
        {showKYCModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className=" border border-[#1f2e2e] rounded-xl p-6 w-full max-w-md relative"
            >
              <button onClick={() => setShowKYCModal(false)} className="absolute top-4 right-4">
                <img src={close} alt="close" className="w-6 h-6" />
              </button>

              <h2 className="text-xl font-semibold mb-2">Verify Your Identity</h2>
              <p className="text-sm text-gray-400 mb-6">Upload your KYC documents to verify your account</p>

              <div className="space-y-4">
                {/* Document Type */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Document Type</label>
                  <select 
                    value={documentType || ''}
                    onChange={(e) => setdocumentType(e.target.value)}
                    className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
                  >
                    <option value="">Select document type</option>
                    <option value="passport">Passport</option>
                    <option value="driving_license">Driving License</option>
                    <option value="national_id">National ID</option>
                  </select>
                </div>

                {/* Document Number */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Document Number</label>
                  <input
                    type="text"
                    value={documentNumber || ''}
                    onChange={(e) => setdocumentNumber(e.target.value)}
                    placeholder="Enter your document number"
                    className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
                  />
                </div>

                {/* Upload Document */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Upload Document</label>
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
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowKYCModal(false)} className="flex-1 bg-transparent border border-[#4B5563] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-95">
                    Cancel
                  </button>
                  <button onClick={handleSubmitKYC} className="flex-1 bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95">
                    Submit For Verification
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Profile
