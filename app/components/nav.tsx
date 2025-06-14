"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import homeIcon from '/public/svg/home.svg';
import writeIcon from '/public/svg/quill_ink.svg';
import tubeIcon from '/public/svg/testtube.svg';
import userIcon from '/public/svg/user.svg';
import photoIcon from '/public/svg/photo.svg';
import NotesIcon from '/public/svg/notes.svg';
import { usePathname } from 'next/navigation';

const navItems = {
    '/': {
        name: 'home',
        icon: (
            <Image
                src={homeIcon}
                alt="Home"
                width={24}
                height={24}
                className="transition-all duration-300"
            />
        ),
    },
    '/w': {
        name: 'writing',
        icon: (
            <Image
            src={writeIcon}
            alt="blog"
            width={24}
            height={24}
            className="transition-all duration-300"
        />
        ),
    },
    '/l': {
        name: 'labs',
        icon: (
            <Image
            src={tubeIcon}
            alt="Work"
            width={24}
            height={24}
            className="transition-all duration-300"
        />
        ),
    },
        '/g': {
        name: 'galery',
        icon: (
            <Image
            src={photoIcon}
            alt="Galery"
            width={24}
            height={24}
            className="transition-all duration-300"
        />
        ),
    },
    '/n': {
        name: 'Notes',
        icon: (
            <Image
            src={NotesIcon}
            alt="Nalery"
            width={24}
            height={24}
            className="transition-all duration-300"
        />
        ),
    },
    '/about': {
        name: 'about',
        icon: (
            <Image
            src={userIcon}
            alt="About"
            width={24}
            height={24}
            className="transition-all duration-300"
        />
        ),
    },
};

export function Navbar() {
    const pathname = usePathname();

    return (
        <aside className="fixed flex inset-x-0 bottom-0 z-20 mx-auto mb-4 px-6 align-middle items-center justify-center">
            <motion.div
                initial={{
                    y: 40,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="relative flex h-16 items-center rounded bg-black dark:bg-neutral-950 backdrop-blur-lg px-4 py-2 border border-neutral-800 dark:border-neutral-700"
                style={{
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                }}
            >
                <nav className="flex flex-row relative" id="nav">
                    <div className="flex flex-row align-middle items-center space-x-6">
                        {Object.entries(navItems).map(([path, { icon, name }]) => {
                            const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));

                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className={`
                                        transition-all duration-300 rounded p-2
                                        flex items-center justify-center
                                        ${isActive
                                            ? 'bg-teal-900 dark:bg-teal-500/20 dark:text-teal-400 scale-110'
                                            : 'hover:bg-neutral-700/80 hover:scale-110'
                                        }
                                        relative group
                                    `}
                                >
                                    <motion.div
                                        whileHover={{
                                            scale: 1.2,
                                            y: -5
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10
                                        }}
                                    >
                                        {icon}

                                        <div className={`
                                            w-full h-1 rounded-full mt-1 mx-auto
                                            bg-gradient-to-t from-transparent to-white/20
                                            ${isActive ? 'opacity-70' : 'opacity-0 group-hover:opacity-30'}
                                            transition-all duration-300
                                        `} style={{ width: '80%' }}></div>
                                    </motion.div>

                                    <span className="absolute font-mono bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity border border-neutral-700/50 shadow-lg">
                                        {name}
                                    </span>
                                </Link>
                            );
                        })}   
                    </div>
                </nav>
            </motion.div>
        </aside>
    );
}
