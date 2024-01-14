import React from "react";
import { Flex, Avatar, Text, Box, Divider } from "@chakra-ui/react";

const MessageDivider = ({ name, message }) => {
  return (
    <>
      <Divider mb="3" />
      <Flex w="full" justifyContent="space-between">
        <Avatar as="span" name={name} size="xs" />
        <Text pl="3" color="white" flex="1">
          {name}
        </Text>
        <Box flex="3" pb = "3">
          <Text flex="1">{message}</Text>
        </Box>
      </Flex>
    </>
  );
};

export default MessageDivider;
