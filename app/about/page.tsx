
import React from 'react'
import type { Metadata } from 'next'    
import ArtList from '../work/ArtList'
import Image from 'next/image'
import Saweria from 'app/components/saweria'
import Uq from 'app/components/uq';
import Link from 'next/link'
import { Navbar } from 'app/components/nav'

export const metadata: Metadata = {
    title: 'About',
    description: 'Little about me and this blog.',
}
interface Edu {
    title: string,
    desc: string,
    year: string,
    place: string
  }
function About() {
    return (
        <div 
        className="
        flex flex-col gap-2
        p-4
        mb-8
        border border-neutral-800
        rounded-md
        "
        >
        <h2 className='font-semibold'>About</h2>
            <p className='prose prose-neutral dark:prose-invert'>
                I am a Communication student who has an interest in interface design & running.My name is <strong>Syauqi Ashadullah </strong>
                and am currently living in Bandung, West Java.</p>
        </div>
    )
}

const eduData : Edu[] = [
    {
    title: 'Universitas Komputer Indonesia',
    desc: 'Communication student',
    year: '2019 - Now',
    place: 'Bandung, West Java'
    },
    ]
function Worklist () {
        return (
            <div  className="grid gap-4  grid-cols-12">
            <div className="col-span-3">
                <div className="text-center text-left mb-14">
                    <h3 className="text-lg font-semibold">Projects</h3>
                </div>
            </div>
            <div className="relative space-y-6 col-span-9">
                <div className="space-y-12 relative px-4 col-span-8 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-3 before:dark:bg-neutral-800">
                {ArtList.slice(0, 3).map(({ title, href, imgSrc, description}) => (
                    <div key={title} className="flex flex-col relative before:absolute before:top-[3px] before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] before:dark:bg-neutral-600">
                        <Link href={href || ''}><h3 className="text-lg font-semibold tracking-wide">{title}</h3></Link>
                        <p className="text-sm text-zinc-400">{description}</p>
                        <div className='w-32 h-24 mt-4 rounded-md overflow-hidden'>
                        <Image src={imgSrc || ''} alt={title} width={1280} height={1080} />
                        </div>
                        
                    </div>
                    
                ))}
                                <div className="flex flex-col relative before:animate-pulse before:absolute before:top-4 before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] before:dark:bg-neutral-600">
                        <Link href='/work' className='in-block border border-neutral-700 hover:bg-neutral-700 rounded-md'><h3 className="text-lg p-2 font-semibold tracking-wide">See more</h3></Link>
                    </div>
                </div>
            </div>
        </div>
        )
}
function EduTL () {
    return (
        <div  className="grid gap-4 grid-cols-12">
        <div className="col-span-3">
            <div className="text-center text-left mb-14">
                <h3 className="text-lg font-semibold">Edu</h3>
            </div>
        </div>
        <div className="relative space-y-6 col-span-9">
                <div className="space-y-12 relative px-4 col-span-8 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-3 before:dark:bg-neutral-800">
              {eduData.map(({ title, desc, year, place }) => (
                <div key={title} className="flex flex-col relative before:absolute before:top-[3px] before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] before:dark:bg-neutral-600">
                <time className="text-xs tracking-wide uppercase text-gray-500">{year}</time>
                    <h3 className="text-md font-semibold tracking-wide">{desc} at {title}</h3>
                    <p className="text-zinc-400 text-sm ">{place}</p>
                </div>
            ))}
            </div>
        </div>
    </div>
    )
}
export default function AboutkPage() {
    
    return (
        <section>
            <Uq/>
            <About/>
            <div className='p-4'>
                <EduTL/>
                <Worklist/>
            </div>
            <Navbar/>
            <Saweria/>
        </section>
    )
}
