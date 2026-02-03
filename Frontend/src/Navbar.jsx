import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppStore } from "@/store";
import { getColor } from "@/lib/utils";
import * as Avatar from "@radix-ui/react-avatar";
import { Menu, X, Bell } from "lucide-react"; // Removed Search
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from "@/Logo";

const Navbar = () => {
  const { userInfo } = useAppStore(); // userInfo is null if not logged in
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Discover", path: "/discover" },
    { name: "Connections", path: "/connections" },
    { name: "Events", path: "/events" },
  ];

  const isLoggedIn = !!userInfo;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Logo className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-black text-slate-900 tracking-tight">
            Growth<span className="text-blue-600">Nexus</span>
          </span>
        </Link>

        {/* Desktop Links (Visible to everyone) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Conditional Rendering */}
        <div className="hidden md:flex items-center gap-5">
          {isLoggedIn ? (
            <>
              {/* Notification Bell - only for logged in users */}
              <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors relative mr-2">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              {/* Profile Section */}
              <div 
                onClick={() => navigate("/profile")} 
                className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group"
              >
                <Avatar.Root className={`h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md ${getColor(userInfo?.colorIndex)}`}>
                  {userInfo?.image ? (
                    <Avatar.Image src={userInfo.image} className="h-full w-full object-cover" />
                  ) : (
                    <Avatar.Fallback className="flex items-center justify-center text-white font-bold text-xs uppercase">
                      {userInfo?.firstName?.[0] || userInfo?.email?.[0]}
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {userInfo?.firstName ? `${userInfo.firstName} ${userInfo.lastName}` : "Setup Profile"}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 capitalize">{userInfo?.role || "Member"}</span>
                </div>
              </div>
            </>
          ) : (
            /* Unauthenticated State: Login / Register */
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate("/auth")} 
                className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Login
              </button>
              <Button 
                onClick={() => navigate("/auth")}
                className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-95"
              >
                Join Now
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 md:hidden flex flex-col gap-6 shadow-xl"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-lg font-bold text-slate-900" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-100" />
            
            {isLoggedIn ? (
              <button onClick={() => { navigate("/profile"); setIsOpen(false); }} className="flex items-center gap-3">
                <Avatar.Root className={`h-10 w-10 rounded-full overflow-hidden ${getColor(userInfo?.colorIndex)}`}>
                   <Avatar.Fallback className="text-white font-bold text-xs">U</Avatar.Fallback>
                </Avatar.Root>
                <span className="font-bold text-slate-900">My Profile</span>
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <Button onClick={() => { navigate("/auth"); setIsOpen(false); }} variant="outline" className="h-12 rounded-xl font-bold border-slate-200">
                  Login
                </Button>
                <Button onClick={() => { navigate("/auth"); setIsOpen(false); }} className="h-12 rounded-xl bg-blue-600 text-white font-bold">
                  Create Account
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;