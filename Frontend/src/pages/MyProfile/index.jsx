import React, { useEffect } from "react";
import { useAppStore } from "@/store";
import * as Avatar from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
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
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(userInfo);
  },[])
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#1f202a] text-slate-400 p-4 md:p-8 lg:p-12">
      {/* FIXED GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="lg:col-span-4 space-y-6"
        >
          {/* PROFILE CARD */}
          <div className="bg-[#292b36] rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl flex flex-col items-center text-center">
            
            {/* AVATAR */}
            <div className="relative mb-6">
              <div
                className={`absolute inset-0 blur-2xl opacity-20 rounded-full ${getColor(
                  userInfo?.colorIndex
                )}`}
              ></div>

              <Avatar.Root
                className={`h-40 w-40 md:h-48 md:w-48 rounded-[2rem] border-4 border-[#1f202a] shadow-xl overflow-hidden relative z-10 ${getColor(
                  userInfo?.colorIndex
                )}`}
              >
                {userInfo?.image ? (
                  <Avatar.Image
                    src={userInfo.image}
                    className="h-full w-full object-cover rounded-2xl"
                  />
                ) : (
                  <Avatar.Fallback className="flex items-center justify-center text-white font-black text-6xl uppercase">
                    {userInfo?.firstName?.[0]}
                  </Avatar.Fallback>
                )}
              </Avatar.Root>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white">
              {userInfo?.firstName} {userInfo?.lastName}
            </h1>

            <p className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-6">
              {userInfo?.role || "Member"}
            </p>

            <button
              onClick={() => navigate("/profile")}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 transition active:scale-95 mb-8"
            >
              <FiEdit3 /> EDIT PROFILE
            </button>

            {/* CONTACT */}
            <div className="w-full space-y-3 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-4 bg-[#1f202a] p-4 rounded-2xl border border-slate-800/50">
                <FiMail className="text-blue-500" size={20} />
                <div className="text-left min-w-0">
                  <p className="text-[10px] uppercase font-black text-slate-500">
                    Email
                  </p>
                  <p className="text-sm text-slate-200 font-medium truncate">
                    {userInfo?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#1f202a] p-4 rounded-2xl border border-slate-800/50">
                <FiMapPin className="text-blue-500" size={20} />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-black text-slate-500">
                    Location
                  </p>
                  <p className="text-sm text-slate-200 font-medium">
                    Main Campus Portal
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* NETWORK CARD */}
          <div className="bg-[#292b36] p-6 rounded-[2rem] border border-slate-800 shadow-xl">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
              Networking
            </h3>

            <a
              href="#"
              className="flex items-center justify-between p-4 bg-[#1f202a] rounded-2xl border border-slate-800 hover:border-blue-500/50 transition group"
            >
              <div onClick={()=>window.open(userInfo.linkedinUrl,'_blank')} className="flex items-center gap-3">
                <FiLinkedin className="text-[#0077b5]" size={22} />
                <span className="font-bold text-slate-200">
                  LinkedIn Profile
                </span>
              </div>
              <FiChevronRight className="group-hover:translate-x-1 transition" />
            </a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* ABOUT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ delay: 0.1 }}
            className="bg-[#292b36] p-8 md:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FiLayers size={120} />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                <FiGlobe size={20} />
              </div>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white">
                About Experience
              </h2>
            </div>

            <p className="text-slate-400 leading-relaxed text-lg md:text-xl italic">
              "{userInfo?.bio ||
                "Add a bio to tell people what you're building."}"
            </p>
          </motion.div>

          {/* SKILLS */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ delay: 0.2 }}
            className="bg-[#292b36] p-8 md:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <FiCpu size={20} />
                </div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white">
                  Expertise & Stack
                </h2>
              </div>

              <span className="text-[10px] font-black bg-slate-800 px-3 py-1 rounded-full text-slate-500">
                {userInfo?.skills?.length || 0} TAGS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
              {userInfo?.skills?.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[#1f202a] p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition"
                >
                  <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500">
                    <FiHash size={14} />
                  </div>
                  <span className="font-bold text-sm text-slate-300 truncate">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
