import { nerko_one } from '@/app/ui/fonts';
import Products from "./ui/products"
import Image from "next/image"
import { fetchShopItems } from './lib/data';

export default async function Home() {

  const shopItems = await fetchShopItems();

  return (
    <main>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <Image
          priority
          width={2000}
          height={1000}
          alt=""
          src="/jetboats.webp"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="mx-auto max-w-md px-6 lg:px-8">
          <div className="mx-auto lg:mx-0 text-center">
            <h2 className={`text-6xl font-bold tracking-tight text-white ${nerko_one.className}`}>Jet Boat Classifieds</h2>
          </div>
        </div>
      </div>
      <Products shopItems={shopItems}/>
    </main>
  )
}
