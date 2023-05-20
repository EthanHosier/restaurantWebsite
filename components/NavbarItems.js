import React from "react";
import { motion } from "framer-motion";
import data from "/public/CONSTANTS.json"
import Link from "next/link";

const Navbar = ({ isToggled }) => {

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

                    {data.pages.map((p, i) => (
                        <motion.li className="nav-item" variants={navItem} key={i}>
                            <Link href={p.url}>
                                <p className="text-4xl text-secondary my-4 uppercase">{p.name}</p>
                            </Link>
                        </motion.li>
                    ))}
                    <motion.li variants={navItem}>
                        <div className="mt-96">
                            <Link href={data.bookUrl}><span className="bg-accent rounded-md p-4 px-7 text-white font-semibold text-xl mt-32">BOOK A TABLE</span></Link>
                        </div>
                    </motion.li>
                </div>
            </motion.ul>
        </>
    );
};

export default Navbar;
