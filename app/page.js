import Image from 'next/image'
import Footer from '@/components/Footer'
import DATA from "/public/CONSTANTS.json"
import GoogleLogo from "/public/ReviewLogos/google-logo.webp";
import Tripadvisor from "/public/ReviewLogos/tripadvisor.webp"
import YelpLogo from "/public/ReviewLogos/yelp-logo.webp"

import React from 'react'
import iconsMap from '@/util/iconsMap'


import Link from 'next/link'
import PhotoGallery from '@/components/PhotoGallery';
import { getWebsiteData } from '@/util/util';

export const revalidate = process.env.REVALIDATE_SECS 

const LOGO_MAP = { tripadvisor: Tripadvisor, google: GoogleLogo, yelp: YelpLogo }

export default async function Home() {

  const DATA = await getWebsiteData();

  return (
    <>
      {/* Logo Section */}
      <section className='parallax relative'>
        <Image src={DATA.backgrounds.logoSection} className="background" alt='logo section background' fill priority={true} />
        <div className='bg-black background opacity-10' />
        <div className='w-2/3 h-1/4 relative flex flex-col'>
          <Image src={DATA.logo} fill className="object-contain opacity-0 animate-fade-in" priority={true}/>
        </div>
        {DATA.bookUrl && <span className='mt-20 -mb-20'>{BOOK_A_TABLE()}</span>}
        {BOOK_A_TABLE()}
      </section>

      {/* Brief info section */}
      <section className='normal text-center flex flex-col px-4 py-16 bg-primary'>
        <div className='max-w-6xl px-4'>
          {DATA.infoTitle && <h2 className='text-2xl font-bold mb-8'>{DATA.infoTitle}</h2>}
          {DATA.infoText && <p className='mb-16 md:text-xl'>{DATA.infoText}</p>}
          {DATA.bookUrl && BOOK_A_TABLE()}

        </div>
      </section>

      {/* (Pickup & delivery section) */}
      <section className='normal flex-col' id='pickup-delivery'>
        <Image src={DATA.backgrounds.pickupDeliverySection} className="background" fill alt='pick up and delivery background / extra image' priority={true} />

        <div className='bg-black opacity-20 background' />
        <div className=' h-full flex flex-col md:justify-around'>
          {(DATA.pickup || DATA.delivery) && <h1 className='text-tsecondary'>{DATA.pickup && "Pick-up"}{DATA.pickup && DATA.delivery && " & "}{DATA.delivery && "Delivery"}</h1>}
          <div className='flex flex-col max-w-6xl flex-1 md:flex-row justify-around md:justify-between items-center gap-4'>
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
                  <Image src={LOGO_MAP[d.source]} alt={`${d.source} logo`} style={{ width: "full", height: "auto" }} priority={true} />

                </Link>
              </div>
              <p>"{d.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra parallax image section aka slogan section*/}
      <section className='parallax flex smaller-parallax-section'>
        <Image src={DATA.backgrounds.sloganSection} className="background" fill alt='extra booking section background' />
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
          <PhotoGallery DATA={DATA} />
        </div>
      </section>

      {/* Connect with us section */}
      < section className='normal' id="connect-with-us" >
        <Image src={DATA.backgrounds.connectWithUs} className="background" fill alt='restaurant interior' priority={true} />
        <div className='h-full w-full absolute bg-black opacity-50 background '></div>

        <div className='flex flex-col'>
          <h2 className='text-xl text-tsecondary'>Connect with us</h2>
          <div className='flex justify-center mt-4 gap-2'>
            {DATA.socialMediaLinks.map((link, i) => {
              const { type, url } = link;
              const IconComponent = iconsMap[type];

              return (
                <Link href={url} key={i} className="bg-accent p-2 rounded-full aspect-square">
                  <IconComponent className="text-ttertiary" />
                </Link>
              );
            })}
          </div>
        </div>
      </section >

      <Footer DATA={DATA} />
    </>
  )
}


const BOOK_A_TABLE = () => {
  return (
    <Link href={DATA.bookUrl} target={DATA.useExternalBookingSystem ? "_blank" : "_self" } className='z-10'><p className='bg-accent rounded text-ttertiary p-4 px-7 text-xl font-semibold uppercase w-40 md:w-64 md:-mt-44 inline'>BOOK A TABLE</p></Link>
  )
}

const pickupDeliveryBtn = ({ type }) => {
  return (
    <div className='bg-accent p-4 px-7 w-40 md:w-64 rounded flex items-center justify-center'>
      <Link href={type === "delivery" ? "/delivery" : "/pickup"}><p className='text-ttertiary text-xl font-semibold uppercase '>{type}</p>
      </Link>
    </div>
  )
}

