import Footer from '@/components/Footer'
import React from 'react'
import DATA from "/public/CONSTANTS.json"

import SmoothScrollButton from '@/components/SmoothScrollButton'
import Form from '@/components/Form'

const page = () => {
    return (
        <>
            {/* Deliver - ... section*/}
            <section className='parallax pickup-delivery-parallax-section flex-col'>
                <img src={DATA.backgrounds.connectWithUs} className="background" alt='extra booking section background' /> {/*REPLACE WITH OWN CONTACT US PIC (and put opacity back to 20 on overlay below) */}
                <div className='bg-black background opacity-50' />
                <h1 className='text-tsecondary text-center mt-20'>Contact Us</h1>
            </section>

            <section className='normal bg-primary' id="contact-form">
                <Form/>
            </section>
        

            <Footer />

        </>
    )
}

export default page