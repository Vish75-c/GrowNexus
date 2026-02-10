export const createChatSlice=(set,get)=>({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages:[],

    setSelectedChatType:(selectedChatType)=>{
        set({selectedChatType})
    },
    setSelectedChatData:(selectedChatData)=>{
        set({selectedChatData})
    },
    setSelectedChatMessages:(selectedChatMessages)=>{
        set({selectedChatMessages})
    },
addMessage: (message) => {
  set((state) => {
    const type = state.selectedChatType;

    const newMessage = {
      ...message,
      recipient:
        type === "channel"
          ? message.recipient
          : message.recipient?._id || message.recipient,
      sender:
        type === "channel"
          ? message.sender
          : message.sender?._id || message.sender,
    };

    return {
      selectedChatMessages: [...state.selectedChatMessages, newMessage],
    };
  });
}


})