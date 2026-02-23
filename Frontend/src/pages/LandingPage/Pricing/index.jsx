import React from "react";
import { motion } from "framer-motion";
import { FiCheck, FiStar, FiArrowRight } from "react-icons/fi";

const plans = [
  {
    name: "Student",
    sub: "For learners seeking growth",
    price: "Free",
    features: [
      "Access to Technical Blueprints",
      "View Nexus Notice Board",
      "Request Referral leads",
      "Community Discord access",
      "Basic Profile analytics",
    ],
    button: "Join as Student",
    highlight: false,
  },
  {
    name: "Alumni",
    sub: "For professionals giving back",
    price: "Free",
    features: [
      "Post Referral opportunities",
      "Author Technical Blueprints",
      "Mentor juniors 1-on-1",
      "Verified Professional Badge",
      "Exclusive Alumni Networking",
      "Access to Talent Pipeline",
    ],
    button: "Verify as Alumni",
    highlight: true,
    tag: "Community Pillar",
  },
  {
    name: "Partner",
    sub: "For organizations & clubs",
    price: "Custom",
    features: [
      "Branded Notice Board space",
      "Custom Hackathon hosting",
      "Direct Campus outreach",
      "Bulk Referral tracking",
      "Dedicated Success Lead",
      "Priority Support",
    ],
    button: "Talk to Us",
    highlight: false,
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#f8fafc] px-4 sm:px-6 lg:px-8 py-24">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
        <header className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-2 mb-4"
          >
            <span className="h-px w-8 bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Access Tiers</span>
            <span className="h-px w-8 bg-blue-600" />
          </motion.div>
          
          <h1 className="font-black text-4xl md:text-7xl text-slate-900 tracking-tighter uppercase leading-none">
            OUR <span className="text-blue-600 italic">ECOSYSTEM.</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            GrowthNexus is a free community-driven platform. 
            <span className="text-slate-900 font-bold"> Choose your role</span> and start building the professional bridge.
          </p>
        </header>

        {/* Pricing Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {plans.map((p, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className={`group p-10 rounded-[3rem] border transition-all flex flex-col relative ${
                p.highlight
                  ? "bg-white border-blue-400 shadow-[0_40px_80px_-15px_rgba(37,99,235,0.15)] ring-1 ring-blue-100"
                  : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50"
              }`}
            >
              {/* Highlight Badge */}
              {p.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/30 flex items-center gap-2">
                  <FiStar className="fill-current" />
                  {p.tag}
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                    {p.name}
                </h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">{p.sub}</p>
                
                <div className="mt-8 flex items-baseline gap-2">
                  <span className={`text-6xl font-black tracking-tighter ${p.highlight ? 'text-blue-600' : 'text-slate-900'}`}>
                    {p.price}
                  </span>
                  {p.price === "Free" && (
                    <span className="text-slate-400 font-black text-xs uppercase tracking-widest">/ Lifetime</span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-slate-100 mb-8" />

              {/* Feature List */}
              <ul className="text-left space-y-5 mb-12 grow">
                {p.features.map((f, idx) => (
                  <li key={idx} className="text-slate-600 flex items-start gap-4 text-[15px] font-semibold leading-tight">
                    <div className={`mt-0.5 p-1 rounded-lg shrink-0 ${p.highlight ? "bg-blue-600 text-white" : "bg-slate-900 text-white"}`}>
                      <FiCheck size={12} strokeWidth={4} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                className={`group/btn w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95 ${
                  p.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200"
                    : "bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-300"
                }`}
              >
                {p.button}
                <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Footer Note */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 p-6 rounded-[2rem] bg-white/40 border border-slate-200 max-w-3xl mx-auto"
        >
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                University Deployment? 
                <button className="ml-2 text-blue-600 hover:underline decoration-2 underline-offset-4 transition-all">
                    Request an Institutional License →
                </button>
            </p>
        </motion.div>
      </div>
    </section>
  );
}