import ShoppingCart from "./shoppingcart";
import Link from "next/link";

export default function NavBar() {

  return (
    <div className='flex my-0 mx-auto justify-around h-56px max-w-1080px'>
      <Link href="/">Logo</Link>
      <ShoppingCart />
    </div>
  )
}