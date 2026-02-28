import { useAppStore } from "@/store";
import React, { useState } from "react";
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
import { SEARCH_CONTACT_ROUTE } from "@/utils/Constant";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import Lottie from "react-lottie";

const NewDm = () => {
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSeachedContacts] = useState([]);
  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setSeachedContacts(response.data.contacts);
        }
      } else {
        setSeachedContacts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectedNewContact = (contact) => {
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSeachedContacts([]);
    setOpenNewContactModel(false);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={() => setOpenNewContactModel(true)}
              className="p-1.5 bg-[#292b36] rounded-lg text-slate-400 hover:text-white transition-all duration-300 border border-slate-800"
            >
              <FiPlus size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#292b36] border-slate-700 text-white font-bold text-xs mb-2">
            <p>New Message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#1f202a] border border-slate-800 text-white w-112.5 max-w-[90vw] h-125 md:h-130 flex flex-col p-6 rounded-3xl shadow-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-black text-white tracking-tight">
              New <span className="text-blue-500">Conversation</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              Search for mentors or peers by name or email.
            </DialogDescription>
          </DialogHeader>

          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <Input
              placeholder="Search by name or email..."
              className="w-full bg-[#292b36] border-slate-800 rounded-xl py-6 pl-12 text-sm focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
            <div className="flex flex-col gap-2">
              {searchedContacts.map((contact) => (
                <button
                  onClick={() => selectedNewContact(contact)}
                  key={contact._id}
                  className="w-full flex gap-4 items-center p-3 rounded-2xl hover:bg-[#292b36] border border-transparent hover:border-slate-800 transition-all group text-left"
                >
                  <Avatar.Root
                    className={`h-11 w-11 rounded-xl overflow-hidden flex items-center justify-center shadow-lg ${getColor(contact.color)}`}
                  >
                    {contact.image ? (
                      <Avatar.Image
                        src={contact.image}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Avatar.Fallback className="uppercase text-white font-black text-lg">
                        {contact.firstName?.[0]}
                      </Avatar.Fallback>
                    )}
                  </Avatar.Root>
                  
                  <div className="flex flex-col truncate">
                    <span className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {contact.firstName ? `${contact.firstName} ${contact.lastName}` : "Unnamed User"}
                    </span>
                    <span className="text-xs font-bold text-slate-500 truncate">
                      {contact.email}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {searchedContacts.length <= 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="opacity-80 scale-75">
                  <Lottie
                    isClickToPauseDisabled={true}
                    height={200}
                    width={200}
                    options={animationDefaultOptions}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Start a <span className="text-blue-500">Connection</span>
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Find your next mentor at Growth Nexus
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;