import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { Sidebar } from "lucide-react";
import MiniNav from "./MiniNav";
import MiniFooter from "./MiniFooter";

const Layout = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className={`fixed z-50 inset-0 top-0 left-0 min-h-screen w-60 bg-gray-800 ${isOpen?`translate-x-0`:`-translate-x-full`} transform-transform duration-300 md:static md:translate-x-0`}>
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 ">
        
        {/* Navbar */}
        <div className="  ">
          <MiniNav setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>

        {/* Content + footer wrapper */}
        <div className="flex flex-col flex-1">
          
          {/* Outlet (scrolls only when needed) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar border-t-neutral-300">
            <Outlet />
          </div>

          {/* Footer sticks to bottom if content small */}
          <div className="shrink-0">
            <MiniFooter />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Layout;
