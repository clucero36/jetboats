import React, { useContext, useEffect, useState, useRef } from 'react';
import { CartContext } from '../Context';
import { useLocation } from "react-router-dom"
import {
  Box,
  Text,
  Image,
  Button,
} from '@chakra-ui/react';
import ShoppingCart from '../components/ShoppingCart';


const ItemDetail = () => {
  const {setCart} = useContext(CartContext);
  const location = useLocation();
  const [imgHeight, setImgHeight] = useState(null);
  const imgRef = useRef();
  const item = location.state.item;

  function setImageHeight() {
    setImgHeight(imgRef.current.clientHeight);
  }

  useEffect(() => {
    imgRef.current.addEventListener('load', setImageHeight)
  })

  function updateCart(value) {
    return setCart((prev) => {
      let matchingItem = [...prev].find((item) => item.item_id === value[0].item_id)
      if (matchingItem) {
        matchingItem.quantity +=1;
        return [...prev]
      }
      return [...prev].concat(value)
    })
  }


  return (
    <>
      <Box backgroundColor='orange.50'>
        <Box w='95%' align='right' m='2rem auto' pos='absolute' zIndex={1}>
          <ShoppingCart />
        </Box>
        <Image ref={imgRef} src={item.img} pos='absolute' id='img'/>
      </Box>
      <Box borderRadius='2xl' backgroundColor='white' w='100%' pos='absolute' zIndex={1} mt={imgHeight-25} >
        <Box p='1rem'>
          <Text>Item Detail</Text>
          <Text>{item.name}</Text>
          <Text>${item.price_in_cents/100}</Text>
          <Text>item.details</Text>
          <Button
            _hover={{backgroundColor: 'black'}}
            backgroundColor='orange.800'
            color='orange.50'
            variant='solid'
            width='100%'
            size='sm' 
            onClick={() => {
              updateCart([item])
            }}
          >
              Add to Cart
        </Button>
        </Box>
      </Box>
    </>
  )
}

export default ItemDetail;