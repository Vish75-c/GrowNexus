import { useAppStore } from "@/store";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { getColor } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const MiniNav = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location=useLocation();
  const { userInfo } = useAppStore();
  const handleCancel=()=>{
  
  }
  return (
    <div className="bg-gray-800 py-4 px-5 md:px-6 flex items-center justify-between border-b border-gray-700">
      {/* {location.pathname==='/main/empty-screen'&&
        <div className="text-white" onClick={handleCancel}><FiX size={24}/></div>
      } */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-slate-400 p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-all flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <FiX size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <FiMenu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

     
      <div className="flex items-center ml-auto">
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 pl-4 border-l border-gray-700 cursor-pointer group"
        >
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold text-slate-300 group-hover:text-blue-400 transition-colors">
              {userInfo?.firstName
                ? `${userInfo.firstName} ${userInfo.lastName}`
                : "Setup Profile"}
            </span>
            <span className="text-[10px] font-medium text-slate-500 capitalize">
              {userInfo?.role || "Member"}
            </span>
          </div>

          <Avatar.Root
            className={`h-10 w-10 rounded-full overflow-hidden border-2 border-gray-700 shadow-md group-hover:border-blue-500 transition-all ${getColor(
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
                {userInfo?.firstName?.[0] || userInfo?.email?.[0]}
              </Avatar.Fallback>
            )}
          </Avatar.Root>
        </div>
      </div>
    </div>
  );
};

export default MiniNav;