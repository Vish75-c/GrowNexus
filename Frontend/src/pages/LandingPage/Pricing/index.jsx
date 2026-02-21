import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function Pricing() {
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

  return (
    <section className="bg-slate-50 py-15 px-4">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center mb-16">
          <h1 className="font-extrabold text-4xl md:text-6xl text-slate-900 tracking-tight">
            Our <span className="text-blue-600 italic">Ecosystem.</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl mt-6 max-w-2xl mx-auto">
            GrowthNexus is a free community-driven platform. Choose your role and start building the future.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className={`p-10 rounded-[2.5rem] border transition-all flex flex-col ${
                p.highlight
                  ? "bg-white border-blue-200 shadow-2xl shadow-blue-500/10 ring-4 ring-blue-50/50"
                  : "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50"
              } relative`}
            >
              {p.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                  {p.tag}
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">{p.name}</h2>
                <p className="text-slate-400 font-medium mt-1">{p.sub}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">
                    {p.price}
                  </span>
                  {p.price === "Free" && (
                    <span className="text-slate-400 font-bold text-sm">/ forever</span>
                  )}
                </div>
              </div>

              <ul className="text-left space-y-4 mb-10 grow">
                {p.features.map((f, idx) => (
                  <li key={idx} className="text-slate-600 flex items-start gap-3 font-medium">
                    <div className={`mt-1 p-0.5 rounded-full ${p.highlight ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"}`}>
                      <FiCheck size={14} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all ${
                  p.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                    : "bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-slate-200"
                }`}
              >
                {p.button}
              </button>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center text-slate-400 mt-12 text-sm font-medium">
          Interested in a customized university-wide deployment? <span className="text-blue-600 cursor-pointer underline">Contact our outreach team.</span>
        </p>
      </div>
    </section>
  );
}