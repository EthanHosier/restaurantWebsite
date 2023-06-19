import Image from 'next/image'
import Footer from '@/components/Footer'
import DATA from "/public/CONSTANTS.json"
import Logo from "/public/logo.png"
import GoogleLogo from "/public/google-logo.png";
import TripadvisorLogo from "/public/tripadvisor-logo.png";
import YelpLogo from "/public/yelp-logo.png"

import React from 'react'
import iconsMap from '@/util/iconsMap'


const LOGO_MAP = { "google": GoogleLogo, "tripadvisor": TripadvisorLogo, "yelp": YelpLogo }

import Link from 'next/link'
import PhotoGallery from '@/components/PhotoGallery';



export default function Home() {

  return (
    <>
      {/* Logo Section */}
      <section className='parallax'>
        <img src={DATA.backgrounds.logoSection} className="background" alt='logo section background' />
        <div className='bg-black background opacity-10' />
        <Image src={Logo} className="w-1/2" alt='logo' />
        {DATA.bookUrl && <span className='mt-20 -mb-20'>{BOOK_A_TABLE()}</span>}

      </section>

      {/* Brief info section */}
      <section className='normal text-center flex flex-col px-4 py-16 bg-primary'>
        <div className='max-w-6xl'>
          {DATA.h1 && <h2 className='text-2xl font-bold mb-4'>{DATA.h1}</h2>}
          {DATA.p1 && <p className='mb-8'>{DATA.p1}</p>}
          {DATA.bookUrl && BOOK_A_TABLE()}

        </div>
      </section>

      {/* (Pickup & delivery section) */}
      <section className='normal h-2/3 flex-col' id='pickup-delivery'>
        <img src={DATA.backgrounds.pickupDeliverySection} className="background" alt='pick up and delivery background / extra image' />
        <div className='bg-black opacity-20 background' />
        <div className=' h-full flex flex-col md:justify-around'>
          {(DATA.pickup || DATA.delivery) && <h1 className='text-tsecondary'>{DATA.pickup && "Pick-up"}{DATA.pickup && DATA.delivery && " & "}{DATA.delivery && "Delivery"}</h1>}
          <div className='flex flex-col max-w-6xl flex-1 md:flex-row justify-around md:justify-between items-center'>
            {DATA.pickup && pickupDeliveryBtn({ type: "pick-up" })}
            {DATA.delivery && pickupDeliveryBtn({ type: "delivery" })}
          </div>
        </div>

      </section>

      {/* Reviews section */}
      <section className='normal text-center flex bg-primary'>
        <div className='max-w-6xl flex flex-col sm:flex-row gap-y-16'>
          {DATA.reviews.map((d, i) => (
            <div className='flex flex-col items-center justify-center flex-1'>
              <div className='flex-1 flex w-20 md:w-1/3 items-center mb-2'>
                <Link href={d.link}>
                  <img src={d.logo} className="w-full h-auto" alt={`${d.source} logo`} />
                </Link>
              </div>
              <p>"{d.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra parallax image section */}
      <section className='parallax flex smaller-parallax-section' id='extra-parallax-image'>
        <img src={DATA.backgrounds.extraParaPic} className="background" alt='extra booking section background' />
        <div className='bg-black background opacity-20' />
        <h1 className='text-tsecondary text-center -mt-20'>"{DATA.slogan}"</h1>
        {DATA.bookUrl && <span className='mt-20 -mb-20'>{BOOK_A_TABLE()}</span>}
      </section>


      {/*Images section*/}
      <section className='normal justify-center bg-primary'>
        <div className='flex-wrap flex justify-center gap-2'>
          {/*DATA.images.map((src, i) => (
            <img src={src} key={i} className="w-1/4 aspect-square object-cover extra-images" alt={`restaurant image ${i}`} />
          ))*/}
          <PhotoGallery/>
        </div>
      </section>

      {/* Connect with us section */}
      < section className='normal' id="connect-with-us" >
        <img src={DATA.backgrounds.connectWithUs} className="background" alt='restaurant interior' />
        <div className='h-full w-full absolute bg-black opacity-50 background '></div>

        <div className='flex flex-col'>
          <h2 className='text-xl text-tsecondary'>Connect with us</h2>
          <div className='flex justify-between mt-4'>
            {DATA.socialMediaLinks.map((link, i) => {
              const { type, url } = link;
              const IconComponent = iconsMap[type];

              return (
                <Link href={url} key={i} className="bg-accent p-2 rounded-full aspect-square">
                  <IconComponent className="text-tsecondary" />
                </Link>
              );
            })}
          </div>
        </div>
      </section >

      <Footer />
    </>
  )
}


const BOOK_A_TABLE = () => {
  return (
    <Link href={DATA.bookUrl}><p className='bg-accent rounded text-tsecondary p-4 px-7 text-xl font-semibold uppercase w-40 md:w-64 md:-mt-44 inline'>BOOK A TABLE</p></Link>
  )
}

const pickupDeliveryBtn = ({ type }) => {
  return (
    <Link href={type === "delivery" ? "/delivery" : "/pickup"}><p className='bg-accent rounded text-tsecondary p-4 px-7 text-xl font-semibold uppercase w-40 md:w-64'>{type}</p></Link>
  )
}

