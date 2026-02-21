import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Send, Share2, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import apiClient from "@/lib/apiClient";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

// Helper remains outside to prevent re-creation
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

  // Local UI state (Logic preserved)
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

  const maxContentLength = 180;
  const plainTextContent = (post?.content || "").replace(/<[^>]*>/g, "");
  const shouldTruncate = plainTextContent.length > maxContentLength;

  // --- Handlers (Logic preserved) ---
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
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto my-8 overflow-hidden border border-slate-800 bg-[#1e2028] rounded-2xl shadow-2xl"
    >
      {/* Banner Image */}
      {post.bannerImage && (
        <div className="relative group overflow-hidden aspect-video">
          <img
            src={post.bannerImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1e2028] via-transparent to-transparent opacity-60" />
        </div>
      )}

      {/* Header: Author Info */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border-2 border-slate-800">
            <AvatarImage src={post.author?.image} className="object-cover" />
            <AvatarFallback className="bg-indigo-600 text-white font-bold">
              {post.author?.firstName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-sm font-bold text-slate-100">
              {post.author?.firstName} {post.author?.lastName}
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="text-indigo-400 font-bold uppercase tracking-wider">{post.author?.role}</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
            </div>
          </div>
        </div>
        <button 
            onClick={() => { setIsBookmarked(!isBookmarked); toast.success(isBookmarked ? "Removed" : "Saved"); }}
            className={`p-2 rounded-full transition-colors ${isBookmarked ? "text-yellow-500" : "text-slate-500 hover:bg-slate-800"}`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="px-5 pb-4">
        <h2 className="text-xl font-extrabold text-white mb-3 tracking-tight leading-tight">
          {post.title}
        </h2>
        <div
          className="text-[15px] text-slate-300 leading-relaxed wrap-break-words prose-invert"
          dangerouslySetInnerHTML={{
            __html: shouldTruncate && !isExpanded 
              ? post.content.slice(0, maxContentLength) + "..." 
              : post.content,
          }}
        />
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {isExpanded ? "Show less" : "Read full story"}
          </button>
        )}
      </div>

      {/* Engagement Stats */}
      <div className="px-5 py-2 flex items-center justify-between border-t border-slate-800/50">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <div className="p-1 bg-red-500/10 rounded-full">
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </div>
            {likes.length} Likes
          </span>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="hover:text-indigo-400 transition-colors"
          >
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center px-3 py-1 bg-slate-800/20">
        <ActionButton
          icon={Heart}
          label="Like"
          active={isLiked}
          activeColor="text-red-500"
          activeFill
          onClick={handleToggleLike}
          disabled={isProcessing}
        />
        <ActionButton
          icon={MessageSquare}
          label="Comment"
          active={showComments}
          activeColor="text-indigo-400"
          onClick={() => setShowComments(!showComments)}
        />
        <button 
            onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/main/feed/${post._id}`);
                toast.success("Link copied!");
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-400 hover:bg-white/5 transition-all"
        >
            <Share2 className="w-4.5 h-4.5" />
            <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-800 bg-black/20"
          >
            <div className="p-5 space-y-5">
              <div className="max-h-80 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {comments.map((c) => (
                  <CommentItem key={c._id || c.id} comment={c} />
                ))}
                {comments.length === 0 && (
                  <div className="text-center py-6">
                    <MessageSquare className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 uppercase tracking-widest">No comments yet</p>
                  </div>
                )}
              </div>

              <form onSubmit={handleAddComment} className="relative group">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full bg-[#12141a] border border-slate-700 rounded-xl h-12 text-sm pl-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-500 hover:bg-indigo-500/10 rounded-lg disabled:opacity-20 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

const ActionButton = ({ icon: Icon, label, active, activeColor, activeFill, onClick, disabled }) => (
  <motion.button
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
      active ? activeColor : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
    } disabled:opacity-50`}
  >
    <Icon className={`w-4.75 h-4.75 ${active && activeFill ? "fill-current" : ""}`} />
    <span className="hidden sm:inline">{label}</span>
  </motion.button>
);

const CommentItem = ({ comment }) => (
  <div className="flex gap-3 group">
    <Avatar className="h-9 w-9 shrink-0 border border-slate-700">
      <AvatarImage src={comment.user?.image} />
      <AvatarFallback className="bg-slate-700 text-xs text-white">
        {comment.user?.firstName?.[0]}
      </AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="bg-[#12141a] rounded-2xl rounded-tl-none px-4 py-3 border border-slate-800/50 group-hover:border-slate-700 transition-colors">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-white">
            {comment.user?.firstName} {comment.user?.lastName}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            {formatDistanceToNow(new Date(comment.createdAt || Date.now()))}
          </span>
        </div>
        <p className="text-[13px] text-slate-400 leading-normal">{comment.text}</p>
      </div>
    </div>
  </div>
);

export default FeedCard;