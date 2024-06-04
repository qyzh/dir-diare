"use client"
import { SlashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navItems = {
    '/': {
        name: 'home',
    },
    '/blog': {
        name: 'blog',
    },
    '/work': {
        name: 'work',
    },
}

export function Navbar() {
    return (
        <aside className="-ml-[14px] mb-16 tracking-tight">
            <motion.div 
                                initial={{
                                    y: -40,
                                    opacity: 0
                                  }}
                                  animate={{
                                    y: 0,
                                    opacity: 1
                                  }}
                                  transition={{
                                    duration: 0.5
                                  }}
            
            className="lg:sticky lg:top-20">
                <nav
                    className="flex flex-row relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
                    id="nav"
                >
                    <div className="flex flex-row space-x-0 pr-10 ">
                        {Object.entries(navItems).map(([path, { name }]) => {
                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                                >
                                    {name}
                                </Link>
                            )
                        })}
                    </div>

                    <div className="flex align-middle relative py-1 px-2 m-1 ml-auto">
                        <span className="hidden text-neutral-300 dark:text-neutral-500 md:pr-2 md:block hover:animate-pulse">
                            Random world
                        </span>
                        <span className="font-bold pt-1 hover:animate-spin">
                            {' '}
                            <SlashIcon/> {' '}
                        </span>
                        <span className=' transition-all font-mono md:pl-2 hover:text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600"'>
                            .dir-diare
                        </span>
                    </div>
                </nav>
            </motion.div>
        </aside>
    )
}

/* header for home or index */

export function NavIndex() {
    return (
        <aside className="-ml-[8px] tracking-tight">
            <div className="lg:sticky lg:top-20">
                <nav
                    className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
                    id="nav"
                >
                    <div className="flex flex-row space-x-0 pl-14">
                        <h1 className="font-mono pr-2">.dir-diare</h1>
                        <span className="font-bold"> / </span>
                        <span className="text-neutral-300 dark:text-neutral-500 pl-2">
                            Random world
                        </span>
                    </div>
                </nav>
            </div>
        </aside>
    )
}
