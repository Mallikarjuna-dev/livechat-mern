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
            fontSize="30px"
            fontFamily="Work sans"
            d="flex"
            textAlign="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            mt="-15px"
            flexDir="column"
            alignContent="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="128px"
              src={user.pic}
              alt={user.name}
              mx="auto"
            />
            <Text
              fontSize={{ base: "20px", md: "24px" }}
              fontFamily="Work sans"
              textAlign="center"
              mt="6px"
            >
              Email: {user.email}
            </Text>
            <Text
              fontSize={{ base: "20px", md: "24px" }}
              fontFamily="Work sans"
              textAlign="center"
              mt="4px"
            >
              Phone: {user.phone.slice(2)}
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
