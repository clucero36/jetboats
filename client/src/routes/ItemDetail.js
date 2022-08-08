import React from 'react';
import { useSearchParams } from "react-router-dom"
import {
  Box,
  Text,
} from '@chakra-ui/react';
import NavBar from '../components/NavBar';

const ItemDetail = () => {
  const [searchParams] = useSearchParams();
  const item_id = searchParams.get('id');
  console.log(item_id)

  return (
    <Box>
      <NavBar />
      <Text>Item Detail</Text>
    </Box>
  )
}

export default ItemDetail;