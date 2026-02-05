import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/Logo";
import { motion } from "framer-motion"; // Added for high-level animation

// Import Icons from react-icons
import { 
  FiGrid, FiList, FiUser, 
  FiSearch, FiMessageSquare, 
  FiFileText, FiEdit3, FiLayers, 
  FiBriefcase, FiPlusCircle, 
  FiBell, 
  FiMail, FiBook, FiLogOut,
  FiX 
} from "react-icons/fi";

const LeftSidebar = ({ setIsOpen }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } }
  };

  const NavItem = ({ to, icon: Icon, label }) => (
    <motion.div variants={itemVariants}>
      <Link
        to={to}
        onClick={() => setIsOpen && setIsOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
          isActive(to)
            ? "bg-blue-500 text-white shadow-lg shadow-blue-900/20"
            : "text-slate-400 hover:bg-gray-700 hover:text-white"
        }`}
      >
        <Icon size={18} className={`${isActive(to) ? "text-white" : "text-slate-500 group-hover:text-blue-400 transition-colors"}`} />
        <span className="text-sm font-bold tracking-wide">{label}</span>
      </Link>
    </motion.div>
  );

  const SectionHeader = ({ label }) => (
    <motion.div variants={itemVariants} className="px-3 mt-6 mb-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
        {label}
      </p>
    </motion.div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-gray-800 border-r border-gray-700">
      
      {/* --- HEADER --- */}
      <div className="py-3 flex items-center justify-between px-6 bg-gray-800/90 border-b border-gray-700">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xl font-black text-white tracking-tight">
            Growth<span className="text-blue-500">Nexus</span>
          </span>
        </Link>
        
        {/* Mobile Close Button */}
        {setIsOpen && (
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <FiX size={24} />
          </button>
        )}
      </div>

      {/* --- SCROLLABLE NAV --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1"
      >
        
        {/* General */}
        <NavItem to="/main/dashboard" icon={FiGrid} label="Dashboard" />
        <NavItem to="/main/release-notes" icon={FiList} label="Release Notes" />
        <NavItem to="/main/profile" icon={FiUser} label="My Profile" />

        {/* Management Section */}
        <SectionHeader label="Management" />
        <NavItem to="/main/find" icon={FiSearch} label="Find Mentor" />
        <NavItem to="/main/message" icon={FiMessageSquare} label="Messages" />

        {/* Blog Section */}
        <SectionHeader label="Blog" />
        <NavItem to="/main/blogs" icon={FiLayers} label="All Blogs" />
        <NavItem to="/blogs/my-blogs" icon={FiFileText} label="My Blogs" />
        <NavItem to="/blogs/create" icon={FiEdit3} label="Create Blog" />

        {/* Hiring Section */}
        <SectionHeader label="Hiring" />
        <NavItem to="/hiring" icon={FiBriefcase} label="Hiring Post" />
        <NavItem to="/hiring/post" icon={FiPlusCircle} label="Post Opportunity" />

        {/* Community */}
        <SectionHeader label="Community" />
        <NavItem to="/notices" icon={FiBell} label="Notice Board" />

        {/* Support & Docs */}
        <SectionHeader label="Support" />
        <NavItem to="/contact" icon={FiMail} label="Contact Us" />
        <NavItem to="/docs" icon={FiBook} label="Documentation" />

        <div className="h-8" />
        
        {/* Logout */}
        <motion.button 
          variants={itemVariants}
          whileHover={{ x: 5 }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 mt-auto"
          onClick={() => console.log("Logout Clicked")}
        >
          <FiLogOut size={18} />
          <span className="text-sm font-bold tracking-wide">Logout</span>
        </motion.button>

      </motion.div>
    </div>
  );
};

export default LeftSidebar;