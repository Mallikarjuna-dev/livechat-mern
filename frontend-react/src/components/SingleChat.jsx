import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Button } from "@material-tailwind/react";
import { BsFillEyeFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModel";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  return (
    <>
      {selectedChat ? (
        <div className="space-y-1">
          <div className="flex box-content justify-between items-center px-2">
            <Button
              className="px-3 flex md:hidden my-1 text-sm items-center font-semibold py-2 border"
              size="md"
              variant="text"
              onClick={() => setSelectedChat("")}
            >
              <BiArrowBack className="text-xl" />
            </Button>

            {!selectedChat.isGroupChat ? (
              <>
                <h1 className="text-xl md:text-2xl text-gray-700">
                  {getSender(user, selectedChat.users)}
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-xl md:text-2xl text-gray-700">
                  {selectedChat.chatName.toUpperCase()}
                </h1>
              </>
            )}

            {!selectedChat.isGroupChat ? (
              <>
                <ProfileModal user={getSenderFull(user, selectedChat.users)}>
                  <Button
                    className="px-2 my-1 text-sm items-center font-semibold py-2 border"
                    size="lg"
                    variant="text"
                  >
                    <BsFillEyeFill className="text-xl" />
                  </Button>
                </ProfileModal>
              </>
            ) : (
              <>
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                >
                  <Button
                    className="px-2 my-1 text-sm items-center font-semibold py-2 border"
                    size="lg"
                    variant="text"
                  >
                    <BsFillEyeFill className="text-xl" />
                  </Button>
                </UpdateGroupChatModal>
              </>
            )}

            {/* <h1 className="text-lg popin font-bold text-[#302456]">Madhu</h1> */}
          </div>
          <div className="w-full h-[76vh] flex flex-col bg-gray-200 justify-end border rounded-lg scrollbar overflow-y-auto">
            <h1>Content</h1>
          </div>
        </div>
      ) : (
        <div className="text-3xl font-light text-gray-500 m-auto pb-14">
          Click on a user to start chatting..
        </div>
      )}
    </>
  );
};

export default SingleChat;