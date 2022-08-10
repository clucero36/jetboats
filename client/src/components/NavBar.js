import React from 'react';
import {
  Box,
  Image,
} from '@chakra-ui/react';
import ShoppingCart from './ShoppingCart';


const NavBar = ({ cart, setCart }) => {

  return (
    <Box p='2rem 0' w='80%' m='0 auto'>
      <Box pb='2rem' align='right'>       
        <ShoppingCart cart={cart} setCart={setCart}/>
      </Box>
      <Image src='jbLogo.jpeg' borderRadius='full'/>
    </Box>
  )
}

export default NavBar;