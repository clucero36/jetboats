import { nerko_one } from '@/app/ui/fonts';
import Proudcts from "./ui/products"
import Image from "next/image"


export default function Home() {
  return (
    <main>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          alt=""
          src="jetboats.webp"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="mx-auto max-w-md px-6 lg:px-8">
          <div className="mx-auto lg:mx-0 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl "><span className={nerko_one.className}>Jet Boat Classifieds</span></h2>
          </div>
        </div>
      </div>
      <Proudcts />
    </main>
  )
}
