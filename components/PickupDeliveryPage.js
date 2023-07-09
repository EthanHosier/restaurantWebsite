import React from 'react'
import toTitleCase from '@/util/toTitleCase'
import Footer from '@/components/Footer'
import Link from 'next/link'
import DeliverooLogo from "/public/DeliveryPickupLogos/deliveroo-logo.webp"
import JustEatLogo from "/public/DeliveryPickupLogos/just-eat.webp"
import UberEatsLogo from "/public/DeliveryPickupLogos/uber-eats.webp"

import Image from 'next/image'

const LOGO_MAP = {"uber eats": UberEatsLogo, "just eat": JustEatLogo, "deliveroo": DeliverooLogo };

const PickupDeliveryPage = async ({DATA, type}) => {

  return (

    <>
      {/* Deliver - ... section*/}
      <section className='parallax pickup-delivery-parallax-section flex-col items-center justify-center'>
        <Image src={DATA.backgrounds[type]} fill className="background" alt='extra booking section background' priority={true} unoptimized={true}/>
        <div className='bg-black background opacity-20' />
        <h1 className='text-tsecondary text-center md:mb-20 mt-20'>{toTitleCase(type)}</h1>
      </section>


      {/*Order selection section*/}
      <section className='normal text-center flex bg-primary text-tprimary' id='order-options'>
        <div className='max-w-6xl flex flex-col px-4 gap-y-16 w-full'>
          {DATA[`${type}Options`].map((location, i) => (
            <>
              <div className='flex flex-col items-center w-full'>
                <h3 className='font-semibold text-2xl sm:text-4xl w-full text-start mb-8 md:mb-12'>{toTitleCase(location.location)}</h3>
                
                <div className='flex flex-col sm:flex-row'>
                  {
                    location.options.map((d, i) => (
                      <div className={`flex flex-col items-center justify-center ${i < location.options.length - 1 && "mb-8 sm:mb-0"}`}>

                        {
                          <div className='flex-1 flex w-56 md:w-5/6 max-w-2xl items-center justify-center'>
                          <Link href={d.url} target='_blank' className="flex items-center justify-center md:my-4">
                            <Image src={LOGO_MAP[d.type]} style={{ width: "360px", height: "auto" }} className="w-3/4 h-auto" alt={`${d.type} logo`} />
                          </Link>
                        </div>
                          
                        }

                        <Link href={d.url}>
                          <p className="bg-accent text-ttertiary p-3 rounded text-xl font-semibold my-4">{toTitleCase(type)} via {toTitleCase(d.type)}</p>
                        </Link>
                      </div>
                    ))
                  }
                </div>
              </div>
              {i < DATA[`${type}Options`].length - 1 && <div className='w-full h-[1px] bg-gray-200' />}
            </>
          ))}
        </div>
      </section>

      <Footer DATA={DATA}/>
    </>

  )
}

export default PickupDeliveryPage