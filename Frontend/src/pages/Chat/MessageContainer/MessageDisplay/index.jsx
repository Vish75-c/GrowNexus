import React, { useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import moment from "moment";
import apiClient from "@/lib/apiClient";
import { GET_MESSAGE_ROUTE } from "@/utils/Constant";

const MessageDisplay = () => {
  const {
    selectedChatMessages,
    selectedChatData,
    setSelectedChatMessages,
    selectedChatType,
    userInfo,
  } = useAppStore();

  const scrollRef = useRef(null);

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

  // ================= MESSAGE UI =================
  const renderDmMessages = (message) => {
    const isMyMessage = message.sender === userInfo._id;

    return (
      <div className={`${isMyMessage ? "text-right" : "text-left"} mb-6 px-5`}>
        <div
          className={`
            inline-block p-4 rounded-2xl max-w-[60%] break-words text-[15px] leading-relaxed shadow-lg
            ${
              isMyMessage
                ? "bg-linear-to-br from-[#8417ff] to-[#6a11cb] text-white rounded-br-none"
                : "bg-[#292b36] text-slate-200 border border-[#3f414e]/50 rounded-bl-none"
            }
          `}
        >
          {/* ================= TEXT MESSAGE ================= */}
          {message.messageType === "text" && message.content && (
            <p>{message.content}</p>
          )}

          {/* ================= FILE MESSAGE ================= */}
          {message.messageType === "file" && message.fileUrl && (
  <div className="flex flex-col gap-2">
    {(() => {
      const fileUrl = message.fileUrl;

      // IMAGE
      if (fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return (
          <img
            src={fileUrl}
            alt="file"
            className="rounded-lg max-w-[260px]"
          />
        );
      }

      // VIDEO
      if (fileUrl.match(/\.(mp4|webm|ogg)$/i)) {
        return (
          <video
            src={fileUrl}
            controls
            className="rounded-lg max-w-[260px]"
          />
        );
      }

      // PDF
      if (fileUrl.match(/\.(pdf)$/i)) {
        return (
          <a
            href={message.fileUrl}

            target="_blank"
            rel="noreferrer"
            className="bg-black/30 px-3 py-2 rounded-lg text-sm inline-block"
          >
            📄 Open PDF
          </a>
        );
      }

      // ZIP / OTHER FILES
      return (
        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          download
          className="bg-black/30 px-3 py-2 rounded-lg text-sm inline-block"
        >
          📦 Download file
        </a>
      );
    })()}
  </div>
)}

        </div>

        {/* TIME */}
        <div
          className={`text-xs text-slate-500 font-bold mt-2 px-1 ${
            isMyMessage ? "mr-1" : "ml-1"
          }`}
        >
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  // ================= DATE GROUPING =================
  const renderMessages = () => {
    let lastDate = null;

    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="flex items-center justify-center gap-4 my-10 px-10">
              <div className="flex-1 h-px bg-slate-800"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
                {moment(message.timestamp).format("MMMM D, YYYY")}
              </span>
              <div className="flex-1 h-px bg-slate-800"></div>
            </div>
          )}

          {selectedChatType === "contact" && renderDmMessages(message)}
        </div>
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden bg-[#1f202a] py-4">
      <div className="max-w-6xl mx-auto">
        {renderMessages()}
        <div ref={scrollRef} className="h-4"></div>
      </div>
    </div>
  );
};

export default MessageDisplay;
