import React from 'react'
import DATA from "@/public/CONSTANTS.json"
import toTitleCase from '@/util/toTitleCase'
import Footer from '@/components/Footer'
import Link from 'next/link'


const page = () => {
  return (

    <>
      {/* Deliver - ... section*/}
      <section className='parallax pickup-delivery-parallax-section flex-col items-center justify-center'>
        <img src={DATA.backgrounds.delivery} className="background" alt='extra booking section background' />
        <div className='bg-black background opacity-20' />
        <h1 className='text-tsecondary text-center md:mb-20 mt-20'>Delivery</h1>

      </section>


      {/*Order selection section*/}
      <section className='normal text-center flex bg-primary' id='order-options'>
        <div className='max-w-6xl flex flex-col px-4 gap-y-16'>
          {DATA.deliveryOptions.map((location, i) => (
            <>
              <div className='flex flex-col items-center w-full'>
                <h3 className='font-semibold text-2xl sm:text-4xl w-full text-start mb-4'>{toTitleCase(location.location)}</h3>
                <div className='flex flex-col sm:flex-row'>
                  {
                    location.options.map((d, i) => (
                      <div className='flex flex-col items-center justify-center'>

                        {
                          <div className='flex-1 flex w-56 md:w-5/6 max-w-2xl items-center justify-center'>
                          <Link href={d.url} className="flex items-center justify-center">
                            <img src={d.logo} className="w-3/4 h-auto -mb-8 sm:-mb-0" alt={`${d.name} logo`} />
                          </Link>
                        </div>
                          
                        }

                        <Link href={d.url}>
                          <p className="bg-accent text-tsecondary p-3 rounded md:-mt-4 text-xl font-semibold my-4">Delivery via {d.name}</p>
                        </Link>
                      </div>
                    ))
                  }
                </div>
              </div>
              {i < location.options.length - 1 && <div className='w-full h-[1px] bg-gray-200' />}
            </>
          ))}
        </div>
      </section>

      <Footer />
    </>

  )
}

export default page