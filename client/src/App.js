import React, { useState, useEffect } from 'react';
import {
  Box,
} from '@chakra-ui/react';

import NavBar from './components/NavBar';
import ShopItems from './components/ShopItems';

// App.js 
//  
// renders home page that consists of navbar & shopItems
// --------------------------------------------------------------------------------------------------------------
const App = () => {
  const [items, setItems] = useState([]); // array of items to be passed to ShopItems component

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
    <>
      {
        items.length === 0 ? (
          <Box>Loading...</Box>
        ) : (
          <Box h='100vh' backgroundColor='orange.50'>
            <NavBar />
            <ShopItems items={items}/>
          </Box>
        )
      }
    </>
  )
}

export default App;