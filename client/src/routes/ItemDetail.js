import React, { useContext, useState } from 'react';
import { CartContext } from '../Context';
import { useLocation, useNavigate } from "react-router-dom"
import {
  Box,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import { IoArrowBack } from "react-icons/io5";
import ShoppingCart from '../components/ShoppingCart';


const ItemDetail = () => {
  const {setCart} = useContext(CartContext);
  const location = useLocation();
  const item = location.state.item;
  const [size, setSize] = useState(null)
  let navigate = useNavigate();


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

  return (
    <Box>
      <Box w='100%' align='right' m='2rem auto' pos='absolute'>
        <HStack w='100%' p='0 1rem'>
          <IconButton 
            onClick={() => {navigate(-1)}}
            icon={<IoArrowBack />}
            size='sm'
            backgroundColor='orange.100'
          >
          </IconButton>
          <Spacer />
          <ShoppingCart />
        </HStack>
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
            <VStack align='left' w='100%'>
              <Text fontWeight='25'>JBC {item.name}</Text>
              <Text>${item.price_in_cents/100}</Text>
              <Text>100% Cotton & Manufactured in the USA</Text>
            </VStack>
            {
              size !== null ? (
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
              ) : (
                <Button
                  _hover={{backgroundColor: 'red'}}
                  backgroundColor='gray'
                  color='red.800'
                  variant='solid'
                  width='100%'
                  size='sm' 
                >
                  Select Size to Add to Cart
                </Button>
              )


            }
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

export default ItemDetail;