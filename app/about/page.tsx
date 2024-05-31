import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import {  Navbar } from '../components/nav'

export const metadata: Metadata = {
    title: 'About',
    description: 'Little about me and this blog.',
}

export default function AboutkPage() {
    return (
        <section>
            <Navbar />
            <h1 className="font-medium text-2xl mb-8 tracking-tighter">
                about me & this blog
            </h1>
            <div className="prose prose-neutral dark:prose-invert">
                <div className='grid grid-rows-1 md:grid-cols-2 gap-2'>

                    <div className='flex justify-center my-auto'>
                    <Image
                    src='/images/profil.jpg'
                    alt='profile picture'
                    className='rounded-lg w-4/5 h-4/5 '
                    width={1080 / 2}
                    height={1440 / 2}
                    />
                    </div>
                <div className='my-auto'>
                    <p className=''> Let me Introduce my self </p>

                    <p>
                    <strong>Syauqi Ashadullah</strong> is my name and I live in
                    Bandung. My favourite things are <i>coffee</i> +{' '}
                    <i>live music</i>.
                    </p>
                    <p>
                     In short, I made{' '}
                    <strong>this blog</strong> for me personally, because I
                    don't like to tell people about my <strong>life</strong>,{' '}
                    <strong>feelings</strong>, <strong>love</strong>,{' '}
                    <strong>drama</strong>, <strong>college</strong>,{' '}
                    <strong>friendship </strong>
                    verbally, </p>
                    <p>
                    I prefer to let it out by{' '}
                    <a href="/blog" className="font-semibold">
                        writing
                    </a>{' '}
                    it. Because if I don't express these feelings, it can make
                    me <strong>gila</strong>.
                    </p>

                </div>

            </div>
            </div>
        </section>
    )
}
