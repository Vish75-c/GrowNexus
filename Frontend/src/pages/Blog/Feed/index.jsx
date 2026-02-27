import { useState, useEffect } from "react";
import { Zap, Loader2 } from "lucide-react";
import { motion } from "framer-motion"; // Added motion
import PostCard from "@/components/PostCard";
import apiClient from "@/lib/apiClient";
import { GET_ALL_BLOG_ROUTE } from "@/utils/Constant";

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

// 3. Interactive Card Hover logic
const cardHoverVariants = {
  hover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await apiClient.get(GET_ALL_BLOG_ROUTE, {
          withCredentials: true,
        });
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
    // 4. Wrap the main container in <motion.div> using the variants
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen mt-10 mb-15 text-white"
    >
      <div className="mx-auto md:px-3 ">
        {/* Header - inheriting initial/animate from parent */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={18} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
              Community
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white">
            Experience <span className="text-blue-600 italic">Feed</span>
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Real stories from real interviews. Learn, prepare, succeed.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post) => (
              /* Wrapping PostCard in a motion.div to handle the specific slide-up and hover specs */
              <motion.div
                key={post._id}
                variants={itemVariants}
                whileHover="hover" // Trigger internal Group Hover logic
              >
                {/* 3. Interactive Card Hover & Internal Group Hover logic */}
                <motion.div variants={cardHoverVariants}>
                  <PostCard post={post} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Feed;