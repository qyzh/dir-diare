"use client"
import { ArchiveIcon, HomeIcon, PersonIcon, RocketIcon,  } from '@radix-ui/react-icons'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ProfileImage } from './ui/uqimg'

const navItems = {
    '/': {
        name: 'home',
        icon: <HomeIcon/>,
    },
    '/blog': {
        name: 'blog',
        icon: <ArchiveIcon/>,
    },
    '/work': {
        name: 'work',
        icon: <RocketIcon/>,
    },
}

export function Navbar() {
    return (
        <aside className="fixed inset-x-0 bottom-0 z-20 mx-auto mb-4 flex h-12 px-6 align-middle items-center">
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
            
            className="relative 
            mx-auto flex 
            h-full items-
            center rounded 
            border border-zinc-800 bg-neutral-900 dark:bg-neutral-900">
                <nav
                    className="flex flex-row relative"
                    id="nav"
                >
                    <div className="flex flex-row align-middle items-center space-x-0">
                        {Object.entries(navItems).map(([path, { icon,name }]) => {
                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className="transition-all hover:text-teal-400 rounded 
                                    hover:bg-neutral-800 dark:hover:text-teal-400 flex 
                                    align-middle px-4 py-4
                                    
                                    "
                                    
                                >
                                   {icon}
                                </Link>
                            )
                        })}
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
