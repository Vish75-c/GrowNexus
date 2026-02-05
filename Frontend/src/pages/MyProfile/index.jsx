import React from "react";
import { useAppStore } from "@/store";
import * as Avatar from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { getColor } from "@/lib/utils";
import { 
  FiMail, FiBriefcase, FiMapPin, 
  FiEdit3, FiLinkedin, FiLayers, 
  FiHash, FiStar, FiChevronRight 
} from "react-icons/fi";

const MyProfile = () => {
  const { userInfo } = useAppStore();

  return (
    <div className="bg-[#1f202a] min-h-screen bg-gray- text-slate-400 font-sans">
      {/* --- SIMPLE HEADER --- */}
      <div className="bg-[#292b36] border-b border-gray-700 py-10 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          
          {/* Square Avatar - Much cleaner for College Portals */}
          <Avatar.Root
            className={`h-40 w-40 rounded-2xl border-2 border-gray-600 shadow-xl flex-shrink-0 overflow-hidden ${getColor(userInfo?.colorIndex)}`}
          >
            {userInfo?.image ? (
              <Avatar.Image src={userInfo.image} className="h-full w-full object-cover" />
            ) : (
              <Avatar.Fallback className="flex items-center justify-center text-white font-black text-6xl uppercase">
                {userInfo?.firstName?.[0]}
              </Avatar.Fallback>
            )}
          </Avatar.Root>

          <div className="flex-1 space-y-2 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {userInfo?.firstName} {userInfo?.lastName}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-400">
              <span className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-md border border-gray-700 text-sm">
                <FiBriefcase className="text-blue-500" /> {userInfo?.role || "Student"}
              </span>
              <span className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-md border border-gray-700 text-sm">
                <FiMail className="text-blue-500" /> {userInfo?.email}
              </span>
              <span className="flex items-center gap-2 bg-gray-900 px-3 py-1 rounded-md border border-gray-700 text-sm">
                <FiMapPin className="text-blue-500" /> Campus Portal
              </span>
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all">
            <FiEdit3 /> Edit Profile
          </button>
        </div>
      </div>

      {/* --- MAIN BODY --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-8">
        
        {/* Bio & Details (Left side) */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FiLayers className="text-blue-500" /> Personal Bio
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              {userInfo?.bio || "Describe your academic journey or professional goals here."}
            </p>
          </section>

          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <FiStar className="text-blue-500" /> Technical Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {userInfo?.skills?.map((skill, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-900 p-3 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <FiHash className="text-blue-500" size={14} />
                  <span className="font-semibold text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Style Info (Right side) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Connect</h3>
            <a href="#" className="flex items-center justify-between p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-all">
              <div className="flex items-center gap-3">
                <FiLinkedin className="text-blue-400" />
                <span className="text-sm font-bold">LinkedIn</span>
              </div>
              <FiChevronRight />
            </a>
          </div>

          <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-xl">
            <p className="text-blue-400 text-xs font-bold uppercase mb-2">Notice</p>
            <p className="text-sm text-slate-300">Profile visibility is set to Public for registered Alumni.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;