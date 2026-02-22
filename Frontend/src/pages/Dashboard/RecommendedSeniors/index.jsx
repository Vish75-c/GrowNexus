import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Building2, Star, Users, Zap, ShieldCheck } from "lucide-react";

const seniors = [
  {
    name: "Priya Sharma",
    role: "SDE Intern",
    company: "Google",
    expertise: ["DSA", "System Design"],
    avatar: "PS",
    rating: 4.9,
  },
  {
    name: "Rahul Verma",
    role: "Full Stack Dev",
    company: "Microsoft",
    expertise: ["React", "Node.js"],
    avatar: "RV",
    rating: 4.8,
  },
  {
    name: "Ananya Gupta",
    role: "ML Engineer",
    company: "Amazon",
    expertise: ["Python", "ML/AI"],
    avatar: "AG",
    rating: 4.7,
  },
];

const RecommendedSeniors = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="relative rounded-[2rem] bg-[#1e2028] border border-slate-800 shadow-2xl overflow-hidden group/container"
    >
      {/* --- DECORATIVE BACKGROUND ICONS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <Users className="absolute -top-6 -left-6 h-24 w-24 text-blue-500/10 -rotate-12" />
        <Zap className="absolute top-1/2 -right-8 h-20 w-20 text-amber-500/10 rotate-12" />
        <ShieldCheck className="absolute -bottom-8 left-1/4 h-24 w-24 text-slate-500/5" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="font-display font-semibold text-blue-400/80 uppercase tracking-[0.15em] text-[11px]">
            Recommended Seniors
          </h3>
          <button className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-blue-400 transition-colors bg-slate-800/40 px-3 py-1 rounded-full border border-white/5">
            View all
          </button>
        </div>

        <div className="divide-y divide-slate-800/40 px-2 pb-2">
          {seniors.map((senior) => (
            <div
              key={senior.name}
              className="flex items-center gap-4 px-4 py-5 hover:bg-[#292b36]/80 backdrop-blur-md rounded-2xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-blue-500/20"
            >
              {/* Avatar with Glow */}
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-blue-600/20 to-blue-900/40 border border-blue-500/30 flex items-center justify-center text-sm font-black text-blue-400 shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {senior.avatar}
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full border-2 border-[#1e2028] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-white uppercase tracking-tight italic group-hover:text-blue-50 transition-colors">
                  {senior.name}
                </p>
                
                <div className="flex items-center gap-1.5 mt-1">
                  <Building2 className="h-3 w-3 text-slate-600" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    {senior.role} <span className="text-slate-700">@</span> <span className="text-slate-400">{senior.company}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {senior.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="text-[8px] font-black bg-slate-900/80 text-blue-400/80 border border-slate-700/50 px-2 py-0.5 rounded-md uppercase tracking-wider group-hover:border-blue-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Area */}
              <div className="flex flex-col items-end gap-3 shrink-0">
                <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-800">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span className="text-[10px] font-black text-slate-300">{senior.rating}</span>
                </div>
                
                <div className="h-8 flex items-center">
                  <button className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-blue-600 hover:bg-blue-500 text-white text-[9px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-blue-900/40">
                    <MessageSquare className="h-3 w-3" />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendedSeniors;