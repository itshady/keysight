import { useEffect, useState } from "react";
import { HStack, Checkbox, CloseButton, Box, Text } from "@chakra-ui/react";

function Task({ name, purpose, datetime }) {
  return (
    <Box pl={4} pr={2} w="full">
      <HStack w="full" justifyContent="space-between">
        <Checkbox>
          {name}
        </Checkbox>
        <Text>{new Date(datetime).toDateString()} - {new Date(datetime).toTimeString().match(/\d{2}:\d{2}:\d{2}/)}</Text>
        <Text>{purpose}</Text>
      </HStack>
    </Box>
  );
}

export default Task;
