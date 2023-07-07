import Footer from '@/components/Footer'
import { getWebsiteData } from '@/util/util';
import React from 'react'

export const revalidate = process.env.REVALIDATE_SECS;

export const metadata = {
  title: `BOOK - ${process.env.RESTAURANT_NAME}`,
}

const page = async() => {
  const DATA = await getWebsiteData();

  return (
    <>
      <section className='normal bg-primary min-h-screen w-screen' id="bookingPage">
        <iframe
          src={`https://d303vz01x9nm1g.cloudfront.net?restaurantId=${process.env.WEBSITE_UUID}`}
          className="shadow-xl h-[750px] mt-12 sm:mt-16 w-full max-w-xl border rounded-lg overflow-hidden"
          id="booking-iframe"
        />
      </section>
      <p></p>
      <Footer DATA={DATA}/>
    </>


  )
}

export default page