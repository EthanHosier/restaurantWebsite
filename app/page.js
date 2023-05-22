import Image from 'next/image'
import DATA from "/public/CONSTANTS.json"
import Bg1 from "/public/bg1.jpg"
import Bg2 from "/public/bg2.jpg"
import Bg3 from "/public/bg3.jpg"
import Bg4 from "/public/bg4.jpg"
import Logo from "/public/logo.png"
import GoogleLogo from "/public/google-logo.png";
import TripadvisorLogo from "/public/tripadvisor-logo.png";
import YelpLogo from "/public/yelp-logo.png"
import { Dancing_Script } from 'next/font/google'

const LOGO_MAP = { "google": GoogleLogo, "tripadvisor": TripadvisorLogo, "yelp": YelpLogo }

import Link from 'next/link'

export default function Home() {

  return (
    <main className='cont bg-primary' id="parallaxContainer">

      {/* Logo Section */}
      <section className='parallax'>
        <Image src={Bg1} width={0} height={0} className="background" />
        <Image src={Logo} width={0} height={0} className="w-1/2" />
        {DATA.bookUrl && <span className='mt-20 -mb-20'>{BOOK_A_TABLE()}</span>}
      </section>

      {/* Brief info section */}
      <section className='normal text-center flex flex-col px-4 py-16'>
        <div className='max-w-6xl'>
          {DATA.h1 && <h2 className='text-2xl font-bold mb-4'>{DATA.h1}</h2>}
          {DATA.p1 && <p className='mb-8'>{DATA.p1}</p>}
          {DATA.bookUrl && BOOK_A_TABLE()}
        </div>
      </section>

      {/* (Pickup & delivery section) */}
      <section className='normal h-2/3 flex-col'>
        <Image src={Bg2} width={0} height={0} className="background" />
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
      <section className='normal text-center flex'>
        <div className='max-w-6xl flex flex-col sm:flex-row gap-y-16'>
          {DATA.reviews.map((d, i) => (
            <div className='flex flex-col items-center justify-center flex-1'>
              <div className='flex-1 flex w-20 md:w-1/3 items-center mb-2'>
                <Link href={d.link}>
                  <Image src={LOGO_MAP[d.source]} className="w-full h-auto" />
                </Link>
              </div>
              <p>"{d.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Extra parallax image section */}
      <section className='parallax' id='extra-parallax-image'>
        <Image src={Bg3} width={0} height={0} className="background" />
        <div className='bg-black background opacity-20'>{DATA.slogan}</div>
        <h1 className='text-tsecondary'>{DATA.slogan}</h1>
        {DATA.bookUrl && <span className='mt-20 -mb-20'>{BOOK_A_TABLE()}</span>}
      </section>


      {/*Images section*/}
      <section className='normal'>
          <div className='flex-wrap'>
            
          </div>  
      </section>
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

<section className='normal' id="connect-with-us">
  <Image src={Bg4} width={0} height={0} className="background" />
  <div className='h-full w-full absolute bg-overlay opacity-75 background '></div>
  <h2 className='text-xl text-tprimary'>Connect with us</h2>
</section>
*/