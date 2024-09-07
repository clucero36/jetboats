import ProductCard from "../ui/productcard";

export default async function Page({ searchParams }) {

  const shopItemName = searchParams.name;

  let productData;
  let faqData;
  let reviewData;

  try {
    const productsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestore', { cache: 'no-store' });
    const faqsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestoreFAQs', { cache: 'no-store' });
    const reviewsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestoreReviews', { cache: 'no-store' });

    const [ products, faqs, reviews ] = await Promise.all([
      productsPromise,
      faqsPromise,
      reviewsPromise
    ])

    productData = await products.json();
    faqData = await faqs.json();
    reviewData = await reviews.json();

  } catch (e) {
    console.log(e.message);
  }

  const currProduct = productData.find((product) => product.name === shopItemName);
  const currReviews = reviewData.filter((review) => review.product_id === currProduct.product_id);
  const currFaqs = faqData.filter((faq) => faq.product_id === currProduct.product_id);

  return (
    <div>
      <ProductCard currProduct={currProduct} currReviews={currReviews} currFaqs={currFaqs} />
    </div>
  )
}