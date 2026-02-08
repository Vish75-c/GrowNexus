import React from "react";
import { motion } from "framer-motion";
import { 
  FiBookOpen, FiZap, FiBriefcase, 
  FiEdit, FiTrendingUp, FiTerminal, 
  FiChevronRight, FiUsers 
} from "react-icons/fi";
import { useAppStore } from "@/store";

const Documentation = () => {
    const {userInfo}=useAppStore();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const sections = [
    {
      title: "The Nexus Blog",
      icon: <FiEdit className="text-pink-400" />,
      content: "A dedicated space for Alumni and Seniors to share their technical roadmaps, internship experiences, and interview tips. These articles are designed to provide a blueprint for juniors to navigate their own career paths successfully."
    },
    {
      title: "Hiring & Referrals",
      icon: <FiBriefcase className="text-blue-400" />,
      content: "Direct access to growth. Seniors and Alumni can post active hiring roles, internship openings, and referral opportunities from their current companies. This bypasses generic job boards and connects students directly with the community."
    },
    {
      title: "Community Growth",
      icon: <FiTrendingUp className="text-emerald-400" />,
      content: "The platform promotes a 'Pay It Forward' culture. As seniors grow in the industry, they return to mentor the next batch, ensuring the GrowthNexus ecosystem remains a constant source of career acceleration."
    },
    {
      title: "Notice Board",
      icon: <FiZap className="text-amber-400" />,
      content: "Real-time updates regarding campus events, tech hackathons, and guest lectures. Ensure your notifications are on to catch time-sensitive hiring posts and exclusive workshop registrations."
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto p-6 lg:p-12 font-sans"
    >
      {/* --- HEADER --- */}
      <motion.div variants={itemVariants} className="mb-16 border-b border-slate-800 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500">
            <FiTerminal size={24} />
          </div>
          <span className="text-blue-500 font-black tracking-widest text-xs uppercase">Platform Guide</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-100 tracking-tight mb-6">
          Community <span className="text-slate-500">& Growth</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
          GrowthNexus isn't just a directory—it's an active career engine. Learn how to contribute your experiences and find your next big opportunity.
        </p>
      </motion.div>

      {/* --- CONTENT GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, borderColor: "rgba(59, 130, 246, 0.3)" }}
            className="bg-[#1b1c24]/50 border border-slate-800 p-8 rounded-[2rem] transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                {section.icon}
              </div>
              <FiChevronRight className="text-slate-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-4 tracking-tight">
              {section.title}
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm font-medium">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      {/* --- REFERRAL CALL TO ACTION --- */}
      {(userInfo.role==='alumni')&&<motion.div 
        variants={itemVariants}
        className="mt-16 p-8 rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-5 text-center md:text-left">
          <div className="h-14 w-14 rounded-2xl bg-[#1b1c24] border border-slate-800 flex items-center justify-center text-blue-500">
            <FiUsers size={28} />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-100 uppercase tracking-tight">Alumni Referral Program</h4>
            <p className="text-slate-400 text-sm">Are you hiring? Share your post directly to the Nexus board.</p>
          </div>
        </div>
        <button className="whitespace-nowrap px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/10">
          Post a Vacancy
        </button>
      </motion.div>}
    </motion.div>
  );
};

export default Documentation;