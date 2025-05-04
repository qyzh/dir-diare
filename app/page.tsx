import React from 'react'
import { Navbar } from './components/nav'
import FBRecentPost from './components/post-list'
import Footer  from './components/footer'
import FBRecentWork from './components/work-list'
import Strava from './components/strava'
import { DiscordStatus } from './components/discord'
import {AnimatedAbove, AnimatedBelow, AnimatedFade, AnimatedRight, AnimatedZoom} from './components/animated-section'


export default function Page() {
    return (
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <section className="space-y-6">
            <AnimatedAbove delay={1.5}>
            <header>
            <h1 className="text-2xl font-bold">Wagwan,</h1>
                    <p className="text-gray-400">
                        Welcome to my little space on internet, place to share my thoughts and ideas,
                        <span className="transition-all opacity-25 blur-sm hover:opacity-100 hover:blur-[0px]">
                            {' '}w/o to think about the algorithm of social media.
                        </span>
                    </p>
            </header>
            </AnimatedAbove>
            <AnimatedAbove delay={0.5}>
                <div className="mt-4 p-2 border-zinc-700 border-1 rounded">
                    <DiscordStatus userId='334529486773026817'/>
                </div>
            </AnimatedAbove>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatedZoom delay={2.0}>
                    <div className="space-y-4">
                        <FBRecentPost />
                    </div>
                </AnimatedZoom>
                <AnimatedRight delay={2.8}>
                    <div className="box-border border-1 border-zinc-700 rounded p-2">
                        <FBRecentWork />
                    </div>
                </AnimatedRight>
                </div>
                <AnimatedBelow delay={0.5}>
                <div className="box-border border-1 border-zinc-700 rounded p-2 mt-4">
                    <Strava />
                </div>
                </AnimatedBelow>
                <Navbar />
            </section>
            <AnimatedBelow delay={1.5}>
            <Footer />
            </AnimatedBelow>
        </main>
    )
}
