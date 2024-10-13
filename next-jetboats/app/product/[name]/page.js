
import Product from "@/app/ui/productpage/product";
import { Suspense } from "react";
import { ProductPageSkeleton } from "@/app/ui/skeletons";

export default function Page({ params, searchParams }) {
  
  return (
    <div>
      <Suspense fallback={<ProductPageSkeleton />}>
        <Product name={params.name} id={searchParams.id}/>
      </Suspense>
    </div>
  )
}