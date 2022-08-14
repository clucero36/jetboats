import React from 'react';
import {
  Box,
  Image,
} from '@chakra-ui/react';
import ShoppingCart from './ShoppingCart';

// NavBar Component
// renders shopping cart component & company logo
// ----------------------------------------------------------------
const NavBar = () => {

  return (
    <Box p='2rem 0' w='80%' m='0 auto'>
      <Box pb='2rem' align='right'>       
        <ShoppingCart />
      </Box>
      <Image src='jbLogo.jpeg' borderRadius='full'/>
    </Box>
  )
}

export default NavBar;