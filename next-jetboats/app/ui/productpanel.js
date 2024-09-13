
import Image from 'next/image'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Fragment } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'

export default function ProductPanel({ currReviews, currFaqs }) {

  const license = {
    href: '#',
    summary:
      'For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.',
    content: `
      <h4>Overview</h4>
      
      <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
      
      <ul role="list">
      <li>You\'re allowed to use the icons in unlimited projects.</li>
      <li>Attribution is not required to use the icons.</li>
      </ul>
      
      <h4>What you can do with it</h4>
      
      <ul role="list">
      <li>Use them freely in your personal and professional work.</li>
      <li>Make them your own. Change the colors to suit your project or brand.</li>
      </ul>
      
      <h4>What you can\'t do with it</h4>
      
      <ul role="list">
      <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
      <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
      </ul>
    `,
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  return (
    <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
      <TabGroup>
        <div className="border-b border-gray-200">
          <TabList className="-mb-px flex space-x-8">
            <Tab className="whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600 focus:outline-none">
              Customer Reviews
            </Tab>
            <Tab className="whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600 focus:outline-none">
              FAQ
            </Tab>
            <Tab className="whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600 focus:outline-none">
              License
            </Tab>
          </TabList>
        </div>
        <TabPanels as={Fragment}>
          <TabPanel className="-mb-10">
            <h3 className="sr-only">Customer Reviews</h3>

            {currReviews.map((review, reviewIdx) => (
              <div key={reviewIdx} className="flex space-x-4 text-sm text-gray-500">
                <div className="flex-none py-10">
                  <Image alt="avatar src" src={review.avatar_src} className="rounded-full bg-gray-100" width={35} height={35} />
                </div>
                <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-10')}>
                  <h3 className="font-medium text-gray-900">{review.author}</h3>
                  <p>
                    <time dateTime={review.datetime}>{review.date}</time>
                  </p>

                  <div className="mt-4 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0',
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{review.rating} out of 5 stars</p>

                  <div
                    dangerouslySetInnerHTML={{ __html: review.content }}
                    className="prose prose-sm mt-4 max-w-none text-gray-500"
                  />
                </div>
              </div>
            ))}
          </TabPanel>

          <TabPanel className="text-sm text-gray-500">
            <h3 className="sr-only">Frequently Asked Questions</h3>

            <dl>
              {currFaqs.map((faq) => (
                <Fragment key={faq.question}>
                  <dt className="mt-10 font-medium text-gray-900">{faq.question}</dt>
                  <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                    <p>{faq.answer}</p>
                  </dd>
                </Fragment>
              ))}
            </dl>
          </TabPanel>

          <TabPanel className="pt-10">
            <h3 className="sr-only">License</h3>

            <div
              dangerouslySetInnerHTML={{ __html: license.content }}
              className="prose prose-sm max-w-none text-gray-500"
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
}