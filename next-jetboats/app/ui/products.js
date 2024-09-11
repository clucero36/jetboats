'use client'

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { fetchShopItems } from '../lib/data';
import { ProductsSkeleton } from './skeletons';

export default function Products({ productType }) {
  
  const [shopItems, setShopItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const getFirestore = async () => {
      let result = await fetchShopItems();
      if (productType) {
        result = result.filter((product) => product.category === productType)
      }
      setShopItems(result);
      setIsLoading(false);
    }

    getFirestore();
  }, [productType])

  if (isLoading) {
    return <ProductsSkeleton />
  }

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {
          shopItems.map((product) => (
            <Link key={product.name} href={`/product?name=${product.name}`} className="group">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200">
                <Image
                  width={1000}
                  height={1000}
                  alt={product.description}
                  src={product.image_src.includes('https') ? product.image_src : `/${product.image_src}`}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${parseInt(product.price_in_cents)/100}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}