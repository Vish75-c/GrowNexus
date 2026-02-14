export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  selectedGroupContact: [],
  channels: [],
  setChannels: ((channels) => set({ channels })),
  setSelectedGroupContact: (selectedGroupContact) => {
    set({ selectedGroupContact });
  },
  setSelectedChatType: (selectedChatType) => {
    set({ selectedChatType })
  },
  setSelectedChatData: (selectedChatData) => {
    set({ selectedChatData })
  },
  setSelectedChatMessages: (selectedChatMessages) => {
    set({ selectedChatMessages })
  },
  addChannel:(channel)=>{
    const channels=get().channels;
    set({channels:[channel,...channels]})
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
  },
  addChannelInChannelList:(message)=>{
    const channels=get().channels
  }


})