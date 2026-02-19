import { useState, useEffect } from "react";
import { Zap, Loader2 } from "lucide-react";
import PostCard from "@/components/PostCard";
import apiClient from "@/lib/apiClient";
import { GET_ALL_BLOG_ROUTE } from "@/utils/Constant";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await apiClient.get(GET_ALL_BLOG_ROUTE, { withCredentials: true });
        setPosts(data.blogs);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen  text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={18} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
              Community
            </span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Experience Feed.
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Real stories from real interviews. Learn, prepare, succeed.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;