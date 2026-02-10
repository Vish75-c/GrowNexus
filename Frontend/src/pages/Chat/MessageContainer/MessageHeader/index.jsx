import React from "react";
import { Tooltip ,TooltipTrigger,TooltipContent, TooltipProvider} from "@/components/ui/tooltip";
import {MdClose} from "react-icons/md"
import { useAppStore } from "@/store";
const MessageHeader = () => {
    const {setSelectedChatMessages,setSelectedChatType,setSelectedChatData}=useAppStore();
    const handleCancelChat=async ()=>{
        setSelectedChatData(undefined);
        setSelectedChatType(undefined);
        setSelectedChatMessages([]);
    }
  return (
    <div className="px-8 pt-6 flex justify-between">
      <div></div>
      <div className="">
        <TooltipProvider>
            <Tooltip>
          <TooltipTrigger asChild>
            <MdClose onClick={handleCancelChat} className='text-2xl text-neutral-400 font-bold focus:text-white transition-all duration-300'/>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back To Contact List</p>
          </TooltipContent>
        </Tooltip>
        </TooltipProvider>
        
      </div>
    </div>
  );
};

export default MessageHeader;
