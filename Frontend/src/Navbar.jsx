import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppStore } from "@/store";
import { getColor } from "@/lib/utils";
import * as Avatar from "@radix-ui/react-avatar";
import { Menu, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Logo from "@/Logo";

const Navbar = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const location=useLocation();
  const menuItem = [
    { id: "hero", label: "Hero" },
    { id: "problem", label: "Problem" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "faqs", label: "FAQ's" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);

        const scrollPosition = window.scrollY + 120;

        menuItem.forEach((item) => {
          const section = document.getElementById(item.id);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
              scrollPosition >= sectionTop &&
              scrollPosition < sectionTop + sectionHeight
            ) {
              setActiveSection(item.id);
            }
          }
        });
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id) => {
    setIsOpen(false);
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const isLoggedIn = !!userInfo;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md border-b border-slate-200"
          : "bg-white/80 backdrop-blur-md border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Logo className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span className="text-xl font-black text-slate-900 tracking-tight">
            Growth<span className="text-blue-600">Nexus</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        {
          location.pathname==='/'&&<div className="hidden md:flex items-center bg-white/5 px-6 py-2 rounded-full">
          <ul className="flex items-center space-x-8">
            {menuItem.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => handleClick(item.id)}
                  className={`text-[13px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-slate-900"
                      : "text-gray-500 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>

                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-4 left-0 right-0 h-.75 bg-blue-600 rounded-full"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        }

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-5">
          {isLoggedIn ? (
            <>
              {/* Notification */}
              <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Profile */}
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group"
              >
                <Avatar.Root
                  className={`h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md ${getColor(
                    userInfo?.colorIndex
                  )}`}
                >
                  {userInfo?.image ? (
                    <Avatar.Image
                      src={userInfo.image}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Avatar.Fallback className="flex items-center justify-center text-white font-bold text-xs uppercase">
                      {userInfo?.firstName?.[0] ||
                        userInfo?.email?.[0] ||
                        "U"}
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>

                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {userInfo?.firstName
                      ? `${userInfo.firstName} ${userInfo.lastName}`
                      : "Setup Profile"}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 capitalize">
                    {userInfo?.role || "Member"}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/auth")}
                className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Login
              </button>

              <Button
                onClick={() => navigate("/auth")}
                className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg transition-all active:scale-95"
              >
                Join Now
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600"
        >
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
            {location.pathname==='/'&&menuItem.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="text-lg font-bold text-slate-900 text-left"
              >
                {item.label}
              </button>
            ))}

            <hr className="border-slate-100" />

            {isLoggedIn ? (
                <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 border-slate-200 cursor-pointer group"
              >
                <Avatar.Root
                  className={`h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md ${getColor(
                    userInfo?.colorIndex
                  )}`}
                >
                  {userInfo?.image ? (
                    <Avatar.Image
                      src={userInfo.image}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Avatar.Fallback className="flex items-center justify-center text-white font-bold text-xs uppercase">
                      {userInfo?.firstName?.[0] ||
                        userInfo?.email?.[0] ||
                        "U"}
                    </Avatar.Fallback>
                  )}
                </Avatar.Root>

                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {userInfo?.firstName
                      ? `${userInfo.firstName} ${userInfo.lastName}`
                      : "Setup Profile"}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 capitalize">
                    {userInfo?.role || "Member"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="h-12 rounded-xl font-bold border-slate-200"
                >
                  Login
                </Button>

                <Button
                  onClick={() => {
                    navigate("/auth");
                    setIsOpen(false);
                  }}
                  className="h-12 rounded-xl bg-blue-600 text-white font-bold"
                >
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