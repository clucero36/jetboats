'use client'

import { useContext, useState } from 'react';
import { CartContext } from '../context';
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'

export default function ProductCard({shopItem}) {
  const [size, setSize] = useState(null)
  const {cart, setCart} = useContext(CartContext);  
  
  function updateCart(value) {
    let pItem = JSON.parse(JSON.stringify(value[0]));
    pItem.purchaseSize = size;
    return setCart((prev) => {
      let matchingItem = [...prev].find((item) => 
        item.name === pItem.name && item.purchaseSize === pItem.purchaseSize
      )
      if (matchingItem) {
        matchingItem.quantity += 1;
        return [...prev]
      }
      return [...prev].concat(pItem)
    })
  }

  return (
    <div>
      <div>{shopItem.name}</div>
      <div>{shopItem.description}</div>
      <div>
        {
          <RadioGroup  className='flex' value={size} onChange={setSize} aria-label="Server size">
            {shopItem.sizes.map((size) => (
              <Field key={size} className="flex items-center">
                <Radio
                  value={size}
                  className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
                >
                  <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                </Radio>
                <Label>{size}</Label>
              </Field>
            ))}
          </RadioGroup>
        }
      </div>
      <button onClick={() => {
        updateCart([shopItem])
        }}
      >
        Add to Cart
      </button>
    </div>
  )
};