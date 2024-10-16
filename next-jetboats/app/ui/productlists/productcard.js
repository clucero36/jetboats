import Link from "next/link";
import Image from "next/image";

export default function ProductCard({id, name, price_in_cents, image_src, description}) {
  return (
    <div>
      <Link key={name} href={`/product/${name}?id=${id}`} className="group">
        <div className="overflow-hidden rounded-lg">
          <Image
            width={1500}
            height={1500}
            alt={description}
            src={image_src.includes('https') ? image_src : `/${image_src}`}
            className='transition duration-300 ease-in-out group-hover:scale-105'
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">${parseInt(price_in_cents)/100}</p>
      </Link>
    </div>
  )
}