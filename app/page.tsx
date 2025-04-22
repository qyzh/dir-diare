import React from 'react'
import { Navbar } from './components/nav'
import FBRecentPost from './components/post-list'
// import PersonalD from './components/pd'
import FBRecentWork from './components/work-list'
import Strava from './components/strava'
import { DiscordStatus } from './components/discord'

export default function Page() {
    return (
        <main className="">
            <section className="space-y-6">
            <header>
            <h1 className="text-2xl font-bold">Wagwan,</h1>
                    <p className="text-gray-400">
                        Welcome to my little space on internet, place to share my thoughts and ideas,
                        <span className="transition-all opacity-25 blur-sm hover:opacity-100 hover:blur-[0px]">
                            {' '}w/o to think about the algorithm of social media.
                        </span>
                    </p>
            </header>

                <div className="mt-4 p-2 border-zinc-700 border-1 rounded">
                    <div className='bg-neutral-950 rounded'>
                    <DiscordStatus userId='334529486773026817'/>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <FBRecentPost />
                    </div>
                    <div className="box-border border-1 border-zinc-700 rounded p-2">
                        <FBRecentWork />
                    </div>
                </div>
                <div className="box-border border-1 border-zinc-700 rounded p-2 mt-4">
                    <Strava />
                </div>
                <Navbar />
            </section>
        </main>
    )
}
