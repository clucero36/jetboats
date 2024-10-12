
import ProductDetails from './productdetails';
import ProductPanel from './productpanel';
import { fetchCurrentProductData } from '@/app/lib/data';

export default async function Product({ name }) {

  const { currProduct, currReviews, currFaqs } = await fetchCurrentProductData(name);

  if (!currProduct || !currReviews || !currFaqs) return null;

  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">

          {/* Product details */}
          <ProductDetails currProduct={currProduct} />
          
          <ProductPanel currReviews={currReviews} currFaqs={currFaqs} />
          
        </div>
      </div>
    </div>
  )
};