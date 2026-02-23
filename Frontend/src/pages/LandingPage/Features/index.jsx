import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiEdit3, 
  FiBriefcase, 
  FiTrendingUp, 
  FiZap, 
  FiUsers, 
  FiShield,
  FiArrowUpRight 
} from "react-icons/fi";

const FeaturesTuple = [
  {
    title: "Technical Blueprints",
    main: "Access high-quality roadmaps, interview transcripts, and technical guides authored by seniors at top firms.",
    icon: <FiEdit3 className="size-6" />,
    color: "blue"
  },
  {
    title: "The Inside Track",
    main: "Direct access to internal referral opportunities and off-campus hiring leads shared by verified Alumni.",
    icon: <FiBriefcase className="size-6" />,
    color: "indigo"
  },
  {
    title: "Mentorship Loop",
    main: "A self-sustaining 'Pay It Forward' ecosystem where today's learners become tomorrow's industry mentors.",
    icon: <FiTrendingUp className="size-6" />,
    color: "emerald"
  },
  {
    title: "Nexus Notice Board",
    main: "Real-time updates on campus hackathons, time-sensitive hiring posts, and exclusive alumni workshops.",
    icon: <FiZap className="size-6" />,
    color: "amber"
  },
  {
    title: "Verified Alumni Network",
    main: "Connect with a curated community of professionals who are dedicated to accelerating your career growth.",
    icon: <FiUsers className="size-6" />,
    color: "purple"
  },
  {
    title: "Zero Guesswork",
    main: "Stop scrolling generic job boards. Get the exact strategies needed to clear high-stakes interviews.",
    icon: <FiShield className="size-6" />,
    color: "rose"
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const Features = () => {
  // Mapping tailwind color strings for dynamic classes
  const colorMap = {
    blue: "text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100 group-hover:bg-indigo-600",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 group-hover:bg-emerald-600",
    amber: "text-amber-500 bg-amber-50 border-amber-100 group-hover:bg-amber-500",
    purple: "text-purple-600 bg-purple-50 border-purple-100 group-hover:bg-purple-600",
    rose: "text-rose-600 bg-rose-50 border-rose-100 group-hover:bg-rose-600",
  };

  return (
    <section id='features' className='bg-white px-4 sm:px-6 lg:px-8 py-24'>
      <div className="container mx-auto max-w-7xl flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Core Engine</span>
          </motion.div>
          
          <h1 className="font-black text-4xl md:text-7xl text-slate-900 tracking-tighter leading-[0.9]">
            ENGINEERED FOR <span className="text-blue-600 italic">GROWTH.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium mt-8 max-w-2xl mx-auto leading-relaxed">
            Everything you need to navigate your professional journey, powered by the collective experience of our Alumni.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {FeaturesTuple.map((item, index) => (
            <motion.div 
              variants={itemVariants}
              key={index}
              className="group p-8 md:p-10 bg-slate-50/50 border border-slate-100 hover:border-white hover:bg-white hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 rounded-[2.5rem] relative overflow-hidden" 
            >
              {/* Top-Right Arrow Decor */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 text-slate-300">
                <FiArrowUpRight size={24} />
              </div>

              <div className="relative z-10">
                {/* Dynamic Icon Container */}
                <div className={`mb-8 p-4 rounded-2xl border w-fit transition-all duration-500 ${colorMap[item.color]}`}>
                  <div className="group-hover:scale-110 group-hover:text-white transition-transform duration-500">
                    {item.icon}
                  </div>
                </div>
                
                <h3 className="font-black text-2xl text-slate-900 mb-4 tracking-tight uppercase">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-[17px] leading-relaxed font-medium group-hover:text-slate-600 transition-colors">
                  {item.main}
                </p>
              </div>

              {/* Bottom Glow Effect */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;