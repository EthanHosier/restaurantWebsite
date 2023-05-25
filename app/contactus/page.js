import Footer from '@/components/Footer'
import React from 'react'
import DATA from "/public/CONSTANTS.json"

import SmoothScrollButton from '@/components/SmoothScrollButton'
import Form from '@/components/Form'

const page = () => {
    return (
        <>
            {/* Deliver - ... section*/}
            <section className='parallax flex-col'>
                <img src={DATA.backgrounds.delivery} className="background" alt='extra booking section background' />
                <div className='bg-black background opacity-20' />
                <h1 className='text-tsecondary text-center mb-24'>Contact Us</h1>
                <SmoothScrollButton target={"#contact-us-form"} title={"Contact"}/>
            </section>

            <section className='normal bg-primary'>
                <Form/>
            </section>
        

            <Footer />

        </>
    )
}

export default page