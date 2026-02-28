import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useSocket } from "@/Context/socketContext";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "@/store";
import apiClient from "@/lib/apiClient";
import { UPLOAD_FILE_ROUTE } from "@/utils/Constant";
import { motion, AnimatePresence } from "framer-motion";
import { FiFile, FiImage } from "react-icons/fi";

const MessageBar = () => {
const { safeEmit } = useSocket();  const emojiRef = useRef();
  const fileInputRef = useRef();
  const [message, setMessage] = useState("");
  const { selectedChatData, selectedChatType, userInfo } = useAppStore();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  // New States for Preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle outside click for emoji picker
  useEffect(() => {
    function handleClickOutSide(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [emojiRef]);

  // Clean up preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  const handleAttachmentClick = () => fileInputRef.current?.click();

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a local URL for previewing
      if (file.type.startsWith("image/")) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null); // Non-images get a generic icon
      }
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async () => {
  
    if (!message.trim() && !selectedFile) return;

    setIsUploading(true);

    try {
      let fileUrl = undefined;

      // 1. If there's a file, upload it first
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data) {
          fileUrl = response.data.url;
        }
        if (selectedChatType === "contact") {
          const payload = {
            sender: userInfo._id,
            recipient: selectedChatData._id,
            messageType: "file",
            content: undefined,
            fileUrl: fileUrl,
          };
          await safeEmit("sendMessage", payload);
        } else if (selectedChatType === "channel") {
          await safeEmit("send-channel-message", {
            sender: userInfo._id,
            content: undefined,
            messageType: "file",
            fileUrl: fileUrl,
            channelId: selectedChatData._id,
          });
        }
      } else if (message.length > 0) {
        if (selectedChatType === "contact") {
          const payload = {
            sender: userInfo._id,
            recipient: selectedChatData._id,
            messageType: "text",
            content: message,
            fileUrl: undefined,
          };
          socket.emit("sendMessage", payload);
        } else if (selectedChatType === "channel") {
          await safeEmit("send-channel-message", {
            sender: userInfo._id,
            content: message,
            messageType: "text",
            fileUrl: undefined,
            channelId: selectedChatData._id,
          });
        }
      }
      // 3. Reset everything
      setMessage("");
      clearFile();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[12vh] flex justify-center items-center px-3 mb-4 gap-4 relative bg-[#1f202a]">
      {/* --- FILE PREVIEW AREA --- */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-full left-8 mb-4 z-10"
          >
            <div className="bg-[#292b36] border border-slate-700 p-2 rounded-2xl shadow-2xl flex items-center gap-3 pr-4 min-w-30 backdrop-blur-md bg-opacity-90">
              <div className="h-12 w-12 rounded-xl overflow-hidden bg-[#1f202a] flex items-center justify-center border border-slate-800">
                {filePreview ? (
                  <img
                    src={filePreview}
                    className="h-full w-full object-cover"
                    alt="preview"
                  />
                ) : (
                  <FiFile className="text-blue-500" size={20} />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs text-slate-200 font-bold truncate max-w-30">
                  {selectedFile.name}
                </p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={clearFile}
                className="p-1.5 hover:bg-red-500/10 text-slate-500 hover:text-red-500 transition-all rounded-full"
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex bg-[#292b36] rounded-2xl items-center gap-4 pr-5 relative border border-slate-800 focus-within:border-blue-500/50 transition-all shadow-xl">
        <input
          type="text"
          placeholder={isUploading ? "Uploading file..." : "Type a message..."}
          disabled={isUploading}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-slate-200 flex-1 py-5 px-6 bg-transparent rounded-2xl focus:outline-none text-base placeholder:text-slate-500 font-medium disabled:opacity-50"
        />

        <div className="flex items-center gap-4">
          <button
            onClick={handleAttachmentClick}
            disabled={isUploading}
            className="text-slate-500 hover:text-blue-500 transition-colors duration-300 disabled:opacity-30"
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
            className={`transition-colors duration-300 ${
              emojiPickerOpen
                ? "text-blue-500"
                : "text-slate-500 hover:text-blue-500"
            }`}
          >
            <RiEmojiStickerLine size={24} />
          </button>
        </div>

        {emojiPickerOpen && (
          <div
            ref={emojiRef}
            className="absolute bottom-24 right-0 z-50 shadow-2xl"
          >
            <EmojiPicker
              theme="dark"
              onEmojiClick={(e) => setMessage((msg) => msg + e.emoji)}
              autoFocusSearch={false}
              width={350}
              height={450}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleSendMessage}
        disabled={isUploading || (!message.trim() && !selectedFile)}
        className="bg-[#8417ff] p-2 h-16 w-14 rounded-2xl flex items-center justify-center text-white hover:bg-[#741bda] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:hover:scale-100"
      >
        {isUploading ? (
          <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <IoMdSend size={25}  />
        )}
      </button>
    </div>
  );
};

export default MessageBar;
