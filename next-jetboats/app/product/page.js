import ProductCard from "../ui/productcard";

export default async function Page({ searchParams }) {

  const shopItemName = searchParams.name;

  var productData;
  var faqData;
  var reviewData;

  try {
    const productsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestore');
    const faqsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestoreFAQs');
    const reviewsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestoreReviews');

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
  const currReviews = reviewData.filter((review) => review.product_id === currProduct.item_id);
  const currFaqs = faqData.filter((faq) => faq.product_id === currProduct.item_id);

  return (
    <div>
      <ProductCard currProduct={currProduct} currReviews={currReviews} currFaqs={currFaqs} />
    </div>
  )
}