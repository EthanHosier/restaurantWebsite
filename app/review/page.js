import React from 'react'

import GoogleLogo from "/public/ReviewLogos/google-logo.webp";
import Tripadvisor from "/public/ReviewLogos/tripadvisor.webp"
import YelpLogo from "/public/ReviewLogos/yelp-logo.webp"
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { getWebsiteData } from '@/util/util';

const LOGO_MAP = { tripadvisor: Tripadvisor, google: GoogleLogo, yelp: YelpLogo }

export const revalidate = 3600 * 3 // revalidate every 3 hours


const DUMMY_DATA = [
  {
    location: "Bum, The North Pole",
    reviewTypes: [
      {
        type: "google",
        link: "www.google.com"
      },
      {
        type: "tripadvisor",
        link: "www.tripadvisor.com",
      },
      {
        type: "yelp",
        link: "www.yelp.com",
      },
    ]
  },
  {
    location: "Willy",
    reviewTypes: [
      {
        type: "google",
        link: "www.google.com"
      },
      {
        type: "tripadvisor",
        link: "www.tripadvisor.com",
      },
    ]
  }
]

const page = async () => {
  const DATA = await getWebsiteData();

  return (
    <>
      <section className='normal mt-16 flex flex-col'>
        <h2 className='text-4xl font-semibold'>Review Us</h2>
        <p className='text-xl mt-4'>If you enjoyed your visit to one of our restaurants, please leave us a review!</p>

        {DUMMY_DATA.map((location, i) => (
          <>
            <div className='mt-8'>
              <h2 className='text-3xl font-semibold'>{location.location}</h2>
              <div className='flex flex-col md:flex-row w-full mt-4 items-center'>
                {location.reviewTypes.map((e, i) => (
                  <Link href={e.link}>
                    <div className='p-4 flex items-center justify-center h-48 rounded-full shadow-lg mx-4'>
                      <Image src={LOGO_MAP[e.type]} width={150} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {i < DUMMY_DATA.length - 1 && <div className='w-full h-[1px] bg-gray-200 mt-8' />}
          </>
        ))}

      </section>

      <Footer DATA={DATA} />
    </>
  )
}

export default page