import Link from 'next/link'
import React from 'react'
import DATA from "/public/CONSTANTS"
import iconsMap from '@/util/iconsMap'

const Footer = () => {
    const siteNavigation = [{ name: "Home", url: "/" }, ...DATA.navOptions.filter((n) => n.dropdownOptions.length <= 0), { name: "Book a Table", url: DATA.bookUrl }]
    return (
        <>
            

            <footer className='normal bg-secondary text-tsecondary/[.90] flex flex-col'>
                <div className='flex flex-wrap gap-6'>
                    {DATA.addresses.map((a, i) => (
                        <div className='justify-start text-start text-xs md:text-sm'>
                            <h3 className='font-semibold text-sm md:text-md'>{a.area}</h3>
                            <p>{a.address}</p>
                            <a href={`tel:${a.phone.replace(/\s/g, '')}`} className="underline">{a.phone}</a>
                            <h4 className='font-semibold mt-3'>Opening times</h4>
                            {a.openingTimes.map((ot, i) => (
                                <p>{ot}</p>
                            ))}
                        </div>
                    ))}

                    <div className='justify-start text-start text-xs md:text-sm'>
                        <p className='font-semibold'>{DATA.hashtag}</p>
                        <div className='flex mt-1 mb-1 gap-1'>
                            {DATA.socialMediaLinks.map((link, i) => {
                                const { type, url } = link;
                                const IconComponent = iconsMap[type];

                                return (
                                    <Link href={url} key={i} className="bg-black p-1 rounded-full aspect-square flex items-center justify-center">
                                        <IconComponent className="text-tsecondary aspect-square w-4" />
                                    </Link>
                                );
                            })}
                        </div>
                        {DATA.emails.map((e, i) => (
                            <p key={i}>Email: {e}</p>
                        ))}

                    </div>

                </div>
                <div className='flex gap-4 mt-4'>
                    {siteNavigation.map((sn, i) => (
                        <Link href={sn.url}>
                            <p className='underline text-xs md:text-sm'>{sn.name}</p>
                        </Link>
                    ))}
                </div>
                <p className='text-xs md:text-sm mt-4'>© {DATA.name} - All Rights Reserved</p>
                <p className='text-xs md:text-sm mb-14'>Website by <a href='https://hosierwebsites.com' className='underline'>Hosier Websites</a></p>
            </footer>
        </>
    )
}

export default Footer