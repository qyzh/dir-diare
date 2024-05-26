'use client'
import React from 'react'
import { FlipWords } from './components/ui/flip-words'
import { HoverEffect } from './components/ui/card-hover-effect'
import { NavIndex, Navbar } from './components/nav'
import { BackgroundBeams } from './components/ui/background-beams'

export default function Page() {
    const words = ['darling...', 'cute...', 'beautiful...', 'baby...']
    const projects = [
        {
            title: 'Blog',
            description: 'A daily random journal.',
            link: '/blog',
        },
        {
            title: 'Work',
            description: 'A summary of my work and contributions.',
            link: '/work',
        },
    ]
    return (
        <section>
            <div className="h-screen w-full rounded-md relative text-center flex flex-col items-center justify-center antialiased lg:h-screen lg:text-left">
                <div className="max-w-2xl mx-auto p-4">
                    <div className="text-3xl md:text-7xl font-bold mb-6 relative dark:text-zinc-100 text-zinc-700 max-w-4xl">
                        Hi,
                        <FlipWords words={words} /><br />
                        <div className="relative font-regular text-zinc-500 tracking-wide mb-8 max-w-2xl antialiased md:text-5xl">
                        Welcome to dir-diare
                    </div>
                    </div>
                </div>
                <BackgroundBeams />
            </div>
            <div>
                <div className="max-w-5xl mx-auto px-8">
                    <HoverEffect items={projects} />
                </div>
            </div>
        </section>
    )
}
