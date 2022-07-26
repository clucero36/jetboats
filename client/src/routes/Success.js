import React, { useEffect, useState } from 'react';
import { Link as routerLink, useSearchParams } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  VStack,
  Heading,
  Image,
  Icon,
  HStack,
  Divider,
  Spacer,
  Link,
} from '@chakra-ui/react'
import { AiOutlineCheckSquare } from 'react-icons/ai'


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

  return (
    <Box>
      {
        session === null ? (<Box>Loading...</Box>) : 
        (
          <>
            <Box h='6rem' mt='1.5rem'>
              <Image src='logo512.png' w={75} ml='2rem'/>
            </Box>
            <Box h='42rem' mt='1.5rem' backgroundColor='gray.400' mr='1rem' ml='1rem' borderRadius='sm'>
              <VStack spacing={15}>
                <Icon as={AiOutlineCheckSquare} boxSize={155} mt={15} color='green'/>
                <Heading align='center'>Purchase Confirmed</Heading>
                { 
                  lineItems.map((item) => {
                    return (
                      <VStack key={item.id} w='80%'>
                        <HStack w='100%'>
                          <Text>{item.quantity}x {item.description}</Text>
                          <Spacer />
                          <Text>${(item.amount_subtotal)/100}</Text>
                        </HStack>
                        <Divider />
                      </VStack>
                    )
                  })
                }
                <HStack w='80%'>
                  <Text>Total: </Text>
                  <Spacer />
                  <Text>${session.amount_subtotal/100}</Text>
                </HStack>
                <VStack w='90%' align='left' pt='3.5rem'>
                  <Text>Thank you, {session.customer_details.name}.</Text>
                  <Text>A confirmation e-mail has been sent to {session.customer_details.email} & your order will be shipped as soon as possible.</Text>
                  <Text>Feel free to contact me with any questions regarding your purchase.</Text>
                </VStack>
              </VStack>
            </Box>
            <Box h='6rem' mt='1.5rem'>
              <HStack justify='center' spacing={10}>
                <Link as={routerLink} to='/'><Button>Return To Shop</Button></Link>
                <Link as={routerLink} to='/contact'><Button>Contact</Button></Link> 
              </HStack>
            </Box>
          </>
        )
      }
    </Box>
  )
}

export default Success;