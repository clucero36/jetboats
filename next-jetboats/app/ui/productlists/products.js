
import { fetchShopItems } from '@/app/lib/data';
import ProductCard from "./productcard";

export default async function Products() {

  let homePageItems = await fetchShopItems();

  if (!homePageItems) return null;

  return (
    <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 w-4/5 mx-auto my-8">
      {
        homePageItems.map((product) => (
          <ProductCard 
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            price_in_cents={product.price_in_cents}
            image_src={product.image_src}
            description={product.description}/>
        ))
      }
    </section>
  )
}


