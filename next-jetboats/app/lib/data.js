
export async function fetchShopItems() {
  try {
    const shopItemsRes = await fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestore');
    const shopItemData = await shopItemsRes.json();
    return shopItemData;
  } catch (error) {
    console.error('Firebase Error:', error);
    throw new Error('Failed to fetch shopItem data.');
  }
}

export async function fetchCurrentProductData(productName) {
  try {
    const productsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestore');
    const faqsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestoreFAQs');
    const reviewsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestoreReviews');

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
    
    console.log(currProduct, currReviews, currFaqs);

    return { currProduct, currReviews, currFaqs };

  } catch (error) {
    console.error('Fetch Error:', error);
    throw new Error('Failed to fetch current product data.');
  }
}

export async function getCheckoutSessionLineItems(session_id) {
  try {
    const checkoutSessionPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getSession', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'session_id': session_id,
      },
    });

    const checkoutSessionLineItemsPromise = fetch('https://us-central1-jetboats.cloudfunctions.net/getLineItems', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'session_id': session_id,
      },
    });

    const data = await Promise.all([
      checkoutSessionPromise,
      checkoutSessionLineItemsPromise
    ]);

    const checkoutSessionObj = await data[0].json();
    const lineItemsObj = await data[1].json();

    const checkoutSession = checkoutSessionObj.session;
    const lineItems = lineItemsObj.lineItems;
    
    return { checkoutSession, lineItems };
  } catch (error) {
    console.error('Fetch Session Error:', error);
    throw new Error('Failed to fetch current checkout session.');
  }
}

export async function expireSession(session_id) {
  try {
    const response = await fetch('https://us-central1-jetboats.cloudfunctions.net/expireSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'session_id': session_id,
      },
    });

    const expiredSession = await response.json();
    return expiredSession;
  } catch (error) {
    console.error('Expire Session Error:', error);
    throw new Error('Failed to expire current checkout session.');
  }
}

export const footerNavigation = {
  company: [
    { name: 'About', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Shipping & Return Policy', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'FAQ', href: '#' },
  ],
}