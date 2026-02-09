import React, { useState } from 'react'
import ContactContainer from './ContactContainer'
import MessageContainer from './MessageContainer';
import { useAppStore } from '@/store';

const Chat = () => {
  const {selectedChatType}=useAppStore();
  return (
    <div>
      {!selectedChatType?<ContactContainer/>:<MessageContainer/>}
    </div>
  )
}

export default Chat
