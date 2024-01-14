import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Tooltip,
  IconButton,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import "./Home.css";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import MyTasks from "./MyTasks";
import GroupTasks from "./GroupTasks";
import Settings from "./Settings";

function Home({ user, uid, db, logOut }) {
  const [tab, setTab] = useState("Dashboard");
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
<Box w="full">
  <HStack h="100%" align="flex-start" justify="flex-start">
    <Navbar
      toggleColorMode={toggleColorMode}
      colorMode={colorMode}
      logOut={logOut}
      user={user}
      uid={uid}
      db={db}
      setTab={setTab}
    ></Navbar>
    {tab === "Dashboard" ? (
      <MyTasks user={user} uid={uid} db={db} />
    ) : tab === "Members" ? (
      <GroupTasks user={user} uid={uid} db={db} />
    ) : (
      <Settings user={user} uid={uid} db={db} />
    )}
  </HStack>
</Box>

  );
}

export default Home;
