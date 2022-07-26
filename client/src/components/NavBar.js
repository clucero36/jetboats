import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Image,
  Button,
  Text,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { IoCartOutline } from "react-icons/io5";


const NavBar = ({ cart }) => {

  const [dropdown, setDropdown] = useState(false);
  const [total, setTotal] = useState(0)

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
    <Box backgroundColor='gray.400' p='2rem 6rem'>
      <Flex justifyContent='space-between' align='center' > 
        <Image src='logo192.png' w={12} h={12} />
        <Box align='right'>
          <Button onClick={() => setDropdown(!dropdown)} as={Button} rightIcon={<IoCartOutline />} >
            <Text color='red'>{total}</Text>
          </Button>      
          <Box 
            display={dropdown === true ? 'box' : 'none'} 
            pos='absolute'
            backgroundColor='gray.500'
            p='.75rem'
            borderRadius='sm'
            w='10rem'
          >
            { 
              cart.length !== 0 
              ? 
              cart.map((cItem) => {
                return (            
                  <Flex key={cItem.item_id} justify='space-between'>
                    <Text>
                      {cItem.name}
                    </Text>
                    <HStack>
                      <Divider orientation='vertical' />
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
            { 
              cart.length !== 0 ? <Button onClick={onCheckout} size='xs' mt='.5rem'>Checkout</Button> : <span></span>
            }
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default NavBar;