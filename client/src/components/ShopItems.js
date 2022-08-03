import React from 'react';
import {
  Box,
  Text,
  Image,
  Button,
  Heading,
  Grid,
  GridItem,
} from '@chakra-ui/react';

// A single Shop Item
const ShopItem = ({ item, updateCart }) => {
  return (
    <GridItem colSpan='2' w='100%' align='center'>
      <Box backgroundColor='gray.200'>
        <Image src='logo512.png' h={155} p='1rem 0'/>
        <Text fontWeight='bold'>{item.name}</Text>
        <Text fontWeight='lighter'>${item.price_in_cents/100}</Text>
        <Button
          variant='shadow'
          size='sm' 
          mt='15px'
          color='green.500'
          onClick={() => {
            updateCart([item])
          }}>
            Add to Cart
        </Button>
      </Box>
    </GridItem>
  )
}

const ShopItems = ({ setCart, items }) => {

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
    return <ShopItem item={item} key={item.item_id} updateCart={updateCart}/>
  })

  // Displayed to User
  return (
    <Box m='0 auto'>
      <Heading align='center' p='3rem'>JBC Gear</Heading>
      <Grid templateColumns='repeat(4, 1fr)' gap='10' w='80%' m='0 auto'>
        {renderedData}
      </Grid>
    </Box>
  )
}

export default ShopItems;