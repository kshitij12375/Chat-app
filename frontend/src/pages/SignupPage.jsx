import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
      if(!formData.fullName.trim()) return toast.error("Full name is required");
      if(!formData.email.trim()) return toast.error("Email is required");
      if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
      if (!formData.password) return toast.error("Password is required");
      if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

      return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if(success === true) signup(formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden px-4 sm:px-8">
      
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse delay-1000"></div>

      <div className="relative z-10 w-full max-w-md p-6 sm:p-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
            Get Started
          </h1>
          <p className="text-sm text-gray-400 font-medium">Create a new account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
          >
            {isSigningUp ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;