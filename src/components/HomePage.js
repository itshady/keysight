import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Link,
  Text, 
  Flex,
  Spacer, 
  Divider,
  Card,
  Input, 
  Image,
  useColorMode,
  Avatar, AvatarBadge, AvatarGroup, IconButton, Icon
} from "@chakra-ui/react";
import { FaGoogle, FaDotCircle, FaAmazon, FaFedex, FaUps, FaMedium, FaCheckSquare, FaGift, FaGithub } from "react-icons/fa";
import HomeNavbar from './HomeNavbar'
import dots from "../styles/dot_static.png"
import { SiUbereats, SiDoordash, SiPostmates,SiDevpost    } from "react-icons/si";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { TbBrandWalmart } from "react-icons/tb";
import { IoIosExit } from "react-icons/io";
import graph from "../styles/mock_graph.png";
import './Home.css'

function HomePage({ user, uid, db, logIn }) {
  return (
    <VStack backgroundColor="#30323D">
      <VStack width="100vw" height="100vh" backgroundImage={dots} sstyle={{ backdropFilter: 'blur(0px)' }}>
        <HomeNavbar logIn={logIn} width="100%" height="10vh"/>
        <HStack width="100%" height="90vh">
            <Box padding={10} width="45%" height="100%">
            <Heading textColor="white" pb="5" fontFamily="Arial" fontSize="60px">
              Smart-Security access <br />
              all in a{" "}
              <Text as="span" color="#FF8360" textDecoration="underline">
                sight
              </Text>
            </Heading>
              <Text textColor="white" pb="2.5" width="100%">
                A face-recognition based home security app that lets you track deliveries in real-time, monitor your front door with a live feed, and receive instant alerts whenever someone approaches.                  
              </Text>
              <Card width="100%" height="auto"  boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" borderRadius="5px" backgroundColor= "rgba(40, 40, 40, 0.57)" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)">
              {/* <FaDotCircle style={{ position: 'absolute', color: 'green', top: '45px', left: '55px', zIndex: '9' }} /> */}
                <HStack pl="5" pt="2.5" pb="2.5" spacing="5" width="100%">
                <Avatar as="span" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' > <AvatarBadge boxSize='1.25em' bg='green.500' borderColor="#2A2B30" /> </Avatar>
                <VStack width="100%" textAlign="left" align="left">
                  <Text textColor="white" align="left">
                    <strong>Uber Eats</strong>
                  </Text>
                  <Text textColor="white" align="left">
                    👋 Hi, Your delivery is at the door!
                  </Text>
                </VStack>
                </HStack>
              </Card>
              <Button
              leftIcon={<FaGoogle />}
              bgColor="#333"
              textColor="#FF8360"
              borderColor="#FF8360"
              variant="outline"
              onClick={logIn}
              mt="2.5"
              _hover={{ bgColor: '#FF8360', textColor: 'white' }}
            >
              Continue with Google
            </Button>
            </Box>
            <Box height="100%" width="550px">
              <VStack>
              <Card width="550px" height="390px" borderRadius="5px" boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" backgroundColor= "rgba(40, 40, 40, 0.57)" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)">
                  <Box p="5">
                    <Heading textColor="white" fontSize="20px" >
                      Your House
                    </Heading>
                    <Text textColor="whitesmoke" fontSize="12px" pt="1.5">
                      Invite and manage your house members.
                    </Text>
                    <HStack mt="5">
                    <Input height="20px" width="90%"  textColor="white" placeholder="Email Address" p="2" fontSize="10px" focusBorderColor="#FF8360" />
                    <Button colorScheme="blue" variant="outline" height="20px" fontSize="10px">
                      Invite 
                    </Button>
                    </HStack>
                    <HStack pt="5" width="100%">
                      <Avatar as="span" size="sm" name='Hady Ibrahim' src='https://media.licdn.com/dms/image/D4D03AQFLKhsoYqNtGg/profile-displayphoto-shrink_400_400/0/1693440495978?e=1710374400&v=beta&t=xFKHX2RxlEM-7nkHJTZcMTPuOG5AXZcaoIlAIukML4Q' />
                      <Link href="https://www.linkedin.com/in/hady-ibrahim/" isExternal _hover={{ color: "blue.500", textDecoration: "underline" }}>
                        <Text textColor="blue.500" fontSize="12px">
                          Hady Ibrahim
                        </Text>
                      </Link>
                      <Text textColor="whitesmoke" fontSize="12px" pl="10">hadyib007@gmail.com</Text>
                      <Spacer /> {/* Add a Spacer to push the IconButton to the right */}
                      <IconButton colorScheme="whiteAlpha" height="30px" size="sm" icon={<HiOutlineDotsHorizontal />} />
                    </HStack>
                    <Divider pt="2.5" />
                    <HStack pt="2.5" width="100%">
                      <Avatar as="span" size="sm" name='Himanshu Singh' src='https://media.licdn.com/dms/image/D5603AQGiaQ5I2i9klQ/profile-displayphoto-shrink_400_400/0/1694458519929?e=1710374400&v=beta&t=DNm_fbJVf-WWFlUweDOfyvQ1LrUYVr7yuEkgI9faC-E' />
                      <Link href="https://www.linkedin.com/in/himanshu-singh-99470b207/" isExternal _hover={{ color: "blue.500", textDecoration: "underline" }}>
                        <Text textColor="blue.500" fontSize="12px">
                        Himanshu Singh
                        </Text>
                      </Link>
                      <Text textColor="whitesmoke" fontSize="12px" pl="25px">himanshuv.singh3@gmail.com</Text>
                      <Spacer /> {/* Add a Spacer to push the IconButton to the right */}
                      <IconButton colorScheme="whiteAlpha" height="30px" size="sm" icon={<HiOutlineDotsHorizontal />} />
                    </HStack>
                    <Divider pt="2.5" />
                    <HStack pt="2.5" width="100%">
                      <Avatar as="span" size="sm" name='Varun Kothandaraman' src='https://media.licdn.com/dms/image/D5603AQGqA72L41YH2g/profile-displayphoto-shrink_400_400/0/1676932335192?e=1710374400&v=beta&t=SgoQOWR0EcDyOUSVCu2dLpDuZcNLUjspe_7nX-Z4TFE' />
                      <Link href="https://www.linkedin.com/in/varun-ram/" isExternal _hover={{ color: "blue.500", textDecoration: "underline" }}>
                        <Text textColor="blue.500" fontSize="12px">
                        Varun Ram
                        </Text>
                      </Link>
                      <Text textColor="whitesmoke" fontSize="12px" pl="55px">vram227@gmail.com</Text>
                      <Spacer /> {/* Add a Spacer to push the IconButton to the right */}
                      <IconButton colorScheme="whiteAlpha" height="30px" size="sm" icon={<HiOutlineDotsHorizontal />} />
                    </HStack>
                    <Divider pt="2.5" />
                    <HStack pt="2.5" width="100%">
                      <Avatar as="span" size="sm" name='Mubashir Ansari' src='https://media.licdn.com/dms/image/D5603AQFv3gAszWTGlA/profile-displayphoto-shrink_400_400/0/1674004864570?e=1710374400&v=beta&t=VSHTLLbWsTRJ1aYRfe1d8hPPzKa4_UW3X7Fx2oBLsSw' />
                      <Link href="https://www.linkedin.com/in/mubashirza/" isExternal _hover={{ color: "blue.500", textDecoration: "underline" }}>
                        <Text textColor="blue.500" fontSize="12px">
                        Mubashir Ansari
                        </Text>
                      </Link>
                      <Text textColor="whitesmoke" fontSize="12px" pl="25px">mubashirza.2216@gmail.com (Dm if you need an intern)</Text>
                      <Spacer /> {/* Add a Spacer to push the IconButton to the right */}
                      <IconButton colorScheme="whiteAlpha" height="30px" size="sm" icon={<HiOutlineDotsHorizontal />} />
                    </HStack>
                    <Divider pt="2.5" />
                    <HStack pt="2.5" width="100%">
                      <Avatar as="span" size="sm" name='Neal Sadana' src='https://media.licdn.com/dms/image/C5603AQGNjiM3mw6sLw/profile-displayphoto-shrink_400_400/0/1663643018395?e=1710374400&v=beta&t=sfTVuOiBNVmAIGEHxNFzbIhyYEksnqsQF_-aK3Wq3hk' />
                      <Link href="https://www.linkedin.com/in/nealsadana/" isExternal _hover={{ color: "blue.500", textDecoration: "underline" }}>
                        <Text textColor="blue.500" fontSize="12px">
                        Neal Sadana
                        </Text>
                      </Link>
                      <Text textColor="whitesmoke" fontSize="12px" pl="45px">mnealsadana@gmail.com</Text>
                      <Spacer /> {/* Add a Spacer to push the IconButton to the right */}
                      <IconButton colorScheme="whiteAlpha" height="30px" size="sm" icon={<HiOutlineDotsHorizontal />} />
                    </HStack>
                  </Box>
                  
              </Card>
              </VStack>

              <Card width="550px" height="240px" mt="5" boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" borderRadius="5px" backgroundColor= "rgba(40, 40, 40, 0.57)" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)">
              <Box p="5">
                    <Heading textColor="white" fontSize="20px" >
                      Overview
                    </Heading>
                    <Text textColor="whitesmoke" fontSize="12px" pt="1.5">
                      This has what has been going on in your house this week.
                    </Text>
                    <Image src={graph} height="150" pt="2"/>
                    
                  </Box>
              </Card>
            </Box>
            <Box height="100%" width="270px" overflow="hidden">
            <Card width="270px" height="210px" boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" borderRadius="5px" backgroundColor= "rgba(40, 40, 40, 0.57)" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)">
              <Box p="5">
                    <Heading textColor="white" fontSize="20px" >
                      Delivery
                    </Heading>
                    <Text textColor="whitesmoke" fontSize="12px" pt="1.5">
                      Easily check-in your deliveries.
                    </Text>
                    <Flex flexWrap="wrap" >
                    <IconButton size="lg" icon={<FaAmazon  />} bgColor="#333" textColor="#FF8360" borderColor="#FF8360" variant="outline" mt="2.5" _hover={{ bgColor: '#FF8360', textColor: 'white' }}/>
                    <IconButton size="lg" ml="2.5" icon={<FaFedex   />} bgColor="#333" textColor="#FF8360" borderColor="#FF8360" variant="outline" mt="2.5" _hover={{ bgColor: '#FF8360', textColor: 'white' }}/>
                    <IconButton size="lg" ml="2.5" icon={<SiUbereats    />} bgColor="#333" textColor="#FF8360" borderColor="#FF8360" variant="outline" mt="2.5" _hover={{ bgColor: '#FF8360', textColor: 'white' }}/>
                    <IconButton size="lg" ml="2.5" icon={<FaUps    />} bgColor="#333" textColor="#FF8360" borderColor="#FF8360" variant="outline" mt="2.5" _hover={{ bgColor: '#FF8360', textColor: 'white' }}/>
                    <IconButton size="lg" ml="" icon={<SiDoordash     />} bgColor="#333" textColor="#FF8360" borderColor="#FF8360" variant="outline" mt="2.5" _hover={{ bgColor: '#FF8360', textColor: 'white' }}/>
                    <IconButton size="lg" ml="2.5" icon={<TbBrandWalmart      />} bgColor="#333" textColor="#FF8360" borderColor="#FF8360" variant="outline" mt="2.5" _hover={{ bgColor: '#FF8360', textColor: 'white' }}/>
                    <IconButton size="lg" ml="2.5" icon={<SiPostmates       />} bgColor="#333" textColor="#FF8360" borderColor="#FF8360" variant="outline" mt="2.5" _hover={{ bgColor: '#FF8360', textColor: 'white' }}/>
                    <IconButton size="lg" ml="2.5" icon={<FaMedium        />} bgColor="#333" textColor="#FF8360" borderColor="#FF8360" variant="outline" mt="2.5" _hover={{ bgColor: '#FF8360', textColor: 'white' }}/>

                    </Flex>
                    
                    
                  </Box>
              </Card>
              <Card width="270px" mt="5" height="300px" boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" borderRadius="5px" backgroundColor= "rgba(40, 40, 40, 0.57)" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)">
              <Box p="5">
                    <Heading textColor="white" fontSize="20px" >
                      Punch In
                    </Heading>
                    <Text textColor="whitesmoke" fontSize="12px" pt="1.5">
                      Easily clock-in to work.
                    </Text>
                    <Divider mt="2" mb="2" />
                    <FaCheckSquare  style={{ position: 'absolute', color: 'green', top: '135px', left: '55px', zIndex: '9' }} />
                    <HStack pl="0" pb="2.5" spacing="5" width="100%">
                    <Avatar as="span" name='Kelsey Smart' src='https://media.licdn.com/dms/image/D5603AQFRUt2KdlMwkw/profile-displayphoto-shrink_400_400/0/1691714748246?e=1710374400&v=beta&t=cZK-VgBhR6858mLYJ9_IohlSpjtMN9Md09v05cb9QYY' />
                    <VStack width="100%" textAlign="left" align="left">
                      <Text textColor="white" align="left">
                        <strong>Clock-in</strong>
                      </Text>
                      <Text textColor="white" align="left">
                        You have successfully checked into work!
                      </Text>
                    </VStack>
                    </HStack>
                    <Divider mt="2" mb="2" />
                    <IoIosExit size="20px"  style={{ position: 'absolute', color: 'orange', top: '240px', left: '50px', zIndex: '9' }} />
                    <HStack pl="0" pb="2.5" spacing="5" width="100%">
                    <Avatar as="span" name='Giulia Morris-Cefis' src='https://media.licdn.com/dms/image/D5603AQG_vMc4sw_0wg/profile-displayphoto-shrink_400_400/0/1705007991766?e=1710374400&v=beta&t=4DAuRXcyRdcWzwhSYAvb8TfYm0tXEiaWMFpsrcVnfsM' />
                    <VStack width="100%" textAlign="left" align="left">
                      <Text textColor="white" align="left">
                        <strong>Clock-out</strong>
                      </Text>
                      <Text textColor="white" align="left">
                        Have a nice rest of your day.
                      </Text>
                    </VStack>
                    </HStack>
                  </Box>
              </Card>
              <Card width="270px" mt="5" height="100px" boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" borderRadius="5px" backgroundColor= "rgba(40, 40, 40, 0.57)" backdropBlur="50px" border="2px" borderColor="rgba(235, 235, 235, 0.15)">
              <Box p="5">
                    <Heading textColor="white" fontSize="20px" >
                      More Info
                    </Heading>
                    <Button size="sm" leftIcon={<SiDevpost/>} bgColor="#333" textColor="#FF8360" borderColor="#FF8360" variant="outline" mt="2" _hover={{ bgColor: '#FF8360', textColor: 'white' }}>
                      Devpost
                    </Button>
                    <Button size="sm" leftIcon={<FaGithub/>} ml="2" bgColor="#333" textColor="#FF8360" borderColor="#FF8360" variant="outline" mt="2" _hover={{ bgColor: '#FF8360', textColor: 'white' }}>
                      Github
                    </Button>
                    
                  </Box>
              </Card>
            </Box>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default HomePage;