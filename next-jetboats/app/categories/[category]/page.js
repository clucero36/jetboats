import { nerko_one } from "@/app/ui/fonts";
import Products from "@/app/ui/products";
import { fetchCategoryItems } from "@/app/lib/data";

export default async function Page({ params }) {
  
  const categoryProducts = await fetchCategoryItems(params.category);

  return (
    <div>
      <div className="mx-auto lg:mx-0 text-center">
        <h2 className={`text-6xl tracking-tight ${nerko_one.className} antialiased`}></h2>
      </div>
    </div>
  )
}