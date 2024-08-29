import { products } from "../lib/data";
import Image from "next/image";

export default function Proudcts() {

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <a key={product.name} href={`/product?id=${product.name}`} className="group">
            <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <Image
                width={1000}
                height={1300}
                alt={product.description}
                src={product.img}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
          </a>
        ))}
      </div>
    </div>
  )
}