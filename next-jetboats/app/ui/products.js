import Link from "next/link";
import { data } from "../lib/data";

export default async function Proudcts() {

  var shopItems = data;

  return (
    <div>
      <span>Products</span>
      {
        shopItems.map((shopItem) => {
          return (
            <Link className="" href={`/product?id=${shopItem.name}`} 
              key={shopItem.name}
            >
              <div className="border-2 m-4 p-4" >
                <div>{shopItem.name}</div>
                <div>{shopItem.description}</div>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}