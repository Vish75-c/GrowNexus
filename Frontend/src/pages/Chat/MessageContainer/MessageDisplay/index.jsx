import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAppStore } from "@/store";
import moment from "moment";
import apiClient from "@/lib/apiClient";
import { GET_MESSAGE_ROUTE } from "@/utils/Constant";
import { motion, AnimatePresence } from "framer-motion";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { FiImage } from "react-icons/fi";
import { AiOutlineClose, AiOutlineDownload } from "react-icons/ai";

const MessageDisplay = () => {
  const {
    selectedChatMessages,
    selectedChatData,
    setSelectedChatMessages,
    selectedChatType,
    userInfo,
  } = useAppStore();

  const scrollRef = useRef(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalFileName, setModalFileName] = useState("");

  // ================= FETCH MESSAGES =================
  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await apiClient.post(
          GET_MESSAGE_ROUTE,
          { _id: selectedChatData._id },
          { withCredentials: true }
        );

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedChatData?._id && selectedChatType === "contact") {
      getMessage();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  // ================= AUTO SCROLL =================
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  // ================= DOWNLOAD HANDLER =================
  const handleDownloadFile = async (url, forcedName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      let fileName = forcedName || decodeURIComponent(url.split("/").pop().split("?")[0]) || "download";
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // ================= MODAL HANDLERS =================
  const openImageModal = (url) => {
    setModalImageUrl(url);
    setModalFileName(url.split("/").pop().split("?")[0] || "image");
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = "";
  }, []);

  // ================= MESSAGE UI =================
  const renderDmMessages = (message) => {
    const isMyMessage = message.sender === userInfo._id;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`${isMyMessage ? "text-right" : "text-left"} mb-6 px-5`}
      >
        <div
          className={`
            inline-block p-4 rounded-2xl max-w-[85%] md:max-w-[60%] wrap-break-words text-[15px] leading-relaxed shadow-lg
            ${
              isMyMessage
                ? "bg-linear-to-br from-[#8417ff] to-[#6a11cb] text-white rounded-br-none"
                : "bg-[#292b36] text-slate-200 border border-[#3f414e]/50 rounded-bl-none"
            }
          `}
        >
          {/* TEXT CONTENT */}
          {message.messageType === "text" && message.content && (
            <p>{message.content}</p>
          )}

          {/* FILE CONTENT */}
          {message.messageType === "file" && message.fileUrl && (
            <div className="flex flex-col gap-2">
              {(() => {
                const fileUrl = message.fileUrl;

                // IMAGE PREVIEW
                if (fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                  return (
                    <div className="relative group rounded-lg overflow-hidden">
                      <img
                        src={fileUrl}
                        alt="attachment"
                        className="rounded-lg max-w-full md:max-w-75 cursor-pointer"
                        onClick={() => openImageModal(fileUrl)}
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <FiImage className="text-white text-2xl" />
                      </div>
                    </div>
                  );
                }

                // VIDEO PREVIEW
                if (fileUrl.match(/\.(mp4|webm|ogg)$/i)) {
                  return <video src={fileUrl} controls className="rounded-lg max-w-full md:max-w-75" />;
                }

                // GENERIC FILE
                return (
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDownloadFile(fileUrl)}
                    className="flex items-center gap-3 bg-black/20 hover:bg-black/40 px-4 py-3 rounded-xl cursor-pointer transition-colors border border-white/5"
                  >
                    <div className="p-2 bg-white/10 rounded-lg">
                      {fileUrl.match(/\.zip$/i) ? <MdFolderZip size={20} /> : <IoMdArrowRoundDown size={20} />}
                    </div>
                    <span className="text-xs font-bold truncate max-w-30">
                      {fileUrl.match(/\.pdf$/i) ? "Document.pdf" : "Download File"}
                    </span>
                  </motion.div>
                );
              })()}
            </div>
          )}
        </div>

        {/* TIMESTAMP */}
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-2 px-1">
          {moment(message.timestamp).format("LT")}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#1f202a] py-4 relative custom-scrollbar">
      <div className="max-w-6xl mx-auto">
        {selectedChatMessages.map((message, index) => {
          const lastDate = index > 0 ? moment(selectedChatMessages[index - 1].timestamp).format("YYYY-MM-DD") : null;
          const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
          const showDate = messageDate !== lastDate;

          return (
            <div key={message._id || index}>
              {showDate && (
                <div className="flex items-center justify-center gap-4 my-10 px-10">
                  <div className="flex-1 h-px bg-slate-800/50"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
                    {moment(message.timestamp).format("MMMM D, YYYY")}
                  </span>
                  <div className="flex-1 h-px bg-slate-800/50"></div>
                </div>
              )}
              {selectedChatType === "contact" && renderDmMessages(message)}
            </div>
          );
        })}
        <div ref={scrollRef} className="h-4" />
      </div>

      {/* ================= PREMIUM IMAGE MODAL ================= */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeImageModal}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#292b36] border border-white/10 rounded-[2.5rem] p-3 shadow-2xl max-w-lg w-full overflow-hidden"
            >
              {/* Close Action */}
              <div className="flex justify-end p-2">
                <button 
                  onClick={closeImageModal}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all"
                >
                  <AiOutlineClose size={18} />
                </button>
              </div>

              {/* Image Area */}
              <div className="px-4 pb-6">
                <img
                  src={modalImageUrl}
                  alt="Preview"
                  className="w-full h-auto max-h-[55vh] object-contain rounded-3xl shadow-lg"
                />
              </div>

              {/* Bottom Action Bar */}
              <div className="p-5 bg-[#1f202a]/50 rounded-[2rem] flex items-center justify-between border border-white/5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase font-black tracking-widest text-slate-500">Attachment</span>
                  <span className="text-xs text-slate-300 font-bold truncate max-w-45">{modalFileName}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownloadFile(modalImageUrl, modalFileName)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-900/40 transition-colors"
                >
                  <AiOutlineDownload size={18} />
                  Download
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageDisplay;