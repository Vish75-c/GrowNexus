import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBriefcase,
  FiCpu,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiCheckCircle,
  FiType,
  FiTerminal,
  FiInfo,
  FiActivity,
  FiArrowRight,
  FiExternalLink, // Icon for Apply Link section
} from "react-icons/fi";
import apiClient from "@/lib/apiClient"; 
import { GET_HIRING_INFO, POST_HIRING_INTO } from "@/utils/Constant";
import { toast } from "sonner";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const PostOpportunity = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rawText, setRawText] = useState("");

  const [parsedData, setParsedData] = useState({
    company: "",
    companyDiscription: "",
    role: "",
    requirements: "",
    duration: "",
    deadline: "",
    location: "",
    stipend: "",
    applyLink: "", // Separate field
  });

  // --- REQUIRED FIELDS ---
  const requiredFields = [
    "company",
    "companyDiscription",
    "role",
    "requirements",
    "deadline",
    "stipend",
    "applyLink", 
  ];

  const isFormValid = () => {
    return requiredFields.every((field) => {
      const v = parsedData[field];
      return typeof v === "string" && v.trim() !== "";
    });
  };

  const handleAnalyze = async () => {
    if (!rawText) return;
    setIsAnalyzing(true);
    try {
      const response = await apiClient.post(
        GET_HIRING_INFO,
        { text: rawText },
        { withCredentials: true },
      );
      if (response.status === 200) {
        setParsedData((prev) => ({ ...prev, ...response.data }));
        setShowForm(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePost = async () => {
    if (!isFormValid()) {
      toast.error("Fill the required field.");
      return;
    }
    try {
      const response = await apiClient.post(POST_HIRING_INTO, parsedData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setRawText("");
        setShowForm(false);
        setParsedData({
          company: "",
          companyDiscription: "",
          role: "",
          requirements: "",
          duration: "",
          deadline: "",
          location: "",
          stipend: "",
          applyLink: "", 
        });
        toast.success("Posted the Information successfully.")
      } else {
        toast.error("Error while Posting the Information.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full h-full bg-[#1f202a] text-slate-400 font-sans px-3 overflow-y-auto custom-scrollbar"
    >
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto mb-10 ">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Post <span className="text-blue-500">Opportunity</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 max-w-md font-medium">
              Use our AI engine to transform raw job descriptions into structured, auto-expiring posts.
            </p>
          </div>

          <div className="bg-[#292b36] border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-xl">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
              <FiActivity size={20} />
            </div>
            <div>
              <p className="text-white font-black leading-none text-xl">AI Ready</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">Llama 3.3 Engine</p>
            </div>
          </div>
        </div>

        <div className="bg-[#292b36] border border-slate-800 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4 text-blue-500">
            <FiCpu size={22} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">AI Raw Processor</span>
          </div>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste your job description here..."
            className="w-full bg-[#1f202a] border border-slate-800 rounded-2xl py-4 px-6 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all font-medium resize-none min-h-30 mb-4"
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !rawText}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-blue-500 shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50"
          >
            {isAnalyzing ? "Processing..." : "Analyze Description"} <FiArrowRight size={16} />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20"
          >
            {/* Company Card */}
            <div className="md:col-span-2 lg:col-span-2 bg-[#292b36] rounded-[2rem] p-8 border border-slate-800 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <span className="text-blue-500 bg-blue-500/10 p-2 rounded-lg"><FiBriefcase /></span>
                <h3 className="text-xs font-black text-slate-200 uppercase tracking-[0.2em]">Company Overview</h3>
              </div>
              <div className="space-y-4 relative z-10">
                <input
                  value={parsedData.company}
                  onChange={(e) => setParsedData({ ...parsedData, company: e.target.value })}
                  className="w-full bg-[#1f202a] border border-slate-800 rounded-xl py-3 px-4 text-white font-bold text-xl outline-none focus:border-blue-500/30"
                  placeholder="Company Name"
                />
                <textarea
                  value={parsedData.companyDiscription}
                  onChange={(e) => setParsedData({ ...parsedData, companyDiscription: e.target.value })}
                  className="w-full bg-[#1f202a] border border-slate-800 rounded-xl py-4 px-4 text-slate-400 text-sm leading-relaxed min-h-25 outline-none focus:border-blue-500/30"
                  placeholder="Company Description"
                />
              </div>
            </div>

            {/* Quick Specs Card */}
            <div className="bg-[#292b36] rounded-[2rem] p-8 border border-slate-800 flex flex-col gap-4 relative overflow-hidden shadow-xl">
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <span className="text-emerald-500 bg-emerald-500/10 p-2 rounded-lg"><FiInfo /></span>
                <h3 className="text-xs font-black text-slate-200 uppercase tracking-[0.2em]">Quick Specs</h3>
              </div>
              <EditableInput
                label="Role"
                value={parsedData.role}
                icon={<FiType />}
                onChange={(v) => setParsedData({ ...parsedData, role: v })}
              />
              <EditableInput
                label="Stipend"
                value={parsedData.stipend}
                icon={<FiDollarSign />}
                onChange={(v) => setParsedData({ ...parsedData, stipend: v })}
              />
              <EditableInput
                label="Deadline (YYYY-MM-DD)"
                value={parsedData.deadline}
                icon={<FiCalendar />}
                onChange={(v) => setParsedData({ ...parsedData, deadline: v })}
              />
            </div>

            {/* --- SEPARATE APPLY LINK SECTION (Mirroring Requirements Style) --- */}
            <div className="md:col-span-2 lg:col-span-3 bg-[#292b36] rounded-[2rem] p-8 border border-slate-800 shadow-xl relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-blue-500 bg-blue-500/10 p-2 rounded-lg"><FiExternalLink /></span>
                <h3 className="text-xs font-black text-slate-200 uppercase tracking-[0.2em]">Application Portal</h3>
              </div>
              <input
                value={parsedData.applyLink}
                onChange={(e) => setParsedData({ ...parsedData, applyLink: e.target.value })}
                className="w-full bg-[#1f202a] border border-slate-800 rounded-xl py-4 px-4 text-blue-400 font-bold text-sm outline-none focus:border-blue-500/30"
                placeholder="https://company-careers-portal.com/job-id-123"
              />
            </div>

            {/* Requirements Section */}
            <div className="md:col-span-2 lg:col-span-3 bg-[#292b36] rounded-[2rem] p-8 border border-slate-800 shadow-xl relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-purple-500 bg-purple-500/10 p-2 rounded-lg"><FiTerminal /></span>
                <h3 className="text-xs font-black text-slate-200 uppercase tracking-[0.2em]">Technical Requirements</h3>
              </div>
              <textarea
                value={parsedData.requirements}
                onChange={(e) => setParsedData({ ...parsedData, requirements: e.target.value })}
                className="w-full bg-[#1f202a] border border-slate-800 rounded-xl py-4 px-4 text-slate-300 font-bold text-sm outline-none focus:border-purple-500/30 min-h-20"
                placeholder="List skills separated by commas..."
              />

              <div className="mt-8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  <FiClock className="text-blue-500" /> Auto-expires on deadline
                </div>
                <button
                  onClick={handlePost}
                  disabled={!isFormValid()}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Push to Board <FiCheckCircle size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EditableInput = ({ label, value, icon, onChange }) => (
  <div className="bg-[#1f202a] border border-slate-800 rounded-2xl p-3 flex flex-col gap-1 hover:border-slate-600 transition-all">
    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
      {icon} {label}
    </div>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-white font-bold text-sm outline-none"
    />
  </div>
);

export default PostOpportunity;