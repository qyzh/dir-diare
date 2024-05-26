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
            <NavIndex />
            <div className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased sm:h-[24rem]">
                <div className="max-w-2xl mx-auto p-4">
                    <div className="text-3xl md:text-7xl font-bold mb-6 relative dark:text-zinc-100 text-zinc-700 max-w-4xl">
                        Hi,
                        <FlipWords words={words} />
                    </div>
                    <div className="relative font-regular text-sm sm:text-xl text-zinc-500 tracking-wide mb-8 text-left max-w-2xl antialiased">
                        Welcome to dir-diare
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
