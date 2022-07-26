import React, { useEffect } from 'react';
import { Link as routerLink, useSearchParams } from "react-router-dom";
import {
  Box,
  Link,
  VStack,
  Heading,
  HStack,
  Button,
} from '@chakra-ui/react'



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
    <>
      <Box backgroundColor='gray.300' mt='10rem' mr='1rem' ml='1rem'>
        <VStack h='15rem' align='center' justify='center'>
          <Heading>Order Canceled</Heading>
        </VStack>
        <HStack justify='center'>
          <Link as={routerLink} to='/'><Button>Return To Shop</Button></Link>
          <Link as={routerLink} to='/contact'><Button>Contact</Button></Link> 
        </HStack>
      </Box>
    </>
  )
}

export default Cancel;