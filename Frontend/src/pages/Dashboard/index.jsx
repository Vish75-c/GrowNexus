import React from 'react'
import QuickAction from './QuickAction';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import FeaturedBlog from './FeaturedBlog';
import HiringOpportunities from './HiringOpportunies';
import RecommendedSeniors from './RecommendedSeniors';
import RecentChats from './RecentChats';
const Dashboard = () => {
  return (
    <div className="min-h-screen ">
  
      <main className=" mx-auto px-3 mt-10 mb-15 py-3">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-8"
        >
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

        {/* Quick Actions */}
        <section className="mb-8">
          <QuickAction/>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <FeaturedBlog/>
            <HiringOpportunities/>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <RecommendedSeniors/>
            <RecentChats/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;