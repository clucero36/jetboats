const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[#243c5a] before:to-transparent';


export function ProductsSkeleton() {

  return (
    <div className="flex mx-auto w-3/5 justify-around my-16">
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />  
    </div>
  )
}

export function ProductSkeleton() {
  return (
    <div className={`${shimmer} overflow-hidden relative relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm h`}>
      <div className="mx-auto px-24 py-36 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        </div>
      </div>
    </div>
  )
}