import React, { useEffect } from "react";
import { useAppStore } from "@/store";
import * as Avatar from "@radix-ui/react-avatar";
import { motion, AnimatePresence } from "framer-motion";
import { getColor } from "@/lib/utils";
import {
  FiMail,
  FiMapPin,
  FiEdit3,
  FiLinkedin,
  FiLayers,
  FiHash,
  FiChevronRight,
  FiGlobe,
  FiCpu,
  FiArrowLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MyProfile = ({userInfo}) => {
  
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[#1f202a] text-slate-400 py-10 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10"
      >
        {/* ================= LEFT COLUMN: IDENTITY ================= */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
          {/* PROFILE CARD */}
          <div className="bg-[#292b36] rounded-[3rem] p-10 border border-slate-800 shadow-2xl flex flex-col items-center text-center relative overflow-hidden group">
            {/* Animated Background Glow */}
            <div className={`absolute -top-24 -left-24 h-64 w-64 rounded-full blur-[80px] opacity-10 transition-all duration-700 group-hover:opacity-20 ${getColor(userInfo?.colorIndex)}`} />

            {/* AVATAR SECTION */}
            <div className="relative mb-8">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-0 blur-3xl opacity-30 rounded-full ${getColor(userInfo?.colorIndex)}`}
              />

              <Avatar.Root
                className={`h-44 w-44 md:h-52 md:w-52 rounded-[2.5rem] border-8 border-[#1f202a] shadow-2xl overflow-hidden relative z-10 ${getColor(userInfo?.colorIndex)}`}
              >
                {userInfo?.image ? (
                  <Avatar.Image
                    src={userInfo.image}
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <Avatar.Fallback className="flex items-center justify-center text-white font-black text-7xl uppercase">
                    {userInfo?.firstName?.[0] || userInfo?.email?.[0]}
                  </Avatar.Fallback>
                )}
              </Avatar.Root>
            </div>

            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              {userInfo?.firstName} <span className="text-slate-500">{userInfo?.lastName}</span>
            </h1>

            <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px]">
                {userInfo?.role || "System Architect"}
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/profile")}
              className="w-full bg-linear-to-r from-[#8417ff] to-[#6a11cb] text-white py-4 rounded-2xl font-black text-xs tracking-widest flex items-center justify-center gap-3 transition shadow-xl shadow-purple-900/20 mb-10"
            >
              <FiEdit3 size={16} /> Edit Profile
            </motion.button>

            {/* CONTACT DETAILS */}
            <div className="w-full space-y-4 pt-8 border-t border-slate-800/50">
              {[
                { icon: <FiMail />, label: "Comm-Link", value: userInfo?.email },
                { icon: <FiMapPin />, label: "Nexus Point", value: "Main Campus Portal" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-[#1f202a]/50 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    {item.icon}
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[9px] uppercase font-black text-slate-600 tracking-tighter">
                      {item.label}
                    </p>
                    <p className="text-sm text-slate-200 font-bold truncate">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NETWORKING */}
          <motion.div variants={itemVariants} className="bg-[#292b36] p-6 rounded-[2.5rem] border border-slate-800 shadow-xl">
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 ml-2">
              Neural Network
            </h3>
            <button
              onClick={() => userInfo.linkedinUrl && window.open(userInfo.linkedinUrl, '_blank')}
              className="w-full flex items-center justify-between p-5 bg-[#1f202a] rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#0077b5]/10 rounded-lg text-[#0077b5]">
                  <FiLinkedin size={20} />
                </div>
                <span className="font-bold text-slate-200 text-sm">LinkedIn Connectivity</span>
              </div>
              <FiChevronRight className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition" />
            </button>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT COLUMN: DATA ================= */}
        <div className="lg:col-span-8 space-y-8">
          {/* ABOUT EXPERIENCE */}
          <motion.div
            variants={itemVariants}
            className="bg-[#292b36] p-10 md:p-14 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 opacity-[0.03] text-white">
              <FiLayers size={300} />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <FiGlobe size={24} />
              </div>
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white">
                Bio-Metric Summary
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-xl md:text-2xl font-medium italic opacity-90">
              "{userInfo?.bio || "No biography data found in the neural archives."}"
            </p>
          </motion.div>

          {/* SKILLS & STACK */}
          <motion.div
            variants={itemVariants}
            className="bg-[#292b36] p-10 md:p-14 rounded-[3rem] border border-slate-800 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <FiCpu size={24} />
                </div>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white">
                  Technical Stack
                </h2>
              </div>
              <div className="px-4 py-1 bg-slate-800/50 rounded-full border border-slate-700">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {userInfo?.skills?.length || 0} Modules Loaded
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              <AnimatePresence>
                {userInfo?.skills?.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.4)" }}
                    className="flex items-center gap-4 bg-[#1f202a] p-5 rounded-[1.5rem] border border-slate-800 transition-all cursor-default group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-emerald-500 transition-colors">
                      <FiHash size={18} />
                    </div>
                    <span className="font-bold text-sm text-slate-200 tracking-tight uppercase">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;