import React from 'react'
import type { Metadata } from 'next'
import Breadcrumbs from 'app/components/breadcrumbs'
import Footer from 'app/components/footer'

export const metadata: Metadata = {
    title: 'About',
    description: 'Little about me and this blog.',
}

const DearDairy: React.FC = () => (
    <div id="dear-diary">
        <strong>Why the name dir-diare?</strong>
        <p className="text-neutral-800 dark:text-neutral-300/70">
            It started with the classic
            <i className="text-black/90 dark:text-white/90"> dear diary </i>
            idea. Sweet, right? But then I thought—nah, too plain. Needs more
            nerd... and maybe a bit more toilet humour.
        </p>
        <p>
            So came <strong>dir-diare</strong>:
        </p>
        <ul className="list-disc pl-6  text-neutral-800  text-neutral-300/70">
            <li>
                <p className="text-neutral-800 dark:text-neutral-300/70">
                    <strong className="font-mono text-black dark:text-white">
                        "dir"{' '}
                    </strong>
                    is short for {'  '}
                    <span className="font-mono bg-black/5  dark:bg-white/5 text-neutral-600 dark:text-neutral-300">
                        directory
                    </span>
                    {'  '} in programming—where we dump files. In this case,
                    it's where I dump thoughts, rants, ideas, and brain-farts.
                </p>
            </li>
            <li>
                <p className="text-neutral-800 dark:text-neutral-300/70">
                    <strong className="text-black dark:text-white">
                        "diare"{' '}
                    </strong>
                    (a cheeky twist on "diary") literally means {'  '}
                    <i>diarrhoea</i>
                    {'  '} in Indonesian. Which, fun fact: I actually get if I
                    drink milk. But also, it perfectly captures how my thoughts
                    sometimes rush out in... uncontrollable bursts. 💻💩
                </p>
            </li>
        </ul>
        <p className="text-neutral-800 dark:text-neutral-300/70">
            So yeah, this blog is basically my mental dump folder—raw, weird,
            and sometimes mildly alarming. Read at your own risk, and maybe
            bring some digital tissues.
        </p>
    </div>
)

const AboutPage: React.FC = () => (
    <section>
        <Breadcrumbs />
        <main>
            <DearDairy />
        </main>
        <Footer />
    </section>
)

export default AboutPage
