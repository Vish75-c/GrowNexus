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
    setSelectedChatMessage:(selectedChatMessage)=>{
        set({selectedChatMessage})
    }
})