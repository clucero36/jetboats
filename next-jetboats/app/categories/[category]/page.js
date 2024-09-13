import { nerko_one } from "@/app/ui/fonts";
import CategoryGrid from "@/app/ui/categorygrid";

export default function Page({ params }) {

  return (
    <div>
      <div className="mx-auto lg:mx-0 text-center">
        <h2 className={`text-6xl tracking-tight ${nerko_one.className} antialiased`}>{params.category.toUpperCase()}</h2>
      </div>
      <CategoryGrid category={params.category} />
    </div>
  )
}