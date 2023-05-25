import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DATA from "/public/CONSTANTS"
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/logo.png"
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const Navbar = ({ isToggled }) => {
    const items = DATA.navOptions;
    const [activeOptions, setActiveOptions] = useState(new Array(DATA.navOptions.length));

    const handleOptionClick = (i) => {
        const newActives = [...activeOptions];
        newActives[i] = !newActives[i];
        setActiveOptions(newActives);
    }

    const navList = {
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.02
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const navItem = {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        hidden: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        }
    };

    return (
        <>
            <motion.ul
                className="navList"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={navList}
            >

                <div className="flex flex-col flex-1 justify-between items-center py-24">


                    <div>
                        <motion.li variants={navItem} className="nav-item flex justify-center mb-12">
                            <Image src={Logo} className="w-1/2" />
                        </motion.li>
                        {items.map((item, i) => (
                            <motion.li className="nav-item" variants={navItem} key={i}>

                                {item.url ?
                                    <Link href={item.url}>
                                        <p className="text-center text-3xl my-4 ">{item.name}</p>
                                    </Link>
                                    :
                                    <>
                                        <div className="flex items-center justify-center" onClick={() => handleOptionClick(i)}>
                                            {
                                                !!activeOptions[i] ? <AiOutlineMinus size={24}/> : <AiOutlinePlus size={24}/>
                                            }
                                            
                                            <p className="text-center text-3xl my-1 ml-2">{item.name}</p>
                                        </div>
                                        {!!activeOptions[i] && item.dropdownOptions.map((d, j) => (
                                            <Link key={j} href={d.url}>
                                                <p className="text-center">{d.name}</p>
                                            </Link>
                                        ))}
                                    </>

                                }


                            </motion.li>
                        )
                        )}
                    </div>

                    <motion.li variants={navItem}>
                        <Link href={DATA.bookUrl} className="bg-accent rounded-md p-4 px-7 text-white font-semibold text-xl">BOOK A TABLE</Link>
                    </motion.li>
                </div>




            </motion.ul>
        </>
    );
};

export default Navbar;
