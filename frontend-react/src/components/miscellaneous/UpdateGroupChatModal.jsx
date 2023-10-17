import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const UpdateGroupChatModal = ({ children, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { user, selectedChat, setSelectedChat } = ChatState();

  const handleSubmit = () => {};

  const handleRemove = () => {};

  return (
    <div>
      <span onClick={onOpen}>{children}</span>
      <Modal size="sm" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="360px">
          <ModalHeader
            py="2"
            fontSize="32px"
            className="popin"
            d="flex"
            textAlign="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody d="flex" flexDir="column" alignContent="center">
            <div className="w-full flex justify-center flex-wrap gap-1">
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </div>
            <FormControl>
              <Input
                placeholder="Chat name"
                mb={3}
                // onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button colorScheme="teal" isLoading={renameLoading}>
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add users Eg:Ak, Aj"
                mb={1}
                // onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* render searched users */}
            <div className="w-full flex justify-center flex-wrap gap-1">
              {/* {selectedUsers.map((usr) => (
                <UserBadgeItem
                  key={usr._id}
                  user={usr}
                  handleFunction={() => handleDelete(usr)}
                />
              ))} */}
            </div>

            {/* {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )} */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateGroupChatModal;
