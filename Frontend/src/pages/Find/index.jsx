import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiSearch, FiX, FiFilter, 
  FiBriefcase, FiLinkedin, 
  FiCpu, FiGlobe, FiDatabase, FiHash, FiUsers, FiAward
} from "react-icons/fi";
import apiClient from "@/lib/apiClient";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// --- SKELETON COMPONENT ---
const MentorSkeleton = () => (
  <div className="bg-[#292b36] rounded-[2rem] p-8 border border-slate-800 animate-pulse h-100">
    <div className="flex items-center gap-4 mb-6">
      <div className="h-14 w-14 rounded-2xl bg-slate-800" />
      <div className="space-y-2">
        <div className="h-4 w-24 bg-slate-800 rounded" />
        <div className="h-3 w-16 bg-slate-800 rounded" />
      </div>
    </div>
    <div className="h-12 w-full bg-slate-800 rounded-xl mb-6" />
    <div className="h-20 w-full bg-slate-800 rounded-xl mb-8" />
    <div className="flex gap-2 mb-6">
      <div className="h-6 w-12 bg-slate-800 rounded-lg" />
      <div className="h-6 w-12 bg-slate-800 rounded-lg" />
    </div>
    <div className="h-14 w-full bg-slate-800 rounded-2xl mt-auto" />
  </div>
);

const SKILL_CATEGORIES = [
  { name: "DSA & Core", icon: <FiCpu />, skills: ["Arrays", "Linked List", "Recursion", "Trees", "Graphs", "DP"] },
  { name: "Frontend Development", icon: <FiGlobe />, skills: ["React", "Next.js", "Tailwind CSS", "Redux", "HTML/CSS"] },
  { name: "Backend & Database", icon: <FiDatabase />, skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "System Design"] },
  { name: "Languages", icon: <FiHash />, skills: ["C++", "Java", "Python", "JavaScript", "TypeScript"] },
  { name: "DevOps & Cloud", icon: <FiBriefcase />, skills: ["AWS", "Docker", "Kubernetes", "Linux", "Git"] }
];

const Find = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSelectMentor = async (mentor) => {
    setSelectedChatType("contact");
    setSelectedChatData(mentor);
    navigate('/main/message');
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const skillParam = selectedSkills.join(",");
      const response = await apiClient.get(`/api/contact/get-mentors?skills=${skillParam}`, { withCredentials: true });
      if (response.status === 200) setMentors(response.data.mentors);
    } catch (error) {
      console.log("Search failed:", error);
    } finally {
      // Delaying slightly for a smoother transition
      setTimeout(() => setLoading(false), 400);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [selectedSkills]);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full h-full bg-[#1f202a] text-slate-400 font-sans px-3 lg:px-6 overflow-y-auto custom-scrollbar"
    >
      
      {/* --- HEADER --- */}
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto mb-10 pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Find <span className="text-blue-500">Mentors</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 max-w-md font-medium">
              Filter through our elite network of alumni and seniors to find the perfect guide.
            </p>
          </div>
          
          <div className="bg-[#292b36] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <FiUsers size={20}/>
            </div>
            <div>
              <p className="text-white font-black leading-none text-xl">{mentors.length}</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Available</p>
            </div>
          </div>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="bg-[#292b36] border border-slate-800 rounded-3xl p-4 flex flex-wrap items-center gap-3 shadow-2xl">
          <FiSearch className="text-slate-500 ml-3" size={22} />
          {selectedSkills.length === 0 && <span className="text-slate-600 text-sm">Select skills below...</span>}
          <AnimatePresence>
            {selectedSkills.map(skill => (
              <motion.button
                key={skill}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                onClick={() => toggleSkill(skill)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-red-500 shadow-lg shadow-blue-900/20"
              >
                {skill} <FiX size={14}/>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* --- SKILL CATEGORIES (Staggered) --- */}
      <div className="max-w-7xl mx-auto mb-16 space-y-10">
        {SKILL_CATEGORIES.map((category) => (
          <motion.div variants={itemVariants} key={category.name}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-blue-500 bg-blue-500/10 p-2 rounded-lg">{category.icon}</span>
              <h3 className="text-xs font-black text-slate-200 uppercase tracking-[0.2em]">{category.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 ${
                      isSelected ? "bg-blue-600 border-blue-500 text-white scale-105" : "bg-[#292b36] border-slate-800 text-slate-500 hover:border-slate-600"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MENTOR GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {loading ? (
          // Show 6 Skeletons while loading
          [...Array(6)].map((_, i) => <MentorSkeleton key={i} />)
        ) : (
          <AnimatePresence mode="popLayout">
            {mentors.map((mentor) => (
              <motion.div
                key={mentor._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-[#292b36] rounded-[2rem] p-8 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 shadow-xl group flex flex-col h-full relative overflow-hidden"
              >
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-[#1f202a] flex items-center justify-center text-blue-500 border border-slate-800 font-black text-xl overflow-hidden shadow-inner">
                      {mentor.image ? <img src={mentor.image} className="w-full h-full object-cover" alt="" /> : mentor.firstName[0]}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl leading-tight">{mentor.firstName} {mentor.lastName}</h3>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md mt-1 inline-block ${mentor.role === 'alumni' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {mentor.role}
                      </span>
                    </div>
                  </div>
                  {mentor.linkedinUrl && (
                    <button onClick={() => window.open(mentor.linkedinUrl, '_blank')} className="text-slate-600 hover:text-blue-400 p-2.5 bg-[#1f202a] rounded-xl border border-slate-800">
                      <FiLinkedin size={18} />
                    </button>
                  )}
                </div>

                <div className="mb-6 space-y-2 relative z-10">
                  <div className="flex items-center gap-3 bg-[#1f202a] px-4 py-3 rounded-xl border border-slate-800 font-bold text-xs text-slate-200">
                    <FiBriefcase className="text-blue-500" /> {mentor.company || "University Student"}
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 grow">{mentor.bio}</p>

                <div className="mt-auto space-y-6 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {mentor.skills?.slice(0, 4).map((skill, i) => (
                      <span key={i} className={`text-[9px] font-black px-3 py-1 rounded-lg border uppercase tracking-wider ${selectedSkills.includes(skill) ? "bg-blue-600/20 border-blue-500 text-blue-400" : "bg-[#1f202a] border-slate-800 text-slate-500"}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button onClick={() => handleSelectMentor(mentor)} className="w-full bg-[#1f202a] border border-slate-800 hover:bg-blue-600 hover:text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                    Establish Connection
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Find;