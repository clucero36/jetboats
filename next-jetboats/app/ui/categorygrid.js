
import { fetchCategoryItems } from "../lib/data";
import Link from "next/link";
import Image from "next/image";

export default async function CategoryGrid({ category }) {

  const categoryProducts = await fetchCategoryItems(category);

  if (!categoryProducts) return null;

  return (
    <>
      <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 xl:gap-x-8 w-4/5 mx-auto my-8">
        {
          categoryProducts.map((product) => (
            <Link key={product.name} href={`/product?name=${product.name}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  width={1000}
                  height={1000}
                  alt={product.description}
                  src={product.image_src.includes('https') ? product.image_src : `/${product.image_src}`}
                  className='h-full w-full transition duration-300 ease-in-out group-hover:scale-105'
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${parseInt(product.price_in_cents)/100}</p>
            </Link>
          ))
        }
      </section>
    </>
  )
}