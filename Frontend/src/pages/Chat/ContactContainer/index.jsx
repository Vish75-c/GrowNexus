import React, { useEffect } from 'react';
import NewDm from '../NewDm';
import { useAppStore } from '@/store';
import { FiHash, FiMessageSquare, FiSearch, FiPlus } from 'react-icons/fi';
import * as Avatar from "@radix-ui/react-avatar";
import { getColor } from '@/lib/utils';
import apiClient from '@/lib/apiClient';
import { GET_ALL_CHANNEL_ROUTE, GET_DM_CONTACT_ROUTE } from '@/utils/Constant';
import ContactChannel from '../ContactChannel';

const ContactContainer = () => {
  const { 
    setChannels,
    channels, 
    selectedChatData, 
    setSelectedChatData, 
    setSelectedChatType,
    setSelectedGroupContact,
    selectedGroupContact
  } = useAppStore();
  useEffect(()=>{
    const getChannel=async ()=>{
      try {
        const response=await apiClient.get(GET_ALL_CHANNEL_ROUTE,{withCredentials:true});
        console.log(response);
        if(response.status===200){
          setChannels(response.data.channels);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getChannel();
  },[])
  const isSelected = (id) => selectedChatData?._id === id;
  useEffect(()=>{
    const getGroupContact=async ()=>{
      try {
        const response=await apiClient.get(GET_DM_CONTACT_ROUTE,{withCredentials:true});
        if(response.status===200){
          setSelectedGroupContact(response.data.contacts);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    getGroupContact();
  },[]);
  return (
    <div className='flex flex-col h-full bg-[#1f202a] text-slate-300'>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3  space-y-8">
        
        {/* 2. DIRECT MESSAGES SECTION */}
        <section>
          <div className='flex items-center justify-between px-2 mb-4'>
            <div className="flex items-center gap-3">
               <FiMessageSquare size={16} className="text-blue-500" />
               <h6 className='uppercase tracking-[0.2em] text-slate-500 font-black text-xs'>Direct Messages</h6>
            </div>
            <NewDm />
          </div>

          <div className="space-y-2">
            {selectedGroupContact?.length > 0 ? (
              selectedGroupContact.map((contact) => (
                <button
                  key={contact._id}
                  onClick={() => {
                    setSelectedChatType("contact");
                    setSelectedChatData(contact);
                  }}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group border ${
                    isSelected(contact._id) 
                      ? "bg-blue-600/10 border-blue-500/30 shadow-lg shadow-blue-900/10" 
                      : "bg-transparent border-transparent hover:bg-[#292b36]"
                  }`}
                >
                  <Avatar.Root className={`h-11  w-11 rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-lg ${getColor(contact.color)}`}>
                    {contact.image ? (
                        <Avatar.Image src={contact.image} className="h-full ring-1 ring-slate-700 group-hover:ring-blue-400 duration-500 transition-all w-full object-cover rounded-xl" />
                    ) : (
                        <span className="uppercase">{contact.firstName?.[0]}</span>
                    )}
                  </Avatar.Root>
                  
                  <div className="flex-1 text-left truncate group-hover:text-blue-400 duration-500 transition-all">
                    <p className={`text-base font-bold truncate group-hover:text-blue-400 duration-500 transition-all leading-tight ${isSelected(contact._id) ? "text-blue-400" : "text-slate-100"}`}>
                      {contact.firstName} {contact.lastName}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <p className="text-xs text-center text-slate-600 italic py-4">No active conversations</p>
            )}
          </div>
        </section>

        {/* 3. CHANNELS SECTION */}
        <section>
          <div className='flex items-center justify-between px-2 mb-4'>
            <div className="flex items-center gap-3">
               <FiHash size={18} className="text-emerald-500" />
               <h6 className='uppercase tracking-[0.2em] text-slate-500 font-black text-xs'>Channels</h6>
            </div>
            <ContactChannel/>
          </div>

          <div className="space-y-2">
            {channels?.length > 0 ? (
              channels.map((channel) => (
                <button
                  key={channel._id}
                  onClick={() => {
                    setSelectedChatType("channel");
                    setSelectedChatData(channel);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all group border ${
                    isSelected(channel._id) 
                      ? "bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-900/10" 
                      : "bg-transparent border-transparent hover:bg-[#292b36]"
                  }`}
                >
                  <div className={`h-9 w-9 rounded-xl bg-[#1f202a] flex items-center justify-center border ${isSelected(channel._id) ? "text-emerald-500 border-emerald-500/30" : "text-slate-500 border-slate-800"}`}>
                    <FiHash size={18} />
                  </div>
                  <span className={`text-base font-bold truncate ${isSelected(channel._id) ? "text-emerald-400" : "text-slate-200"}`}>
                    {channel.name}
                  </span>
                </button>
              ))
            ) : (
                <p className="text-xs text-center text-slate-600 italic py-4">No channels joined</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ContactContainer;