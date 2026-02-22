import React from "react";
import {
  MessageSquare,
  Search,
  BookOpen,
  Briefcase,
  ChevronRight,
  Zap,
  UserPlus,
  Compass,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: MessageSquare,
    bgIcon: Zap,
    id: 0,
    label: "Chat",
    description: "Message your mentors",
    color: "bg-blue-500/10 text-blue-500",
    hoverBorder: "hover:border-blue-500/50",
  },
  {
    icon: Search,
    bgIcon: UserPlus,
    id: 1,
    label: "Find Seniors",
    description: "Browse by skills & company",
    color: "bg-purple-500/10 text-purple-500",
    hoverBorder: "hover:border-purple-500/50",
  },
  {
    icon: BookOpen,
    bgIcon: Compass,
    id: 2,
    label: "Experience Feed",
    description: "Read guides & advice",
    color: "bg-emerald-500/10 text-emerald-500",
    hoverBorder: "hover:border-emerald-500/50",
  },
  {
    icon: Briefcase,
    bgIcon: Trophy,
    id: 3,
    label: "Opportunity Feed",
    description: "Internships & referrals",
    color: "bg-orange-500/10 text-orange-500",
    hoverBorder: "hover:border-orange-500/50",
  },
];

const QuickAction = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id === 0) {
      navigate("/main/message");
    } else if (id === 1) {
      navigate("/main/find");
    } else if (id === 2) {
      navigate("/main/feed");
    } else {
      navigate("/main/hiring-post");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, i) => {
        const Icon = action.icon;
        const BgIcon = action.bgIcon;

        return (
          <motion.button
            onClick={() => handleClick(action.id)}
            key={action.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className={`group relative flex flex-col h-full overflow-hidden rounded-[2rem] bg-[#1f202a] p-8 border border-slate-800 transition-all duration-500 shadow-xl ${action.hoverBorder}`}
          >
            {/* --- ABSTRACT BACKGROUND ICON --- */}
            <div className="absolute -right-4 -top-4 pointer-events-none transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12">
              <BgIcon className={`h-32 w-32 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 ${action.color.split(' ')[1]}`} />
            </div>

            {/* Icon Header */}
            <div
              className={`w-fit rounded-2xl p-3 ${action.color} backdrop-blur-md border border-white/5 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]`}
            >
              <Icon className="h-6 w-6" />
            </div>

            {/* Text Content */}
            <div className="text-left mt-8 relative z-10">
              <p className="font-display font-bold text-white text-xl tracking-tight">
                {action.label}
              </p>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">
                {action.description}
              </p>
            </div>

            {/* Footer / Arrow */}
            <div className="mt-auto pt-6 flex justify-end">
                <div className="p-2 rounded-full bg-slate-800/50 group-hover:bg-blue-500/20 transition-colors">
                    <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
            </div>

            {/* Subtle bottom glow line on hover */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-transparent via-blue-500 to-transparent group-hover:w-full transition-all duration-700 opacity-50" />
          </motion.button>
        );
      })}
    </div>
  );
};

export default QuickAction;