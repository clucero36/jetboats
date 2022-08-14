import React, { useState, useEffect, useContext } from 'react';
import {CartContext} from '../Context';
import {
  Button,
  Text,
  Box,
  Flex,
  VStack,
  HStack,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import { IoCartOutline } from "react-icons/io5";

// Shopping Cart Component
// Renders a toggleable drawer where:
// users can view the product, size, & quantity of items they desire to purchase. 
// users can checkout or they can clear their cart.
// ---------------------------------------------------------------------------------------------------------------------------------------------------
const ShoppingCart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure() // chakra ui custom hook used to toggle shopping cart
  const {cart, setCart} = useContext(CartContext);    // global state keeps track of users shopping cart 
  const [total, setTotal] = useState(0)               // total items in cart

  useEffect(() => {
    let sum = 0;
    cart.forEach((cItem) => {
      sum += cItem.quantity;
    })
    setTotal(sum)
  }, [cart])

  // Sends cart contents to cloud function in exchange for a checkout url
  async function onCheckout() {
    const response = await fetch('https://us-central1-fir-web-2d06c.cloudfunctions.net/createCheckoutSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cart: cart})
    });
    
    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`
      window.alert(message);
      return;
    }

    let session_url = await response.json();
    window.location = session_url.url;
  }

  console.log(cart);

  return (
    <>
      <Button onClick={onOpen} rightIcon={<IoCartOutline />} size='sm' backgroundColor='orange.100'>
        <Text color='orange.800'>{total}</Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size='xs'
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor='orange.50'>
          <DrawerCloseButton />
          <DrawerBody >
            <Text m='4rem 0 1.75rem 0' align='center' color='orange.800' fontWeight='bold' fontSize='xl'>Cart</Text>
            {
              cart.length !== 0 
              ? 
              <Box mb='2rem'>
                <HStack>
                  <Text>Product: Size</Text>
                  <Spacer />
                  <Text>Quantity</Text>
                </HStack>
                <Divider />
              </Box>
              : <span></span>
            }
            {
              cart.length !== 0 
              ?
              cart.map((cItem, index) => {
                return (
                  <Box m='1rem 0' key={index}>
                    <Flex justify='space-between' mt='10px'>
                      <HStack>
                        <Text color='orange.900'>{cItem.name}:</Text>
                        <Text color='orange.900'>{cItem.purchaseSize}</Text>
                      </HStack>
                      <Text color='orange.900'> x{cItem.quantity}</Text>
                    </Flex>
                  </Box>            
                )
              })
              : 
              <Text align='left'>No Items in Cart</Text>
            }
          </DrawerBody>
          <DrawerFooter>
            { 
              cart.length !== 0 
              ?
              <VStack w='100%' spacing={5}>
                <Button w='100%' variant='outline' borderColor='green.500' color='green.500'  onClick={onCheckout} size='sm' mt='.5rem'>Checkout</Button> 
                <Button w='100%' variant='outline' borderColor='red.500' color='red.500' onClick={() => setCart([])} size='sm' mt='.5rem'>Clear Cart</Button>
              </VStack> 
              : <span></span>
            }
          </DrawerFooter>
        </DrawerContent>
      </Drawer>    
    </>
  )
}

export default ShoppingCart;