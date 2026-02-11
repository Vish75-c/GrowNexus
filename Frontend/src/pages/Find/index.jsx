import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiSearch, FiX, FiFilter, 
  FiBriefcase, FiLinkedin, 
  FiCpu, FiGlobe, FiDatabase, FiHash, FiUsers, FiAward
} from "react-icons/fi";
import apiClient from "@/lib/apiClient";

const SKILL_CATEGORIES = [
  {
    name: "DSA & Core",
    icon: <FiCpu />,
    skills: ["Arrays", "Linked List", "Recursion", "Trees", "Graphs", "DP"],
  },
  {
    name: "Frontend Development",
    icon: <FiGlobe />,
    skills: ["React", "Next.js", "Tailwind CSS", "Redux", "HTML/CSS"],
  },
  {
    name: "Backend & Database",
    icon: <FiDatabase />,
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "System Design"],
  },
  {
    name: "Languages",
    icon: <FiHash />,
    skills: ["C++", "Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    name: "DevOps & Cloud",
    icon: <FiBriefcase />,
    skills: ["AWS", "Docker", "Kubernetes", "Linux", "Git"],
  }
];

const Find = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const skillParam = selectedSkills.join(",");
      const response = await apiClient.get(
        `/api/contact/get-mentors?skills=${skillParam}`, 
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMentors(response.data.mentors);
      }
    } catch (error) {
      console.log("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [selectedSkills]);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="w-full h-full bg-[#1f202a] text-slate-400 font-sans px-3 lg:px-6 overflow-y-auto custom-scrollbar">
      
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto mb-10 pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Find <span className="text-blue-500">Mentors</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 max-w-md font-medium">
              Filter through our elite network of alumni and seniors to find the perfect guide for your career journey.
            </p>
          </div>
          
          <div className="flex gap-4">
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
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="bg-[#292b36] border border-slate-800 rounded-3xl p-4 min-h-[70px] flex flex-wrap items-center gap-3 shadow-2xl transition-all hover:border-blue-500/30">
          <FiSearch className="text-slate-500 ml-3" size={22} />
          
          {selectedSkills.length === 0 && !loading && (
            <span className="text-slate-600 text-sm font-medium ml-2">Tap categories below to filter skills...</span>
          )}

          <AnimatePresence>
            {selectedSkills.map(skill => (
              <motion.button
                key={skill}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => toggleSkill(skill)}
                className="flex items-center gap-2 bg-blue-600 text-white pl-4 pr-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-red-500 transition-all shadow-lg shadow-blue-900/20"
              >
                {skill}
                <FiX size={14}/>
              </motion.button>
            ))}
          </AnimatePresence>

          {loading && <div className="ml-auto mr-4 animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"/>}
        </div>
      </div>

      {/* --- SKILL SELECTOR --- */}
      <div className="max-w-7xl mx-auto mb-16 space-y-10">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.name}>
            <div className="flex items-center gap-3 mb-4 px-1">
              <span className="text-blue-500 bg-blue-500/10 p-2 rounded-lg">{category.icon}</span>
              <h3 className="text-xs font-black text-slate-200 uppercase tracking-[0.2em]">
                {category.name}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`
                      relative px-5 py-2.5 rounded-xl text-xs font-bold border transition-all duration-300 transform active:scale-95
                      ${isSelected 
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/30" 
                        : "bg-[#292b36] border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                      }
                    `}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* --- MENTOR CARDS GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        <AnimatePresence mode="popLayout">
          {mentors.map((mentor) => (
            <motion.div
              key={mentor._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#292b36] rounded-[2rem] p-8 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 shadow-xl group flex flex-col h-full relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>

              {/* Card Header */}
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#1f202a] flex items-center justify-center text-blue-500 border border-slate-800 font-black text-xl shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {mentor.image ? (
                        <img src={mentor.image} className="w-full h-full object-cover rounded-2xl" alt=""/>
                    ) : mentor.firstName[0]}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl leading-tight">
                      {mentor.firstName} {mentor.lastName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                        mentor.role === 'alumni' 
                          ? 'bg-amber-500/10 text-amber-500' 
                          : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {mentor.role}
                      </span>
                    </div>
                  </div>
                </div>
                {mentor.linkedinUrl && (
                  <a href={mentor.linkedinUrl} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-blue-400 transition-all p-2.5 bg-[#1f202a] rounded-xl border border-slate-800 hover:border-blue-500/50">
                    <FiLinkedin size={18} />
                  </a>
                )}
              </div>

              {/* Work Details */}
              <div className="mb-6 space-y-2 relative z-10">
                <div className="flex items-center gap-3 bg-[#1f202a] px-4 py-3 rounded-xl border border-slate-800">
                  <FiBriefcase className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-200 truncate">
                    {mentor.company || "University Student"}
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-[#1f202a] px-4 py-2 rounded-xl border border-slate-800 w-fit">
                   <FiAward className="text-amber-500 text-sm" />
                   <span className="text-[11px] font-bold text-slate-400">Batch of {mentor.batch}</span>
                </div>
              </div>

              <p className="text-slate-400 text-[14px] leading-relaxed mb-8 line-clamp-3 grow font-medium">
                {mentor.bio}
              </p>

              {/* Footer: Skills + Action */}
              <div className="mt-auto space-y-6 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {mentor.skills?.map((skill, i) => (
                    <span 
                      key={i} 
                      className={`text-[10px] font-bold px-3 py-1 rounded-lg border uppercase tracking-wider transition-colors
                        ${selectedSkills.includes(skill)
                          ? "bg-blue-600/20 border-blue-500 text-blue-400"
                          : "bg-[#1f202a] border-slate-800 text-slate-500"
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-[#1f202a] border border-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-500 text-slate-300 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl group-hover:shadow-blue-900/20 active:scale-95">
                  Send Message
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {!loading && mentors.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-800 rounded-[3rem]">
            <div className="bg-[#292b36] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <FiFilter className="text-3xl text-slate-600" />
            </div>
            <h2 className="text-white text-xl font-bold">No mentors found</h2>
            <p className="text-slate-500 font-medium mt-2">Try selecting different skills or clearing your filters.</p>
            <button 
              onClick={() => setSelectedSkills([])}
              className="mt-6 text-blue-500 font-black text-xs uppercase tracking-widest hover:text-blue-400 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Find;