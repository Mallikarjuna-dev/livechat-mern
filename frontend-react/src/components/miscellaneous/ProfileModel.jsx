import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  // IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
// import { BsFillEyeFill } from "react-icons/bs";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<BsFillEyeFill />}
          onClick={onOpen}
        />
      )} */}

      <span onClick={onOpen}>{children}</span>
      <Modal size="sm" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="360px">
          <ModalHeader
            fontSize="36px"
            fontFamily="Work sans"
            d="flex"
            textAlign="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            mt="-6px"
            flexDir="column"
            alignContent="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
              ml="92px"
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
              textAlign="center"
              mt="6px"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
