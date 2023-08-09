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

// ItemDetail Page
//
// users view, in detail, a single shop item & are able to add to their cart. 
// ---------------------------------------------------------------------------------------------------------------------------------------------------
const ItemDetail = () => {

  const {setCart} = useContext(CartContext);  // global state function used to set cart data 
  const location = useLocation();             // location object used to access state from ShopItems component
  const item = location.state.item;
  const [size, setSize] = useState(null)      // size of item to be purchased
  let navigate = useNavigate();               // hook allows user to navigate through different pages of the application


  // When a user adds an item to their cart this function will be invoked
  // -we create a deep copy of the item to be added to the cart & set its purchase size(sm, md, etc..)
  // -if we find an item in the cart w/ the same name & same size, a shallow copy of the matching cart item is made & we add 1 to it's quantity field.
  // -otherwise we push the deep copy into the cart.
  // *we require deep copies of shopItem objects to be pushed into the cart so cartItems dont don't reference shopItems*
  function updateCart(value) {
    let pItem = JSON.parse(JSON.stringify(value[0]));
    pItem.purchaseSize = size;
    return setCart((prev) => {
      let matchingItem = [...prev].find((item) => 
        item.name === pItem.name && item.purchaseSize === pItem.purchaseSize
      )
      if (matchingItem) {
        matchingItem.quantity += 1;
        return [...prev]
      }
      return [...prev].concat(pItem)
    })
  }

  return (
    <Box backgroundColor='orange.50' h='100vh'>
      <Box w='100%' m='2rem auto' pos='absolute'>
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
      <Box backgroundColor='orange.50' pt={['1.75rem', '1.75rem', '4rem']} h='100%'>
        <VStack direction='column' m='0 auto' maxW='488' boxShadow='xl'  spacing={-7}>
          <Image src={item.img}/>
          <Box w='100%' backgroundColor='orange.50' borderRadius='2xl' >
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
              <VStack align='left' w='95%'>
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
    </Box>
  )
}

export default ItemDetail;