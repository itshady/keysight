import {
  Box,
  VStack,
  HStack,
  Text,Heading, Flex, Divider,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import Task from "./Task";
import { useEffect, useState } from "react";
import { onValue, ref, get, child } from "firebase/database";
import "../App.css";
import "./myTasks.css"
const percentageC = 20;
const numTasks = 20;
const numOverdue = 3;

function MyTasks({ user, uid, db }) {
  const [groupID, setGroupID] = useState(null);
  const [logs, setLogs] = useState(null);
  const [alert, setAlert] = useState(null);
  const [housemates, setHousemates] = useState(null);

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
              try {
                resultArray.sort((a, b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0))
                setLogs(resultArray)
                // console.log(resultArray)

                // select the first log in the sorted array
                if (resultArray.length > 0) {
                  setAlert(resultArray[0]);

                  // Set the selectedLog back to null after 5 seconds
                  setTimeout(() => {
                    setAlert(null);
                  }, 5000);
                }
              } catch (err) {
                console.log(err)
              }
            }
          }
        );

        onValue(
          ref(db, "groups/" + groupID + "/users"),
          (snapshot) => {
            if (snapshot.exists()) {

              const userArray = Object.values(snapshot.val());
              const userList = [];

              userArray.map((childSnapshot) => {
                const uid = childSnapshot.uid;
                const userRef = ref(db, "users/" + uid);

                get(userRef).then((userSnapshot) => {
                  if (userSnapshot.exists()) userList.push(userSnapshot.val());
                });
              });

              setHousemates(userList)
              console.log("housemates:",housemates)
            }
          }
        );
      }
    });
  }, []);

  return (
    <Box w="83%" >
      <VStack align="flex-start" w="100%">
      <Box  width="100%" height="67vh"boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" mx="0" mb="3" mt="3" borderRadius="10px" backgroundColor= "#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4} >
      <Box p="5">
      <Heading textColor="white" pb="2.5" fontSize="40px">Your House</Heading>
      <HStack >
        <Text translateX="3" as="span" fontWeight="bold" fontSize="18px" color="whitesmoke">
          {logs && logs.length} events total,
        </Text>
        <Text pt="0.5" pb="1" as="span"color="#D6D6D6" >view what has been going on.</Text>
      </HStack>
      <Divider mb="1"/>
        <Flex w="full" justifyContent="space-between">
          <Text pl="3" color="white" flex="1">Name</Text>
          <Box flex="2">
          <Text pl="5" color="white">Event</Text>
          </Box>
          <Text color="white" flex="1" pr="3">Date</Text>
        </Flex>
      <Divider  mt="1"/>
      <Box key={uid} w="full" overflowY="scroll" height="360px">
          {!logs ? null : (
            <VStack w="full" h="full" justifyContent="space-between">
              <VStack w="full">
                <Box py={1} w="full" >
                  <VStack
                    overflowY="auto"
                    py={2}
                    borderRadius={4}
                  >
                    {logs.map((value, index) => (
                      <Box w="full" pt="1.5">
                        <Task
                          key={index}
                          user={user}
                          name={value.username}
                          datetime={value.time}
                          purpose={value.purpose}
                          isTask={true}
                        />
                      </Box>
                    ))}
                    <Box>
                      {alert ? (
                        alert.username
                      ) : ("null")}
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </VStack>
          )}
       </Box>
      </Box>
      </Box>
      <HStack width="100%">
      <Box  width="50%" height="17vh"boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" mr="3" mb="3" mt="0" borderRadius="10px" backgroundColor= "#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4} > 
        <HStack>
          {housemates && housemates.map((value, index) => (
            <VStack>
              <Text key={index}>
                {value.name}
                {value.isHome ? "True":"False"}
              </Text>
            </VStack>
          ))}
        </HStack>
      </Box>
      <Box  width="50%" height="17vh"boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" mx="0" mb="3" mt="0" borderRadius="10px" backgroundColor= "#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4} > 
      
      </Box>
      </HStack>
      <HStack width="100%">
      <Box  width="70%" height="7.5vh"boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" mr="3" mb="3" mt="0" borderRadius="10px" backgroundColor= "#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4} > 
      
      </Box>
      <Box  width="30%" height="7.5vh"boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" mx="0" mb="3" mt="0" borderRadius="10px" backgroundColor= "#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4} > 
      
      </Box>
      </HStack>
      
      </VStack>
    </Box>
  );
}

export default MyTasks;
