import React from "react";
import { useState } from "react";
import { BsSearch, BsBellFill } from "react-icons/bs";
import { ChatState } from "../../Context/ChatProvider";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Drawer,
  Button,
  Typography,
  IconButton,
  Avatar,
  List,
  Input,
  Spinner,
} from "@material-tailwind/react";
import ProfileModal from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [openLeft, setOpenLeft] = React.useState(false);

  const openDrawerLeft = () => setOpenLeft(true);
  const closeDrawerLeft = () => setOpenLeft(false);

  const navigate = useNavigate();
  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    toast.success("Logged out success!");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warn("Please Enter something to search!", {
        position: "bottom-left",
      });
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Error Occured, Failed to load Search Results!");
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setLoadingChat(false);
      setSelectedChat(data);
      closeDrawerLeft();
    } catch (error) {
      toast.error("Error fetching the chat!");
    }
  };

  return (
    <>
      <div className="flex justify-between bg-gray-100 px-4 md:px-6 py-1.5 md:py-2">
        <div className="relative md:-ml-2 box-content">
          <input
            onClick={openDrawerLeft}
            type="text"
            className="py-1 px-1 border w-5 md:w-48 my-1 bg-gray-100 rounded-md pl-7 transition-transform duration-500 transform hover:scale-105"
            placeholder="Search User to Chat"
          />
          <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
            <BsSearch className="text-gray-500" />
          </div>
        </div>

        <div className="lg:text-2xl text-xl my-auto font-semibold text-gray-600">
          {/* <img src="" alt="" /> */}
          <h1>Talk-A-Tive</h1>
        </div>

        <div className="flex">
          <Menu>
            <MenuHandler>
              <div className="mt-2">
                <div className="box-content">
                  {notification.length > 0 && (
                    <div className="notification-badge">
                      <span className="badge">{notification.length}</span>
                    </div>
                  )}
                  <BsBellFill className="cursor-pointer text-2xl mr-6" />
                </div>
                <MenuList className=" -p-1 text-black rounded-xl">
                  <MenuItem className=" text-gray-700 font-normal">
                    {!notification.length && "No new messages"}
                    {notification.map((notify) => (
                      <div
                        key={notify._id}
                        className="mb-1"
                        onClick={() => {
                          setSelectedChat(notify.chat);
                          setNotification(
                            notification.filter((n) => n !== notify)
                          );
                        }}
                      >
                        {notify.chat.isGroupChat
                          ? `New Message from ${notify.chat.chatName}`
                          : `New Message from ${getSender(
                              user,
                              notify.chat.users
                            )}`}
                      </div>
                    ))}
                  </MenuItem>
                </MenuList>
              </div>
            </MenuHandler>
          </Menu>

          {/* <button className="relative group focus:outline-none mr-6">
            <BsBellFill className="text-2xl" />
            <div className="absolute hidden group-hover:block bg-white text-gray-600 p-2 rounded-lg shadow-md right-0 mt-2">
              {!notification.length && "No new messages"}
            </div>
          </button> */}

          <Menu>
            <MenuHandler>
              <Avatar
                variant="circular"
                alt={user.name}
                name={user.name}
                className="cursor-pointer h-10 w-10"
                src={user.pic}
              />
            </MenuHandler>
            <MenuList className="p-2">
              <ProfileModal user={user}>
                <MenuItem className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <Typography variant="small" className="font-normal">
                    My Profile
                  </Typography>
                </MenuItem>
              </ProfileModal>
              <hr className="my-1 border-blue-gray-50" />
              <MenuItem
                onClick={logoutHandler}
                className="flex items-center gap-2 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                  />
                </svg>
                <Typography variant="small" className="font-normal">
                  Sign Out
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <div>
        <Drawer placement="left" open={openLeft} onClose={closeDrawerLeft}>
          <div className="mb-3 flex items-center justify-between px-4 pt-3">
            <Typography variant="h5" color="blue-gray">
              Search Users
            </Typography>
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={closeDrawerLeft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <List>
            <div className="flex box-content justify-between px-2">
              <div className="w-10">
                <Input
                  label="Search by name/email/mob..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch} size="md" variant="gradient">
                Go
              </Button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner className="ml-60 mt-2 h-8 w-8" />}
          </List>
        </Drawer>
      </div>
    </>
  );
};

export default SideDrawer;
