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
import { FiHash } from "react-icons/fi";
const MessageHeader = () => {
  const {
    selectedChatData,
    selectedChatType,
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
      {selectedChatType === "contact" && (
        <div className="flex group items-center gap-4 group cursor-pointer" >
          {/* Avatar - Matched to Sidebar dimensions (h-11 w-11) */}
          <Avatar.Root
            className={`h-11 w-11 ring-1 group-hover:ring-blue-400  rounded-xl overflow-hidden flex items-center justify-center transition-all duration-500 ${getColor(
              selectedChatData.color,
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
            <p className="text-base group-hover:text-blue-400 transition-all duration-500 font-bold text-slate-100 truncate leading-tight">
              {selectedChatData.firstName} {selectedChatData.lastName}
            </p>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-0.5">
              {selectedChatData.role}
            </p>
          </div>
        </div>
      )}
      {selectedChatType === "channel" && (
        <div className="flex gap-3 items-center group">
          <div
            className={`h-9 w-9 rounded-xl bg-[#1f202a] flex items-center justify-center border ring-1 group-hover:ring-blue-400 duration-500 transition-all  text-slate-500 border-slate-800`}
          >
            <FiHash size={18} />
          </div>
          <span
            className={`text-base font-bold truncate text-slate-200 group-hover:text-blue-400 duration-500 transition-all`}
          >
            {selectedChatData.name}
          </span>
        </div>
      )}
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
