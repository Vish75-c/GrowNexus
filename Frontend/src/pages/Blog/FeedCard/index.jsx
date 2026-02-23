import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Send, Share2, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import apiClient from "@/lib/apiClient";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: {
    y: -8,
    transition: { duration: 0.3 }
  }
};

// --- HELPERS ---
const toIdString = (id) => {
  if (!id && id !== 0) return null;
  if (typeof id === "object") return String(id._id || id.id || id.toString?.() || id);
  return String(id);
};

// --- SUB-COMPONENTS ---

const ActionButton = ({ icon: Icon, label, active, activeColor, activeFill, onClick, disabled }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
      active ? activeColor : "text-slate-400 hover:text-slate-200"
    } disabled:opacity-50`}
  >
    <Icon size={18} className={`${active && activeFill ? "fill-current" : ""}`} />
    <span>{label}</span>
  </motion.button>
);

const CommentItem = ({ comment }) => (
  <div className="flex gap-4">
    <Avatar className="h-10 w-10 ">
      <AvatarImage src={comment.user?.image} className="object-cover rounded-lg" />
      <AvatarFallback className="bg-slate-800 text-[10px] text-white ">
        {comment.user?.firstName?.[0]}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-indigo-400">
          {comment.user?.firstName} {comment.user?.lastName}
        </span>
        <span className="text-[9px] font-bold text-slate-600 uppercase">
          {formatDistanceToNow(new Date(comment.createdAt || Date.now()))} ago
        </span>
      </div>
      <div className="bg-[#12141a]/50 p-3 rounded-2xl rounded-tl-none border border-slate-800/50">
        <p className="text-[13px] text-slate-400 leading-normal">{comment.text}</p>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

const FeedCard = () => {
  const { post, userInfo } = useAppStore();
  const navigate = useNavigate();

  // Local State
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync state with post prop
  useEffect(() => {
    if (!post) {
      navigate("/main/feed");
      return;
    }
    setLikes((post.likes || []).map(toIdString).filter(Boolean));
    setComments(post.comments || []);
  }, [post, navigate]);

  // Performance Memoization
  const currentUserId = useMemo(() => toIdString(userInfo?._id), [userInfo?._id]);
  const isLiked = useMemo(() => currentUserId && likes.includes(currentUserId), [likes, currentUserId]);
  
  const { shouldTruncate, maxContentLength } = useMemo(() => {
    const maxLen = 220;
    const plainText = (post?.content || "").replace(/<[^>]*>/g, "");
    return { shouldTruncate: plainText.length > maxLen, maxContentLength: maxLen };
  }, [post?.content]);

  // Handlers
  const handleToggleLike = async () => {
    if (!currentUserId) return toast.error("Please login to like");
    if (!post?._id || isProcessing) return;

    setIsProcessing(true);
    const prevLikes = [...likes];
    const optimistic = isLiked ? prevLikes.filter((id) => id !== currentUserId) : [currentUserId, ...prevLikes];
    
    setLikes(optimistic);
    try {
      const { data } = await apiClient.post(`/api/blog/like/${post._id}`, {}, { withCredentials: true });
      setLikes((data?.likes || []).map(toIdString).filter(Boolean));
    } catch (err) {
      setLikes(prevLikes);
      toast.error("Error updating like");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUserId || !post?._id) return;
    
    try {
      const { data } = await apiClient.post(`/api/blog/comment/${post._id}`, { text: commentText }, { withCredentials: true });
      setComments(data.comments || []);
      setCommentText("");
      toast.success("Comment posted!");
    } catch (error) {
      toast.error("Failed to post comment");
    }
  };

  if (!post) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className=" mx-auto px-3 mt-10 mb-15"
    >
      {/* Editorial Heading */}
      <motion.div variants={itemVariants} className=" m">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-1 w-8 bg-indigo-500 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
            Explorer Feed
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter ">
          Featured <span className="text-blue-600 italic">Story</span>
        </h1>
        <p className="text-slate-500 text-sm mt-2 font-medium max-w-md">
          Dive into the latest experiences and technical deep-dives from our top contributors.
        </p>
      </motion.div>

      {/* Main Card */}
      <motion.article
        variants={cardVariants}
        whileHover="hover"
        className="overflow-hidden border mt-8 mb-15 border-slate-800 bg-[#1e2028] rounded-[2.5rem] shadow-2xl"
      >
        {/* Banner Image */}
        {post.bannerImage && (
          <motion.div variants={itemVariants} className="relative group overflow-hidden aspect-21/9">
            <img
              src={post.bannerImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1e2028] via-transparent to-transparent" />
          </motion.div>
        )}

        {/* Author Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 ring ring-slate-800 rounded-xl hover:ring-indigo-500 transition-all duration-500">
              <AvatarImage src={post.author?.image} className="object-cover" />
              <AvatarFallback className="bg-indigo-600 text-white font-black text-xs">
                {post.author?.firstName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-black text-white leading-none mb-1">
                {post.author?.firstName} {post.author?.lastName}
              </h4>
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                <span className="text-indigo-400">{post.author?.role}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
              </div>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setIsBookmarked(!isBookmarked); toast.success(isBookmarked ? "Removed" : "Saved"); }}
            className={`p-2.5 rounded-xl transition-all ${isBookmarked ? "bg-yellow-500/10 text-yellow-500" : "text-slate-500 hover:bg-slate-800"}`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
          </motion.button>
        </motion.div>

        {/* Post Content */}
        <motion.div variants={itemVariants} className="px-8 pb-6">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight leading-tight">
            {post.title}
          </h2>
          <div
            className="text-[16px] text-slate-300 leading-relaxed prose-invert custom-post-content"
            dangerouslySetInnerHTML={{
              __html: shouldTruncate && !isExpanded 
                ? post.content.slice(0, maxContentLength) + "..." 
                : post.content,
            }}
          />
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {isExpanded ? "[ Show less ]" : "[ Read full experience ]"}
            </button>
          )}
        </motion.div>

        {/* Engagement Bar */}
        <motion.div variants={itemVariants} className="mx-8 mb-8 p-2 bg-slate-900/40 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center">
            <ActionButton
              icon={Heart}
              label={likes.length}
              active={isLiked}
              activeColor="text-red-500 bg-red-500/10"
              activeFill
              onClick={handleToggleLike}
              disabled={isProcessing}
            />
            <ActionButton
              icon={MessageSquare}
              label={comments.length}
              active={showComments}
              activeColor="text-indigo-400 bg-indigo-400/10"
              onClick={() => setShowComments(!showComments)}
            />
          </div>

          <button 
            onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/main/feed/${post._id}`);
                toast.success("Link copied!");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-all"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </motion.div>

        {/* Comments Drawer */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-800 bg-black/10"
            >
              <div className="p-8 space-y-6">
                <div className="max-h-80 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
                  {comments.map((c) => (
                    <CommentItem key={c._id || c.id} comment={c} />
                  ))}
                  {comments.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">No discussion yet</p>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAddComment} className="relative group">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Type a thought..."
                    className="w-full bg-[#12141a] border border-slate-800 rounded-2xl h-14 text-sm pl-5 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl disabled:opacity-20 transition-all"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </motion.div>
  );
};

export default FeedCard;