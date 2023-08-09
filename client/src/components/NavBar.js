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
    <Box p='2rem 0' w='80%' m='0 auto' minH='250px'>
      <Box align='right'>       
        <ShoppingCart />
      </Box>
      <Image src='jbLogo.jpeg' borderRadius='full' boxSize={['100%', '75%','75%', '65%', '30%']} m='0 auto' />
    </Box>
  )
}

export default NavBar;