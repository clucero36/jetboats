import React from 'react';
import {
  Box,
  Image,
} from '@chakra-ui/react';
import ShoppingCart from './ShoppingCart';


const NavBar = () => {

  return (
    <Box p='2rem 0' w='80%' m='0 auto'>
      <Box w='100%' pb='2rem' align='right'>       
        <ShoppingCart />
      </Box>
      <Image src='jbLogo.jpeg' borderRadius='full'/>
    </Box>
  )
}

export default NavBar;