import { useAppStore } from "@/store";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  const { selectedChatType, setSelectedChatType,setSelectedChatData } = useAppStore();
  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm },
          { withCredentials: true },
        );
        if (response.status === 200) {
          setSeachedContacts(response.data.contacts);
        }
        console.log(response);
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
            <FaPlus
              onClick={() => setOpenNewContactModel(true)}
              className="text-neutral-400 font-light top-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-100 h-100 flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-neutral-400">
              Please Select the contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c3e3b] border-none"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          <ScrollArea className="h-62">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact) => (
                <div
                  onClick={() => selectedNewContact(contact)}
                  key={contact._id}
                  className="flex gap-3 items-center cursor-pointer hover:bg-[#2a2b33] p-2 rounded-lg transition"
                >
                  <Avatar.Root
                    className={`h-10 w-10 rounded-full overflow-hidden flex items-center justify-center ${getColor(contact.color)}`}
                  >
                    {contact.image ? (
                      <Avatar.Image
                        src={contact.image}
                        alt="profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Avatar.Fallback className="uppercase text-white font-semibold">
                        {contact.firstName?.[0]}
                        {contact.lastName?.[0]}
                      </Avatar.Fallback>
                    )}
                  </Avatar.Root>
                  <div className="flex flex-col">
                    {(contact.firstName || contact.lastName) && (
                      <span className="text-sm font-medium text-white">
                        {contact.firstName} {contact.lastName}
                      </span>
                    )}
                    {!contact.firstName && !contact.lastName && (
                      <span className="text-sm font-medium text-white ">
                        Undefined
                      </span>
                    )}
                    <span className="text-sm font-bold text-neutral-500">
                      {contact.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={150}
                width={150}
                options={animationDefaultOptions}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-5 mt-5 lg:text-2xl transition-all duration-300 text-center">
                <h1>
                    Hi search Contacts 
                    <br/>
                    Growth
                    <span className="text-blue-400">
                       Nexus!
                    </span>
                </h1>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
