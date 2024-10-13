const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


// Access firestore database & return contents
exports.getFirestore = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { getFirestore } = require('firebase-admin/firestore');
  try {
    const db = getFirestore();
    const shopItemsRef = db.collection('shopItems');
    const snapshot = await shopItemsRef.get();   
    let shopItems = []
    snapshot.forEach((doc) => {
      shopItems.push(doc.data())
    })
    res.status(200).send(shopItems);
  } catch (error) {
    console.error('Error fetching shop items:', error);
    res.status(500).json({error: error.message})
  }
})

exports.getFirestoreCategoryItems = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { getFirestore } = require('firebase-admin/firestore');
  try {
    const db = getFirestore();
    const shopItemsRef = db.collection('shopItems').where("category", "==", `${req.query.category}`);
    const snapshot = await shopItemsRef.get();   
    let shopItems = []
    snapshot.forEach((doc) => {
      shopItems.push(doc.data())
    })
    res.status(200).send(shopItems);
  } catch (error) {
    console.error('Error fetching shop items:', error);
    res.status(500).json({error: error.message})
  }
})

exports.getFirestoreShopItem = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { getFirestore } = require('firebase-admin/firestore');
  try {
    const db = getFirestore();
    const shopItemsRef = db.collection('shopItems').where("name", "==", `${req.query.name}`)
    const snapshot = await shopItemsRef.get();
    let shopItem = snapshot.docs[0].data();
    res.status(200).send(shopItem);
  } catch (error) {
    console.error('Error fetching shop item:', error);
    res.status(500).json({error: error.message})
  }
})

exports.getFirestoreFAQs = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { getFirestore } = require('firebase-admin/firestore');
  try {
    const db = getFirestore();
    const faqsRef = db.collection('faqs').where("product_id", "==", `${req.query.product}`);
    const snapshot = await faqsRef.get();   
    let faqs = []
    snapshot.forEach((doc) => {
      faqs.push(doc.data())
    })
    res.status(200).send(faqs);
  } catch (error) {
    console.error('Error fetching faqs:', error);
    res.status(500).json({error: error.message})
  }
})

exports.getFirestoreReviews = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { getFirestore } = require('firebase-admin/firestore');
  try {
    const db = getFirestore();
    const reviewsRef = db.collection('reviews').where("product_id", "==", `${req.query.product}`);
    const snapshot = await reviewsRef.get();   
    let reviews = []
    snapshot.forEach((doc) => {
      reviews.push(doc.data())
    })
    res.status(200).send(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({error: error.message})
  }
})

// https endpoint creates stripe checkout session
exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  const stripe = require("stripe")(functions.config().stripe.s_key2);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      line_items: req.body.cart.map(cItem => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: cItem.name,
              metadata: {
                size: cItem.purchaseSize,
                image_src: cItem.image_src,
                product_description: cItem.description,
              },
            },
            unit_amount: cItem.price_in_cents,
          },
          quantity: cItem.quantity,
        }
      }),
      success_url: `${functions.config().stripe.client_url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${functions.config().stripe.client_url}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.send({url: await session.url});
  } catch (e) {
    res.json({error: e.message});
  }
})

// request session id for checkout success page
exports.getSession = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET");
  const stripe = require("stripe")(functions.config().stripe.s_key2);
  try {
    const session = await stripe.checkout.sessions.retrieve(req.headers.session_id);
    res.send({session: await session});
  } catch (e) {
    res.json({error: e.message});
  }
});

// request items purchased for checkout success page
exports.getLineItems = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set("Access-Control-Allow-Methods", "GET");
  const stripe = require("stripe")(functions.config().stripe.s_key2);
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(req.headers.session_id, {expand: ['data.price.product']});
    res.send({lineItems: await lineItems})
  } catch (e) {
    res.json({error: e.message});
  }
})

// expire a session when checkout is canceled
exports.expireSession = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set("Access-Control-Allow-Methods", "POST");
  const stripe = require("stripe")(functions.config().stripe.s_key2);
  try {
    const session = await stripe.checkout.sessions.expire(req.headers.session_id);
    res.send(session);
  } catch (e) {
    res.json({error: e.message});
  }
})

