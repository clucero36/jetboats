
import Product from "@/app/ui/productpage/product";
import Loading from "./loading";
import { Suspense } from "react";

export default function Page({ params, searchParams }) {
  
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Product name={params.name} id={searchParams.id}/>
      </Suspense>
    </div>
  )
}