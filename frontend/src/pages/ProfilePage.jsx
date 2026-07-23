import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = (e) => {
    const file=e.target.files[0];
    if(!file) return;
    const reader=new FileReader();
    reader.readAsDataURL(file);

    reader.onload=async ()=>{
      const base64Image=reader.result;
      setSelectedImg(base64Image);
      await updateProfile({profilePic:base64Image});

    }
    
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden px-4 sm:px-8 text-white pt-24 pb-12">
      
      {/* Background Aurora Glow */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse delay-1000 pointer-events-none"></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-xl p-6 sm:p-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl space-y-8">
        
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
            Profile
          </h1>
          <p className="text-sm text-gray-400 font-medium">Your profile information</p>
        </div>

        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser?.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 border-white/10 shadow-xl"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 
                bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500
                p-2.5 rounded-full cursor-pointer 
                transition-all duration-300 shadow-lg
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-xs text-gray-400">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>

        {/* User Info Fields */}
        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              Full Name
            </div>
            <p className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 text-white opacity-90">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              Email Address
            </div>
            <p className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-5 py-4 text-white opacity-90">
              {authUser?.email}
            </p>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-300 mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-white/5 text-gray-400">
              <span>Member Since</span>
              <span className="text-white font-medium">
                {authUser?.createdAt ? authUser.createdAt.split("T")[0] : "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 text-gray-400">
              <span>Account Status</span>
              <span className="text-emerald-400 font-medium">Active</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;