import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { MdClose } from "react-icons/md";
import * as Avatar from "@radix-ui/react-avatar";
import { useAppStore } from "@/store";
import { getColor } from "@/lib/utils";

const MessageHeader = () => {
  const {
    selectedChatData,
    setSelectedChatMessages,
    setSelectedChatType,
    setSelectedChatData,
  } = useAppStore();

  const handleCancelChat = async () => {
    setSelectedChatData(undefined);
    setSelectedChatType(undefined);
    setSelectedChatMessages([]);
  };

  return (
    <div className="h-[10vh] border-b border-slate-800 flex items-center justify-between px-8 bg-[#1f202a]">
      <div className="flex items-center gap-4 group cursor-pointer">
        
        {/* Avatar - Matched to Sidebar dimensions (h-11 w-11) */}
        <Avatar.Root
          className={`h-11 w-11 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 ${getColor(
            selectedChatData.color
          )}`}
        >
          {selectedChatData.image ? (
            <Avatar.Image
              src={selectedChatData.image}
              alt="profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <Avatar.Fallback className="uppercase text-white font-bold text-lg">
              {selectedChatData.firstName?.[0]}
            </Avatar.Fallback>
          )}
        </Avatar.Root>

        {/* Name + Role - Matched to Sidebar fonts */}
        <div className="flex flex-col text-left truncate">
          <p className="text-base font-bold text-slate-100 truncate leading-tight">
            {selectedChatData.firstName} {selectedChatData.lastName}
          </p>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-0.5">
            {selectedChatData.role}
          </p>
        </div>
      </div>

      {/* Close button */}
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={handleCancelChat}
                className="text-slate-500 hover:text-white transition-all duration-300"
              >
                <MdClose className="text-2xl" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#292b36] border-slate-700 text-white font-bold text-xs mb-2">
              <p>Close Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MessageHeader;