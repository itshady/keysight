import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Center, VStack, Divider, Card, AvatarBadge, Heading, Text,Spacer,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import HomeIcon from '../HomeIcon';
import { MdOutlineLogout, MdSpaceDashboard, MdPlaylistAddCircle, MdOutlineSettingsSuggest  } from "react-icons/md";




const Links = [
  ["Dashboard", MdSpaceDashboard],
  ["Services", MdOutlineSettingsSuggest]
];

const NavLink = ({ children, setTab, icon: Icon }) => (
  <Button
    px={2}
    py={1}
    rounded={"md"}
    size="md"
    textColor="white"
    bgColor="transparent"
    href={"#"}
    leftIcon={<Icon/>}
    onClick={() => setTab(children)}
    _hover={{ bgColor: '#FF8360', textColor: 'white' }}
    justifyContent="flex-start"

  >
    {children}
  </Button>
);

export default function Navbar({
  toggleColorMode,
  colorMode,
  logOut,
  user,
  uid,
  db,
  setTab,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const profilePhoto =
    user.providerData[0] === undefined
      ? "https://avatars.dicebear.com/api/male/username.svg"
      : user.providerData[0].photoURL;

  return (
    <>
      <Box boxShadow="rgba(99, 99, 99, 0.3) 0px 2px 8px 0px" m="3" borderRadius="10px" backgroundColor= "#303036" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)" px={4} width="200px" height="97vh">
        <VStack width="100%" align="left" >
        <IconButton
            mt="5"
            width="90px"
            height="50px"
            as={HomeIcon}
        />
        <Divider mb="5"/>
          <VStack
                as={"nav"}
                spacing={4}
                display={{ base: "flex", md: "flex" }}
                align="left"
              >
                {Links.map((link) => (
                  <NavLink key={link[0]} setTab={setTab} icon={link[1]} textAlign="left">
                    {link[0]}
                  </NavLink>
                ))}
          </VStack>
          <Spacer pt="340"/>
          <Card align="center" as="button" height="160px" shadow="none" bg="#303036">
            <Box p="5">
              <Avatar as="span" name={user.displayName} src={profilePhoto} > <AvatarBadge boxSize='1.25em' bg='green.500' borderColor="#2A2B30" /> </Avatar>
              <Heading textColor="white" fontSize="15px" mt="2">{user.displayName}</Heading>
              <Text fontSize="10px" textColor="whitesmoke" mt="10px">{user.email}</Text>
              <Button
                leftIcon={<MdOutlineLogout />}
                bgColor="#333"
                textColor="#FF8360"
                size="xs"
                borderColor="#FF8360"
                variant="outline"
                onClick={logOut}
                mt="1.5"
                _hover={{ bgColor: '#FF8360', textColor: 'white' }}
              >
                Log Out
              </Button>
            </Box>
          </Card>
        </VStack>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
