import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Flex,
  Divider,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,useToast, Stat,
  StatLabel,
  StatNumber,
  StatHelpText, Image,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import Task from "./Task";
import { onValue, ref, get, child } from "firebase/database";
import "../App.css";
import "./myTasks.css";
import { FaHouseUser } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft  } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react"; 
import MessageDivider from "./Messages";
import graph from "../styles/mock_graph.png";

const percentageC = 20;
const numTasks = 20;
const numOverdue = 3;

function MyTasks({ user, uid, db }) {
  const [groupID, setGroupID] = useState(null);
  const [logs, setLogs] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [housemates, setHousemates] = useState(null);
  const [size, setSize] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  const showToast = (username, purpose) => {
    let colorScheme = "blue";
    let description = purpose;
  
    if (purpose === "Enter") {
      colorScheme = "green";
      description = "Entered the house";
    } else if (purpose === "Leave") {
      colorScheme = "red";
      description = "Left the house";
    }
  
    toast({
      title: `${username}`,
      description: description,
      colorScheme: colorScheme,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };
  
  const handleClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  useEffect(() => {
    const groupRef = ref(db, "users/" + uid + "/group");

    get(groupRef).then((snapshot) => {
      if (snapshot.exists()) {
        setGroupID(snapshot.val())
      }
    });
  }, []);

  useEffect(() => {
    onValue(
      ref(db, "logs/" + groupID),
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
            
            // select the first log in the sorted array
            if (!loading && resultArray.length > 0) {
              setAlert(resultArray[0]);
              console.log("alerting....")

              // Set the selectedLog back to null after 5 seconds
              setTimeout(() => {
                setAlert(null);
              }, 5000);
            } else{
              console.log("not alerting....")
            }
            if (loading) {
              setLoading(false)
            }
          } catch (err) {
            console.log(err)
          }
        }
      }
    );
  }, [groupID]);

  useEffect(() => {
    onValue(ref(db, "users/"),
      (snapshot) => {
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
            }
          }
        );
      }
    )
  }, [groupID]);

  

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
      <Box key={uid} w="full" height="360px">
          {!logs ? null : (
            <VStack w="full" h="full" justifyContent="space-between">
              <VStack w="full">
                <Box py={1} w="full" >
                  <VStack
                    overflowY="auto"
                    py={2}
                    borderRadius={4}
                    h="45vh"
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
                        showToast(alert.username, alert.purpose)
                      ) : ("")}
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
      <Box  width="50%" height="17vh" boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" mr="3" mb="3" mt="0" borderRadius="10px" backgroundColor= "#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4} > 
      <Box p="5">
      <HStack align="center" pb="3">
        <FaHouseUser  color="white" />
        <Heading textColor="white" fontSize="20px">
          Currently in the House
        </Heading>
      </HStack>
            
      <HStack> 
        <AvatarGroup size='md' max={3}>
        {housemates &&
          housemates
            .filter((value) => value.isHome)
            .map((value, index) => (
              <VStack align="left" width="100%" key={index}>
                <Tooltip
                  hasArrow
                  label={value.name}
                  placement='top' 
                  bg='gray.300' color='white' boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" borderRadius="4px" backgroundColor="#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)"
                >
                  <Avatar as="span" name={value.name} size="md"><AvatarBadge boxSize='1.25em' bg='green.500' borderColor="#303036" /></Avatar>
                </Tooltip>
              </VStack>
            ))}
        </AvatarGroup>
        
      </HStack>
      </Box>
      </Box>
      <HStack justifyContent={"center"} width="50%" height="17vh" boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" mx="0" mb="3" mt="0" borderRadius="10px" backgroundColor= "#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4} > 
      <Image src={graph} style={{"height": "-webkit-fill-available"}} pt="2"/>
      </HStack>
      </HStack>
      <HStack width="100%">
      <Box align="center" width="70%" height="7.5vh"boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" mr="3" mb="3" mt="0" borderRadius="10px" backgroundColor= "#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4} > 
          <HStack align="center" height="100%" >
          <Stat textColor="white">
            <StatLabel textColor="white">Guests</StatLabel>
              <StatArrow type='increase' />
              9.05%
          </Stat>
          <Stat textColor="white">
            <StatLabel textColor="white">Intruders</StatLabel>
              <StatArrow type='decrease' />
              77.6%
          </Stat>
          <Stat textColor="white">
            <StatLabel textColor="white">People</StatLabel>
              <StatArrow type='increase' />
              17.37%
          </Stat>
          <Stat textColor="white">
            <StatLabel textColor="white">Deliveries</StatLabel>
              <StatArrow type='increase' />
              37.1%
          </Stat>
          <Stat textColor="white">
            <StatLabel textColor="white">Solicitors</StatLabel>
              <StatArrow type='decrease' />
              55.7%
          </Stat>
          </HStack>
      </Box>
      <Box  onClick={() => handleClick("lg")} align="center" overflow="hidden" width="30%" height="7.5vh" boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" mx="0" mb="3" mt="0" borderRadius="10px" backgroundColor="#FF8360" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4}>
        <HStack className="hover-effect" align="center" height="100%" width="100%" justifyContent="center" alignItems="center">
          <MdOutlineKeyboardDoubleArrowLeft  className="icon" color="white" fontSize="45px" />
          <MdOutlineKeyboardDoubleArrowLeft  className="icon" color="white" fontSize="45px" />
          <Heading color="white" fontSize="35px">Notes</Heading>
          <MdOutlineKeyboardDoubleArrowLeft  className="icon" color="white" fontSize="45px" />
          <MdOutlineKeyboardDoubleArrowLeft  className="icon" color="white" fontSize="45px" />
        </HStack>
      </Box>
      <Drawer onClose={onClose} isOpen={isOpen} size="lg" >
        <DrawerOverlay />
        <DrawerContent overflowY="scroll" bg='gray.300' color='white' boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" borderRadius="4px" backgroundColor="#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)">
          <DrawerCloseButton />
          <DrawerHeader textColor="white" fontSize="20px">{"Organization Notes"}<Text pt="0.5" pb="1" as="span"color="#D6D6D6" ><br/>see what your house has to say.</Text></DrawerHeader>
          
          <DrawerBody>
          <MessageDivider
            name="Varun Ram"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel magna sed dolor elementum scelerisque. Morbi quis lacus mauris. Aliquam posuere lacus felis, eu vestibulum est bibendum sed."
          />
          <MessageDivider
            name="Hady Ibrahim"
            message= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel magna sed dolor elementum scelerisque. Morbi quis lacus mauris. Aliquam posuere lacus felis, eu vestibulum est bibendum sed."
          />
          <MessageDivider
            name="Himanshu Singh"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis aliquam nisl, id condimentum risus. Nulla eu ipsum elementum urna malesuada interdum."
          />
          <MessageDivider
            name="Varun Ram"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet tortor nec justo consequat ultrices in a elit. Quisque sit amet dolor tortor. Quisque neque lectus, convallis sed dapibus et, tincidunt at magna. Praesent ut dui eget mauris sodales congue eu eget purus. Vestibulum imperdiet ipsum sit amet interdum volutpat."
          />
          <MessageDivider
            name="Hady Ibrahim"
            message="Suspendisse potenti. Ut bibendum diam nulla, a congue tortor laoreet id. Donec eleifend posuere arcu, vitae imperdiet neque ultrices nec. In hac habitasse platea dictumst. Phasellus hendrerit non diam nec mattis. Morbi consequat in massa non accumsan."
          />
          <MessageDivider
            name="Himanshu Singh"
            message=" Duis in dolor porta lectus semper euismod ut at nisi. Pellentesque scelerisque est vitae diam ornare, id mollis ex pellentesque."
          />
          <MessageDivider
            name="Hady Ibrahim"
            message="Suspendisse potenti. Ut bibendum diam nulla, a congue tortor laoreet id. Donec eleifend posuere arcu, vitae imperdiet neque ultrices nec. In hac habitasse platea dictumst. Phasellus hendrerit non diam nec mattis. Morbi consequat in massa non accumsan."
          />
          <MessageDivider
            name="Hady Ibrahim"
            message=" Duis in dolor porta lectus semper euismod ut at nisi. Pellentesque scelerisque est vitae diam ornare, id mollis ex pellentesque."
          />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      </HStack>
      
      </VStack>
    </Box>
  );
}




export default MyTasks;
