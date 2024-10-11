import { nerko_one } from "@/app/ui/fonts";
import CategoryGrid from "@/app/ui/productlists/categorygrid";
import { ProductsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default function Page({ params }) {

  return (
    <div>
      <div className="mx-auto lg:mx-0 text-center">
        <h2 className={`text-6xl tracking-tight ${nerko_one.className} antialiased`}>{params.category.toUpperCase()}</h2>
      </div>
      <Suspense fallback={<ProductsSkeleton />} >
        <CategoryGrid category={params.category} />
      </Suspense>
    </div>
  )
}