import React from 'react'
import MessageBar from './MessageBar'
import MessageDisplay from './MessageDisplay'

const MessageContainer = () => {
  return (
    <div className="flex flex-col h-full">
      
      {/* messages */}
      <section className="flex-1 overflow-y-auto">
        <MessageDisplay />
      </section>

      {/* input
      <div className="sticky bottom-0 bg-white">
        <MessageBar />
      </div> */}

    </div>
  )
}

export default MessageContainer
