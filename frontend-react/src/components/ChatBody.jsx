import React from "react";
import { ChatState } from "../Context/ChatProvider";
// import { Button } from "@material-tailwind/react";
// import { BsFillEyeFill } from "react-icons/bs";
import SingleChat from "./SingleChat";

const ChatBody = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`w-full popin relative md:h-[87vh] md:col-span-2  ${
        selectedChat ? "flex md:flex" : "hidden md:flex"
      } flex-col p-3 border rounded-lg bg-white`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBody;
