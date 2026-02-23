import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiHelpCircle } from "react-icons/fi";

const ques = [
  {
    head: "How is my privacy protected on GrowthNexus?",
    title:
      "Your privacy is our priority. We use industry-standard encryption for all data. Alumni can choose to stay anonymous when posting referrals, and student data is never shared with third parties without explicit consent for a specific application.",
  },
  {
    head: "Who can post technical blueprints?",
    title:
      "Technical blueprints are exclusive to verified Alumni and Seniors. This ensures that every roadmap or interview guide on the platform comes from someone who has successfully cleared the path they are describing.",
  },
  {
    head: "How do referrals work on the platform?",
    title:
      "Alumni post 'Inside Track' vacancies. Students can request a referral directly through the post. The Alumnus then reviews the student's profile and, if satisfied, pushes the referral through their company's internal portal.",
  },
  {
    head: "Is there a fee to join GrowthNexus?",
    title:
      "No. GrowthNexus is built on a 'Pay It Forward' philosophy. The platform is free for students to learn and for Alumni to give back. Our goal is community acceleration, not subscription revenue.",
  },
  {
    head: "How can I become a verified Mentor?",
    title:
      "Once you graduate and secure a professional role, you can upgrade your account to 'Alumni' status. After a quick verification of your professional credentials, you'll gain the ability to post referrals and blueprints.",
  },
];

const FAQItem = ({ item, isOpen, onClick }) => {
  return (
    <div 
      className={`group border transition-all duration-500 rounded-[2rem] overflow-hidden ${
        isOpen 
        ? "border-blue-200 bg-white shadow-2xl shadow-blue-500/10" 
        : "border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full p-6 md:p-8 flex justify-between items-center gap-6 text-left"
      >
        <h3 className={`text-lg md:text-xl font-black tracking-tight transition-colors duration-300 ${
          isOpen ? "text-blue-600" : "text-slate-900"
        }`}>
          {item.head}
        </h3>
        
        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
          isOpen ? "bg-blue-600 text-white rotate-45" : "bg-white text-slate-400 shadow-sm"
        }`}>
          <FiPlus size={24} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 pb-8">
              <div className="h-px w-full bg-slate-100 mb-6" />
              <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium max-w-3xl">
                {item.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default first one open for better UX

  return (
    <section id="faqs" className="w-full px-4 sm:px-6 lg:px-8 py-24 bg-white">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6"
          >
            <FiHelpCircle className="text-blue-600" size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Help Center</span>
          </motion.div>

          <h2 className="font-black text-4xl md:text-7xl text-slate-900 tracking-tighter leading-none uppercase">
            ANY <span className="text-blue-600 italic">QUESTIONS?</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-medium mt-6 max-w-xl mx-auto">
            Everything you need to know about the GrowthNexus ecosystem and our community standards.
          </p>
        </header>

        {/* FAQ Accordion Grid */}
        <div className="space-y-4">
          {ques.map((item, i) => (
            <FAQItem 
              key={i} 
              item={item} 
              isOpen={openIndex === i} 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            Still have questions? 
            <span className="text-blue-600 cursor-pointer hover:underline ml-2">Email our support team</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;