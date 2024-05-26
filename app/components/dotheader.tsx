'use client'
import React from 'react'
import { cn } from 'utils/cn'
import { Spotlight } from 'app/components/ui/spotlight'

export function SpotlightPreview() {
    return (
        <div className="h-dvh w-full rounded-md flex md:items-center md:justify-center  antialiased bg-grid-white/[0.02] relative">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                <h1 className="prose text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    Hey, I'm Qyou
                </h1>
                <p className="prose mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                    Syauqi Ashadullah is my name and I live in Bandung. My
                    favourite things are <i>coffee</i> + <i>live music</i>. In
                    short, I made <strong>this blog</strong> for me personally,
                    because I don't like to tell people about my{' '}
                    <strong>life</strong>, <strong>feelings</strong>,{' '}
                    <strong>love</strong>, <strong>drama</strong>,{' '}
                    <strong>college</strong>, <strong>friendship </strong>
                    verbally, I prefer to let it out by{' '}
                    <a href="/blog" className="font-semibold">
                        writing
                    </a>{' '}
                    it. Because if I don't express these feelings, it can make
                    me <strong>gila</strong>.
                </p>
            </div>
        </div>
    )
}
