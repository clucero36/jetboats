import React from 'react';
import { Link as routerLink } from "react-router-dom";
import {
  Box,
  Text,
  VStack,
  HStack,
  Spacer,
  Link,
  Button,
} from '@chakra-ui/react';

// Contact Page
//
// business owners contact information
// ----------------------------------------------------------------------------------------------------------------

const Contact = () => {

  return (
    <Box backgroundColor='orange.50' pos='absolute' h='100vh' w='100%'>
      <Box backgroundColor='orange.100' m='16rem auto' p='3rem 0' w='90%'>
        <VStack justify='space-between' h='15rem'>
          <Text fontSize='2xl' color='orange.900'>Contact Information</Text>
          <VStack w='100%'>
            <HStack w='60%'> 
              <Text>Phone:</Text>
              <Spacer />
              <Text>###-$$$-%%%%</Text>
            </HStack>
            <HStack w='60%'> 
              <Text>Email:</Text>
              <Spacer />
              <Text>###@gmail.com</Text>
            </HStack>
          </VStack>
          <Link as={routerLink} to='/'><Button backgroundColor='orange.50' color='orange.900' size='sm'>Return To Shop</Button></Link>
        </VStack>
      </Box>
    </Box>
  )
}

export default Contact;