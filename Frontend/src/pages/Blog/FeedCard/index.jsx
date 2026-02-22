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

const iconVariants = {
  hover: { scale: 1.1 } // scale-110
};

const secondaryElementVariants = {
  initial: { opacity: 0, x: 0 },
  hover: { 
    opacity: 1, 
    x: 2, // translate-x-2
    transition: { duration: 0.3 }
  }
};

const toIdString = (id) => {
  if (!id && id !== 0) return null;
  if (typeof id === "object") {
    if (id._id) return String(id._id);
    if (id.id) return String(id.id);
    if (typeof id.toString === "function") return id.toString();
  }
  return String(id);
};

const FeedCard = () => {
  const { post, userInfo } = useAppStore();
  const navigate = useNavigate();

  const [likes, setLikes] = useState(() => (post?.likes || []).map(toIdString).filter(Boolean));
  const [comments, setComments] = useState(post?.comments || []);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!post) navigate("/main/feed");
  }, [post, navigate]);

  useEffect(() => {
    setLikes((post?.likes || []).map(toIdString).filter(Boolean));
    setComments(post?.comments || []);
  }, [post]);

  const currentUserId = userInfo?._id ? toIdString(userInfo._id) : null;
  const isLiked = useMemo(() => currentUserId && likes.includes(currentUserId), [likes, currentUserId]);

  const maxContentLength = 220;
  const plainTextContent = (post?.content || "").replace(/<[^>]*>/g, "");
  const shouldTruncate = plainTextContent.length > maxContentLength;

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
    // 4. Wrap main container in motion.div using the variants
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto my-8"
    >
      <motion.article
        variants={cardVariants}
        whileHover="hover"
        className="overflow-hidden border border-slate-800 bg-[#1e2028] rounded-[2rem] shadow-2xl"
      >
        {/* Visual Header / Banner - Using itemVariants for stagger */}
        {post.bannerImage && (
          <motion.div variants={itemVariants} className="relative group overflow-hidden aspect-21/9">
            <img
              src={post.bannerImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1e2028] via-transparent to-transparent" />
          </motion.div>
        )}

        {/* Author & Context Bar */}
        <motion.div variants={itemVariants} className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <motion.div variants={iconVariants}>
                <Avatar className="h-10 w-10 ring-2 ring-indigo-500/20 ring-offset-2 ring-offset-[#1e2028]">
                <AvatarImage src={post.author?.image} className="object-cover" />
                <AvatarFallback className="bg-indigo-600 text-white font-black text-xs">
                    {post.author?.firstName?.[0]}
                </AvatarFallback>
                </Avatar>
            </motion.div>
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

        {/* Main Content Body */}
        <motion.div variants={itemVariants} className="px-6 pb-6">
          <h2 className="text-2xl font-black text-white mb-4 tracking-tight leading-tight">
            {post.title}
          </h2>
          <div
            className="text-[15px] text-slate-300 leading-relaxed prose-invert custom-post-content"
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

        {/* Engagement Glass-Bar */}
        <motion.div variants={itemVariants} className="mx-6 mb-6 p-2 bg-slate-900/40 rounded-2xl border border-slate-800 flex items-center justify-between">
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

          <motion.button 
            variants={secondaryElementVariants}
            initial="initial"
            onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/main/feed/${post._id}`);
                toast.success("Link copied!");
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-all"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">Share</span>
          </motion.button>
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
              <div className="p-6 space-y-6">
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

const ActionButton = ({ icon: Icon, label, active, activeColor, activeFill, onClick, disabled }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    variants={iconVariants}
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
    <Avatar className="h-8 w-8 shrink-0">
      <AvatarImage src={comment.user?.image} />
      <AvatarFallback className="bg-slate-800 text-[10px] text-white">
        {comment.user?.firstName?.[0]}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-indigo-400">
          {comment.user?.firstName} {comment.user?.lastName}
        </span>
        <span className="text-[9px] font-bold text-slate-600 uppercase">
          {formatDistanceToNow(new Date(comment.createdAt || Date.now()))}
        </span>
      </div>
      <div className="bg-[#12141a]/50 p-3 rounded-2xl rounded-tl-none border border-slate-800/50">
        <p className="text-[13px] text-slate-400 leading-normal">{comment.text}</p>
      </div>
    </div>
  </div>
);

export default FeedCard;