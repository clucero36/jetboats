import React from 'react';
import { useSearchParams } from "react-router-dom"
import {
  Box,
} from '@chakra-ui/react';
import NavBar from '../components/NavBar';

const ItemDetail = () => {

  const item_id = searchParams.get('id');
  console.log(item_id)

  return (
    <Box>
      <NavBar />
    </Box>
  )
}

export default ItemDetail;