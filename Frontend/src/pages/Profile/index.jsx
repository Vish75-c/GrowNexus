import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdArrowBack, IoMdClose } from "react-icons/io";
import * as Avatar from "@radix-ui/react-avatar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAppStore } from "@/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getColor, colors } from "@/lib/utils";
import Logo from "@/Logo";

const SKILL_CATEGORIES = [
  { name: "DSA", skills: ["Arrays", "Linked List", "Recursion", "Trees", "Graphs", "DP"] },
  { name: "Web Development", skills: ["React", "Next.js", "Tailwind CSS", "Express", "Node.js"] },
  { name: "Languages", skills: ["C++", "Java", "Python", "JavaScript", "TypeScript"] },
  { name: "Backend & DB", skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"] },
  { name: "AI / ML", skills: ["PyTorch", "TensorFlow", "NLP", "LLMs", "Computer Vision"] },
  { name: "DevOps & Cloud", skills: ["Docker", "AWS", "Git", "Kubernetes", "Linux"] },
];

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("junior");
  const [branch, setBranch] = useState("");
  const [batch, setBatch] = useState("");
  const [bio, setBio] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  const handleAddSkill = (skill) => {
    if (skills.length >= 10) return toast.error("Max 10 skills allowed");
    if (!skills.includes(skill)) setSkills([...skills, skill]);
  };

  const removeSkill = (skillToRemove) => setSkills(skills.filter((s) => s !== skillToRemove));

  return (
    <div className="poppins-medium min-h-screen w-full bg-slate-50 flex items-center justify-center p-6 py-10">
      <div className="w-full max-w-[1150px] flex flex-col gap-6">
        
        {/* Main Profile Card */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col lg:flex-row overflow-hidden min-h-[85vh]">
          
          {/* Left Sidebar: Identity */}
          <div className="lg:w-[360px] bg-slate-50/50 p-10 border-r border-slate-100 flex flex-col items-center">
            
            {/* Logo inside the box */}
            <div className="flex items-center gap-2 mb-12">
               <Logo className="w-8 h-8" />
               <h2 className="text-xl font-bold text-slate-900">Growth<span className="text-blue-600">Nexus</span></h2>
            </div>

            <div className="relative group mb-10">
              <Avatar.Root className={`h-40 w-40 rounded-full overflow-hidden flex items-center justify-center border-8 border-white shadow-xl ${getColor(selectedColor)}`}>
                <Avatar.Fallback className="text-6xl text-white font-bold">{firstName?.[0] || "U"}</Avatar.Fallback>
              </Avatar.Root>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-all"
              >
                <IoMdAdd size={20} />
              </button>
              <input type="file" ref={fileInputRef} className="hidden" />
            </div>

            <div className="w-full space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center block">Theme Color</label>
                <div className="flex gap-2.5 flex-wrap justify-center">
                  {colors.map((c, i) => (
                    <div key={i} onClick={() => setSelectedColor(i)} className={`h-7 w-7 rounded-full cursor-pointer transition-all border-2 ${selectedColor === i ? "border-slate-900 scale-110" : "border-transparent opacity-50"} ${c}`} />
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-10 border-t border-slate-200">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest text-center block">Current Role</label>
                {/* Styled Select Box */}
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-14 rounded-2xl bg-white border border-slate-200 px-6 text-slate-600 font-semibold outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer appearance-none shadow-sm"
                >
                  <option value="junior" className="">Junior Student</option>
                  <option value="senior">Senior Student</option>
                  <option value="alumni">Working Alumni</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Panel: Content */}
          <div className="flex-1 p-8 md:p-12 space-y-10 overflow-y-auto">
            
            <div className="space-y-1 text-center md:text-left">
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Setup Your Profile</h1>
                <p className="text-slate-400 text-sm font-medium">Complete these details to join the college network.</p>
            </div>

            {/* Basic Info */}
            <div className="space-y-6">
              <h2 className="text-sm font-black uppercase text-blue-600 tracking-widest flex items-center gap-2">
                Identity & Academy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-none px-6" />
                <Input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-none px-6" />
                <Input placeholder="Branch (e.g. IT)" value={branch} onChange={(e) => setBranch(e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-none px-6" />
                <Input placeholder="Batch (Graduation Year)" type="number" value={batch} onChange={(e) => setBatch(e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-none px-6" />
              </div>
            </div>

            {/* Social & Bio */}
            <div className="space-y-6">
               <h2 className="text-sm font-black uppercase text-blue-600 tracking-widest flex items-center gap-2">
                Professional Bio
              </h2>
              <div className="space-y-4">
                <Input placeholder="LinkedIn Profile URL" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="h-14 rounded-2xl bg-slate-50 border-none px-6" />
                <Input placeholder="Short Bio (Tell us about yourself...)" value={bio} onChange={(e) => setBio(e.target.value)} maxLength={200} className="h-14 rounded-2xl bg-slate-50 border-none px-6" />
                
                <AnimatePresence>
                    {role === "alumni" && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <Input placeholder="Current Company / Startup" value={company} onChange={(e) => setCompany(e.target.value)} className="h-14 rounded-2xl bg-blue-50/50 border-2 border-blue-100 text-blue-700 px-6 font-semibold" />
                    </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </div>

            {/* Skills Group */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-sm font-black uppercase text-blue-600 tracking-widest">Expertise & Skills</h2>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{skills.length}/10</span>
              </div>

              {/* Selection Bar */}
              <div className="flex flex-wrap gap-2 min-h-[56px] p-3 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                {skills.length === 0 && <p className="text-slate-400 text-xs italic ml-2 mt-2">Select skills from categories below...</p>}
                {skills.map((s) => (
                  <motion.span layout initial={{scale: 0.9}} animate={{scale: 1}} key={s} className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-2 shadow-md shadow-blue-200">
                    {s} <IoMdClose className="cursor-pointer hover:bg-white/20 rounded-full" onClick={() => removeSkill(s)} />
                  </motion.span>
                ))}
              </div>

              {/* Categorized Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.name} className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-1">{cat.name}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleAddSkill(s)}
                          disabled={skills.includes(s)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-[10px] font-bold hover:border-blue-600 hover:text-blue-600 transition-all disabled:opacity-20 shadow-sm"
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
                <Button className="h-14 px-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-200 transition-all active:scale-95 block mx-auto md:mx-0">
                Complete Setup
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;