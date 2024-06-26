import React, { useState } from "react";
import {
  Modal,
  Box,
  ModalContent,
  useDisclosure,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useToast,
  FormControl,
  Input,
  position,
} from "@chakra-ui/react";
import { useRef } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { base_url } from "../../pages/server";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  // const finalRef = React.useRef(null);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${base_url}/api/user/alluser?search=${search}`
      ,config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {

      toast({
        title: "Error occured",
        description:"Failed to laod search results",
        status: "error",
        duration:5000,
        isClosable:"true",
        position:"bottom-left"


      })



    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${base_url}/api/chat/group`,
        {
          name: groupChatName,
          user: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleGroup=(userToAdd)=>{

    if(selectedUsers.includes(userToAdd)){
      toast({
        title:"User already added",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top"


      })
      return;
    }
    setSelectedUsers([...selectedUsers,userToAdd]);



  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel)=>sel._id !== delUser._id));


  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />

              <Input
                placeholder="Add Users eg: Akash, Sky"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            <Box display="flex"
            w="100%"
            flexWrap="wrap">
            { selectedUsers?.map(u=>(
              <UserBadgeItem key={u._id} user={u}
              handleFunction={()=> handleDelete(u)}/>
            ))


            }

            </Box>
            {loading? <div>loading...</div>:(
              searchResult?.slice(0,4).map((result)=>(
                <UserListItem key={result._id} user={result} handleFunction={()=> handleGroup(result)}/>

              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
