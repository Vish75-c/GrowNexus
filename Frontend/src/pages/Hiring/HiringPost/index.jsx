import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiCpu,
  FiExternalLink,
  FiAward,
  FiTerminal,
} from "react-icons/fi";
import apiClient from "@/lib/apiClient";
import { GET_HIRING_POST } from "@/utils/Constant";

// --- ANIMATION VARIANTS ---

// 1. Staggered Entrance (Container)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// 2. Item Slide-Up (Children)
const slideUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// 3. Interactive Card Hover & Group Hover Logic
const cardVariants = {
  initial: { y: 0 },
  hover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

const iconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const secondaryTextVariants = {
  initial: { opacity: 0, x: 0 },
  hover: { 
    opacity: 1, 
    x: 2, 
    transition: { duration: 0.3 } 
  },
};

const HiringPost = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const GetHiringPost = async () => {
      try {
        const response = await apiClient.get(GET_HIRING_POST, { withCredentials: true });
        if (response.status === 200) {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetHiringPost();
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "alumni": return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      case "senior": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "junior": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      default: return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  return (
    <div className="w-full h-full bg-[#1f202a] text-slate-400 font-sans px-3 pt-10 pb-15 overflow-y-auto custom-scrollbar">
      {/* 4. Main container wrapped in motion.div */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto pb-20"
      >
        {/* Header - inheriting Slide-Up */}
        <motion.div variants={slideUpVariants} className="mb-12 ">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            Opportunity <span className="text-blue-600 italic">Feed</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-[0.3em]">
            Curated by the GrowthNexus Community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {jobs.length > 0 && jobs.map((job) => (
              /* Wrap card to handle both Entrance Slide-up and Hover interaction */
              <motion.div
                key={job._id}
                variants={slideUpVariants}
                whileHover="hover"
              >
                <motion.div
                  variants={cardVariants}
                  className="bg-[#292b36] rounded-[3rem] border border-slate-800 transition-colors duration-300 shadow-2xl flex flex-col relative overflow-hidden group"
                >
                  {/* Profile Section */}
                  <div className="p-8 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.img
                        variants={iconVariants}
                        src={job.postedBy.image}
                        alt="user-img"
                        className="h-12 w-12 object-cover rounded-2xl border border-slate-700 p-0.5"
                      />
                      <div>
                        <p className="text-white text-xs font-black uppercase tracking-widest">
                          {job.postedBy.firstName} {job.postedBy.lastName}
                        </p>
                        <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase border ${getStatusStyle(job.postedBy.role)}`}>
                          {job.postedBy.role}
                        </span>
                      </div>
                    </div>
                    <motion.div variants={iconVariants}>
                      <FiAward className="text-slate-700 group-hover:text-yellow-500 transition-colors" />
                    </motion.div>
                  </div>

                  {/* Main Content */}
                  <div className="px-8 pb-8 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-3xl font-black text-white line-clamp-1">{job.role}</h3>
                      <div className="flex items-center gap-2">
                        <FiCpu className="text-blue-500" size={16} />
                        <p className="text-slate-500 font-black text-sm uppercase tracking-widest">{job.company}</p>
                      </div>
                      <div className="mt-4">
                        <p className="text-slate-400 text-sm leading-relaxed font-medium line-clamp-2 italic border-l-2 border-slate-800 pl-4">
                          "{job.companyDiscription}"
                        </p>
                      </div>
                    </div>

                    {/* Requirements Section */}
                    <div className="mb-6">
                       <div className="flex items-center gap-2 mb-2">
                         <FiTerminal size={12} className="text-purple-500"/>
                         <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Technical Stack</span>
                       </div>
                       <p className="text-xs text-slate-300 font-bold bg-[#1f202a]/40 p-3 rounded-xl border border-slate-800/50">
                         {job.requirements}
                       </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <DetailPill icon={<FiMapPin />} label="Location" value={job.location} />
                      <DetailPill icon={<FiDollarSign />} label="Stipend" value={job.stipend} />
                      <DetailPill icon={<FiClock />} label="Duration" value={job.duration} />
                      <DetailPill icon={<FiCalendar />} label="Deadline" value={new Date(job.deadline).toLocaleDateString()} />
                    </div>

                    {/* Apply Button - with internal Group Hover logic */}
                    <motion.a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-[0.2em] py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                    >
                      Apply Now <motion.span variants={secondaryTextVariants}><FiExternalLink /></motion.span>
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const DetailPill = ({ icon, label, value }) => (
  <div className="bg-[#1f202a]/60 p-3 rounded-2xl border border-slate-800/50 flex flex-col gap-1 transition-colors">
    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{label}</p>
    <div className="flex items-center gap-2 text-slate-300">
      <motion.span variants={iconVariants} className="text-blue-500">{icon}</motion.span>
      <span className="text-[10px] font-bold truncate">{value}</span>
    </div>
  </div>
);

export default HiringPost;