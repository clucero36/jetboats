
export async function fetchShopItems() {
  try {
    const shopItemsRes = await fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestore', { cache: 'no-store' });

    return shopItemsRes.json();
  } catch (error) {
    console.error('Firebase Error:', error);
    throw new Error('Failed to fetch shopItem data.');
  }
}

export async function fetchCurrentProductData(productName) {
  try {
    const productsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestore');
    const faqsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestoreFAQs', { cache: 'no-store' });
    const reviewsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestoreReviews', { cache: 'no-store' });

    const data = await Promise.all([
      productsPromise,
      faqsPromise,
      reviewsPromise
    ])

    const productData = await data[0].json();
    const faqData = await data[1].json();
    const reviewData = await data[2].json();

    const currProduct = productData.find((product) => product.name === productName);
    const currReviews = reviewData.filter((review) => review.product_id === currProduct.product_id);
    const currFaqs = faqData.filter((faq) => faq.product_id === currProduct.product_id);

    return { currProduct, currReviews, currFaqs };

  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Failed to fetch current product data.');
  }
}