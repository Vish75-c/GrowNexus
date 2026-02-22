import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, X, Plus, Send, Zap, Hash, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import RichTextEditor from "@/components/RichTextEditor";
import apiClient from "@/lib/apiClient";
import { CREATE_BLOG_ROUTE } from "@/utils/Constant";

// --- ANIMATION VARIANTS ---

// 1. Staggered Entrance (Container)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// 2. Item Slide-Up (Children)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// 3. Interactive Card Hover & Group Hover Logic
const cardVariants = {
  initial: { y: 0 },
  hover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

const iconVariants = {
  hover: { scale: 1.1 },
};

const secondaryElementVariants = {
  initial: { opacity: 0, x: 0 },
  hover: { 
    opacity: 1, 
    x: 2, 
    transition: { duration: 0.3 } 
  },
};

const ShareExperience = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState(null);
  const fileRef = useRef(null);

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((id) => id !== tag));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBanner(file);
      const reader = new FileReader();
      reader.onload = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    const isContentEmpty = !content || content.replace(/<(.|\n)*?>/g, '').trim().length === 0;
    if (!title.trim()) return toast.error("Please provide a title.");
    if (isContentEmpty) return toast.error("The story content cannot be empty.");
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", JSON.stringify(tags));
      if (banner) formData.append("image", banner);

      const response = await apiClient.post(CREATE_BLOG_ROUTE, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Post Broadcasted successfully!");
        setTitle("");
        setContent("");
        setTags([]);
        setBannerPreview(null);
        setBanner(null);
        if (fileRef.current) fileRef.current.value = "";
      }
    } catch (error) {
      console.error("Publish Error:", error);
      toast.error(error.response?.data?.message || "Broadcast failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 4. Wrap main container in motion.div
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen mt-10 mb-15 text-white"
    >
      <div className=" mx-auto px-3">
        {/* Header - inheriting Slide-Up */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={18} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                Creator Studio
              </span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              Share Your <span className="text-blue-600 italic">Experience</span>
            </h1>
          </div>
          <Button
            onClick={handlePublish}
            disabled={loading}
            className="hidden md:flex bg-blue-600 hover:bg-blue-500 text-white rounded-2xl px-10 py-6 font-black uppercase text-[11px] tracking-widest transition-all shadow-xl shadow-blue-900/20 group"
          >
            {loading ? "Publishing..." : "Publish Post"}
            <Send size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Editor Card */}
          <motion.div 
            variants={itemVariants} 
            whileHover="hover"
            className="lg:col-span-8"
          >
             <motion.div variants={cardVariants} className="bg-[#292b36] border border-slate-800 rounded-[2.5rem] p-8 h-full">
                <div className="space-y-4">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Story Title"
                    className="w-full border-b border-slate-700 bg-transparent text-3xl font-black text-white outline-none py-2 pb-5 placeholder:text-slate-700 tracking-tight"
                />
                <RichTextEditor content={content} onChange={setContent} />
                </div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Banner Upload */}
            <motion.div variants={itemVariants} whileHover="hover">
              <motion.div
                variants={cardVariants}
                onClick={() => fileRef.current?.click()}
                className="bg-[#292b36] border border-slate-800 rounded-[2.5rem] p-4 group cursor-pointer hover:border-blue-500/50 transition-all overflow-hidden"
              >
                <div className="relative h-48 rounded-[1.8rem] bg-[#1f202a] border border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-600 group-hover:text-blue-500 transition-colors overflow-hidden">
                  {bannerPreview ? (
                    <>
                      <img src={bannerPreview} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImagePlus size={32} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <motion.div variants={iconVariants}>
                        <ImagePlus size={32} strokeWidth={1.5} className="mb-2" />
                      </motion.div>
                      <motion.span variants={secondaryElementVariants} className="text-[10px] font-black uppercase tracking-widest">
                        Add Cover
                      </motion.span>
                    </>
                  )}
                </div>
                <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleImage} />
              </motion.div>
            </motion.div>

            {/* Tags Card */}
            <motion.div variants={itemVariants} whileHover="hover">
              <motion.div variants={cardVariants} className="bg-[#292b36] border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex items-center gap-2">
                  <motion.div variants={iconVariants}>
                    <Hash size={16} className="text-blue-500" />
                  </motion.div>
                  <motion.span variants={secondaryElementVariants} className="text-[10px] font-black uppercase tracking-widest text-white">
                    Tags
                  </motion.span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {tags.map((tag) => (
                      <motion.div key={tag} initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
                        <Badge className="bg-[#1f202a] border border-slate-700 text-slate-400 py-1.5 px-3 rounded-lg flex items-center gap-2 hover:border-blue-500 transition-all group">
                          <span className="text-[10px] font-bold">#{tag}</span>
                          <div className="cursor-pointer group-hover:text-red-500" onClick={(e) => { e.stopPropagation(); removeTag(tag); }}>
                            <X size={12} />
                          </div>
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <div className="relative">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                    placeholder="Add Tag..."
                    className="w-full bg-[#1f202a] border border-slate-800 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-blue-500 transition-all"
                  />
                  <button type="button" onClick={addTag} className="absolute right-3 top-2.5 text-slate-600 hover:text-blue-500">
                    <Plus size={18} />
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile Publish Button */}
            <motion.div variants={itemVariants}>
                <Button
                onClick={handlePublish}
                disabled={loading}
                className="bg-blue-600 flex md:hidden w-full hover:bg-blue-500 text-white rounded-2xl px-10 py-6 font-black uppercase text-[11px] tracking-widest transition-all shadow-xl shadow-blue-900/20 group"
                >
                {loading ? "Publishing..." : "Publish Post"}
                <Send size={16} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
            </motion.div>

            {/* Tips Card */}
            <motion.div variants={itemVariants} whileHover="hover">
              <motion.div variants={cardVariants} className="bg-blue-600/5 border border-blue-500/10 rounded-[2.5rem] p-8">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div variants={iconVariants}>
                    <AlignLeft size={16} className="text-blue-500" />
                  </motion.div>
                  <motion.span variants={secondaryElementVariants} className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                    Tips
                  </motion.span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  Share specific rounds, technical questions, and how you prepared. Be authentic!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShareExperience;