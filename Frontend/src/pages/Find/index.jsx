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

// --- ENHANCED ANIMATION VARIANTS ---

// 1. Staggered Entrance (Container)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// 2. Item Slide-Up (Children)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// Internal Group Hover Variants for Card Elements
const childIconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 } // scale-110
};

const childActionVariants = {
  initial: { opacity: 0, x: -2 },
  hover: { opacity: 1, x: 2 } // translate-x-2 and fade in
};

const skillBadgeVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.5, opacity: 0 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
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
      console.error("Search failed:", error);
    } finally {
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
    // 4. Wrap main container in motion.div with variants
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full h-full bg-[#1f202a] text-slate-400 font-sans px-3 mt-10 mb-15 overflow-y-auto custom-scrollbar"
    >
      
      {/* --- HEADER --- */}
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto mb-10 ">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Find <span className="text-blue-600 italic">Mentors</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 max-w-md font-medium">
              Filter through our elite network of alumni and seniors to find the perfect guide.
            </p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-[#292b36] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl"
          >
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <FiUsers size={20}/>
            </div>
            <div>
              <p className="text-white font-black leading-none text-xl">{mentors.length}</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Available</p>
            </div>
          </motion.div>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="bg-[#292b36] border border-slate-800 rounded-3xl p-4 flex flex-wrap items-center gap-3 shadow-2xl min-h-18">
          <FiSearch className="text-slate-500 ml-3" size={22} />
          {selectedSkills.length === 0 && <span className="text-slate-600 text-sm">Select skills below...</span>}
          <AnimatePresence>
            {selectedSkills.map(skill => (
              <motion.button
                key={skill}
                variants={skillBadgeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="whileHover"
                whileTap="whileTap"
                onClick={() => toggleSkill(skill)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-red-500 shadow-lg shadow-blue-900/20 transition-colors"
              >
                {skill} <FiX size={14}/>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* --- SKILL CATEGORIES --- */}
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
                  <motion.button
                    key={skill}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSkill(skill)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 ${
                      isSelected ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-[#292b36] border-slate-800 text-slate-500 hover:border-slate-600"
                    }`}
                  >
                    {skill}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MENTOR GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {loading ? (
          [...Array(6)].map((_, i) => <MentorSkeleton key={i} />)
        ) : (
          <AnimatePresence mode="popLayout">
            {mentors.map((mentor) => (
              <motion.div
                key={mentor._id}
                layout
                // 4. Initial and Animate inherited from parent
                variants={itemVariants}
                // 3. Interactive Card Hover
                whileHover="hover"
                animate="visible"
                initial="hidden"
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-[#292b36] rounded-[2rem] p-8 border border-slate-800 hover:border-blue-500/50 transition-colors duration-500 shadow-xl group flex flex-col h-full relative overflow-hidden"
                style={{ originY: 0 }}
                onMouseEnter={() => {}} // Used to trigger variants in children
                custom={itemVariants.visible.transition}
              >
                {/* Visual hover translation applied via a wrapper or direct prop */}
                <motion.div 
                  variants={{ hover: { y: -8 } }} 
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        // 3. Group Hover: Scale icons
                        variants={childIconVariants}
                        className="h-14 w-14 rounded-2xl bg-[#1f202a] flex items-center justify-center text-blue-500 border border-slate-800 font-black text-xl overflow-hidden shadow-inner"
                      >
                        {mentor.image ? <img src={mentor.image} className="w-full h-full object-cover" alt="" /> : mentor.firstName[0]}
                      </motion.div>
                      <div>
                        <h3 className="text-white font-bold text-xl leading-tight">{mentor.firstName} {mentor.lastName}</h3>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md mt-1 inline-block ${mentor.role === 'alumni' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                          {mentor.role}
                        </span>
                      </div>
                    </div>
                    {mentor.linkedinUrl && (
                      <motion.button 
                        whileHover={{ scale: 1.1, color: "#60a5fa" }}
                        onClick={() => window.open(mentor.linkedinUrl, '_blank')} 
                        className="text-slate-600 p-2.5 bg-[#1f202a] rounded-xl border border-slate-800"
                      >
                        <FiLinkedin size={18} />
                      </motion.button>
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
                    
                    {/* 3. Group Hover: Secondary button/text logic */}
                    <motion.button 
                      variants={childActionVariants}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectMentor(mentor)} 
                      className="w-full bg-[#1f202a] border border-slate-800 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    >
                      Establish Connection
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default Find;