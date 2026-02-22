import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/Navbar'
import Footer from '@/Footer'
import Hero from './Hero'
import ProblemCarousel from './Problem'
import Features from './Features'
import FAQs from './FAQ\'s'
import Pricing from './Pricing'

// Variants for section entrance
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.21, 0.47, 0.32, 0.98] // Custom cubic-bezier for a smooth "boutique" feel
    } 
  }
}

const LandingPage = () => {
  return (
    <div className=" selection:bg-blue-500/30">
      <Navbar />
      
      {/* Spacer for Fixed Navbar */}
      <div className='mb-20 md:mb-0'></div>

      <main>
        {/* Hero Section - Loads immediately without scroll trigger for better LCP */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero />
        </motion.section>

        {/* Problem Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <ProblemCarousel />
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <Features />
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <Pricing />
        </motion.section>

        {/* FAQs Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <FAQs />
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage