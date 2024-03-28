import React from "react";
import { ChatState } from "../Context/ChatProvider";
// import { Button } from "@material-tailwind/react";
// import { BsFillEyeFill } from "react-icons/bs";
import SingleChat from "./SingleChat";

const ChatBody = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`w-full popin relative md:col-span-2  ${
        selectedChat ? "flex md:flex" : "hidden md:flex"
      } flex-col px-1 md:px-3 py-1 border rounded-lg bg-white`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBody;
