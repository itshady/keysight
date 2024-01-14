import { useEffect, useState } from "react";
import { HStack, Checkbox, CloseButton, Box, Text, Flex, Avatar, Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,} from "@chakra-ui/react";
import { CgEnter } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";



function Task({ user, name, purpose, datetime }) {
  const profilePhoto =
    user.providerData[0] === undefined
      ? "https://avatars.dicebear.com/api/male/username.svg"
      : user.providerData[0].photoURL;
  const leftIcon = purpose === "Leave" ? <MdOutlineLogout /> : purpose === "Enter" ? <CgEnter /> : null;

  return (
<Box pl={4} pr={2} w="full">
  <Flex w="full" justifyContent="space-between">
    <Avatar as="span" name={name} size="xs"  > </Avatar>
    <Text pl="3" color="white" flex="1">{name}</Text>
    <Box flex="2">
    <Tag width="170px" colorScheme={purpose === "Leave" ? "red" : purpose === "Enter" ? "green" : "blue"}>
      <TagLeftIcon as={() => leftIcon} />
      <TagLabel pl="3">
      {purpose === "Leave" ? `Left the house.` : purpose === "Enter" ? `Entered the house.` : ""}
      </TagLabel>
    </Tag>
    </Box>
    <Text color="white" flex="1">{new Date(datetime).toDateString()} - {new Date(datetime).toTimeString().match(/\d{2}:\d{2}:\d{2}/)}</Text>
  </Flex>
</Box>


  );
}

export default Task;
