import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { NavIndex, Navbar } from '../components/nav'
import GitHubCalendar from 'react-github-calendar'

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
                <p>
                    <strong>Syauqi Ashadullah</strong> is my name and I live in
                    Bandung. My favourite things are <i>coffee</i> +{' '}
                    <i>live music</i>. In short, I made{' '}
                    <strong>this blog</strong> for me personally, because I
                    don't like to tell people about my <strong>life</strong>,{' '}
                    <strong>feelings</strong>, <strong>love</strong>,{' '}
                    <strong>drama</strong>, <strong>college</strong>,{' '}
                    <strong>friendship </strong>
                    verbally, I prefer to let it out by{' '}
                    <a href="/blog" className="font-semibold">
                        writing
                    </a>{' '}
                    it. Because if I don't express these feelings, it can make
                    me <strong>gila</strong>.
                </p>
            </div>
        </section>
    )
}
