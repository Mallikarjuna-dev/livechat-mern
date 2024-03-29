import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { BsPlus } from "react-icons/bs";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      // console.log(data);
      setChats(data);
    } catch (error) {
      toast.error("Error Occured! Failed to Load Chats!");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div
      className={`w-full popin relative h-[88vh] md:h-[89vh] md:col-span-1  ${
        selectedChat ? "hidden md:flex" : "flex"
      } flex-col p-2 border rounded-lg bg-white`}
    >
      <div className="flex flex-row justify-between px-2 items-center">
        <h1 className="text-lg font-medium">MyChats</h1>
        <GroupChatModal>
          <Button
            className="flex px-2 my-1 text-sm items-center font-semibold py-2 border"
            style={{ textTransform: "none" }}
            size="md"
            variant="text"
          >
            New Group Chat
            <BsPlus className="text-xl ml-1 font-semibold" />
          </Button>
        </GroupChatModal>
      </div>

      <div className="flex flex-col p-2">
        {Array.isArray(chats) ? (
          <div className="space-y-0.5 h-[76vh] scrollbar overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`cursor-pointer text-left p-3 ${
                  selectedChat === chat
                    ? "bg-[#38B2AC] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-black"
                } border-b rounded-md duration-100`}
                onClick={() => setSelectedChat(chat)}
              >
                <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
