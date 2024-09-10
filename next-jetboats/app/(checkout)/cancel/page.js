import { expireSession } from "@/app/lib/data";
import Link from "next/link";

export default async function Page({ searchParams }) {

  const session_id = searchParams.session_id;
  const expiredSession = await expireSession(session_id);
  console.log(expiredSession)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Session {expiredSession.id.slice(8, 14)} Expired
        </h2>
        <div className="mt-10 flex items-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Continue Shopping
          </Link>
          <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-900">
            Contact<span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
  
}