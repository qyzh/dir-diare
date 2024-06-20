
import React from 'react'
import type { Metadata } from 'next'    
import Image from 'next/image';
import {  Navbar } from '../components/nav'
import Saweria from 'app/components/saweria'
import { SlashIcon } from '@radix-ui/react-icons';


function Webzx ({ children }) {
    return (
        <span className='font-mono transition-all text-zinc-300 hover:text-white text-sm rounded border px-1 border-zinc-700 bg-zinc-800 inline-block
        '>
            {children}
        </span>
    );
}
function Xhmu (){
    return (
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg>
    );
}
function IGhmu (){
    return (
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg>
    )
}
function DChmu (){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
</svg>
    )
}
function Githtmu (){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
</svg>
    )
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
            <div className="fixed inset-0 h-full w-full -z-10 bg-top opacity-10 forced-colors:hidden" 
            style={{ 
                backgroundImage: `url("/images/bg-noise.png")`}} aria-hidden="true"></div>
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
                    <p>I created <Webzx> <a href='/blog'>this blog</a></Webzx> actually for <strong>personal</strong> reasons, as well as a place for me to try <SlashIcon className='inline hover:text-red-500'/> learn about the <Webzx>Web</Webzx>.</p>
                    <p>In addition, because I do not like to talk to other people, I pour out my thoughts through this blog, 
                        like how to <strong>express my life's grievances</strong>, <strong>feelings</strong>,<strong>love</strong>,<strong>college</strong>, or <strong>friendship</strong>.</p>

                </div>

            </div>
            </div>
            <hr className='my-4 border-neutral-300 dark:border-neutral-700' />
            <div className=''
            >
                <h2 className='text-2xl my-4 font-semibold'>Hit me up!</h2>
                <div className='grid grid-rows-1 md:grid-cols-2 gap-4'>
                    <div 
                    className='relative gap-2 bg-gradient-to-r from-[#f9ce34]/60 via-[#ee2a7b]/60 to-[#6228d7]/60
                    p-8 border border-zinc-600 rounded hover:bg-gradient-to-r hover:from-[#f9ce34]/100 hover:via-[#ee2a7b]/100 hover:to-[#6228d7]/100'
                    >
                        <span className='font-semibold text-xl'>Instagram</span><br/>
                        <span className='font-mono bg-black/40 border border-zinc-600 text-zinc-300 p-1 rounded'>@syauqashdllh</span>

                        <span className="absolute flex h-24 w-24 right-8 top-3 rounded-full items-center justify-center"> 
            <span className="relative inline-flex  items-center justify-center">
            <IGhmu/>
            </span>
                        </span>
                    </div>
                    <div className='relative gap-2 bg-[#7289DA]/60 hover:bg-[#7289DA]/100 border border-[#282b30] rounded p-8'>
                        <span className='font-semibold text-xl'>Discord</span><br/>
                        <span className='font-mono bg-black/40 border border-zinc-600 text-zinc-300 p-1 rounded'>UQ#9662</span>

                        <span className="absolute flex h-24 w-24 right-8 top-3 rounded-full items-center justify-center"> 
            <span className="relative inline-flex  items-center justify-center">
            <DChmu/>
            </span>
                        </span>

                    </div>
                    <div className='relative gap-2 bg-[#1DA1F2]/60 hover:bg-[#1DA1F2]/100 border border-[#657786] rounded p-8'>
                        <span className='font-semibold text-xl'>Twitter</span><br/>
                        <span className='font-mono bg-black/40 border border-zinc-600 text-zinc-300 p-1 rounded'>@asetdunia</span>

                        <span className="absolute flex h-20 w-20 right-8 top-4 rounded-full items-center justify-center"> 
            <span className="relative inline-flex  items-center justify-center">
            <Xhmu/>
            </span>
                        </span>

                    </div>
                    <div className='relative gap-2 bg-[#24292e]/60 hover:bg-[#24292e]/100 border border-zinc-600 rounded p-8'>
                        <span className='font-semibold text-xl'>Github</span><br/>
                        <span className='font-mono bg-black/40 border border-zinc-600 text-zinc-300 py-1 px-2 rounded'>@qyzh</span>

                        <span className="absolute flex h-24 w-24 right-8 top-3 rounded-full items-center justify-center"> 
            <span className="relative inline-flex  items-center justify-center">
            <Githtmu/>
            </span>
                        </span>

                    </div>
                </div>
                <a href='mailto:mrveranda@gmail.com' className='text-neutral-700 dark:text-neutral-300'>
                <div className='flex justify-center bg-neutral-700 opacity-50 hover:opacity-100 p-4 border border-zinc-600 rounded my-4'>
                    
                        <span className=''>Email to :mr*****@gmail.com</span>
                    
                    </div>
                    </a>
                </div>
            <Saweria/>
        </section>
    )
}
