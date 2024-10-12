
import Product from "@/app/ui/productpage/product";
import Loading from "./loading";
import { Suspense } from "react";

export default async function Page({ params }) {

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Product name={params.name} />
      </Suspense>
    </div>
  )
}