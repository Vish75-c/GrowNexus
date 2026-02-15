import React from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCalendar,
  FiCpu,
  FiSend,
  FiBookmark,
  FiTerminal,
  FiAward,
} from "react-icons/fi";

const HiringPost = () => {
  const jobs = [
    {
      _id: "699207ac2e4192dad8345144",
      company: "Tesla",
      companyDiscription:
        "Tesla is accelerating the world's transition to sustainable energy. They specialize in electric vehicles and solar power.",
      role: "Data Analyst",
      location: "Austin, TX",
      duration: "4-month internship",
      stipend: "$40/hour",
      requirements: "Python, SQL, and Tableau",
      deadline: "2026-04-14T18:30:00.000Z",
      userInfo: {
        name: "Elon Musk",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elon",
        role: "Senior",
      },
    },
    {
      _id: "699207ac2e4192dad8345145",
      company: "SpaceX",
      companyDiscription:
        "SpaceX designs, manufactures and launches advanced rockets and spacecraft to revolutionize space technology.",
      role: "Software Engineer",
      location: "Starbase, TX",
      duration: "6-month internship",
      stipend: "$55/hour",
      requirements: "C++, Rust, Linux",
      deadline: "2026-05-20T18:30:00.000Z",
      userInfo: {
        name: "Gwynne Shotwell",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gwynne",
        role: "Alumni",
      },
    },
    {
      _id: "699207ac2e4192dad8345146",
      company: "Neuralink",
      companyDiscription: "Brain-computer interface company.",
      role: "Firmware Intern",
      location: "Fremont, CA",
      stipend: "$45/hour",
      duration: "3 months",
      requirements: "C, Assembly",
      deadline: "2026-03-01T18:30:00.000Z",
      userInfo: {
        name: "Shivon Zilis",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shivon",
        role: "Junior",
      },
    },
  ];

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
    <div className="w-full h-full bg-[#1f202a] text-slate-400 font-sans px-4 lg:px-10 overflow-y-auto custom-scrollbar">
      {/* FIXED HERE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto pt-12 pb-20"
      >
        <div className="mb-12">
          <h1 className="text-5xl font-black text-white tracking-tighter">
            Opportunity <span className="text-blue-500">Feed</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-[0.3em]">
            Curated by the GrowthNexus Community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-[#292b36] rounded-[3rem] border border-slate-800 hover:border-blue-500/30 transition-all duration-300 shadow-2xl flex flex-col relative overflow-hidden group"
            >
              {/* Profile */}
              <div className="p-8 pb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={job.userInfo.image}
                    alt=""
                    className="h-12 w-12 rounded-2xl border border-slate-700 p-0.5"
                  />
                  <div>
                    <p className="text-white text-xs font-black uppercase tracking-widest">
                      {job.userInfo.name}
                    </p>
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase border ${getStatusStyle(
                        job.userInfo.role
                      )}`}
                    >
                      {job.userInfo.role}
                    </span>
                  </div>
                </div>
                <FiAward />
              </div>
              {/* Description - Given more space in 2-col */}
                
              <div className="px-8 pb-8 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-white">
                    {job.role}
                  </h3>
                  <div className="flex items-center gap-2">
                    <FiCpu className="text-blue-500" size={16} />
                    <p className="text-slate-500 font-black text-sm uppercase tracking-widest">
                      {job.company}
                    </p>
                  </div>
                  <div className="mt-4">
                   <p className="text-slate-400 text-sm leading-relaxed font-medium line-clamp-3 italic border-l-2 border-slate-800 ">
                     "{job.companyDiscription}"
                   </p>
                </div>
                </div>
                
                {/* FIXED: use DetailPill instead of DetailBox */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <DetailPill
                    icon={<FiMapPin />}
                    label="Location"
                    value={job.location}
                  />
                  <DetailPill
                    icon={<FiDollarSign />}
                    label="Compensation"
                    value={job.stipend}
                  />
                  <DetailPill
                    icon={<FiClock />}
                    label="Duration"
                    value={job.duration}
                  />
                  <DetailPill
                    icon={<FiCalendar />}
                    label="Deadline"
                    value={new Date(job.deadline).toLocaleDateString()}
                  />
                </div>
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
      {icon}
      <span className="text-[10px] font-bold truncate">{value}</span>
    </div>
  </div>
);

export default HiringPost;
