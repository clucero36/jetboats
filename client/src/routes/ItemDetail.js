import { useSearchParams } from "react-router-dom"
import {
  Box,
  Text,
} from '@chakra-ui/react';
import ShoppingCart from '../components/ShoppingCart';

const ItemDetail = () => {
  const [searchParams] = useSearchParams();
  const item_id = searchParams.get('id');

  return (
    <Box backgroundColor='orange.50' h='100vh'>
      <Box w='80%' m='0 auto' align='right' p='2rem 0'>
        <ShoppingCart />
      </Box>
      <Text>Item Detail</Text>
      <Text>{item_id}</Text>
    </Box>
  )
}

export default ItemDetail;