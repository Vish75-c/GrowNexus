import React from 'react'
import QuickAction from './QuickAction';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import FeaturedBlog from './FeaturedBlog';
import HiringOpportunities from './HiringOpportunies';
import RecommendedSeniors from './RecommendedSeniors';
import RecentChats from './RecentChats';

// --- ANIMATION VARIANTS ---

// 1. Staggered Entrance (Container)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    },
  },
};

// 2. Item Slide-Up (Children)
const slideUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

// 3. Interactive Card Hover (for use within sub-components or wrappers)
const cardHoverVariants = {
  hover: {
    y: -8,
    transition: { duration: 0.3 }
  }
};

const Dashboard = () => {
  return (
    // 4. Wrap main container in motion.div with variants
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen"
    >
      <main className="mx-auto px-3 mt-10 mb-15 py-3">
        
        {/* Greeting - Slide-Up inheriting from parent */}
        <motion.div variants={slideUpVariants} className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-4xl font-black text-white tracking-tight">
              Welcome back <span className="text-blue-600 italic">Vishal</span>
            </h1>
            <Sparkles className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-slate-500 text-sm mt-2 max-w-md font-medium">
            Your campus mentorship hub — discover seniors, read guides, and find opportunities.
          </p>
        </motion.div>

        {/* Quick Actions - Slide-Up */}
        <motion.section variants={slideUpVariants} className="mb-8">
          <QuickAction />
        </motion.section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              variants={slideUpVariants}
              whileHover="hover"
            >
              <motion.div variants={cardHoverVariants}>
                <FeaturedBlog />
              </motion.div>
            </motion.div>

            <motion.div 
              variants={slideUpVariants}
              whileHover="hover"
            >
               <motion.div variants={cardHoverVariants}>
                <HiringOpportunities />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <motion.div 
              variants={slideUpVariants}
              whileHover="hover"
            >
               <motion.div variants={cardHoverVariants}>
                <RecommendedSeniors />
              </motion.div>
            </motion.div>

            <motion.div 
              variants={slideUpVariants}
              whileHover="hover"
            >
               <motion.div variants={cardHoverVariants}>
                <RecentChats />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Dashboard;