import React from 'react'
import { 
  FiEdit3, 
  FiBriefcase, 
  FiTrendingUp, 
  FiZap, 
  FiUsers, 
  FiShield 
} from "react-icons/fi";

const FeaturesTuple = [
  {
    title: "Technical Blueprints",
    main: "Access high-quality roadmaps, interview transcripts, and technical guides authored by seniors at top firms.",
    icon: <FiEdit3 className="size-6 text-blue-600" />,
  },
  {
    title: "The Inside Track",
    main: "Direct access to internal referral opportunities and off-campus hiring leads shared by verified Alumni.",
    icon: <FiBriefcase className="size-6 text-indigo-600" />,
  },
  {
    title: "Mentorship Loop",
    main: "A self-sustaining 'Pay It Forward' ecosystem where today's learners become tomorrow's industry mentors.",
    icon: <FiTrendingUp className="size-6 text-emerald-600" />,
  },
  {
    title: "Nexus Notice Board",
    main: "Real-time updates on campus hackathons, time-sensitive hiring posts, and exclusive alumni workshops.",
    icon: <FiZap className="size-6 text-amber-500" />,
  },
  {
    title: "Verified Alumni Network",
    main: "Connect with a curated community of professionals who are dedicated to accelerating your career growth.",
    icon: <FiUsers className="size-6 text-purple-600" />,
  },
  {
    title: "Zero Guesswork",
    main: "Stop scrolling generic job boards. Get the exact strategies needed to clear high-stakes interviews.",
    icon: <FiShield className="size-6 text-rose-600" />,
  },
];

const Features = () => {
  return (
    <section id='features' className='bg-white px-4 sm:px-6 lg:px-8 py-16'>
      <div className="container mx-auto max-w-7xl flex flex-col items-center">
        
        <div className="text-center mb-20">
          <h1 className="font-extrabold text-4xl md:text-6xl text-slate-900 tracking-tight">
            Engineered for <span className="text-blue-600 italic">Growth.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium mt-6 max-w-2xl mx-auto">
            Everything you need to navigate your professional journey, powered by the collective experience of our Alumni.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {FeaturesTuple.map((item, index) => (
            <div 
              className="group p-10 bg-white border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 rounded-[2.5rem] relative" 
              key={index}
            >
              <div className="relative z-10">
                {/* Icon Container with soft background */}
                <div className="mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-100 w-fit group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-500">
                  {item.icon}
                </div>
                
                <h1 className="font-bold text-2xl text-slate-900 mb-4 tracking-tight">
                  {item.title}
                </h1>
                
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  {item.main}
                </p>
              </div>

              {/* Subtle accent line on hover */}
              <div className="absolute bottom-0 left-10 right-10 h-1 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;