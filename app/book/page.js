import Footer from '@/components/Footer'
import React from 'react'

const page = () => {
  return (
    <>
      <section className='normal bg-white h-screen w-screen'>
        <iframe
          src='http://2010heardle.com.s3-website-us-east-1.amazonaws.com/'
          className="shadow h-2/3 w-4/5"
        />
      </section>
      <Footer/>
    </>


  )
}

export default page