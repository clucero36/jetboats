import { nerko_one } from '../ui/fonts';
import Products from "../ui/products";

export default function Page({ searchParams }) {
  const title = (searchParams.type).toUpperCase();
  return (
    <div>
      <div className="mx-auto lg:mx-0 text-center">
        <h2 className={`text-6xl tracking-tight ${nerko_one.className} antialiased`}>{title}</h2>
      </div>
      <Products productType={searchParams.type}/>
    </div>
  )
}