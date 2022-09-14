import React, { useEffect, useState } from 'react';
import { Link as routerLink, useSearchParams } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  VStack,
  Image,
  HStack,
  Spacer,
  Link,
} from '@chakra-ui/react'


const Success = () => {

  const [searchParams] = useSearchParams();
  const [session, setSession] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  const session_id = searchParams.get('session_id');

  // Retrieve data after successful payment
  useEffect(() => {
    
    // api call to recieve customer session data
    async function getCustomerSession() {
      const response = await fetch('https://us-central1-fir-web-2d06c.cloudfunctions.net/getSession', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'session_id': session_id,
        },
      });

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`
        window.alert(message);
        return;
      }
      const customerSession = await response.json();
      setSession(customerSession.session);
    };

    // api call to recieve purchased item data
    async function getLineItems() {
      const response = await fetch('https://us-central1-fir-web-2d06c.cloudfunctions.net/getLineItems', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'session_id': session_id,
        },
      });

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`
        window.alert(message);
        return;
      }
      const customerLineItems = await response.json();
      setLineItems(customerLineItems.lineItems.data);
    };

    getCustomerSession();
    getLineItems();
    return;
  }, [session_id]);

  console.log(lineItems);

  return (
    <Box backgroundColor='orange.50' h='100vh'>
      {
        session === null ? (<Box>Loading...</Box>) : 
        (
          <>
            <Box p='2rem 0' w='80%' m='0 auto' align='center'>
              <Image boxSize={['100%', '100%', '100%', '60%']} src='jbLogo.jpeg' borderRadius='full' />
            </Box>
            <Box backgroundColor='orange.100' m='.5rem auto' p='1rem' borderRadius='sm' color='orange.900' w={['100%', '100%', '100%', '60%']}>
              <VStack spacing='1rem'>
                <Text fontSize='2xl' align='center' m='1rem 0'>Purchase Confirmed</Text>
                { 
                  lineItems.map((item) => {
                    return (
                      <VStack key={item.id} w='80%'>
                        <HStack w='100%'>
                          <Text>{item.quantity}x {item.description}:</Text>
                          <Text>{item.price.product.metadata.size}</Text>
                          <Spacer />
                          <Text>${(item.amount_subtotal)/100}</Text>
                        </HStack>
                      </VStack>
                    )
                  })
                }              
                <HStack w='80%' borderTop='.25px solid black'>
                  <Text>Total: </Text>
                  <Spacer />
                  <Text>${session.amount_subtotal/100}</Text>
                </HStack>
                <VStack w='90%' align='left' pt='3.5rem'>
                  <Text>Thank you, {session.customer_details.name}.</Text>
                  <Text>A confirmation e-mail has been sent to {session.customer_details.email} & your order will be shipped as soon as possible.</Text>
                  <Text>Feel free to contact me with any questions regarding your purchase.</Text>
                </VStack>
                <HStack justify='center' spacing={10}>
                  <Link as={routerLink} to='/'>
                    <Button backgroundColor='orange.50' color='orange.900' size='sm'>Return To Shop</Button>
                  </Link>
                  <Link as={routerLink} to='/contact'>
                    <Button backgroundColor='orange.50' color='orange.900' size='sm'>Contact</Button>
                  </Link> 
                </HStack>
              </VStack>
            </Box>
          </>
        )
      }
    </Box>
  )
}

export default Success;