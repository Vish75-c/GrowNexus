import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMail, FiSend, FiUser, FiMessageSquare, 
  FiCheckCircle, FiGlobe, FiArrowRight 
} from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div className="w-full h-full mt-10 mb-15 bg-[#1f202a] text-slate-400 font-sans px-3 overflow-y-auto custom-scrollbar">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className=" mx-auto" 
      >
        {/* --- HEADER --- */}
        <motion.div variants={itemVariants} className=" mb-12">
          <h1 className="text-4xl font-black text-white tracking-tight">
            Get in <span className="text-blue-600 italic">Touch</span>
          </h1>
          <p className="text-slate-500 text-sm mt-3 max-w-md  font-medium leading-relaxed">
            Have a question or want to join our mentor network? Drop us a message below.
          </p>
        </motion.div>

        {/* --- CONTACT INFO BADGES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, borderColor: "rgba(37, 99, 235, 0.4)" }}
            className="bg-[#292b36] p-5 rounded-2xl border border-slate-800 flex items-center gap-5 shadow-xl group transition-all"
          >
            <div className="h-12 w-12 shrink-0 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <FiMail size={20} />
            </div>
            <div className="truncate">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Support</p>
              <p className="text-slate-200 font-bold truncate">support@growthnexus.com</p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.4)" }}
            className="bg-[#292b36] p-5 rounded-2xl border border-slate-800 flex items-center gap-5 shadow-xl group transition-all"
          >
            <div className="h-12 w-12 shrink-0 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <FiGlobe size={20} />
            </div>
            <div className="truncate">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Community</p>
              <p className="text-slate-200 font-bold truncate">nexus.community/discord</p>
            </div>
          </motion.div>
        </div>

        {/* --- FORM SECTION --- */}
        <motion.div variants={itemVariants}>
          <div className="bg-[#292b36] rounded-[2.5rem] p-8 lg:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  onSubmit={handleSubmit} 
                  className="relative z-10 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Name</label>
                      <div className="relative group">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          required
                          type="text" 
                          placeholder="Your Name"
                          className="w-full bg-[#1f202a] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Email Address</label>
                      <div className="relative group">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          required
                          type="email" 
                          placeholder="email@example.com"
                          className="w-full bg-[#1f202a] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all"
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Message</label>
                    <div className="relative group">
                      <FiMessageSquare className="absolute left-4 top-6 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                      <textarea 
                        required
                        rows="4"
                        placeholder="How can we help you?"
                        className="w-full bg-[#1f202a] border border-slate-800 rounded-3xl py-4 pl-12 pr-4 text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all resize-none"
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.01, backgroundColor: "#3b82f6" }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Message <FiArrowRight size={16} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, transition: { type: "spring", damping: 12 } }}
                  className="py-12 text-center relative z-10"
                >
                  <motion.div 
                    initial={{ rotate: -20, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <FiCheckCircle size={40} />
                  </motion.div>
                  <h2 className="text-white text-2xl font-black mb-2">Message Dispatched!</h2>
                  <p className="text-slate-500 font-medium max-w-xs mx-auto mb-8 text-sm leading-relaxed">
                    Thanks for reaching out, <span className="text-blue-400">{formData.name}</span>. We've sent a confirmation to your inbox.
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSent(false)}
                    className="px-8 py-3 bg-[#1f202a] border border-slate-800 rounded-xl text-blue-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all"
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;