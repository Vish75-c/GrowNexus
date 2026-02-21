import React from 'react'
import Navbar from '@/Navbar'
import Footer from '@/Footer'
import Hero from './Hero'
import ProblemCarousel from './Problem'
import Features from './Features'
import FAQs from './FAQ\'s'
import Pricing from './Pricing'
const LandingPage = () => {
  return (
    <>
    <Navbar />
    <div className='mb-20'></div>
    <Hero/>
    <ProblemCarousel/>
    <Features/>
    <Pricing/>
    <FAQs/>
      <Footer/>
      
    </>
  )
}

export default LandingPage
