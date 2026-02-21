import React, { useEffect, useRef, useState } from "react";
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

const problemTuple = [
  {
    title: "The LinkedIn 'Black Hole'",
    main: "Cold applications have a 2% response rate. Most resumes are filtered out by bots before a human ever sees them.",
    icon: <FiSearch className="w-10 h-10 text-blue-600" />,
    color: "from-blue-50 to-indigo-50",
  },
  {
    title: "Hidden Referral Networks",
    main: "80% of top-tier roles are filled through internal referrals that students simply can't access.",
    icon: <FiLock className="w-10 h-10 text-orange-500" />,
    color: "from-orange-50 to-amber-50",
  },
  {
    title: "Generic Career Advice",
    main: "Generic blogs don't work for high-stakes technical interviews. You need proven industry blueprints.",
    icon: <FiAlertCircle className="w-10 h-10 text-emerald-500" />,
    color: "from-emerald-50 to-teal-50",
  },
  {
    title: "Alumni Disconnect",
    main: "Students lose touch with successful seniors, wasting the most valuable network they will ever have.",
    icon: <FiUserX className="w-10 h-10 text-violet-500" />,
    color: "from-violet-50 to-purple-50",
  },
  {
    title: "Stagnant Professional Growth",
    main: "Without a 'Pay It Forward' ecosystem, the gap between juniors and industry standards keeps widening.",
    icon: <FiTrendingDown className="w-10 h-10 text-red-500" />,
    color: "from-red-50 to-rose-50",
  },
];

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: 60 * dir }),
  center: { zIndex: 1, opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: -60 * dir }),
};

export default function ProblemCarousel({ autoplay = true, autoplayInterval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const pausedRef = useRef(false);
  const autoplayRef = useRef(null);
  const total = problemTuple.length;

  const advance = (nextIndex, dir = 1) => {
    setDirection(dir);
    setIndex(((nextIndex % total) + total) % total);
  };
  const next = () => advance(index + 1, 1);
  const prev = () => advance(index - 1, -1);

  useEffect(() => {
    if (!autoplay) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!pausedRef.current) next();
    }, autoplayInterval);
    return () => clearInterval(autoplayRef.current);
  }, [index, autoplay, autoplayInterval]);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    if (offset < -80) next();
    else if (offset > 80) prev();
  };

  return (
    <section className="mx-auto py-15 px-4 bg-slate-50">
      <header className="text-center mb-12">
        <h2 className="font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight mb-4">
          The Career Struggle is <span className="text-blue-600 italic">Real.</span>
        </h2>
        <p className="text-slate-500 font-medium md:text-xl max-w-4xl mx-auto">
          Traditional networking is broken. GrowthNexus is the professional bridge you've been waiting for.
        </p>
      </header>

      <div
        className="relative bg-white border border-slate-200 mx-auto rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden w-full max-w-7xl"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        <div className="p-8 md:p-16 w-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className={`w-full bg-linear-to-br ${problemTuple[index].color} rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 border border-white/50`}
            >
              <div className="shrink-0 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                {problemTuple[index].icon}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  {problemTuple[index].title}
                </h3>
                <p className="mt-4 text-slate-600 text-lg md:text-xl leading-relaxed">
                  {problemTuple[index].main}
                </p>

                <div className="mt-8">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-blue-600 transition-all shadow-lg">
                    See the Fix
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <button 
          onClick={prev} 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-slate-400 rounded-full p-3 border border-slate-200 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm hidden md:block"
        >
          <FiChevronLeft size={20} />
        </button>
        <button 
          onClick={next} 
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-slate-400 rounded-full p-3 border border-slate-200 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm hidden md:block"
        >
          <FiChevronRight size={20} />
        </button>

        {/* Progress Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {problemTuple.map((_, i) => (
            <button
              key={i}
              onClick={() => advance(i, i > index ? 1 : -1)}
              className={`transition-all duration-300 rounded-full ${i === index ? "w-6 h-1.5 bg-blue-600" : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}