import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store";
import { Calendar, Clock, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// --- ANIMATION VARIANTS ---

// 2. Item Slide-Up (Child Variant used by internal elements)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// 3. Interactive Card Hover & Internal Group Hover logic
const cardVariants = {
  hover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

const iconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const secondaryTextVariants = {
  initial: { opacity: 0, x: 0 },
  hover: { 
    opacity: 1, 
    x: 2, 
    transition: { duration: 0.3 } 
  },
};

const PostCard = ({ post }) => {
  const banner = post.bannerImage || post.banner;
  const date = post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "";
  const likesCount = Array.isArray(post.likes) ? post.likes.length : 0;
  const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0;
  const navigate = useNavigate();
  
  const plainText = post.content ? post.content.replace(/<[^>]+>/g, "") : "";
  const excerpt = plainText ? (plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText) : "";
  const words = plainText ? plainText.trim().split(/\s+/).filter(Boolean).length : 0;
  const readTime = post.readTime || `${Math.max(1, Math.ceil(words / 200))} min read`;
  
  const { setPost } = useAppStore();
  
  const handleCardClick = () => {
    setPost(post);
    navigate(`/main/feed/${post._id}`);
  };

  return (
    // 4. Main container as motion.div inheriting initial/animate from parent Feed
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onClick={handleCardClick}
      className="cursor-pointer bg-[#292b36] border border-slate-800 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all group"
    >
      {/* 2. Banner Slide-Up */}
      {banner && (
        <motion.div variants={itemVariants} className="h-60 overflow-hidden">
          <img
            src={banner}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      )}

      <div className="p-6 space-y-4">
        {/* Title Slide-Up */}
        <motion.h3 variants={itemVariants} className="text-xl font-black text-white tracking-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
          {post.title}
        </motion.h3>

        {/* Excerpt Slide-Up */}
        <motion.p variants={itemVariants} className="text-sm text-slate-400 leading-relaxed line-clamp-3">
          {excerpt}
        </motion.p>

        {/* Tags Slide-Up */}
        {post.tags && post.tags.length > 0 && (
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-[#1f202a] border border-slate-700 text-slate-400 text-[10px] font-bold px-2.5 py-1 rounded-lg hover:border-blue-500 transition-all"
              >
                #{tag}
              </Badge>
            ))}
          </motion.div>
        )}

        {/* 2. Footer Slide-Up & 3. Group Hover transformations */}
        <motion.div 
          variants={itemVariants} 
          className="flex items-center gap-4 pt-2 border-t border-slate-800 text-[11px] text-slate-500"
        >
          <span className="flex items-center gap-1.5">
            <motion.span variants={iconVariants}><Calendar size={12} /></motion.span>
            <motion.span variants={secondaryTextVariants}>{date}</motion.span>
          </span>

          <span className="flex items-center gap-1.5">
            <motion.span variants={iconVariants}><Clock size={12} /></motion.span>
            <motion.span variants={secondaryTextVariants}>{readTime}</motion.span>
          </span>

          <span className="flex items-center gap-1.5">
            <motion.span variants={iconVariants}><Heart size={12} /></motion.span>
            <motion.span variants={secondaryTextVariants}>{likesCount}</motion.span>
          </span>

          <span className="flex items-center gap-1.5">
            <motion.span variants={iconVariants}><MessageCircle size={12} /></motion.span>
            <motion.span variants={secondaryTextVariants}>{commentsCount}</motion.span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostCard;