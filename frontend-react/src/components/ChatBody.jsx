import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Button } from "@material-tailwind/react";
import { BsFillEyeFill } from "react-icons/bs";

const ChatBody = () => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`w-full popin relative md:h-[87vh] md:col-span-2  ${
        selectedChat ? "flex md:flex" : "hidden md:flex"
      } md:flex-col p-3 border rounded-lg bg-white`}
    >
      <div className="flex flex-row justify-between px-2 items-end">
        <h1 className="text-lg font-medium">MyChats</h1>

        <Button
          className="flex px-2 my-1 text-sm items-center font-semibold py-2 border"
          style={{ textTransform: "none" }}
          size="md"
          variant="text"
        >
          <BsFillEyeFill className="text-lg" />
        </Button>
        {/* <h1 className="text-lg popin font-bold text-[#302456]">Madhu</h1> */}
      </div>

      <div></div>
    </div>
  );
};

export default ChatBody;
