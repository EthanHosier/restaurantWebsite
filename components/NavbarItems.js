import React from "react";
import { motion } from "framer-motion";
import DATA from "/public/CONSTANTS"
import Link from "next/link";

const Navbar = ({ isToggled }) => {
    const items = DATA.pages;

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
                <div className="flex flex-col items-center justify-center">

                    <div className="mb-32">
                        {items.map((item, i) => (
                            <motion.li className="nav-item" variants={navItem} key={i}>
                                <Link href={item.url}>
                                    <p className="text-center text-3xl my-4 ">{item.name}</p>
                                </Link>
                            </motion.li>
                        ))}
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
