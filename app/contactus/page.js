import Footer from '@/components/Footer'
import React from 'react'

import SmoothScrollButton from '@/components/SmoothScrollButton'
import Form from '@/components/Form'
import { getWebsiteData } from '@/util/util'
import Image from 'next/image'

export const revalidate = 3600 * 3 // revalidate every 3 hours


const page = async() => {
    const DATA = await getWebsiteData();
    
    return (
        <>
            <section className='parallax pickup-delivery-parallax-section flex-col'>
                <Image src={DATA.backgrounds.contactUs} fill unoptimized={true} priority={true} className="background" alt='extra booking section background' /> 
                <div className='bg-black background opacity-20' />
                <h1 className='text-tsecondary text-center mt-20'>Contact Us</h1>
            </section>

            <section className='normal bg-primary' id="contact-form">
                <Form DATA={DATA}/>
            </section>
        

            <Footer DATA={DATA}/>

        </>
    )
}

export default page