import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiCpu,
  FiExternalLink, // Icon for apply button
  FiAward,
  FiTerminal, // Icon for requirements
} from "react-icons/fi";
import apiClient from "@/lib/apiClient";
import { GET_HIRING_POST } from "@/utils/Constant";

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
      case "alumni":
        return "text-purple-400 bg-purple-500/10 border-purple-500/20";
      case "senior":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "junior":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  return (
    <div className="w-full h-full bg-[#1f202a] text-slate-400 font-sans px-3 overflow-y-auto custom-scrollbar">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto pb-20"
      >
        <div className="mb-12 pt-8">
          <h1 className="text-5xl font-black text-white tracking-tighter">
            Opportunity <span className="text-blue-500">Feed</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-[0.3em]">
            Curated by the GrowthNexus Community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {jobs.length > 0 && jobs.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-[#292b36] rounded-[3rem] border border-slate-800 hover:border-blue-500/30 transition-all duration-300 shadow-2xl flex flex-col relative overflow-hidden group"
            >
              {/* Profile */}
              <div className="p-8 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={job.postedBy.image}
                    alt="user-img"
                    className="h-12 w-12 object-cover rounded-2xl border border-slate-700 p-0.5"
                  />
                  <div>
                    <p className="text-white text-xs font-black uppercase tracking-widest">
                      {job.postedBy.firstName} {job.postedBy.lastName}
                    </p>
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase border ${getStatusStyle(
                        job.postedBy.role
                      )}`}
                    >
                      {job.postedBy.role}
                    </span>
                  </div>
                </div>
                <FiAward className="text-slate-700 group-hover:text-yellow-500 transition-colors" />
              </div>

              {/* Main Content */}
              <div className="px-8 pb-8 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-3xl font-black text-white line-clamp-1">
                    {job.role}
                  </h3>
                  <div className="flex items-center gap-2">
                    <FiCpu className="text-blue-500" size={16} />
                    <p className="text-slate-500 font-black text-sm uppercase tracking-widest">
                      {job.company}
                    </p>
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

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <DetailPill icon={<FiMapPin />} label="Location" value={job.location} />
                  <DetailPill icon={<FiDollarSign />} label="Stipend" value={job.stipend} />
                  <DetailPill icon={<FiClock />} label="Duration" value={job.duration} />
                  <DetailPill icon={<FiCalendar />} label="Deadline" value={new Date(job.deadline).toLocaleDateString()} />
                </div>

                {/* --- APPLY BUTTON --- */}
                <a
                  href={job.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-[0.2em] py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                >
                  Apply Now <FiExternalLink />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const DetailPill = ({ icon, label, value }) => (
  <div className="bg-[#1f202a]/60 p-3 rounded-2xl border border-slate-800/50 flex flex-col gap-1">
    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
      {label}
    </p>
    <div className="flex items-center gap-2 text-slate-300">
      <span className="text-blue-500">{icon}</span>
      <span className="text-[10px] font-bold truncate">{value}</span>
    </div>
  </div>
);

export default HiringPost;