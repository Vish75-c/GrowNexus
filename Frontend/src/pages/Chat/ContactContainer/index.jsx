import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewDm from '../NewDm';
import { useAppStore } from '@/store';
import { FiHash, FiMessageSquare, FiSearch, FiPlus } from 'react-icons/fi';
import * as Avatar from "@radix-ui/react-avatar";
import { getColor } from '@/lib/utils';
import apiClient from '@/lib/apiClient';
import { GET_ALL_CHANNEL_ROUTE, GET_DM_CONTACT_ROUTE } from '@/utils/Constant';
import ContactChannel from '../ContactChannel';

// --- ANIMATION VARIANTS ---

// 1. Staggered Entrance (Container)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// 2. Item Slide-Up (Children)
const slideUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// 3. Interactive Card Hover & Group Hover logic
const cardHoverVariants = {
  hover: {
    y: -8,
    transition: { duration: 0.3 },
  },
};

const iconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
};

const secondaryTextVariants = {
  initial: { opacity: 0, x: 0 },
  hover: { 
    opacity: 1, 
    x: 2, 
    transition: { duration: 0.3 } 
  },
};

const ContactContainer = () => {
  const { 
    setChannels,
    channels, 
    selectedChatData, 
    setSelectedChatData, 
    setSelectedChatType,
    setSelectedGroupContact,
    selectedGroupContact,
    selectedChatType
  } = useAppStore();

  useEffect(() => {
    const getChannel = async () => {
      try {
        const response = await apiClient.get(GET_ALL_CHANNEL_ROUTE, { withCredentials: true });
        if (response.status === 200) setChannels(response.data.channels);
      } catch (error) {
        console.error("Channel Fetch Error:", error);
      }
    };
    getChannel();
  }, [setChannels]);

  useEffect(() => {
    const getGroupContact = async () => {
      try {
        const response = await apiClient.get(GET_DM_CONTACT_ROUTE, { withCredentials: true });
        if (response.status === 200) setSelectedGroupContact(response.data.contacts);
      } catch (error) {
        console.error("Contact Fetch Error:", error);
      }
    };
    getGroupContact();
  }, [setSelectedGroupContact]);

  const isSelected = (id, type) => selectedChatData?._id === id && selectedChatType === type;

  return (
    // 4. Wrap main container in motion.div
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='flex flex-col h-full bg-[#1f202a] text-slate-300'
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 mt-10 mb-15 space-y-8">
        
        {/* DIRECT MESSAGES SECTION */}
        <motion.section variants={slideUpVariants}>
          <div className='flex items-center justify-between px-2 mb-4'>
            <div className="flex items-center gap-3">
               <FiMessageSquare size={16} className="text-blue-500" />
               <h6 className='uppercase tracking-[0.2em] text-slate-500 font-black text-xs'>Direct Messages</h6>
            </div>
            <NewDm />
          </div>

          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {selectedGroupContact?.length > 0 ? (
                selectedGroupContact.map((contact) => (
                  <motion.button
                    key={`contact-${contact._id}`}
                    variants={cardHoverVariants} // Inherits entrance from parent section, but defines hover behavior
                    whileHover="hover"
                    onClick={() => {
                      setSelectedChatType("contact");
                      setSelectedChatData(contact);
                    }}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group border ${
                      isSelected(contact._id, "contact") 
                        ? "bg-blue-600/10 border-blue-500/30 shadow-lg shadow-blue-900/10" 
                        : "bg-transparent border-transparent hover:bg-[#292b36]"
                    }`}
                  >
                    <motion.div variants={iconVariants}>
                      <Avatar.Root className={`h-10 w-10 rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-lg overflow-hidden ${getColor(contact.color)}`}>
                        {contact.image ? (
                          <Avatar.Image src={contact.image} className="h-full w-full object-cover rounded-xl ring-1 ring-white/10" />
                        ) : (
                          <span className="uppercase text-sm">{contact.firstName?.[0]}</span>
                        )}
                      </Avatar.Root>
                    </motion.div>
                    
                    <div className="flex-1 text-left truncate">
                      <motion.p 
                        variants={secondaryTextVariants}
                        className={`text-sm font-bold truncate transition-colors duration-300 ${isSelected(contact._id, "contact") ? "text-blue-400" : "text-slate-100 group-hover:text-blue-400"}`}
                      >
                        {contact.firstName} {contact.lastName}
                      </motion.p>
                    </div>
                  </motion.button>
                ))
              ) : (
                <p className="text-[10px] uppercase tracking-widest text-center text-slate-600 font-bold py-4">No active conversations</p>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* CHANNELS SECTION */}
        <motion.section variants={slideUpVariants}>
          <div className='flex items-center justify-between px-2 mb-4'>
            <div className="flex items-center gap-3">
               <FiHash size={18} className="text-emerald-500" />
               <h6 className='uppercase tracking-[0.2em] text-slate-500 font-black text-xs'>Channels</h6>
            </div>
            <ContactChannel/>
          </div>

          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {channels?.length > 0 ? (
                channels.map((channel) => (
                  <motion.button
                    key={`channel-${channel._id}`}
                    variants={cardHoverVariants}
                    whileHover="hover"
                    onClick={() => {
                      setSelectedChatType("channel");
                      setSelectedChatData(channel);
                    }}
                    className={`w-full flex items-center gap-4 group p-3 rounded-xl transition-all group border ${
                      isSelected(channel._id, "channel") 
                        ? "bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-900/10" 
                        : "bg-transparent border-transparent hover:bg-[#292b36]"
                    }`}
                  >
                    <motion.div 
                      variants={iconVariants}
                      className={`h-10 w-10 rounded-xl ring-1 ring-slate-700 flex items-center justify-center transition-all duration-300 ${isSelected(channel._id, "channel") ? "bg-emerald-500/20 ring-emerald-500/50 text-emerald-500" : "bg-[#1f202a] text-slate-500 group-hover:ring-blue-400 group-hover:text-blue-400"}`}
                    >
                      <FiHash size={18} />
                    </motion.div>
                    <motion.span 
                      variants={secondaryTextVariants}
                      className={`text-sm font-bold truncate transition-colors duration-300 ${isSelected(channel._id, "channel") ? "text-emerald-400" : "text-slate-200 group-hover:text-blue-400"}`}
                    >
                      {channel.name}
                    </motion.span>
                  </motion.button>
                ))
              ) : (
                <p className="text-[10px] uppercase tracking-widest text-center text-slate-600 font-bold py-4">No channels joined</p>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

      </div>
    </motion.div>
  );
};

export default ContactContainer;