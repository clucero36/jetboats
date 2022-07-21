import React from 'react';
import { Link as routerLink } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  VStack,
  Button,
  HStack,
  Heading,
  Divider,
  Link,
} from '@chakra-ui/react';

// A single Shop Item
const ShopItem = ({ item, updateCart }) => {
  return (
    <Box shadow='dark-lg' p='2rem' borderRadius='md'>
      <HStack>
        <Image src='logo512.png' w={125}/>
        <VStack w='12rem' spacing={1} align='left' pl='.5rem'>
          <Text>{item.name}</Text>
          <Text>${item.price_in_cents/100}</Text>
          <Divider />
          <HStack>
            <Button
              size='sm' 
              h={39.9} 
              variant='outline' 
              onClick={() => {
                updateCart([item])
              }}>
                Add to Cart
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
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
    <>
      <Heading align='center' pt='3rem'>Shop</Heading>
      <VStack spacing='2.25rem' mt='2rem'>
        {renderedData}
        <Link as={routerLink} to='/contact' size='sm'><Button>Contact</Button></Link> 
      </VStack>
    </>
  )
}

export default ShopItems;