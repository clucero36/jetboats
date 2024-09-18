export default function Page() {

  return (
    <div className='py-24 sm:py-32'>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">About</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            This e-commerce web application was built with Next.js, Tailwind, Firebase, & Stripe payment processing.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600"><em>Technical Features:</em></p>
          <ul className="list-disc mt-6 ml-6 text-lg leading-8 text-gray-600">
            <li>Server Side Rendering & Incremental Static Regeneration</li>
            <li>Shopping Cart Client Component</li>
            <li>Dynamic Routes: Product & Category Pages</li>
            <li>Streaming</li>
            <li>Route Groups</li>
            <li>Server Actions</li>
            <li>API Layer</li>
            <li>Fetch Logging</li>
          </ul>
        </div>
      </div>
    </div>
  )
}