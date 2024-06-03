'use client'
import React from 'react'
import { FlipWords } from './components/ui/flip-words'
import { HoverEffect } from './components/ui/card-hover-effect'
import { BackgroundBeams } from './components/ui/background-beams'
import  AnimatedGridPattern  from './components/ui/animate-gridpattern'
import TextShimmer from "./components/ui/animated-shiny-text";
import { ArrowRightIcon, DoubleArrowDownIcon } from '@radix-ui/react-icons'
import { cn } from "utils/cn";

function BlogLink({ slug, name }) {
    return (
            <div className="z-10 mb-8 items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
              )}
            >
              <TextShimmer className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨
                <a href={`/blog/${slug}`} className="md:ml-2">
                    {name}
                </a>
                </span>
                <ArrowRightIcon/>
              </TextShimmer>
            </div>
          </div>
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
                <AnimatedGridPattern
        numSquares={40}
        maxOpacity={0.5}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-55%] h-[200%] skew-y-0",
        )}
      />
                <div className="z-5 mb-8">
                        <BlogLink name="Hello World!" slug="hello-w" />

                    <div className="flex justify-center animate-bounce text-sm">
                        <a href="#sec2">
                            <DoubleArrowDownIcon className='
                            flex 
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
                            ' />
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
