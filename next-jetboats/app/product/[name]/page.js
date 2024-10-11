
import Product from "@/app/ui/productpage/product";
import { fetchCurrentProductData } from "@/app/lib/data";
import Loading from "./loading";
import { Suspense } from "react";

export default async function Page({ params }) {

  const { currProduct, currReviews, currFaqs } = await fetchCurrentProductData(params.name);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Product currProduct={currProduct} currReviews={currReviews} currFaqs={currFaqs} />
      </Suspense>
    </div>
  )
}