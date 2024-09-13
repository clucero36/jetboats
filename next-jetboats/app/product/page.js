import ProductCard from "../ui/productcard";
import { fetchCurrentProductData } from "../lib/data";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Page({ searchParams }) {

  const shopItemName = searchParams.name;

  const { currProduct, currReviews, currFaqs } = await fetchCurrentProductData(shopItemName);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProductCard currProduct={currProduct} currReviews={currReviews} currFaqs={currFaqs} />
      </Suspense>
    </div>
  )
}