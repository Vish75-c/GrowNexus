import { useAppStore } from "@/store";
import { HOST } from "@/utils/Constant";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const { userInfo, selectedChatData, selectedChatType} = useAppStore();

  useEffect(() => {
    if (!userInfo) return;
    const s = io(HOST, {
      withCredentials: true,
      query: { userId: userInfo._id },
    });

    socketRef.current = s;
    setSocket(s);
    s.on("connect", () => {
      console.log("Connected to Socket Server");
    });

   const handleReceiveMessage = (message) => {
  const store = useAppStore.getState();

  if (
    store.selectedChatType &&
    store.selectedChatData &&
    (
      store.selectedChatData._id === message.sender?._id ||
      store.selectedChatData._id === message.recipient?._id
    )
  ) {
    store.addMessage(message);

    // console.log("UPDATED:", useAppStore.getState().selectedChatMessages);
  }

  console.log("SOCKET MESSAGE:", message);
};

    s.on("receiveMessage", handleReceiveMessage);
    return () => {
      s.off("receiveMessage", handleReceiveMessage);
      s.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
