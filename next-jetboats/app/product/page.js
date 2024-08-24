import ProductCard from "../ui/productcard";

export default async function Page({ searchParams }) {

  const shopItemName = searchParams.id;
  var shopItems;

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

  const currShopItem = shopItems.find((item) => item.name === shopItemName);

  return (
    <div>
      <ProductCard shopItem={currShopItem} />
    </div>
  )
}