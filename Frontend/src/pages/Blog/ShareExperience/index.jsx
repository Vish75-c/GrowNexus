import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, X, Plus, Send, Zap, Hash, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import { CREATE_BLOG_ROUTE } from "@/utils/Constant";

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
    setBanner(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async () => {
    if (!title || !content) return toast.error("Complete the story first.");
    setLoading(true);
    try {
      if (!banner) {
        const res = await apiClient.post(
          CREATE_BLOG_ROUTE,
          { title, content, tags, bannerImage: bannerPreview },
          { withCredentials: true },
        );
        if (res.status === 200) {
          toast.success("Post Broadcasted!");
          setTitle("");
          setContent("");
          setTags([]);
          setBannerPreview(null);
        }
        console.log(res);
      } else {
        const formData = new FormData();
        formData.append("image", banner);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("tags", JSON.stringify(tags));
        const res = await apiClient.post(CREATE_BLOG_ROUTE, formData, {
          withCredentials: true,
        });
        if (res.status === 200) {
          toast.success("Post Broadcasted!");
          setTitle("");
          setContent("");
          setTags([]);
          setBannerPreview(null);
        }
      }
    } catch (err) {
      toast.error("Broadcast failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#1f202a] text-slate-400 p-6 overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto pt-5 pb-10">
        {/* Header - Matching your Hiring Dashboard style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-blue-500 fill-blue-500" size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                Creator Studio
              </span>
            </div>
            <h1 className="text-4xl font-black text-white leading-none">
              Share Your <span className="text-blue-500">Experience.</span>
            </h1>
          </div>

          <Button
            onClick={handlePublish}
            disabled={loading}
            className="bg-blue-600 hidden md:flex hover:bg-blue-500 text-white rounded-2xl px-10 py-6 font-black uppercase text-[11px] tracking-widest transition-all shadow-xl shadow-blue-900/20 group"
          >
            {loading ? "Publishing..." : "Publish Post"}
            <Send
              size={16}
              className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Editor Card */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#292b36] border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Story Title"
                className="w-full border-b border-slate-700 bg-transparent text-3xl font-black text-white outline-none  py-2 pb-5 placeholder:text-slate-700 tracking-tight"
              />
              <div className="h-px w-full bg-slate-800 mb-8" />
              <textarea
                placeholder="Share your experience ..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-100 font-semibold bg-transparent text-slate-300 text-lg leading-relaxed outline-none resize-none placeholder:text-slate-700 custom-scrollbar"
              />
            </div>
          </div>

          {/* Sidebar Metadata */}
          <div className="lg:col-span-4 space-y-6">
            {/* Banner Upload Card */}
            <div
              onClick={() => fileRef.current.click()}
              className="bg-[#292b36] border border-slate-800 rounded-[2.5rem] p-4 group cursor-pointer hover:border-blue-500/50 transition-all overflow-hidden"
            >
              <div className="relative h-48 rounded-[1.8rem] bg-[#1f202a] border border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-600 group-hover:text-blue-500 transition-colors overflow-hidden">
                {bannerPreview ? (
                  <>
                    <img
                      src={bannerPreview}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                    <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ImagePlus size={32} className="text-white" />
                    </div>
                  </>
                ) : (
                  <>
                    <ImagePlus size={32} strokeWidth={1.5} className="mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Add Cover
                    </span>
                  </>
                )}
              </div>
              <input
                type="file"
                ref={fileRef}
                className="hidden"
                onChange={handleImage}
              />
            </div>

            {/* Tags Card */}
            <div className="bg-[#292b36] border border-slate-800 rounded-[2.5rem] p-8 space-y-6">
              <div className="flex items-center gap-2">
                <Hash size={16} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  Tags
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {tags.map((tag) => (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.8 }}
                      key={tag}
                    >
                      <Badge className="bg-[#1f202a] border border-slate-700 text-slate-400 py-1.5 px-3 rounded-lg flex items-center gap-2 hover:border-blue-500 transition-all group">
                        <span className="text-[10px] font-bold">#{tag}</span>
                        <div
                          size={10}
                          className="cursor-pointer group-hover:text-red-500"
                          onClick={() => removeTag(tag)}
                        >
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
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  placeholder="Add Tag..."
                  className="w-full bg-[#1f202a] border border-slate-800 rounded-xl py-3 px-4 text-xs text-white outline-none focus:border-blue-500 transition-all"
                />
                <button
                  onClick={addTag}
                  className="absolute right-3 top-2.5 text-slate-600 hover:text-blue-500"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            <div className="w-full">
              <Button
                onClick={handlePublish}
                disabled={loading}
                className="bg-blue-600 flex md:hidden w-full hover:bg-blue-500 text-white rounded-2xl px-10 py-6 font-black uppercase text-[11px] tracking-widest transition-all shadow-xl shadow-blue-900/20 group"
              >
                {loading ? "Publishing..." : "Publish Post"}
                <Send
                  size={16}
                  className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </Button>
            </div>
            {/* Guidelines Card */}
            <div className="bg-blue-600/5 border border-blue-500/10 rounded-[2.5rem] p-8 ">
              <div className="flex items-center gap-2 mb-4">
                <AlignLeft size={16} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                  Tips
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                Share specific rounds, technical questions, and how you
                prepared. Be authentic!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareExperience;
