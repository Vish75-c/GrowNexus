import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiBell, FiInfo, FiAlertCircle, 
  FiClock, FiTrendingUp, FiActivity,
  FiChevronRight
} from 'react-icons/fi';

const NoticeBoard = () => {
  const notices = [
    {
      id: 1,
      title: "System Maintenance scheduled",
      content: "GrowthNexus will be undergoing scheduled maintenance on Sunday, Feb 20th. Expect brief interruptions in messaging services.",
      date: "Oct 12, 2024",
      type: "alert",
      priority: "Critical"
    },
    {
      id: 2,
      title: "New Mentorship Features",
      content: "The dashboard now supports real-time project tracking. Mentors can now assign milestones directly to students.",
      date: "Oct 10, 2024",
      type: "info",
      priority: "High"
    },
    {
      id: 3,
      title: "Growth Blog Winners",
      content: "Congratulations to the winners of the 'Tech Innovation' blog contest. Your rewards have been credited to your profile.",
      date: "Oct 08, 2024",
      type: "update",
      priority: "Medium"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="w-full h-full bg-[#1f202a] text-slate-400 font-sans md:px-3 overflow-y-auto custom-scrollbar">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto  mb-15 mt-10"
      >
        {/* --- HEADER --- */}
        <motion.div variants={itemVariants} className=" mb-12">
          <h1 className="text-4xl font-black text-white tracking-tight">
            System <span className="text-blue-600 italic">Notices</span>
          </h1>
          <p className="text-slate-500 text-sm mt-3 max-w-md  font-medium">
            Important updates and announcements regarding the GrowthNexus ecosystem.
          </p>
        </motion.div>

        {/* --- QUICK STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, translateY: -2 }}
            className="bg-[#292b36] p-5 rounded-2xl border border-slate-800 flex items-center gap-5 shadow-xl"
          >
            <div className="h-12 w-12 shrink-0 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
              <FiActivity size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Server Status</p>
              <p className="text-emerald-500 font-bold">All Systems Operational</p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02, translateY: -2 }}
            className="bg-[#292b36] p-5 rounded-2xl border border-slate-800 flex items-center gap-5 shadow-xl"
          >
            <div className="h-12 w-12 shrink-0 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
              <FiTrendingUp size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Next Update</p>
              <p className="text-slate-200 font-bold">v2.4.0 (Live in 4 days)</p>
            </div>
          </motion.div>
        </div>

        {/* --- MAIN CONTENT CARD --- */}
        <motion.div variants={itemVariants}>
          <div className="bg-[#292b36] rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden">
            <div className="p-8 lg:p-10 border-b border-slate-800/50 bg-[#292b36]">
               <div className="flex items-center gap-3">
                  <FiBell className="text-blue-500" size={20} />
                  <h2 className="text-xl font-black text-white tracking-tight">Recent Announcements</h2>
               </div>
            </div>

            <div className="divide-y divide-slate-800/50">
              {notices.map((notice) => (
                <motion.div 
                  key={notice.id}
                  variants={itemVariants}
                  className="p-8 hover:bg-[#1f202a]/30 transition-all duration-300 group cursor-default"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] border ${
                      notice.type === 'alert' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      notice.type === 'info' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                      'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                      {notice.type}
                    </span>
                    <div className="flex items-center gap-1 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                      <FiClock size={12} />
                      {notice.date}
                    </div>
                  </div>

                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {notice.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-medium">
                        {notice.content}
                      </p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="h-10 w-10 rounded-xl bg-[#1f202a] flex items-center justify-center text-slate-600 group-hover:text-blue-500 group-hover:border-blue-500/30 border border-slate-800 transition-all"
                    >
                      <FiChevronRight size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CARD FOOTER */}
            <div className="p-6 bg-[#1f202a]/20 text-center">
               <motion.button 
                whileHover={{ letterSpacing: "0.25em", color: "#94a3b8" }}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 transition-all"
               >
                 Load Archive History
               </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NoticeBoard;