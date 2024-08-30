import ProductCard from "../ui/productcard";
import { products, reviews, faqs } from "../lib/data";

export default function Page({ searchParams }) {

  const shopItemName = searchParams.name;
  const currProduct = products.find((product) => product.name === shopItemName);
  const currReviews = reviews.filter((review) => review.productId === currProduct.id);
  const currFaqs = faqs.filter((faq) => faq.productId === currProduct.id);

  // try {
  //   const response = await fetch('https://us-central1-fir-web-2d06c.cloudfunctions.net/getFirestore');

  //   if (!response.ok) {
  //     const message = `An error occured: ${response.statusText}`
  //     window.alert(message);
  //     return;
  //   }

  //   shopItems = await response.json();
  //   console.log(shopItems);

  // } catch (e) {
  //   console.log(e.message);
  // }

  // const currShopItem = shopItems.find((item) => item.name === shopItemName);
  // currShopItem.img = currShopItem.img.replace('jpeg', 'webp')

  return (
    <div>
      <ProductCard currProduct={currProduct} currReviews={currReviews} currFaqs={currFaqs} />
    </div>
  )
}