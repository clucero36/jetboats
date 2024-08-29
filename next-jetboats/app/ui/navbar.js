import ShoppingCart from "./shoppingcart";
import Link from "next/link";
import { BeakerIcon } from "@heroicons/react/24/outline";

export default function NavBar() {

  return (
    <div className='flex my-0 mx-auto p-8 justify-between max-w-screen-xl'>
      <Link href="/">
        <BeakerIcon className="size-6" />
      </Link>
      <ShoppingCart />
    </div>
  )
}