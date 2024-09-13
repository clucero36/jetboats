
import ProductCard from "@/app/ui/productcard";
import { fetchCurrentProductData } from "@/app/lib/data";
import Loading from "./loading";
import { Suspense } from "react";

export default async function Page({ params }) {

  console.log(params.name)

  const { currProduct, currReviews, currFaqs } = await fetchCurrentProductData(params.name);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProductCard currProduct={currProduct} currReviews={currReviews} currFaqs={currFaqs} />
      </Suspense>
    </div>
  )
}