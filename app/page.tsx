import React from 'react'
import { Navbar } from './components/nav'
import FBRecentPost from './components/post-list'
import Footer  from './components/footer'
import FBRecentWork from './components/labs-list'
import Strava from './components/ukstrava'
import { DotIcon } from 'lucide-react'



export default function Page() {
    return (
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <section>
            <header className='mb-4'>
            <h1 className="text-2xl text-white/80 hover:text-white font-bold">Wagwan,</h1>
                    <p className="font-mono text-black/50 dark:text-neutral-500">
                        Welcome to my little space on internet, place to share my thoughts and ideas,
                        <span className="transition-all opacity-25 blur-sm hover:opacity-100 hover:blur-[0px]">
                            {' '}w/o to think about the algorithm of social media.
                        </span>
                    </p>
            </header>
                    <div className="mb-4">
                         <FBRecentPost />
                    </div>
                    <div className="mb-4">
                         <FBRecentWork />
                    </div>
                    <div className="mb-4">
                     <Strava />
                    </div>
                     <UKpageList />
                <Navbar />
            </section>
            <Footer />
        </main>
    )
}
function UKpageList (){
    const UKpageLink = [
        {
            title: 'w',
            href: '/w',
            description: 'My Strava activities in UK',
        },
        {
            title: 'l',
            href: '/l',
            description: 'My Strava activities in UK',
        },
        {
            title: 'n',
            href: '/n',
            description: 'My Strava activities in UK',
        },
        {
            title: 'r',
            href: '/r',
            description: 'My Strava activities in UK',
        },
        {
            title: 'g',
            href: '/g',
            description: 'My Strava activities in UK',
        },
        {
            title: 'm',
            href: '/m',
            description: 'My Strava activities in UK',
        }
    ];
    return (
        <div className="flex flex-row justify-center items-center space-x-4">
            <DotIcon className='w-4 h-4 text-neutral-500' />
            {UKpageLink.map((item) => (
                <div key={item.href} className="flex items-center">
                    <a href={item.href} className="text-neutral-300 transition-all duration-200 hover:text-white hover:underline">
                        {item.title}
                    </a>
                </div> 
            ))}
            <DotIcon className='w-4 h-4 text-neutral-500' />
        </div>
    );
}