import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Logo from "@/Logo";
import { motion } from "framer-motion"; 
import { 
  FiGrid, FiList, FiUser, 
  FiSearch, FiMessageSquare, 
  FiFileText, FiEdit3, FiLayers, 
  FiBriefcase, FiPlusCircle, 
  FiBell, 
  FiMail, FiBook, FiLogOut 
} from "react-icons/fi";
import apiClient from "@/lib/apiClient";
import { LOGOUT_ROUTE } from "@/utils/Constant";
import { useAppStore } from "@/store";

const LeftSidebar = ({ setIsOpen }) => {
  const location = useLocation();
  const { userInfo, setUserInfo } = useAppStore();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  // Simple entrance only
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const handleLogout = async () => {
    try {
      const response = await apiClient.get(LOGOUT_ROUTE, { withCredentials: true });
      if (response.status === 200) {
        setUserInfo(null);
        navigate('/auth');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const NavItem = ({ to, icon: Icon, label }) => (
    <motion.div variants={itemVariants}>
      <Link
        to={to}
        onClick={() => setIsOpen && setIsOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group ${
          isActive(to)
            ? "bg-blue-600 text-white"
            : "text-slate-400 hover:bg-gray-700/50 hover:text-white"
        }`}
      >
        <Icon 
          size={18} 
          className={isActive(to) ? "text-white" : "text-slate-500 group-hover:text-blue-500"} 
        />
        <span className="text-sm font-bold tracking-wide">{label}</span>
      </Link>
    </motion.div>
  );

  const SectionHeader = ({ label }) => (
    <motion.div variants={itemVariants} className="px-3 mt-6 mb-2">
      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
        {label}
      </p>
    </motion.div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-gray-800 border-r border-gray-700">
      
      {/* --- HEADER --- */}
      <div className="py-3 flex items-center px-6 bg-gray-800 border-b border-gray-700">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-white" />
          <span className="text-xl font-black text-white tracking-tight">
            Growth<span className="text-blue-500">Nexus</span>
          </span>
        </Link>
      </div>

      {/* --- SCROLLABLE NAV --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1"
      >
        <SectionHeader label="Overview" />
        <NavItem to="/main/dashboard" icon={FiGrid} label="Dashboard" />
        <NavItem to="/main/release-notes" icon={FiList} label="Release Notes" />
        <NavItem to="/main/profile" icon={FiUser} label="My Profile" />

        <SectionHeader label="Mentorship" />
        <NavItem to="/main/find" icon={FiSearch} label="Find Mentor" />
        <NavItem to="/main/message" icon={FiMessageSquare} label="Messages" />

        <SectionHeader label="Knowledge" />
        <NavItem to="/main/feed" icon={FiLayers} label="Feed" />
        <NavItem to="/main/my-post" icon={FiFileText} label="My Posts" />
        <NavItem to="/main/share-experience" icon={FiEdit3} label="Share Experience" />

        <SectionHeader label="Careers" />
        <NavItem to="/main/hiring-post" icon={FiBriefcase} label="Hiring Post" />
        <NavItem to="/main/post-opportunity" icon={FiPlusCircle} label="Post Opportunity" />

        <SectionHeader label="System" />
        <NavItem to="/main/notices" icon={FiBell} label="Notice Board" />
        <NavItem to="/main/contact" icon={FiMail} label="Contact Us" />
        <NavItem to="/main/docs" icon={FiBook} label="Docs" />
        
        <div className="h-10" />
        
        {/* Logout */}
        <motion.button 
          variants={itemVariants}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mt-auto"
          onClick={handleLogout}
        >
          <FiLogOut size={18} />
          <span className="text-sm font-bold tracking-wide">Logout</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LeftSidebar;