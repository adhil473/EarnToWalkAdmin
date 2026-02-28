import React, { useState } from "react";
import { signIn } from "../api/authApi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import eyeopen from "../assets/changepassword/eyeopen.png";
import eyeclose from "../assets/changepassword/eyeclose.png";

const SignIn = ({ onSwitchToSignUp }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const response = await signIn(formData)
  //     console.log('Signin successful:', response)
  //     console.log('token:', response.data.accessToken)
  //     showToast(response.message || 'Login successful')
  //     login()
  //     navigate('/dashboard')
  //   } catch (error) {
  //     console.error('Signin failed:', error)
  //     const errorMessage = error?.response?.data?.message || 'Login failed'
  //     showToast(errorMessage)
  //   }
  // }

  // earn to walk admin signIn function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(formData);

      showToast("Login successful");

      login();
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error.message || "Login failed";

      showToast(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" border border-[#1f2e2e] rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
        <p className="text-sm text-gray-400 mb-6">Log in to the Admin Board</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-black border border-[#1f2e2e] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#00bcd4]"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <img
                  src={showPassword ? eyeopen : eyeclose}
                  alt="toggle"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#00d1b2] to-[#00a48c] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-95 mt-6"
          >
            Sign In
          </button>

          {/* <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')} className="text-[#00bcd4] hover:underline">
              Sign Up
            </button>
          </p> */}
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
