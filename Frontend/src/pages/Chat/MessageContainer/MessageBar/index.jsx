import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useSocket } from "@/Context/socketContext";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "@/store";
import apiClient from "@/lib/apiClient";
import { UPLOAD_FILE_ROUTE } from "@/utils/Constant";

const MessageBar = () => {
  const socket = useSocket();
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const [message, setMessage] = useState("");
  const { selectedChatData, selectedChatType, userInfo } = useAppStore();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutSide(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [emojiRef]);

  const handleSendMessage = async () => {
    if (!message.trim()) return; // Don't send empty messages

    if (!socket || !socket.emit) {
      console.log("Socket not ready yet");
      return;
    }

    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo._id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
    }
    setMessage("");
  };

  // Handle "Enter" key to send
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAddEmoji = (e) => {
    setMessage((msg) => msg + e.emoji);
  };
  const handleAttachmentClick = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        console.log(formData);
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
        });
         if (response.status === 200 && response.data) {
        if (selectedChatType === "contact") {
          socket.emit("sendMessage", {
            sender: userInfo._id,
            content: undefined,
            recipient: selectedChatData._id,
            messageType: "file",
            fileUrl: response.data.url,
          });
        }
      }
      console.log(response);
      }
     
    
      // const response=await apiClient.post(UPLOAD_FILE_ROUTE,{})
    } catch (error) {}
  };
  return (
    <div className="h-[12vh] flex justify-center items-center px-8 mb-4 gap-4 relative bg-[#1f202a]">
      <div className="flex-1 flex bg-[#292b36] rounded-2xl items-center gap-4 pr-5 relative border border-slate-800 focus-within:border-blue-500/50 transition-all shadow-xl">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-slate-200 flex-1 py-5 px-6 bg-transparent rounded-2xl focus:outline-none text-base placeholder:text-slate-500 font-medium"
        />

        <div className="flex items-center gap-4">
          <button
            onClick={handleAttachmentClick}
            className="text-slate-500 hover:text-blue-500 transition-colors duration-300"
          >
            <GrAttachment size={22} />
          </button>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAttachmentChange}
          />

          <button
            onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
            className={`transition-colors duration-300 ${emojiPickerOpen ? "text-blue-500" : "text-slate-500 hover:text-blue-500"}`}
          >
            <RiEmojiStickerLine size={24} />
          </button>
        </div>

        {emojiPickerOpen && (
          <div
            ref={emojiRef}
            className="absolute bottom-20 right-0 z-50 shadow-2xl"
          >
            <EmojiPicker
              theme="dark"
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
              width={350}
              height={450}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSendMessage}
        className="bg-[#8417ff] h-15 w-15 rounded-2xl flex items-center justify-center text-white hover:bg-[#741bda] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-900/20"
      >
        <IoMdSend size={28} />
      </button>
    </div>
  );
};

export default MessageBar;
