import React from 'react'
import { Navbar } from './components/nav'
import FBRecentPost from './components/post-list'
import PersonalD from './components/pd'
import FBRecentWork from './components/work-list'
import Strava from './components/strava'

export default function Page() {
    return (
        <main className="min-h-screen">
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

                <PersonalD />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <FBRecentPost />
                    </div>
                    <div className="box-border border-2 border-zinc-700 rounded-md p-4">
                        <FBRecentWork />
                    </div>
                </div>
                <div className="mt-4">
                    <Strava />
                </div>
                <Navbar />
            </section>
        </main>
    )
}
