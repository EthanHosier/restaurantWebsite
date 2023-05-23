import Image from 'next/image'
import Footer from '@/components/Footer'
import DATA from "/public/CONSTANTS.json"
import Bg1 from "/public/bg1.jpg"
import Bg2 from "/public/bg2.jpg"
import Bg3 from "/public/bg3.jpg"
import Bg4 from "/public/bg4.jpg"
import Logo from "/public/logo.png"
import GoogleLogo from "/public/google-logo.png";
import TripadvisorLogo from "/public/tripadvisor-logo.png";
import YelpLogo from "/public/yelp-logo.png"
import Img1 from "/public/img1.jpg"
import Img2 from "/public/img2.jpg"
import Img3 from "/public/img3.jpg"
import Img4 from "/public/img4.jpg"
import Img5 from "/public/img5.jpg"
import Img6 from "/public/img6.jpg"
import React from 'react'
import iconsMap from '@/util/iconsMap'
import { FaBeer } from 'react-icons/fa';

const LOGO_MAP = { "google": GoogleLogo, "tripadvisor": TripadvisorLogo, "yelp": YelpLogo }
const IMAGES = [Img1, Img2, Img3, Img4, Img5, Img6]

import Link from 'next/link'


export default function Home() {

  return (
    <main className='cont bg-primary' id="parallaxContainer">

      {/* Logo Section */}
      <section className='parallax'>
        <img src={DATA.backgrounds[0]} className="background" alt='logo section background'/>
        <Image src={Logo} className="w-1/2" alt='logo'/>
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
      <section className='normal h-2/3 flex-col'>
      <img src={DATA.backgrounds[1]} className="background" alt='pick up and delivery background / extra image'/>
        <div className='bg-black background opacity-20'>{DATA.slogan}</div>
        <div className='flex flex-col md:justify-around  flex-1'>
          {(DATA.pickup || DATA.delivery) && <h1 className='text-tsecondary'>{DATA.pickup && "Pick-up"}{DATA.pickup && DATA.delivery && " & "}{DATA.delivery && "Delivery"}</h1>}
          <div className='flex flex-col  max-w-6xl md:flex-row md:justify-between items-center mt-16 gap-8'>
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
                  <Image src={LOGO_MAP[d.source]} className="w-full h-auto" alt={`${d.source} logo`} />
                </Link>
              </div>
              <p>"{d.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra parallax image section */}
      <section className='parallax' id='extra-parallax-image'>
      <img src={DATA.backgrounds[2]} className="background" alt='extra booking section background'/>
        <div className='bg-black background opacity-20' />
        <h1 className='text-tsecondary text-center'>{DATA.slogan}</h1>
        {DATA.bookUrl && <span className='mt-20 -mb-20'>{BOOK_A_TABLE()}</span>}
      </section>


      {/*Images section*/}
      <section className='normal justify-center bg-primary'>
        <div className='flex-wrap flex justify-center gap-2'>
          {IMAGES.map((img, i) => (
            <Image src={img} key={i} className="w-1/4 aspect-square object-cover" alt={`restaurant image ${i}`}/>
          ))}
        </div>
      </section>

      {/* Connect with us section */}
      <section className='normal' id="connect-with-us">
      <img src={DATA.backgrounds[3]} className="background" alt='restaurant interior'/>
        <div className='h-full w-full absolute bg-black opacity-50 background '></div>

        <div className='flex flex-col'>
          <h2 className='text-xl text-tsecondary'>Connect with us</h2>
          <div className='flex justify-between mt-4'>
            {DATA.socialMediaLinks.map((link, i) => {
              const { type, url } = link;
              const IconComponent = iconsMap[type];

              return (
                <Link href={url} key={i} className="bg-accent p-2 rounded-full aspect-square">
                  <IconComponent className="text-tsecondary"/>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


const BOOK_A_TABLE = () => {
  return (
    <Link href={DATA.bookUrl}><p className='bg-accent rounded text-tsecondary p-4 px-7 text-xl font-semibold uppercase w-40 md:w-64 md:-mt-44 inline'>BOOK A TABLE</p></Link>
  )
}

const pickupDeliveryBtn = ({ type }) => {
  return (
    <Link href={type === "delivery" ? "/delivery" : "/pickup"}><p className='bg-accent rounded text-tsecondary p-4 px-7 text-xl font-semibold uppercase w-40 md:w-64 md:-mt-44'>{type}</p></Link>
  )
}


/*
<section className='normal text-center flex flex-col px-4 py-16 h-96'>
        
</section>


*/