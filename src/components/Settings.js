import { Box, Text, Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  onValue,
  off,
  get,
  child,
} from "firebase/database";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input, VStack, Heading, HStack, 
} from "@chakra-ui/react";
import Invites from "./Invites.js";
import Members from "./Members.js";
import "../App.css";

function Settings({ user, uid, db }) {
  const [group, setGroup] = useState(null);
  const [inputInviteMember, setInputInviteMember] = useState("");
  const [inputTeamName, setInputTeamName] = useState("");

  const generateGroup = async () => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "users/" + uid + "/group"));
    if (!snapshot.exists() || snapshot.val() == "none") {
      const newUID = uuidv4();
      set(ref(db, "users/" + uid + "/group"), newUID);
      set(ref(db, "groups/" + newUID), {
        name: inputTeamName,
        users: [
          {
            uid: uid,
            userName: user.displayName,
          },
        ],
      });
      setGroup(newUID);
    }
    // console.log(snapshot.val());
    // console.log(group);
  };

  const inviteMember = async () => {
    set(ref(db, "invites/" + inputInviteMember.replaceAll(".", " ")), [
      {
        invitee: inputInviteMember.replaceAll(".", " "),
        inviter: user.displayName,
        group: group,
        groupName: inputTeamName,
      },
    ]);
    setInputInviteMember("");
  };

  const leaveGroup = async () => {
    const dbRef = ref(db);
    // const snapshot = await get(child(dbRef, "users/" + uid + "/group"));
    const snapshot = await get(child(dbRef, "groups/" + group + "/users"))
    set(ref(db, "users/" + uid + "/group"), "none");
    const uidToRemove = uid;
    if (snapshot.exists()) {
      const newArrWithRemovedUser = snapshot.val().filter(obj => obj.uid !== uidToRemove);
      set(ref(db, "groups/" + group + "/users"), newArrWithRemovedUser);
    }
    
    setGroup(null);
    // console.log(snapshot.val());
    // console.log(group);
  };

  useEffect(() => {
    getGroup();
  }, []);

  const getGroup = async () => {
    onValue(ref(db, "users/" + uid + "/group"), (snapshot) => {
      if (snapshot.exists() && snapshot.val() != "none") {
        setGroup(snapshot.val());
      } else setGroup(null);
    });
  };

  const handleInputChangeTeamName = (e) => setInputTeamName(e.target.value);
  const handleInputChangeInviteMember = (e) =>
    setInputInviteMember(e.target.value);

  return (
    <Box w="83%">
      <VStack align="flex-start" w="100%">
      <Box  width="100%" height="67vh"boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" mx="0" mb="3" mt="3" borderRadius="10px" backgroundColor= "#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4} > 
      <Box p="5">
      <Heading textColor="white" pb="2.5" fontSize="40px">Settings</Heading>
      <HStack mt="5">
      {group ? (
        <Box w="100%">
            <Input type="email" value={inputInviteMember} onChange={handleInputChangeInviteMember} height="40px" width="90%"  textColor="white" placeholder="Email Address" p="2" fontSize="10px" focusBorderColor="#FF8360" />
            <Button ml="3" bgColor="#333" textColor="#FF8360" borderColor="#FF8360" _hover={{ bgColor: '#FF8360', textColor: 'white' }} onClick={leaveGroup} variant="outline" height="40px" fontSize="10px">
              Leave 
            </Button>
          <Members user={user} uid={uid} db={db}></Members>
        </Box>
      ) : (
        <Box w="100%">
          <Input type="text" value={inputTeamName} onChange={handleInputChangeTeamName} height="40px" width="90%"  textColor="white" placeholder="Create a Team Name" p="2" fontSize="10px" focusBorderColor="#FF8360"/>
          <Button ml="3" bgColor="#333" textColor="#FF8360" borderColor="#FF8360" _hover={{ bgColor: '#FF8360', textColor: 'white' }}      onClick={generateGroup} variant="outline" height="40px" fontSize="10px">
              Create 
            </Button>
          <Box>
            <Invites user={user} uid={uid} db={db}></Invites>
          </Box>
        </Box>
      )}

        
        
      </HStack>
      </Box>
      </Box>
      </VStack>

    </Box>
  );
}

export default Settings;
