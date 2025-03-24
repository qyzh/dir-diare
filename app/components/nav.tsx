"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { House, NotebookPen, TestTubeDiagonal } from 'lucide-react';

const navItems = {
    '/': {
        name: 'home',
        icon: (
            <House />
        ),
    },
    '/blog': {
        name: 'blog',
        icon: (
            <NotebookPen />
        ),
    },
    '/work': {
        name: 'work',
        icon: (
            <TestTubeDiagonal />
        ),
    },
};

export function Navbar() {
    return (
        <aside className="fixed flex inset-x-0 bottom-0 z-20 mx-auto mb-4 h-12 px-6 align-middle items-center">
            <motion.div
                initial={{
                    y: -40,
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="relative mx-auto flex h-full items-center rounded border border-zinc-800 bg-neutral-900 dark:bg-neutral-900 p-4"
            >
                <nav className="flex flex-row relative" id="nav">
                    <div className="flex flex-row align-middle items-center space-x-6">
                        {Object.entries(navItems).map(([path, { icon, name }]) => {
                            return (
                                <Link
                                    key={path}
                                    href={path}
                                    className="transition-all duration-300 hover:text-teal-400 rounded-full p-2 dark:hover:text-teal-400 flex align-middle hover:scale-110 hover:bg-teal-400/10"
                                >
                                    {icon}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </motion.div>
        </aside>
    );
}