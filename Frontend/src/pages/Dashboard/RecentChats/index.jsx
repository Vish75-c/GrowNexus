import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart, Send, Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/lib/apiClient";
import { GET_DASHBOARD_DM_ROUTE } from "@/utils/Constant";
import { useAppStore } from "@/store";

const RecentChats = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const {setSelectedChatData,setSelectedChatType}=useAppStore();
  const handleChatClick=(chat)=>{
    setSelectedChatType("contact")
    setSelectedChatData(chat);
    navigate('/main/message');
  }
  useEffect(() => {
    const getchats = async () => {
      try {
        const response = await apiClient.get(
          GET_DASHBOARD_DM_ROUTE,
          { withCredentials: true }
        );

        if (response.status === 200) {
          const formattedChats = response.data.chats.map((user) => {
            const date = new Date(user.lastMessageTime);
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, "0");

            return {
              id: user._id,
              
              firstName:user.firstName,
              lastName:user.lastName,
              image: user.image,
              time: `${hours}:${minutes}`,
              message: "Tap to continue conversation...",
              unread: false,
            };
          });

          setChats(formattedChats);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getchats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="relative rounded-[2rem] bg-[#1e2028] border border-slate-800 shadow-2xl overflow-hidden group/main"
    >
      {/* Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <MessageCircle className="absolute -top-6 -right-6 h-28 w-28 text-purple-500/10 rotate-12" />
        <Send className="absolute bottom-4 -left-4 h-20 w-20 text-slate-500/5 -rotate-12" />
        <Heart className="absolute top-1/2 left-1/2 h-16 w-16 text-purple-400/5" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="font-display font-semibold text-purple-400/80 uppercase tracking-[0.15em] text-[11px]">
            Recent Chats
          </h3>
          <button
            onClick={() => navigate("/main/message")}
            className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-purple-400 transition-colors bg-slate-800/40 px-3 py-1 rounded-full border border-white/5"
          >
            See all
          </button>
        </div>

        <div className="divide-y divide-slate-800/40 px-2 pb-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className="flex items-center gap-4 px-4 py-4 hover:bg-[#292b36]/80 backdrop-blur-md rounded-2xl transition-all duration-300 cursor-pointer group border border-transparent hover:border-purple-500/20"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="h-12 w-12 rounded-2xl ring ring-slate-800 hover:ring-blue-500 transition-all duration-500 overflow-hidden border border-slate-700 hover:scale-110 ">
                  <img
                    src={chat.image}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm truncate uppercase tracking-tight  font-bold text-white  transition-colors">
                    {chat.firstName} {chat.lastName}
                  </p>
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest shrink-0 ml-2 bg-slate-900/50 px-1.5 py-0.5 rounded">
                    {chat.time}
                  </span>
                </div>
                <p className="text-[13px] truncate mt-1 leading-tight text-slate-500 group-hover:text-slate-400 transition-colors">
                  {chat.message}
                </p>
              </div>

              {/* Hover Icon */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Ghost className="h-4 w-4 text-purple-500/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecentChats;