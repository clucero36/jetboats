import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Text,
  Image,
  Button,
  Heading,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';


// A single Shop Item
const ShopItem = ({ item, updateCart }) => {
  let navigate = useNavigate();
  return (
    <GridItem colSpan='2' w='100%' minW='96px' borderRadius='full' boxShadow='dark-lg'>
      <VStack backgroundColor='orange.100' >
        <Box align='left' w='100%' onClick={() => {
          navigate(`/item-detail?id=${item.item_id}`)
          }}
        >
          <Image src={item.img} borderRadius='md' />
          <Box pl='.25rem'>
            <Text fontWeight='bold'>{item.name}</Text>
            <Text>${item.price_in_cents/100}</Text>
          </Box>
        </Box>
        <Button
          _hover={{backgroundColor: 'black'}}
          backgroundColor='orange.800'
          color='orange.50'
          variant='solid'
          width='100%'
          size='sm' 
          onClick={() => {
            updateCart([item])
          }}>
            Add to Cart
        </Button>
      </VStack>
    </GridItem>
  )
}
 
const ShopItems = ({ items, setCart }) => {

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
    <Box p='1rem 0' backgroundColor='orange.100' borderRadius='xl' m='0 .5rem'>
      <Heading align='center' m='.75rem 0' color='orange.800' fontFamily='Lucida Console'>JBC Gear</Heading>
      <Grid templateColumns='repeat(4, 1fr)' gap='10' w='80%' m='0 auto'>
        {renderedData}
      </Grid>
    </Box>
  )
}

export default ShopItems;