import { BeakerIcon } from "@heroicons/react/24/outline";
import { footerNavigation } from "../lib/data";
import Link from "next/link";
import { Gi3dStairs } from "react-icons/gi";

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-[1640px] px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200">
          <div className="py-12">
            <div className="flex flex-col sm:flex-row justify-between sm:justify-start gap-12">
              <Link href="/">
              <div className="flex flex-wrap gap-2">
                <BeakerIcon className="size-6" />
                <span className="text-sm text-gray-500">Jet Boat Classifieds</span>
              </div>
              </Link>
              <ul role="list" className="space-y-6 text-left">
                {footerNavigation.company.map((item) => (
                  <li key={item.name} className="text-sm">
                    <Link href={item.href} className="text-gray-500 hover:text-gray-600">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between mx-auto max-w-[1640px] px-4 sm:px-6 lg:px-8 py-6 gap-4">
          <div className='text-sm text-gray-500 text-center sm:text-left'>
            © 2023-2024 JBC, Inc. All rights reserved.
          </div>
          <p className='flex justify-center text-sm text-gray-500'>
            Created by 
            <Gi3dStairs className='h-[20px] w-[20px] ml-[4px] mr-[2px]' />
            Luis Lucero
          </p>
        </div>
      </div>
    </footer>
  )
}