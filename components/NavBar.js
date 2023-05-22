"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import NavbarItems from "./NavbarItems";
import Logo from "/public/logo.png"
import data from "/public/CONSTANTS.json"
import Hamburger from 'hamburger-react'


const Navbar = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isFullScreenNavVisible, setisFullScreenNavVisible] = useState(false);


    const handleScroll = () => {
        const mainElement = document.getElementById('parallaxContainer');
        const currentScrollPos = mainElement.pageYOffset || mainElement.scrollTop;
        const isVisible = prevScrollPos > currentScrollPos || currentScrollPos <= 200;
        setPrevScrollPos(currentScrollPos);
        setIsVisible(isVisible);
    };

    useEffect(() => {
        const mainElement = document.getElementById('parallaxContainer');
        mainElement.addEventListener('scroll', handleScroll);
        return () => {
            mainElement.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);


    const navContainer = {
        visible: {
            //x: 0,
            opacity: 1,
            transition: {
                x: { velocity: 100 },
                duration: 0.2,
            },
        },
        hidden: {
            //x: -250,
            opacity: 0,
            transition: {
                x: { velocity: 100 },
                duration: 0.2,
            },
        },
    };

    return (
        <nav className={`fixed top-0 left-0 w-screen bg-primary transition-transform duration-300 ease-in-out z-10 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className='flex justify-center shadow'>
                <div className='flex justify-between items-center p-4 md:px-12 max-w-7xl flex-1'>
                    <Link href={"/"}>
                        <Image src={Logo} width={0} className="w-20 md:w-28" alt='Logo' />
                    </Link>
                    <div className='hidden md:flex flex-1 justify-around max-w-2xl'>
                        {data.pages.map((p, i) => {
                            return (
                                <Link href={p.url} key={i}>
                                    <p className='text-tprimary uppercase'>{p.name}</p>
                                </Link>
                            )
                        })}
                    </div>
                    <Link href={data.bookUrl}>
                        <p className='bg-accent rounded text-tsecondary p-3 px-4 text-sm hidden md:block font-semibold'>
                            BOOK A TABLE
                        </p>
                    </Link>
                    <div className={`md:hidden z-10 right-4 ${isFullScreenNavVisible ? "fixed" : "absolute"}`}>
                        <Hamburger toggled={isFullScreenNavVisible} toggle={setisFullScreenNavVisible} />
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <AnimatePresence>
                {isFullScreenNavVisible && (
                    <motion.div
                        className="navbar bg-primary h-screen"
                        initial="hidden"
                        animate={isFullScreenNavVisible ? "visible" : "hidden"}
                        exit="hidden"
                        variants={navContainer}
                    >
                        <NavbarItems isToggled={isFullScreenNavVisible} />
                    </motion.div>
                )}
            </AnimatePresence>

        </nav>
    );
};

export default Navbar;
