
export async function fetchShopItems() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const shopItemsRes = await fetch('https://us-central1-jetboats.cloudfunctions.net/getFirestore');
    const shopItemData = await shopItemsRes.json();

    return shopItemData;
  } catch (error) {
    console.error('Firebase Error:', error);
    throw new Error('Failed to fetch shopItem data.');
  }
}

export async function fetchCategoryItems(category) {
  try {
    const shopItemsRes = await fetch(`https://us-central1-jetboats.cloudfunctions.net/getFirestoreCategoryItems?category=${category}`);
    const shopItemData = await shopItemsRes.json();

    return shopItemData;
  } catch (error) {
    console.error('Firebase Error:', error);
    throw new Error('Failed to fetch Category Items');
  }
}

export async function fetchCurrentProductData(productName, productId) {
  try {
    const productsPromise = await fetch(`https://us-central1-jetboats.cloudfunctions.net/getFirestoreShopItem?name=${productName}`);
    const faqsPromise = fetch(`https://us-central1-jetboats.cloudfunctions.net/getFirestoreFAQs?product=${productId}`);
    const reviewsPromise = fetch(`https://us-central1-jetboats.cloudfunctions.net/getFirestoreReviews?product=${productId}`);

    const data = await Promise.all([
      productsPromise,
      faqsPromise,
      reviewsPromise
    ])

    const currProduct = await data[0].json();
    const currFaqs = await data[1].json();
    const currReviews = await data[2].json();

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
    { name: 'About', href: '/about' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'Shipping & Return Policy', href: '/shipping-return-policy' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Contact', href: '/contact' },
  ],
}