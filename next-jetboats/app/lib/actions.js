'use server'

import { redirect } from 'next/navigation'

export async function Checkout(cart) {

  const response = await fetch('https://us-central1-jetboats.cloudfunctions.net/createCheckoutSession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({cart: cart})
  });
  
  if (!response.ok) {
    const message = `An error occured: ${response.statusText}`
    return message;
  }

  let session_url = await response.json();
  redirect(session_url.url);
}