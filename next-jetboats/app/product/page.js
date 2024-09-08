import ProductCard from "../ui/productcard";
import { fetchCurrentProductData } from "../lib/data";

export default async function Page({ searchParams }) {

  const shopItemName = searchParams.name;

  const { currProduct, currReviews, currFaqs } = await fetchCurrentProductData(shopItemName);

  return (
    <div>
      <ProductCard currProduct={currProduct} currReviews={currReviews} currFaqs={currFaqs} />
    </div>
  )
}