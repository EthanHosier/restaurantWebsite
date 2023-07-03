import Footer from '@/components/Footer'
import { getWebsiteData } from '@/util/util';
import React from 'react'

const page = async() => {
  const DATA = await getWebsiteData();

  return (
    <>
      <section className='normal bg-white h-screen w-screen' id="bookingPage">
        <iframe
          src={`https://d303vz01x9nm1g.cloudfront.net?restaurantId=${process.env.WEBSITE_UUID}`}
          className="shadow-xl h-full mt-12 sm:mt-16 w-4/5 max-w-xl border rounded-lg"
          id="booking-iframe"
        />
      </section>
      <p></p>
      <Footer DATA={DATA}/>
    </>


  )
}

export default page