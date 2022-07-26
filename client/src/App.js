import React, { useState, useEffect } from 'react';
import {
  Box,
} from '@chakra-ui/react';

import NavBar from './components/NavBar';
import ShopItems from './components/ShopItems';

const App = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  // Retrieve items from firestore 
  useEffect(() => {
    async function getItems() {
      const response = await fetch('https://us-central1-fir-web-2d06c.cloudfunctions.net/getFirestore')

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`
        window.alert(message);
        return;
      }

      const shopItems = await response.json();
      setItems(shopItems);
    }
  
    getItems();
    return;
  }, [])

  return (
    <Box>
      {
        items.length === 0 ? (
          <Box>Loading...</Box>
        ) : (
          <Box backgroundColor='' h='100vh'>
            <NavBar cart={cart} />
            <ShopItems setCart={setCart} items={items}  />
          </Box>
        )
      }
    </Box>
  )
}

export default App;