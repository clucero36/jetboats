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


// ShopItems Component
// renders all items being sold. 
// --------------------------------------------------------------------------------------------------------------
const ShopItems = ({ items }) => {
  
  // Array of ShopItems
  const renderedShopItems = items.map((item) => {
    return (
      <ShopItem 
        item={item} 
        key={item.item_id} 
      />
    )
  })

  // Displayed to User
  return (
    <Box p='1rem 0' backgroundColor='orange.100' borderRadius='xl' m='0 .5rem'>
      <Heading align='center' m='.75rem 0' color='orange.800' fontFamily='Lucida Console'>JBC Gear</Heading>
      <Grid templateColumns='repeat(2, 1fr)' gap='10' w={['80%','80%','80%', '50%']} m='0 auto'>
        {renderedShopItems}
      </Grid>
    </Box>
  )
}
export default ShopItems;


// ShopItem Component
// renders a single item card
// users are displayed an item image, price, name, & button to navigate to item details pagee
// --------------------------------------------------------------------------------------------------------------
const ShopItem = ({ item }) => {
  let navigate = useNavigate(); // hook allows user to navigate through different pages of th application

  // toDetail() sends user to item-data page & provides item as state
  const toDetail = () => {
    navigate('/item-detail', {state: {item: item}});
  }

  return (
    <GridItem colSpan='2' w={['100%', '100%', '100%', '70%']} minW='96px' borderRadius='full' boxShadow='dark-lg' m='0 auto'>
      <VStack backgroundColor='orange.100' >
        <Box align='left' w='100%'>
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
          onClick={toDetail}>
            Item Details
        </Button>
      </VStack>
    </GridItem>
  )
}
 
