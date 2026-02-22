import React from "react";
import { motion } from "framer-motion";
import {
  FiEdit3,
  FiMail,
  FiMapPin,
  FiLinkedin,
  FiGlobe,
  FiHash,
  FiLayers,
} from "react-icons/fi";
import * as Avatar from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

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
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// 3. Interactive Card Hover Specifications
const cardHoverProps = {
  whileHover: { y: -8 },
  transition: { duration: 0.3 },
};

// Internal Group Hover Variants
const childIconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 }, // scale-110
};

const childTextVariants = {
  initial: { opacity: 0, x: 0 },
  hover: { opacity: 1, x: 2 }, // translate-x-2
};

// -------------------------
// Sub Components
// -------------------------

const ContactRow = ({ icon, label, value }) => (
  <motion.div
    whileHover="hover"
    initial="initial"
    className="flex items-center gap-3 bg-[#1a1b25] p-3 rounded-xl border border-slate-800 group hover:border-blue-500/30 transition-colors cursor-default"
  >
    <motion.div 
      variants={childIconVariants}
      className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all"
    >
      {icon}
    </motion.div>
    <div className="min-w-0">
      <p className="text-[9px] uppercase font-black tracking-widest text-slate-500">
        {label}
      </p>
      <motion.p 
        variants={childTextVariants}
        className="text-sm font-bold text-slate-200 truncate"
      >
        {value}
      </motion.p>
    </div>
  </motion.div>
);

const ProfileIdentityCard = ({ user, onEdit }) => (
  <motion.div
    variants={itemVariants}
    {...cardHoverProps}
    className="bg-[#292b36] p-6 sm:p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl text-center relative overflow-hidden"
  >
    <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[100px]" />

    <div className="mb-6 relative">
      <Avatar.Root className="mx-auto h-28 w-28 sm:h-36 sm:w-36 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[#1a1b25]">
        {user.image ? (
          <Avatar.Image src={user.image} className="h-full rounded-lg w-full object-cover" />
        ) : (
          <Avatar.Fallback className="flex items-center justify-center h-full w-full bg-slate-800 text-white font-black text-3xl">
            {user.firstName?.[0] || user.email?.[0]}
          </Avatar.Fallback>
        )}
      </Avatar.Root>
    </div>

    <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tighter truncate">
      {user.firstName} <span className="text-blue-500">{user.lastName}</span>
    </h3>

    <div className="mt-3 mb-4 px-4 py-1 rounded-full bg-blue-500/10 inline-block border border-blue-500/20">
      <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
        {user.role}
      </span>
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onEdit}
      className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-900/20"
    >
      <FiEdit3 /> Edit Identity
    </motion.button>

    <div className="mt-6 space-y-3 text-left">
      <ContactRow icon={<FiMail />} label="Matrix Email" value={user.email} />
      <ContactRow icon={<FiMapPin />} label="Deployment Location" value="Main Campus Portal" />
    </div>
  </motion.div>
);

const NetworkCard = ({ linkedinUrl }) => (
  <motion.div
    variants={itemVariants}
    {...cardHoverProps}
    whileHover={{ ...cardHoverProps.whileHover }}
    className="bg-[#292b36] p-5 rounded-[2rem] border border-slate-800 shadow-xl"
  >
    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-1">
      Network Connection
    </h4>

    <motion.button
      whileHover="hover"
      initial="initial"
      onClick={() => linkedinUrl && window.open(linkedinUrl, "_blank")}
      className="w-full flex items-center justify-between p-4 bg-[#1a1b25] rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all group"
    >
      <div className="flex items-center gap-3">
        <motion.div 
          variants={childIconVariants}
          className="p-2 bg-blue-500/10 rounded-lg text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all"
        >
          <FiLinkedin size={16} />
        </motion.div>
        <motion.span 
          variants={childTextVariants}
          className="font-bold text-slate-200 group-hover:text-white transition-colors"
        >
          LinkedIn Profile
        </motion.span>
      </div>
      <FiChevronRight className="text-slate-600 group-hover:text-blue-500 transition-all" />
    </motion.button>
  </motion.div>
);

const BioSummaryCard = ({ bio }) => (
  <motion.div
    variants={itemVariants}
    {...cardHoverProps}
    className="bg-[#292b36] p-6 sm:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500">
        <FiGlobe size={22} />
      </div>
      <h3 className="text-sm font-black uppercase tracking-widest text-white italic">
        Objective & Bio
      </h3>
    </div>
    <p className="text-slate-400 leading-relaxed text-lg font-medium italic">
      "{bio || "No data stream available for this operator biography."}"
    </p>
  </motion.div>
);

const TechStackCard = ({ skills = [] }) => (
  <motion.div 
    variants={itemVariants} 
    {...cardHoverProps}
    className="bg-[#292b36] p-6 sm:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl"
  >
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
          <FiLayers size={22} />
        </div>
        <h3 className="text-sm font-black uppercase tracking-widest text-white italic">
          Technical Matrix
        </h3>
      </div>
      <span className="text-[10px] font-black text-slate-500 bg-[#1a1b25] px-4 py-1.5 rounded-full border border-slate-800 uppercase tracking-tighter">
        {skills.length} Modules Online
      </span>
    </div>

    <div className="flex flex-wrap gap-3">
      {skills.map((skill, i) => (
        <motion.span
          key={i}
          whileHover={{ y: -3, borderColor: "rgba(59, 130, 246, 0.5)", color: "#fff" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1b25] border border-slate-800 text-xs font-bold text-slate-300 transition-colors cursor-default"
        >
          <FiHash className="text-blue-500" size={12} />
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

// -------------------------
// Main Component
// -------------------------

const MyProfile = ({ userInfo }) => {
  const navigate = useNavigate();

  const user = userInfo || {
    firstName: "Alex",
    lastName: "Mercer",
    email: "alex.mercer@nexus.io",
    role: "System Architect",
    image: "",
    bio: "Full-stack engineer building scalable systems and distributed neural networks.",
    skills: ["React", "TypeScript", "Node.js", "Python", "Docker", "GraphQL", "AWS"],
    linkedinUrl: "https://linkedin.com",
  };

  return (
    <div className="min-h-screen mt-10 mb-15">
      {/* 4. Main Container Wrap */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-6 max-w-7xl mx-auto"
      >
        <motion.div 
          variants={itemVariants}
          className="sm:flex items-center justify-between pb-8"
        >
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              My <span className="text-blue-600 italic">Profile</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-2 tracking-widest uppercase">
              Identity Configuration & Skill Matrix
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <ProfileIdentityCard
              user={user}
              onEdit={() => navigate("/profile/edit")}
            />
            <NetworkCard linkedinUrl={user.linkedinUrl} />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <BioSummaryCard bio={user.bio} />
            <TechStackCard skills={user.skills} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FiChevronRight = ({ className }) => (
  <svg stroke="currentColor" fill="none" strokeWidth="3" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

export default MyProfile;