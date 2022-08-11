import React, { useContext, useState } from 'react';
import { CartContext } from '../Context';
import { useLocation } from "react-router-dom"
import {
  Box,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import ShoppingCart from '../components/ShoppingCart';


const ItemDetail = () => {
  const {setCart} = useContext(CartContext);
  const location = useLocation();
  const item = location.state.item;
  const [size, setSize] = useState()


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

  console.log(size);

  return (
    <Box>
      <Box w='95%' align='right' m='2rem auto' pos='absolute'>
        <ShoppingCart />
      </Box>
      <VStack direction='column' spacing={-5} maxW='50rem'>
        <Image src={item.img} />
        <Box w='100%' backgroundColor='white' borderRadius='2xl' p='1rem'>
          <VStack w='100%' spacing={25}>
            <Text color='orange.800' fontWeight='bold'>Item Details</Text>
            <RadioGroup size='md' colorScheme='green' onChange={setSize} value={size}>
              <HStack direction='row' spacing={45}>
              {
                item.sizes.map((itemSize) => {
                  return <Radio key={itemSize} value={itemSize}>{itemSize}</Radio>
                })
              }
              </HStack>
            </RadioGroup>
            <Text fontWeight='25'>JBC {item.name}</Text>
            <Text>${item.price_in_cents/100}</Text>
            <Text>100% Cotton & Manufactured in the USA</Text>
            <Button
              _hover={{backgroundColor: 'black'}}
              backgroundColor='orange.800'
              color='orange.50'
              variant='solid'
              width='100%'
              size='sm' 
              onClick={() => {
                updateCart([item])
              }}
            >
                Add to Cart
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

export default ItemDetail;