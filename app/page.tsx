
import React from 'react'
import { Navbar } from './components/nav'
import FBRecentPost from './components/post-list';
import PersonalD from './components/pd';
import FBRecentWork from './components/work-list';

export default function Page() {
    return (
        <section>
            <div>
                <h1 className='text-2xl font-bold'>Wagwan, </h1>
               <p className='text-gray-400'> Welcome to my little space on internet,place
                to share my thoughts and ideas, 
                <span className='transition-all opacity-25 blur-sm hover:opacity-100 hover:blur-[0px]'> w/o to think about the algorithm of social media.</span>
               </p>
            </div>
            <PersonalD />
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4 mt-2">
                    <div className="">
                        <FBRecentPost />
                    </div>
                    <div className=" box-border border-2 border-zinc-700 rounded-md p-4 ">
                        <FBRecentWork/>
                    </div>
                </div>
            <Navbar />
        </section>
        
    )
}
