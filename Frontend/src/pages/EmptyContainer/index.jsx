import React from 'react'
import { animationDefaultOptions } from '@/lib/utils'
import Lottie from 'react-lottie'
const EmptyContainer = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
        <Lottie isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
        />
        <span className='mt-5 text-5xl text-white font-bold'>Welcome To</span>
        <span className='text-4xl font-bold text-white'>Growth<span className='text-blue-600 text-4xl'>Nexus</span></span>
    </div>
  )
}

export default EmptyContainer
