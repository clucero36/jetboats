import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Image,
  Button,
  Text,
  Divider,
  HStack,
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


const NavBar = ({ cart, setCart }) => {

  const [total, setTotal] = useState(0)
  const btnRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()


  // hook finds the total items in cart on startup & each update of cart
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
    <Box p='2rem 0' w='80%' m='0 auto'>
      <Flex justifyContent='space-between' align='center' > 
        <Image src='logo192.png' w={12} h={12} />
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
              <Heading size='lg' m='5rem 0' align='center'>Your Cart</Heading>
              {
                cart.length !== 0 
                ? 
                cart.map((cItem) => {
                  return (            
                    <Flex key={cItem.item_id} justify='space-between' mt='10px'>
                      <Text>
                        {cItem.name}
                      </Text>
                      <HStack>
                        <Divider orientation='vertical'/>
                        <Text>
                          x{cItem.quantity}
                        </Text>
                      </HStack>
                    </Flex>
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
      </Flex>
    </Box>
  )
}

export default NavBar;