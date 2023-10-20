import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Button, Input, Spinner } from "@material-tailwind/react";
import { BsFillEyeFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModel";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import { toast } from "react-toastify";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const { user, selectedChat, setSelectedChat } = ChatState();

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        setNewMessage("");
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Error, Failed to send message");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <div className="space-y-1">
          <div className="flex box-content justify-between items-center md:px-2">
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
          </div>

          <div className="w-full p-1 md:p-2 h-[79vh] flex flex-col bg-gray-200 justify-end border rounded-lg scrollbar overflow-y-auto">
            {loading ? (
              <Spinner className="self-center m-auto h-8 w-8 md:h-14 md:w-14" />
            ) : (
              <div>M</div>
            )}

            <div
              onKeyDown={sendMessage}
              className="bg-gray-300 rounded-lg mt-1"
            >
              <Input
                className="rounded-lg"
                placeholder="Enter a message.."
                onChange={{ typingHandler }}
                value={newMessage}
              />
            </div>
            {/* <h1>Content</h1> */}
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
