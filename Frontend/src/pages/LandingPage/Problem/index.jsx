import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAlertCircle,
  FiSearch,
  FiUserX,
  FiTrendingDown,
  FiLock,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// --- DATA ---
const problemTuple = [
  {
    title: "The LinkedIn 'Black Hole'",
    main: "Cold applications have a 2% response rate. Most resumes are filtered out by bots before a human ever sees them.",
    icon: <FiSearch className="w-10 h-10 text-blue-600" />,
    color: "from-blue-50/50 to-indigo-100/50",
    accent: "bg-blue-600",
  },
  {
    title: "Hidden Referral Networks",
    main: "80% of top-tier roles are filled through internal referrals that students simply can't access.",
    icon: <FiLock className="w-10 h-10 text-orange-500" />,
    color: "from-orange-50/50 to-amber-100/50",
    accent: "bg-orange-500",
  },
  {
    title: "Generic Career Advice",
    main: "Generic blogs don't work for high-stakes technical interviews. You need proven industry blueprints.",
    icon: <FiAlertCircle className="w-10 h-10 text-emerald-500" />,
    color: "from-emerald-50/50 to-teal-100/50",
    accent: "bg-emerald-500",
  },
  {
    title: "Alumni Disconnect",
    main: "Students lose touch with successful seniors, wasting the most valuable network they will ever have.",
    icon: <FiUserX className="w-10 h-10 text-violet-500" />,
    color: "from-violet-50/50 to-purple-100/50",
    accent: "bg-violet-500",
  },
  {
    title: "Stagnant Professional Growth",
    main: "Without a 'Pay It Forward' ecosystem, the gap between juniors and industry standards keeps widening.",
    icon: <FiTrendingDown className="w-10 h-10 text-red-500" />,
    color: "from-red-50/50 to-rose-100/50",
    accent: "bg-red-500",
  },
];

// --- ANIMATION VARIANTS ---
const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: 100 * dir, scale: 0.95 }),
  center: { zIndex: 1, opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: -100 * dir, scale: 0.95 }),
};

export default function ProblemCarousel({ autoplay = true, autoplayInterval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const pausedRef = useRef(false);
  const total = problemTuple.length;

  const advance = useCallback((nextIndex, dir = 1) => {
    setDirection(dir);
    setIndex(((nextIndex % total) + total) % total);
  }, [total]);

  const next = useCallback(() => advance(index + 1, 1), [index, advance]);
  const prev = useCallback(() => advance(index - 1, -1), [index, advance]);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      if (!pausedRef.current) next();
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [next, autoplay, autoplayInterval]);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    if (offset < -80) next();
    else if (offset > 80) prev();
  };

  return (
    <section id='problem' className="mx-auto px-4 sm:px-6 lg:px-12 py-24 bg-white">
      {/* Header Section */}
      <header className="text-center mb-16">
        <div className="flex justify-center items-center gap-2 mb-4">
            <span className="h-px w-8 bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">The Problem</span>
            <span className="h-px w-8 bg-blue-600" />
        </div>
        <h2 className="font-black text-4xl md:text-6xl text-slate-900 tracking-tighter mb-6">
          THE CAREER STRUGGLE IS <span className="text-blue-600 italic">REAL.</span>
        </h2>
        <p className="text-slate-500 font-medium md:text-xl max-w-3xl mx-auto leading-relaxed">
          Traditional networking is broken. GrowthNexus is the professional bridge 
          designed to bypass the noise and get you noticed.
        </p>
      </header>

      {/* Main Carousel Container */}
      <div
        className="relative bg-[#f8fafc] border border-slate-200 mx-auto rounded-[3rem] shadow-2xl shadow-slate-200/60 overflow-hidden w-full max-w-6xl"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div className="relative p-1 md:p-2">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className={`w-full bg-linear-to-br ${problemTuple[index].color} rounded-[2.5rem] p-10 md:p-20 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16`}
            >
              {/* Icon Box */}
              <div className="shrink-0 p-8 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white flex items-center justify-center">
                {problemTuple[index].icon}
              </div>

              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {problemTuple[index].title}
                </h3>
                <p className="mt-6 text-slate-600 text-lg md:text-2xl leading-relaxed font-medium">
                  {problemTuple[index].main}
                </p>

                <div className="mt-10">
                  <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                    See the Fix
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- UI ELEMENTS --- */}

        {/* Navigation Arrows */}
        <div className="hidden lg:block">
            <button 
                onClick={prev} 
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-slate-400 rounded-2xl p-4 border border-slate-200 hover:text-blue-600 hover:border-blue-600 transition-all shadow-lg z-20"
            >
                <FiChevronLeft size={24} />
            </button>
            <button 
                onClick={next} 
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md text-slate-400 rounded-2xl p-4 border border-slate-200 hover:text-blue-600 hover:border-blue-600 transition-all shadow-lg z-20"
            >
                <FiChevronRight size={24} />
            </button>
        </div>

        {/* Visual Progress Bar (Autoplay Indicator) */}
        {autoplay && (
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-200/50">
                <motion.div 
                    key={index} // Reset animation on slide change
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: autoplayInterval / 1000, ease: "linear" }}
                    className={`h-full ${problemTuple[index].accent}`}
                />
            </div>
        )}

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {problemTuple.map((_, i) => (
            <button
              key={i}
              onClick={() => advance(i, i > index ? 1 : -1)}
              className={`transition-all duration-500 rounded-full ${
                i === index 
                ? `w-10 h-2 ${problemTuple[index].accent}` 
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}