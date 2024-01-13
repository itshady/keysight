import React from 'react';
import {
  Flex,
  Box,
  HStack,
  Button,
  useBreakpointValue,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Link
} from '@chakra-ui/react';
import { TbSquareAsteriskFilled, TbSquareAsterisk} from "react-icons/tb";
import { FaGoogle } from "react-icons/fa";
import "../styles/tailwind.css"
import HomeIcon from '../HomeIcon';

const HomeNavbar = (toggleColorMode, colorMode, logIn ) => {  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    return (
      <Box width="100vw" height="auto">
        <Box pl="50px" pt="20px">
        <IconButton
            width="100px"
            onClick={scrollToTop}
            as={HomeIcon}
        />
        </Box>
        
      </Box>
    );
  };
  
  export default HomeNavbar;
  