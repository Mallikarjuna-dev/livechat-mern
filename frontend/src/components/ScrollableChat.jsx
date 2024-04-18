import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { Avatar } from "@material-tailwind/react";
import { Tooltip } from "@chakra-ui/react";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed className="scrollbar">
      {messages &&
        messages.map((m, i) => (
          <div className="flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  variant="circular"
                  alt={m.sender.name}
                  name={m.sender.name}
                  className="cursor-pointer h-7 w-7 mt-1"
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            {/* <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "0px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span> */}
            <span
              className={`${
                m.sender._id === user._id ? "bg-blue-300" : "bg-green-300"
              } rounded-2xl px-2 py-0.5`}
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 2 : 5,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
