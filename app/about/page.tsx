
import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link';
import Image from 'next/image';
import {  Navbar } from '../components/nav'
import Saweria from 'app/components/saweria'


function Webzx ({ children }) {
    return (
        <span className='font-mono transition-all text-zinc-300 hover:text-white text-sm rounded border px-1 border-zinc-700 bg-zinc-800 inline-block
        '>
            {children}
        </span>
    );
  }

export const metadata: Metadata = {
    title: 'About',
    description: 'Little about me and this blog.',
}


export default function AboutkPage() {
    
    return (
        <section>
            <div className="absolute inset-0 -z-10 h-full w-full"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
                </div>
                </div>
            <Navbar />

            
            <h1 className="font-medium text-2xl mb-8 tracking-tighter">
                about me & this blog
            </h1>
            <div className="absolute inset-0 -z-10 bg-top opacity-10 forced-colors:hidden" 
            style={{ 
                backgroundImage: `url("/Image/bg-noise.png")`}} aria-hidden="true"></div>
            <div className="prose prose-neutral dark:prose-invert">
                
                <div className='grid grid-rows-1 md:grid-cols-2 gap-2'>

                    <div className='flex justify-center my-auto'>
                    <Image
                    src='/images/profil.jpg'
                    alt='profile picture'
                    className='rounded w-4/5 h-4/5'
                    width={1080 / 2}
                    height={1440 / 2}
                    />
                    </div>
                <div className='my-auto prose text-pretty'>
                    <h2 className=''> Syauqi Ashadullah is my name. </h2>

                    <p>I am a Communication student who has an interest in technology and coffee, and am currently living in Bandung, West Java.</p>
                    <p>I created <Webzx> <a href='/blog'>this blog</a></Webzx> actually for <strong>personal</strong> reasons, as well as a place for me to try / learn about the <Webzx>Web</Webzx>.</p>
                    <p>In addition, because I do not like to talk to other people, I pour out my thoughts through this blog, 
                        like how to <strong>express my life's grievances</strong>, <strong>feelings</strong>,<strong>love</strong>,<strong>college</strong>, or <strong>friendship</strong>.</p>

                </div>

            </div>
            </div>
            <hr className='my-4 border-neutral-300 dark:border-neutral-700' />
            <Saweria/>
        </section>
    )
}
