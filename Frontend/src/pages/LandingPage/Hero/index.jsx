import React from 'react'
import HeroImg from '../../../assets/Hero-Background.jpg' // Keep your existing background
import { FiArrowRight, FiTerminal } from 'react-icons/fi'
import { useAppStore } from '@/store'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const {userInfo}=useAppStore();
    const navigate=useNavigate();
    const handleDirect=()=>{
        if(!userInfo){
            navigate('/auth')
        }else if(userInfo.profileSetup===false){
            navigate('/profile')
        }else{
            navigate('/main')
        }
    }
  return (
    <section id='hero' className='relative overflow-hidden w-full'>
      <img 
        src={HeroImg} 
        alt="GrowthNexus Hero"
        className='object-cover h-112.5 md:h-162.5 lg:h-200 w-full transition-transform duration-700 hover:scale-105'
      />

      {/* Increased overlay density for that premium SaaS dark mode feel */}
      <div className='inset-0 absolute bg-[#1a1b25]/85 flex flex-col items-center justify-center p-4 text-center'>
        
        {/* Added the Platform Manifesto Tag */}
        <div className='flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10'>
          <FiTerminal className='text-blue-500' size={14} />
          <span className='text-[10px] md:text-xs font-black text-blue-500 uppercase tracking-[0.3em]'>
            Platform Manifesto v1.0
          </span>
        </div>

        <h1 className='text-3xl md:text-8xl text-white font-black leading-[0.95] tracking-tighter uppercase'>
          CONNECT. <span className='text-slate-500 italic'>GROW.</span>
        </h1>

        <h1 className='text-3xl md:text-8xl text-white font-black leading-[0.95] tracking-tighter uppercase'>
          ACCELERATE.
        </h1>

        <p className='font-medium text-slate-300 text-sm md:text-xl mt-6 md:mt-10 max-w-2xl leading-relaxed'>
          The career engine where Alumni and Students converge. 
          Stop guessing—access technical blueprints and the 
          <span className='text-white font-bold'> Inside Track</span> to top-tier roles.
        </p>

        <div className='mt-10 flex flex-col sm:flex-row gap-4'>
          {/* Primary Action */}
          <button onClick={handleDirect} className='bg-blue-600 group space-x-4 p-4 px-8 rounded-xl flex items-center transition-all hover:bg-blue-500 shadow-xl shadow-blue-900/40'>
            <p className='font-black text-white text-xs uppercase tracking-widest'>Get the Inside Track</p>
            <FiArrowRight size={20} className='text-white group-hover:translate-x-2 transition-transform' />
          </button>

        </div>
      </div>
    </section>
  )
}

export default Hero