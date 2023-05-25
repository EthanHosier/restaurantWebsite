import Footer from '@/components/Footer'
import React from 'react'
import DATA from "/public/CONSTANTS.json"
import Link from 'next/link'
import toTitleCase from '@/util/toTitleCase'
import SmoothScrollButton from '@/components/SmoothScrollButton'

const page = ({ params }) => {

    const { location } = params;

    return (
        <>
            {/* Deliver - ... section*/}
            <section className='parallax flex-col'>
                <img src={DATA.backgrounds.pickup} className="background" alt='extra booking section background' />
                <div className='bg-black background opacity-20' />
                <h1 className='text-tsecondary text-center mb-24'>Pickup - {toTitleCase(location)}</h1>
                <SmoothScrollButton target={"#order-options"} title={"PICKUP NOW"}/>
            </section>

            {/*Order selection section*/}
            <section className='normal text-center flex bg-primary' id='order-options'>
                <div className='max-w-6xl flex flex-col sm:flex-row gap-y-16'>
                    {DATA.pickupOptions[location].map((d, i) => (
                        <div className='flex flex-col items-center justify-center flex-1'>
                            <div className='flex-1 flex w-56 md:w-5/6 max-w-2xl items-center'>
                                <Link href={d.url}>
                                    <img src={d.logo} className="w-full h-auto" alt={`${d.name} logo`} />
                                </Link>
                            </div>
                            <Link href={d.url}>
                                <p className="bg-accent text-tsecondary p-3 rounded md:-mt-4 text-xl font-semibold">Pickup via {d.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />

        </>
    )


}



export default page