import React, { useContext } from 'react';
import { CartContext } from '../Context';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  Image,
  Button,
  Heading,
  Grid,
  GridItem,
  VStack
} from '@chakra-ui/react';


// A single Shop Item
const ShopItem = ({ item, updateCart }) => {
  let navigate = useNavigate();
  return (
    <GridItem colSpan='2' w='100%' align='center' minW='96px' >
      <VStack backgroundColor='gray.200'>
        <Box w='100%' onClick={() => {
          navigate(`/item-detail?id=${item.item_id}`)
          }}
        >
          <Image src={item.img} />
          <Text fontWeight='bold'>{item.name}</Text>
          <Text fontWeight='lighter'>${item.price_in_cents/100}</Text>
        </Box>
        <Button
          variant='solid'
          width='100%'
          size='sm' 
          mt='15px'
          color='green.500'
          onClick={() => {
            updateCart([item])
          }}>
            Add to Cart
        </Button>
      </VStack>
    </GridItem>
  )
}
 
const ShopItems = ({ items }) => {

  const {setCart} = useContext(CartContext)

  // This function will be passed as a prop to each shop item.
  // When a user adds an item to their cart this function will be invoked
  function updateCart(value) {
    return setCart((prev) => {
      let matchingItem = [...prev].find((item) => item.item_id === value[0].item_id)
      if (matchingItem) {
        matchingItem.quantity +=1;
        return [...prev]
      }
      return [...prev].concat(value)
    })
  }
  
  // Array of ShopItems
  const renderedData = items.map((item) => {
    return (
      <ShopItem 
        item={item} 
        key={item.item_id} 
        updateCart={updateCart} 
      />
    )
  })

  // Displayed to User
  return (
    <Box p='1rem 0'>
      <Heading align='center' m='.75rem 0'>JBC Gear</Heading>
      <Grid templateColumns='repeat(4, 1fr)' gap='10' w='80%' m='0 auto'>
        {renderedData}
      </Grid>
    </Box>
  )
}

export default ShopItems;