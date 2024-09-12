import Image from "next/image";
import Link from "next/link";
import clsx from 'clsx';
import { fetchShopItems } from '../lib/data';

export default async function Products() {

  let homePageItems = await fetchShopItems();

  if (!homePageItems[0] || !homePageItems[1] || !homePageItems[2] || !homePageItems[3]) return null;

  const [firstProduct, secondProduct, thirdProduct, fourthProduct] = homePageItems;

  console.log(firstProduct, secondProduct, thirdProduct, fourthProduct);

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  )
}

function ThreeItemGridItem({ item, size, priority }) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product?name=${item.name}`}
      >
        <GridTileImage
          src={item.image_src.includes('https') ? item.image_src : `/${item.image_src}`}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name,
            amount: item.price_in_cents
          }}
        />
      </Link>
    </div>
  );
}

function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600',
        {
          relative: label,
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-contain', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
    </div>
  );
}