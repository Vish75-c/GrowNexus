import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Heart, MessageCircle } from "lucide-react";

const PostCard = ({ post }) => {
  const banner = post.bannerImage || post.banner;
  const date = post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "";
  const likesCount = Array.isArray(post.likes) ? post.likes.length : 0;
  const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0;

  // strip HTML from content for excerpt and compute read time
  const plainText = post.content ? post.content.replace(/<[^>]+>/g, "") : "";
  const excerpt = plainText ? (plainText.length > 120 ? plainText.slice(0, 120) + "..." : plainText) : "";
  const words = plainText ? plainText.trim().split(/\s+/).filter(Boolean).length : 0;
  const readTime = post.readTime || `${Math.max(1, Math.ceil(words / 200))} min read`;

  return (
    <div className="bg-[#292b36] border border-slate-800 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all group">
      {banner && (
        <div className="h-48 overflow-hidden">
          <img
            src={banner}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-black text-white tracking-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-[#1f202a] border border-slate-700 text-slate-400 text-[10px] font-bold px-2.5 py-1 rounded-lg hover:border-blue-500 transition-all"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 pt-2 border-t border-slate-800 text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {date}
          </span>

          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {readTime}
          </span>

          <span className="flex items-center gap-1.5">
            <Heart size={12} />
            {likesCount}
          </span>

          <span className="flex items-center gap-1.5">
            <MessageCircle size={12} />
            {commentsCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
