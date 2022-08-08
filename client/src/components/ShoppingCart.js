import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../Context';
import {
  Button,
  Text,
  Box,
  Flex,
  VStack,
  Heading,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { IoCartOutline } from "react-icons/io5";


const ShoppingCart = () => {
  const {cart, setCart} = useContext(CartContext)
  const [total, setTotal] = useState(0)
  const btnRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // hook finds the total items in cart
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

  return (
    <>
      <Button onClick={onOpen} ref={btnRef} rightIcon={<IoCartOutline />} size='sm'>
        <Text color='green.500'>{total}</Text>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='xs'
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor='gray.200'>
          <DrawerCloseButton />
          <DrawerBody >
            <Text size='lg' m='1rem 0' align='center'>Cart</Text>
            <Heading size='md' m='4rem 0'>Product List</Heading> 
            {
              cart.length !== 0 
              ?
              cart.map((cItem) => {
                return (
                  <Box m='1rem 0' key={cItem.item_id}>
                    <Flex justify='space-between' mt='10px'>
                      <Text>{cItem.name}</Text>
                      <Text> x{cItem.quantity}</Text>
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