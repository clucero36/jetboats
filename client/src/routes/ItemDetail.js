import React, { useContext } from 'react';
import { useSearchParams } from "react-router-dom"
import { CartContext } from '../Context';
import {
  Box,
  Text,
  HStack,
  VStack,
} from '@chakra-ui/react';
import NavBar from '../components/NavBar';

const ItemDetail = () => {

  const {setCart} = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const item_id = searchParams.get('id');
  console.log(item_id)

  return (
    <Box>
      <NavBar />
    </Box>
  )
}

export default ItemDetail;