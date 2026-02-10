import React from 'react'
import MessageBar from './MessageBar'
import MessageDisplay from './MessageDisplay'

const MessageContainer = () => {
  return (
    <div className="flex flex-col w-full h-full">
      
      
      <section className="flex-1 w-full">
        <MessageDisplay />
      </section>

      

    </div>
  )
}

export default MessageContainer
