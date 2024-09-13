import ShoppingCart from "./shoppingcart";
import Link from "next/link";
import { BeakerIcon } from "@heroicons/react/24/outline";

export default function NavBar() {

  return (
    <div className='flex my-0 mx-auto p-8 justify-between max-w-[1640px]'>
      <div className='flex gap-4'>
        <Link href="/">
          <BeakerIcon className="size-6" />
        </Link>
        <Link href=''>
          <span className="text-sm text-gray-500">Shirts</span>
        </Link>
        <Link href=''>
          <span className="text-sm text-gray-500">Accessories</span>
        </Link>
      </div>
      <ShoppingCart />
    </div>
  )
}