import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart, Send, Ghost } from "lucide-react";

const chats = [
  {
    name: "Priya Sharma",
    avatar: "PS",
    message: "Sure! I'd recommend starting with binary trees first...",
    time: "2m ago",
    unread: true,
  },
  {
    name: "Rahul Verma",
    avatar: "RV",
    message: "The MERN stack is great for your project idea",
    time: "1h ago",
    unread: false,
  },
  {
    name: "Ananya Gupta",
    avatar: "AG",
    message: "I'll share the ML resources with you tomorrow",
    time: "3h ago",
    unread: false,
  },
];

const RecentChats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="relative rounded-[2rem] bg-[#1e2028] border border-slate-800 shadow-2xl overflow-hidden group/main"
    >
      {/* --- DECORATIVE BACKGROUND ICONS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <MessageCircle className="absolute -top-6 -right-6 h-28 w-28 text-purple-500/10 rotate-12" />
        <Send className="absolute bottom-4 -left-4 h-20 w-20 text-slate-500/5 -rotate-12" />
        <Heart className="absolute top-1/2 left-1/2 h-16 w-16 text-purple-400/5" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="font-display font-semibold text-purple-400/80 uppercase tracking-[0.15em] text-[11px]">
            Recent Chats
          </h3>
          <button className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-purple-400 transition-colors bg-slate-800/40 px-3 py-1 rounded-full border border-white/5">
            See all
          </button>
        </div>

        <div className="divide-y divide-slate-800/40 px-2 pb-2">
          {chats.map((chat) => (
            <div
              key={chat.name}
              className="flex items-center gap-4 px-4 py-4 hover:bg-[#292b36]/80 backdrop-blur-md rounded-2xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-purple-500/20"
            >
              {/* Avatar with Status */}
              <div className="relative shrink-0">
                <div className={`h-11 w-11 rounded-full bg-linear-to-br border flex items-center justify-center text-xs font-black transition-all duration-300 group-hover:scale-110 ${
                    chat.unread 
                    ? "from-purple-600/20 to-purple-900/40 border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                    : "from-slate-800 to-slate-900 border-slate-700 text-slate-500"
                }`}>
                  {chat.avatar}
                </div>
                
                {chat.unread && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500 border-2 border-[#1e2028]"></span>
                  </span>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm truncate uppercase tracking-tight italic transition-colors ${
                      chat.unread
                        ? "font-black text-white"
                        : "font-bold text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    {chat.name}
                  </p>
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest shrink-0 ml-2 bg-slate-900/50 px-1.5 py-0.5 rounded">
                    {chat.time}
                  </span>
                </div>
                <p
                  className={`text-[13px] truncate mt-1 leading-tight transition-colors ${
                    chat.unread
                      ? "font-medium text-slate-200"
                      : "text-slate-500 group-hover:text-slate-400"
                  }`}
                >
                  {chat.message}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                 <Ghost className="h-4 w-4 text-purple-500/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecentChats;