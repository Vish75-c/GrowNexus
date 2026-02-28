import React from "react";
import { motion } from "framer-motion";
import { 
  FiBookOpen, FiZap, FiBriefcase, 
  FiEdit, FiTrendingUp, FiTerminal, 
  FiChevronRight, FiUsers, FiAward, FiStar
} from "react-icons/fi";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

const Documentation = () => {
  const { userInfo } = useAppStore();
  const navigate=useNavigate();
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
      tag: "KNOWLEDGE",
      icon: <FiEdit className="text-pink-400" />,
      color: "border-pink-500/20",
      content: "A dedicated space for Alumni and Seniors to share technical roadmaps, internship experiences, and interview tips. These blueprints help juniors navigate complex career paths."
    },
    {
      title: "Hiring & Referrals",
      tag: "OPPORTUNITY",
      icon: <FiBriefcase className="text-blue-400" />,
      color: "border-blue-500/20",
      content: "Direct access to growth. Seniors post active hiring roles and referral opportunities, bypassing generic job boards and connecting students directly with industry insiders."
    },
    {
      title: "Community Growth",
      tag: "CULTURE",
      icon: <FiTrendingUp className="text-emerald-400" />,
      color: "border-emerald-500/20",
      content: "The platform promotes a 'Pay It Forward' culture. As seniors grow, they return to mentor the next batch, ensuring a constant cycle of career acceleration."
    },
    {
      title: "Notice Board",
      tag: "UPDATES",
      icon: <FiZap className="text-amber-400" />,
      color: "border-amber-500/20",
      content: "Real-time updates regarding campus events and hackathons. Keep your notifications active to catch time-sensitive hiring posts and exclusive workshop registrations."
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-10 mb-15 mx-auto md:px-3 "
    >
      {/* --- HEADER --- */}
      <motion.div variants={itemVariants} className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-slate-800 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                <FiTerminal size={22} />
              </div>
              <span className="text-blue-500 font-black tracking-[0.3em] text-[10px] uppercase">Platform Manifesto</span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-6">
              Empowering <span className="text-blue-600 italic">Tomorrow's</span> Leaders.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              GrowthNexus is more than a tool—it's a career engine. Whether you're here to learn or lead, here is how we accelerate professional journeys.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-[#292b36] p-5 rounded-2xl border border-slate-800 shadow-xl min-w-35">
              <FiStar className="text-amber-500 mb-2" size={20}/>
              <p className="text-white font-black text-xl">500+</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Mentors</p>
            </div>
            <div className="bg-[#292b36] p-5 rounded-2xl border border-slate-800 shadow-xl min-w-35">
              <FiAward className="text-blue-500 mb-2" size={20}/>
              <p className="text-white font-black text-xl">1.2k</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Referrals</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- CONTENT GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className={`bg-[#292b36] border border-slate-800 hover:${section.color} p-10 rounded-[2.5rem] transition-all group relative overflow-hidden`}
          >
            {/* Subtle Tag */}
            <div className="absolute top-8 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] font-black tracking-[0.2em] text-slate-500 border border-slate-700 px-2 py-1 rounded">
                {section.tag}
              </span>
            </div>

            <div className="flex items-center gap-5 mb-8">
              <div className="h-14 w-14 rounded-2xl bg-[#1f202a] border border-slate-800 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] transition-all duration-500">
                {section.icon}
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight leading-none">
                {section.title}
              </h3>
            </div>
            
            <p className="text-slate-400 leading-relaxed font-medium">
              {section.content}
            </p>
            
            <div className="mt-8 flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all cursor-pointer">
              Learn More <FiChevronRight />
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- ALUMNI CTA --- */}
      {userInfo.role === 'alumni' && (
        <motion.div 
          variants={itemVariants}
          className="mt-20 p-10 rounded-[3rem] bg-linear-to-br from-blue-600/10 via-[#292b36] to-transparent border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Decorative Background Icon */}
          <FiBriefcase className="absolute -bottom-10 -left-10 text-blue-500/5 rotate-12" size={200} />

          <div className="flex items-center gap-6 relative z-10">
            <div className="h-16 w-16 p-3 rounded-[1.5rem] bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <FiUsers size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">Alumni Referral Program</h4>
              <p className="text-slate-400 font-medium">Are you hiring at your current firm? Help a junior by posting a referral vacancy.</p>
            </div>
          </div>
          
          <button onClick={()=>navigate('/main/post-opportunity')} className="relative z-10 whitespace-nowrap px-10 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 active:scale-95">
            Post Opportunity
          </button>
        </motion.div>
      )}

      {/* Footer Disclaimer */}
      <motion.p variants={itemVariants} className="mt-20 text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.5em]">
        GrowthNexus &bull; Established 2026 &bull; Empowering Connections
      </motion.p>
    </motion.div>
  );
};

export default Documentation;