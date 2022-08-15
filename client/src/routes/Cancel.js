import React, { useEffect } from 'react';
import { Link as routerLink, useSearchParams } from "react-router-dom";
import {
  Box,
  Link,
  VStack,
  Text,
  HStack,
  Button,
} from '@chakra-ui/react'


// Cancel Page
//
// an order is canceled if a user goes 'back' during checkout phase
// the checkout session is expired on component render
// ---------------------------------------------------------------------------------------------------------------------------------------------------
const Cancel = () => {

  const [searchParams] = useSearchParams();
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    async function expireSession() {
      const response = await fetch('https://us-central1-fir-web-2d06c.cloudfunctions.net/expireSession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'session_id': session_id,
        },
      });
      if (!response.ok) {
        const message = `Session Expired: ${response.statusText}`
        window.alert(message);
        return;
      }

      const expiredSession = await response.json();
      console.log(expiredSession);
    }

    expireSession();
  }, [session_id]);

  return (
    <Box backgroundColor='orange.50' pos='absolute' h='100vh' w='100%'>
      <Box backgroundColor='orange.100' m='16rem auto' p='3rem 0' w='90%'>
        <VStack justify='space-between' h='15rem'>
          <Text fontSize='2xl' color='orange.900'>Order Canceled</Text>
          <HStack justify='center'>
            <Link as={routerLink} to='/'>
              <Button backgroundColor='orange.50' color='orange.900' size='sm'>Return To Shop</Button>
            </Link>
            <Link as={routerLink} to='/contact'>
              <Button backgroundColor='orange.50' color='orange.900' size='sm'>Contact</Button>
            </Link> 
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}


export default Cancel;