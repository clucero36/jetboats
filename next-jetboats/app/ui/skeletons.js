const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[#243c5a] before:to-transparent';


export function ProductsSkeleton() {

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 w-4/5 mx-auto my-8">
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />  
    </div>
  )
}

export function ProductSkeleton() {
  return (
    <div className={`${shimmer} overflow-hidden relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm w-full h-96`}>
      <div className="mx-auto sm:px-6 lg:px-8 ">

      </div>
    </div>
  )
}

export function ProductPageSkeleton() {
  return (
    <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
      <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <div className="lg:col-span-4 lg:row-end-1">
          <div className={`${shimmer} overflow-hidden relative overflow-hidden rounded-xl p-2 shadow-sm w-full h-[550px]`}>

          </div>
        </div>
        <div className="mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
          <div className={`${shimmer} overflow-hidden relative overflow-hidden rounded-xl p-2 shadow-sm h-24`}>

          </div>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-8 lg:grid-cols-3 mt-8 w-4/5">
            <div className={`${shimmer} overflow-hidden relative overflow-hidden rounded-xl p-2 shadow-sm h-16`}>

            </div>
            <div className={`${shimmer} overflow-hidden relative overflow-hidden rounded-xl p-2 shadow-sm h-16`}>
              
            </div>
            <div className={`${shimmer} overflow-hidden relative overflow-hidden rounded-xl p-2 shadow-sm h-16`}>
            
            </div>

          </div>
          <div className="mt-8">
            <div className={`${shimmer} overflow-hidden relative overflow-hidden rounded-xl p-2 shadow-sm h-12 w-1/2`}>

            </div>
          </div>
          <div className="mt-16 border-t border-gray-200 pt-16">
          </div>
          <div className="mt-20 border-t border-gray-200 pt-16">
          </div>
          <div className="mt-20 border-t border-gray-200 pt-16">
          </div>
        </div>
      </div>
    </div>
  )
}