import React from 'react'
import { Navbar } from './components/nav'
import FBRecentPost from './components/post-list'
import Footer  from './components/footer'
 import FBRecentWork from './components/labs-list'
 import Strava from './components/strava'
import { DiscordStatus } from './components/discord'
import {AnimatedAbove, AnimatedBelow, AnimatedRight, AnimatedZoom} from './components/animated-section'
import UKterminal from './components/ukterminal'


export default function Page() {
    return (
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <section className="space-y-6">
            <header>
            <h1 className="text-2xl text-white/80 hover:text-white font-bold">Wagwan,</h1>
                    <p className="font-mono text-black/50 dark:text-neutral-500">
                        Welcome to my little space on internet, place to share my thoughts and ideas,
                        <span className="transition-all opacity-25 blur-sm hover:opacity-100 hover:blur-[0px]">
                            {' '}w/o to think about the algorithm of social media.
                        </span>
                    </p>
            </header>
                <div className="mt-4 p-2 border-neutral-300 dark:border-neutral-700 border-1 rounded">
                    <DiscordStatus/>
                </div>
                    <div className="space-y-4">
                         <FBRecentPost />
                    </div>
                    <div className="space-y-4">
                         <FBRecentWork />
                    </div>
                     <Strava /> 
                <Navbar />
            </section>
            <Footer />
        </main>
    )
}
