import { useAppStore } from "@/store";
import React, { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as Avatar from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import apiClient from "@/lib/apiClient";
import { GET_ALL_CONTACTS_ROUTE, SEARCH_CONTACT_ROUTE } from "@/utils/Constant";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import Lottie from "react-lottie";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";

const ContactChannel = () => {
  const [newChannelModel, setnewChannelModel] = useState(false);
  const [searchedContacts, setSeachedContacts] = useState([]);
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [allContacts,setAllContacts]=useState([]);
  const [selectedContacts,setSelectedContacts]=useState([]);
  const [channelName,setChannelName]=useState("");
  useEffect(()=>{
    const getData=async ()=>{
        const response=await apiClient.get(GET_ALL_CONTACTS_ROUTE,{
            withCredentials:true
        })
        setAllContacts(response.data.contacts);
    }
    getData();
  },[])

  const createChannel=async ()=>{

  }
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={() => setnewChannelModel(true)}
              className="p-1.5 bg-[#292b36] rounded-lg text-slate-400 hover:text-white transition-all duration-300 border border-slate-800"
            >
              <FiPlus size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#292b36] border-slate-700 text-white font-bold text-xs mb-2">
            <p>Create New Channel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={newChannelModel} onOpenChange={setnewChannelModel}>
        <DialogContent className="bg-[#1f202a] border border-slate-800 text-white w-112.5 max-w-[90vw] h-150 flex flex-col p-6 rounded-3xl shadow-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-black text-white tracking-tight">
              New <span className="text-blue-500">Conversation</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              Please fill up the details for new channel.
            </DialogDescription>
          </DialogHeader>

          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <Input
              placeholder="Channel Name"
              className="w-full bg-[#292b36] border-slate-800 rounded-xl py-6 pl-12 text-sm focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <div>
            <MultipleSelector className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white "
            defaultOptions={allContacts}
            placeholder="Search Contacts"
            value={selectedContacts}
            onChange={setSeachedContacts}
            emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600">
                    No Result Found.
                </p>
            }
            />
          </div>
          <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={createChannel}>
            Create Channel
          </Button>
          <ScrollArea className="flex-1 pr-4">
           
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactChannel;