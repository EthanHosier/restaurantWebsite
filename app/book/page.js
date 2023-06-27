import Footer from '@/components/Footer'
import { getWebsiteData } from '@/util/util';
import React from 'react'

const page = async() => {
  const DATA = await getWebsiteData();

  return (
    <>
      <section className='normal bg-white h-screen w-screen' id="bookingPage">
        <iframe
          src='http://2010heardle.com.s3-website-us-east-1.amazonaws.com/'
          className="shadow-xl h-full mt-8 sm:mt-16 w-4/5 max-w-xl"
        />
      </section>
      <Footer DATA={DATA}/>
    </>


  )
}

export default page