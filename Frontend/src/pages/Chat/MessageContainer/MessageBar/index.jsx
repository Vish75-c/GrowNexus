import React, { useEffect } from 'react'
import { useRef,useState } from 'react';
import {IoMdSend} from 'react-icons/io'
import {GrAttachment} from 'react-icons/gr'
import { RiEmojiStickerLine } from 'react-icons/ri'
import { useSocket } from '@/Context/socketContext';
import EmojiPicker from 'emoji-picker-react';
import { useAppStore } from '@/store';
const MessageBar = () => {
  const socket=useSocket();
  const emojiRef=useRef();
  const [message,setMessage]=useState("");
  const {selectedChatData,selectedChatType,userInfo}=useAppStore();
  const [emojiPickerOpen,setEmojiPickerOpen]=useState(false);
  useEffect(()=>{
    function handleClickOutSide(e){
      if(emojiRef.current&&!emojiRef.current.contains(e.target)){
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener('mousedown',handleClickOutSide);
    return ()=>{
      document.removeEventListener('mousedown',handleClickOutSide)
    }
  },[emojiRef])
  const handleSendMessage=async ()=>{
    if(!socket||!socket.emit){
      console.log("Socket not ready yet");
      return
    }
    if(selectedChatType==='contact'){
      socket.emit("sendMessage",{
        sender:userInfo._id,
        content:message,
        recipient:selectedChatData._id,
        messageType:"text",
        fileUrl:undefined
      })
    }
  }
  const handleAddEmoji=async (e)=>{
    setMessage((msg)=>msg+e.emoji)
  }
  return (
    <div className='h[10vh] flex justify-center items-center px-8  mb-6 gap-6 relative'>
      <div className='flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 relative'>
        <input
        type='text'
        placeholder='Enter Message'
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        className='text-neutral-400 flex-1 p-5 transparent rounded-md focus:border-none focus:outline-none' 
        />
        <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
          <GrAttachment className='text-2xl'/>
        </button>
        <button onClick={()=>setEmojiPickerOpen(!emojiPickerOpen)} className='text-neutral-500 focus:border-none focus:outline-none duration-300 focus:text-white transition-all'>
          <RiEmojiStickerLine className='text-2xl'/>
        </button>
        {
          emojiPickerOpen&&(
            <div ref={emojiRef}  className='absolute bottom-16 right-0 z-50'>
              <EmojiPicker
              theme='dark'
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
              />
            </div>
          )
        }
      </div>
      <button onClick={handleSendMessage} className='bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none'>
        <IoMdSend className='text-2xl'/>
      </button>
    </div>
  )
}

export default MessageBar
