import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Button, Input, Spinner } from "@material-tailwind/react";
import { BsFillEyeFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModel";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      // console.log(messages);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Error, Failed to fetch messages");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //notification
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async () => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Error, Failed to send message");
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && newMessage) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleButtonClick = () => {
    sendMessage();
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // Typing indicator logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerlength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerlength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerlength);
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
                  {/* <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  /> */}
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
                  fetchMessages={fetchMessages}
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

          <div className="w-full px-1 md:px-2 md:py-0.5 h-[85vh] md:h-[82vh] flex flex-col bg-gray-200 justify-end border rounded-lg">
            {loading ? (
              <Spinner className="self-center m-auto h-8 w-8 md:h-12 lg:w-15" />
            ) : (
              <div className="flex flex-col overflow-y-auto">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <div
              onKeyDown={handleKeyPress}
              isRequired
              className="bg-gray-300 rounded-lg mt-1.5"
            >
              {isTyping ? (
                <div className="flex justify-start bg-gray-200">
                  <div className="">
                    <Lottie
                      className="mt-2 ml-6"
                      options={defaultOptions}
                      width={70}
                    />
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="flex">
                <Input
                  className="rounded-lg"
                  placeholder="Enter a message.."
                  onChange={typingHandler}
                  value={newMessage}
                />
                <span
                  onClick={handleButtonClick}
                  className="bg-gray-200 border-none text-2xl pl-2.5 pr-1.5 py-2 cursor-pointer"
                >
                  <IoSend />
                </span>
              </div>
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
