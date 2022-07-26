const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


// Access firestore database & return contents
exports.getFirestore = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { getFirestore } = require('firebase-admin/firestore');
  const db = getFirestore();
  let shopItems = []
  try {
    const snapshot = await db.collection('shopItems').get();
    snapshot.forEach((doc) => {
      shopItems.push(doc.data())
    })
    res.send(shopItems);
  } catch (e) {
    res.json({error: e.message})
  }
})

// https endpoint creates stripe checkout session
exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  const stripe = require("stripe")(functions.config().stripe.s_key);
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
  const stripe = require("stripe")(functions.config().stripe.s_key);
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
  const stripe = require("stripe")(functions.config().stripe.s_key);
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(req.headers.session_id);
    res.send({lineItems: await lineItems})
  } catch (e) {
    res.json({error: e.message});
  }
})