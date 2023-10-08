import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Box } from "@chakra-ui/react";

const MyChats = () => {
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
      //   console.log(data);
      setChats(data);
    } catch (error) {
      toast.error("Error Occured! Failed to Load Chats!");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <div>
      <div className="w-full md:col-span-1 p-4 border rounded-lg bg-white">
        MyChats
      </div>
    </div>
  );
};

export default MyChats;
