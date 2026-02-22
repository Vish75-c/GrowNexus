import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Sparkles, Newspaper, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import apiClient from "@/lib/apiClient";
import { GET_DASHBOARD_ROUTE } from "@/utils/Constant";

const FeaturedBlog = () => {
  const [data, setData] = useState({});
  const { setPost } = useAppStore();
  const navigate = useNavigate();

  const handlePostClick = () => {
    setPost(data);
    navigate(`/main/feed/${data._id}`);
  };

  useEffect(() => {
    const getBlog = async () => {
      const response = await apiClient.get(GET_DASHBOARD_ROUTE, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setData(response.data.blog[0]);
      }
    };

    getBlog();
  }, []);

  const calculateReadTime = (htmlContent) => {
    if (!htmlContent) return 0;
    const text = htmlContent.replace(/<[^>]+>/g, "");
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const readTime = calculateReadTime(data.content);
  const getPreviewText = (htmlContent, wordLimit = 25) => {
    if (!htmlContent) return "";
    const text = htmlContent.replace(/<[^>]+>/g, "");
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const previewContent = getPreviewText(data.content, 25);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="relative rounded-[2rem] bg-[#1e2028] border border-slate-800 shadow-2xl overflow-hidden group cursor-pointer hover:border-blue-900/50 transition-all"
    >
      {/* --- BACKGROUND ICON OVERLAY --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <Sparkles className="absolute -top-4 -right-4 h-24 w-24 text-blue-500/20 rotate-12" />
        <Newspaper className="absolute bottom-10 -left-6 h-32 w-32 text-slate-500/10 -rotate-12" />
        <Hash className="absolute top-1/2 right-10 h-12 w-12 text-blue-400/10" />
      </div>

      {/* Main Content Container (Relative to stay above icons) */}
      <div className="relative z-10">
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <h3 className="font-display font-semibold text-blue-400/80 uppercase tracking-[0.2em] text-[10px]">
            Featured Experience
          </h3>
          <button
            onClick={(e) => {
                e.stopPropagation(); // Prevent triggering handlePostClick
                navigate("/main/feed");
            }}
            className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-blue-400 transition-colors bg-slate-800/50 px-3 py-1 rounded-full"
          >
            View All
          </button>
        </div>

        <div className="px-5 pb-5">
          <div 
            onClick={handlePostClick}
            className="rounded-[1.5rem] bg-[#292b36]/60 backdrop-blur-sm border border-white/5 p-6 text-slate-300 group-hover:bg-[#252632] group-hover:border-blue-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BookOpen className="h-4 w-4 text-blue-500" />
              </div>
              <div className="h-px w-8 bg-slate-700"></div>
            </div>

            <h4 className="font-display font-bold text-xl leading-tight mb-3 text-white group-hover:text-blue-50 transition-colors">
              {data.title || "Loading latest story..."}
            </h4>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">
              {previewContent}
            </p>

            <div className="flex items-center justify-between border-t border-white/5 pt-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <img
                        src={data.author?.image}
                        alt="author"
                        className="h-8 w-8 rounded-full object-cover border border-slate-700"
                    />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-[#292b36] rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-200">
                    {data.author?.firstName} {data.author?.lastName}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span className="text-[9px] font-bold uppercase">
                      {readTime} min read
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-500 group-hover:gap-4 transition-all"
              >
                Read <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedBlog;