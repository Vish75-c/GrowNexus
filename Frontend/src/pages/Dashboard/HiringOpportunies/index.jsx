import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, ExternalLink, Rocket, Search, Globe } from "lucide-react";

const opportunities = [
  {
    title: "Frontend Intern",
    company: "Razorpay",
    location: "Bangalore",
    type: "Internship",
    postedBy: "Rahul Verma",
    daysAgo: 1,
  },
  {
    title: "SDE Referral",
    company: "Google",
    location: "Hyderabad",
    type: "Referral",
    postedBy: "Priya Sharma",
    daysAgo: 2,
  },
  {
    title: "Backend Developer",
    company: "Flipkart",
    location: "Remote",
    type: "Internship",
    postedBy: "Ananya Gupta",
    daysAgo: 3,
  },
];

const HiringOpportunities = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.4 }}
      className="relative rounded-[2rem] bg-[#1e2028] border border-slate-800 shadow-2xl overflow-hidden group/main"
    >
      {/* --- DECORATIVE BACKGROUND ICONS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <Rocket className="absolute -top-4 right-12 h-20 w-20 text-orange-500/10 rotate-25" />
        <Search className="absolute bottom-10 -left-4 h-24 w-24 text-slate-500/5 -rotate-12" />
        <Globe className="absolute top-1/2 right-4 h-16 w-16 text-orange-400/5" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="font-display font-semibold text-orange-500/80 uppercase tracking-[0.15em] text-[11px]">
            Latest Opportunities
          </h3>
          <button className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-orange-400 transition-colors bg-slate-800/40 px-3 py-1 rounded-full border border-white/5">
            View all
          </button>
        </div>

        <div className="divide-y divide-slate-800/40 px-2 pb-2">
          {opportunities.map((opp) => (
            <div
              key={opp.title + opp.company}
              className="flex items-center gap-4 px-4 py-5 hover:bg-[#292b36]/80 backdrop-blur-md rounded-2xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-orange-500/20"
            >
              {/* Icon Container with Glow */}
              <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-orange-600/10 to-orange-900/30 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:border-orange-500/50 transition-all duration-300 shadow-lg shadow-orange-900/10">
                <Briefcase className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm text-white truncate uppercase tracking-tight italic group-hover:text-orange-50 transition-colors">
                    {opp.title}
                  </p>
                  <span
                    className={`text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md shrink-0 border shadow-sm ${
                      opp.type === "Referral"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    {opp.type}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[11px] font-bold text-slate-400">
                    {opp.company}
                  </span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-600" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                      {opp.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest bg-slate-900/50 px-2 py-0.5 rounded border border-slate-800">
                  {opp.daysAgo}D AGO
                </span>
                <div className="p-2 rounded-xl bg-slate-900/50 border border-slate-800 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 group-hover:rotate-12 transition-all duration-300">
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-orange-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HiringOpportunities;