"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Pencil, FlaskConical, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navItems = {
    '/': {
        name: 'home',
        icon: (
            <Home
                size={20}
                className="transition-all duration-300"
            />
        ),
    },
    '/w': {
        name: 'writing',
        icon: (
            <Pencil
                size={20}
                className="transition-all duration-300"
            />
        ),
    },
    '/l': {
        name: 'labs',
        icon: (
            <FlaskConical
                size={20}
                className="transition-all duration-300"
            />
        ),
    },
    '/about': {
        name: 'about',
        icon: (
            <User
                size={20}
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
                className="relative flex rounded border border-neutral-800 dark:border-neutral-700 bg-white/10 dark:bg-neutral-900/30 backdrop-blur-md"
            >
                <nav className="flex flex-row" id="nav">
                    {Object.entries(navItems).map(([path, { icon, name }]) => {
                        const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
                        return (
                            <Link
                                key={path}
                                href={path}
                                className={`
                                    p-4 flex items-center justify-center
                                    ${isActive
                                        ? 'bg-teal-900 dark:bg-teal-500/20 dark:text-teal-400 '
                                        : 'hover:bg-neutral-700/80'
                                    }
                                    transition-all duration-200
                                `}
                                title={name}
                            >
                                {icon}
                            </Link>
                        );
                    })}
                </nav>
            </motion.div>
        </aside>
    );
}
