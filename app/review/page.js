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

  const returnGoogleAtFrontArr = (reviewTypes) => {
    // Find the index of the "google" type
    const googleIndex = reviewTypes.findIndex((item) => item.type === "google");

    // Move the "google" type to the beginning of the array
    if (googleIndex > 0) {
      const googleType = reviewTypes.splice(googleIndex, 1)[0];
      reviewTypes.unshift(googleType);
    }

    return reviewTypes;
  }



  return (
    <div className='min-h-screen w-screen bg-secondary pt-12'>
      <section className='normal bg-primary flex flex-col'>
        <h2 className='text-4xl font-semibold'>Review Us</h2>
        <p className='text-xl mt-4'>If you enjoyed your visit to our restaurant, please leave us a review!</p>

        {DATA.reviewOptions.map((location, i) => (

          <>

            {location.reviewTypes.length > 0 &&
              <>
                {i > 0 && <div className='w-full h-[1px] bg-gray-200 mt-12' />}
                <div className='mt-12'>
                  <h2 className='text-3xl font-semibold'>{location.location}</h2>
                  <div className='flex flex-col md:flex-row w-full mt-4 items-center'>
                    {returnGoogleAtFrontArr(location.reviewTypes).map((e, i) => (
                      <Link href={e.url || ""} prefetch={false} rel='norefferer'>
                        <div className='p-4 flex items-center justify-center h-48 rounded-full shadow-lg mx-4 mt-2'>
                          <Image src={LOGO_MAP[e.type]} width={150} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

              </>
            }
          </>
        ))}

      </section>

      <Footer DATA={DATA} />
    </div>
  )
}

export default page