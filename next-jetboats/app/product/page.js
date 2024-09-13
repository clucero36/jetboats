import ProductCard from "../ui/productcard";
import { fetchCurrentProductData } from "../lib/data";
import { Suspense } from "react";
import Loading from "./loading";

export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }) {

  const shopItemName = searchParams.name;

  const { currProduct, currReviews, currFaqs } = await fetchCurrentProductData(shopItemName);

  console.log(currProduct, currReviews, currFaqs);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProductCard currProduct={currProduct} currReviews={currReviews} currFaqs={currFaqs} />
      </Suspense>
    </div>
  )
}