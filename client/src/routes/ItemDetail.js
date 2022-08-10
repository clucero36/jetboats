import React, { useContext } from 'react';
import { CartContext } from '../Context';
import { useLocation } from "react-router-dom"
import {
  Box,
  Text,
} from '@chakra-ui/react';
import ShoppingCart from '../components/ShoppingCart';


const ItemDetail = () => {
  const {cart, setCart} = useContext(CartContext);
  const location = useLocation();
  console.log(location);
  console.log(cart);

  return (
    <Box backgroundColor='orange.50' h='100vh'>
      <Box w='80%' m='0 auto' align='right' p='2rem 0'>
        <ShoppingCart cart={location.state.cart} setCart={setCart} />
      </Box>
      <Text>Item Detail</Text>
    </Box>
  )
}

export default ItemDetail;