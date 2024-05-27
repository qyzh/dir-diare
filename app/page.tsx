'use client'
import React from 'react'
import { FlipWords } from './components/ui/flip-words'
import { HoverEffect } from './components/ui/card-hover-effect'
import { BackgroundBeams } from './components/ui/background-beams'

function ArrowIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            className="flex 
        justify-center 
        items-center 
        select-none 
        bg-black 
        border-2 
        text-neutral-300 
        text-sm
        font-bold 
        p-2 
        m-2 
        rounded-full 
        shadow-[0_8px_16px_rgb(0_0_0/0.4)] 
        border border-transparent
        border-white/[0.2]
        h-12 
        w-12 
        focus:outline-none 
        focus:shadow-outline"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
        </svg>
    )
}

function BlogLink({ slug, name }) {
    return (
        <a href={`/blog/${slug}`} className="md:ml-2">
            <div className="flex flex-col">
                <p className="font-small text-neutral-900 dark:text-neutral-100">
                    {name}
                </p>
            </div>
        </a>
    )
}

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
                        <FlipWords words={words} />
                        <br />
                        <div className="relative text-xl font-regular text-zinc-500 mb-4 tracking-wide md:mb-8 max-w-2xl antialiased md:text-5xl">
                            Welcome to dir-diare
                        </div>
                    </div>
                </div>
                <BackgroundBeams />
                <div className="z-5 mb-8">
                    <div
                        className="z-5 mb-8 text-xs flex items-center leading-5 border border-transparent
        hover:border-white/[0.2] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-400/10 rounded-full py-1 px-1 hover:bg-red xl:flex items-center py-1 px-3"
                    >
                        <strong className="hidden items-center md:block">
                            new
                        </strong>
                        <BlogLink name="Hello World!" slug="hello-w" />
                    </div>

                    <div className="flex justify-center animate-bounce text-sm">
                        <a href="#sec2">
                            <ArrowIcon />
                        </a>
                    </div>
                </div>
            </div>

            <div id="sec2">
                <div className="max-w-5xl mx-auto px-8">
                    <HoverEffect items={projects} />
                </div>
            </div>
        </section>
    )
}
