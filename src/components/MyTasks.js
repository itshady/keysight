import {
  Box,
  VStack,
  HStack,
  Text,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import Task from "./Task";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import "../App.css";

const percentageC = 20;
const numTasks = 20;
const numOverdue = 3;

function MyTasks({ user, uid, db }) {
  const [groupID, setGroupID] = useState(null);
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    onValue(ref(db, "users/" + uid + "/group"), (snapshot) => {
      if (snapshot.exists()) {
        const groupID = snapshot.val();
        setGroupID(groupID);

        onValue(
          ref(db, "logs"),
          (snapshot) => {
            if (snapshot.exists()) {
              const resultArray = Object.values(snapshot.val()).map(entry => ({
                  purpose: entry.purpose,
                  time: entry.time,
                  username: entry.username,
                  useruid: entry.useruid
              }))
              resultArray.sort((a, b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0))
              setLogs(resultArray)
              console.log(resultArray)
            }
          }
        );
      }
    });
  }, []);
  return (
    <Box>
      <VStack align="flex-start" w="full">
        <Box px={6} py={4}>
          <Text fontSize="25px" fontFamily="league spartan" fontWeight="bold">
            Welcome {user.displayName} 👋
          </Text>
        </Box>
        <Text pl={6} className="heading">
          My Logs
        </Text>
        <Box key={uid} w="full">
          {!logs ? null : (
            <VStack w="full" h="full" p={4} justifyContent="space-between">
              <VStack w="full">
                <Box py={2} w="full">
                  <VStack
                    overflowY="auto"
                    border="1px"
                    borderColor="gray.200"
                    py={2}
                    borderRadius={4}
                  >
                    {logs.map((value, index) => (
                      <Box w="full">
                        <Task
                          key={index}
                          name={value.username}
                          datetime={value.time}
                          purpose={value.purpose}
                          isTask={true}
                        />
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </VStack>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

export default MyTasks;
