

export default async function Page({ searchParams }) {

  console.log(searchParams);

  try {
    const response = await fetch('https://us-central1-fir-web-2d06c.cloudfunctions.net/getFirestore');

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`
      window.alert(message);
      return;
    }

    shopItems = await response.json();

  } catch (e) {
    console.log(e.message);
  }

  return (
    <div>
      Product Page
    </div>
  )
}