import React from 'react'
import NewDm from '../NewDm'

const ContactContainer = () => {
  return (
    <div className='flex flex-col space-y-4'>
        {/* Direct Message Section */}
        <div className='flex items-center justify-between pr-10'>
            <h6 className='uppercase tracking-widest text-neutral-400 font-bold text-opacity-90 text-sm'>Direct Message</h6>
            <NewDm/>
        </div>

        {/*Channel Message Section*/}
        <div>
            <h6 className='tracking-widest flex justify-between uppercase font-bold text-sm text-opacity-90 text-neutral-400'>Channels</h6>
        </div>
    </div>
  )
}

export default ContactContainer
