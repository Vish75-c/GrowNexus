import React from "react";
import Logo from "@/Logo"; // optional — uses your existing Logo component if available

const MiniFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800/90  px-4 md:px-6 border-t border-gray-700 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-5">
        <div className="flex flex-col  sm:flex-row items-center sm:items-right justify-between gap-2">
          
    
          

          {/* right: meta */}
          <div className="flex items-center gap-3 text-[12px] text-slate-400">
            <span className="hidden sm:inline text-slate-500">v1.0.0</span>
            <span className="text-slate-500">©{year}</span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="font-semibold text-slate-300">Crafted by Vishal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MiniFooter;
