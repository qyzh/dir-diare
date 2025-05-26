import React from 'react';
import type { Metadata } from 'next';
import Saweria from 'app/components/saweria';
import {DiscordStatus} from 'app/components/discord';
import Link from 'next/link';
import { Navbar } from 'app/components/nav';
import { AnimatedAbove, AnimatedLeft, AnimatedZoom, AnimatedRight, AnimatedBelow, AnimatedFade } from 'app/components/animated-section';
import { getArtPosts } from "../work/utils";

export const metadata: Metadata = {
    title: 'About',
    description: 'Little about me and this blog.',
};

interface Edu {
    title: string;
    desc: string;
    year: string;
    place: string;
}

const About = () => (
    <AnimatedAbove delay={0.5}>
        <div className="flex flex-col gap-2 p-4 my-4 border-1 border-neutral-700 rounded ">
        <AnimatedZoom delay={0.8}>
            <p className='text-sm text-neutral-500 font-mono'>
                <span className='text-neutral-300 mr-0.5'>
                dir-diare
                </span>
                /
                <span className='text-neutral-300 ml-0.5'>
                about
                </span>
                .md
            </p>
            <p className="prose prose-neutral dark:prose-invert">
                I am a Communication student who has an interest in interface design & running. My name is{' '}
                <strong>Syauqi Ashadullah </strong> and am currently living in Bandung, West Java.
            </p>
            </AnimatedZoom>
        </div>
        </AnimatedAbove>
);
const workData = getArtPosts();
const Repo = () => (
    <AnimatedAbove delay={0.5}>
            <p className='text-sm text-neutral-500 font-mono mb-2 mt-2'>
                <span className='text-neutral-300 mr-0.5'>
                dir-diare
                </span>
                /
                <span className='text-neutral-300 ml-0.5'>
                projects
                </span>
                .md
            </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            {workData.map((work, index) => (
                <AnimatedFade key={index} delay={0.8 + (index * 0.2)}>
                    <div className="border-1 border-neutral-700 rounded p-4">
                        <div className="inline-flex group">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 72 72" className='w-6 h-6 mb-2 fill-neutral-400'>
<path d="M 23 11 C 18.582 11 15 14.582 15 19 L 15 53 C 15 57.418 18.582 61 23 61 L 27 61 L 27 53 L 25.107422 53 C 24.110422 53 23.187344 52.318937 23.027344 51.335938 C 22.824344 50.082938 23.785 49 25 49 L 31 49 L 31 61.382812 C 31 62.125812 31.782266 62.608391 32.447266 62.275391 L 35 61 L 37.552734 62.275391 C 38.217734 62.608391 39 62.125813 39 61.382812 L 39 49 L 44.875 49 C 44.846296 49.365579 44.828125 49.734664 44.828125 50.105469 C 44.828125 51.102981 44.937792 52.07283 45.136719 53 L 43 53 L 43 61 L 51.746094 61 L 52.828125 61 C 54.917125 61 56.782469 59.472578 56.980469 57.392578 C 57.183629 55.266523 55.718076 53.452527 53.742188 53.080078 C 53.344015 52.624776 52.828125 51.603534 52.828125 50.103516 C 52.828125 49.191347 53.036847 48.340878 53.388672 47.683594 C 55.562343 46.253371 57 43.796303 57 41 L 57 19 C 57 14.582 53.418 11 49 11 L 23 11 z M 27.021484 19 L 48 19 C 48.552 19 49 19.448 49 20 L 49 40 C 49 40.552 48.552 41 48 41 L 27.021484 41 L 27.021484 19 z M 31 21 C 29.895 21 29 21.895 29 23 C 29 24.105 29.895 25 31 25 C 32.105 25 33 24.105 33 23 C 33 21.895 32.105 21 31 21 z M 31 28 C 29.895 28 29 28.895 29 30 C 29 31.105 29.895 32 31 32 C 32.105 32 33 31.105 33 30 C 33 28.895 32.105 28 31 28 z M 31 35 C 29.895 35 29 35.895 29 37 C 29 38.105 29.895 39 31 39 C 32.105 39 33 38.105 33 37 C 33 35.895 32.105 35 31 35 z"></path>
</svg>
                        <Link href={`/work/${work.slug}`} className="text-md font-semibold text-neutral-400 group-hover:text-neutral-300">{work.metadata.title}</Link>
                        </div>

                        <p className="text-sm text-zinc-500 group-hover:text-zinc-300 truncate overflow-hidden">{work.metadata.summary}</p>
                        <div className="flex flex-cols items-center justify-between font-mono mt-2">
                        <p className="text-xs text-zinc-400">{work.metadata.category}</p>
                        </div>
                    </div>
                </AnimatedFade>
            ))}
        </div>
        </AnimatedAbove>
);
const eduData: Edu[] = [
    {
        title: 'Universitas Komputer Indonesia',
        desc: 'Communication student',
        year: '2019 - Now',
        place: 'Bandung, West Java',
    },
    {
        title: 'SMA YPS',
        desc: 'Senior High School',
        year: '2015 - 2017',
        place: 'Sorowako, South Sulawesi',
    },
    {
        title: 'SMP YPS',
        desc: 'Junior High School',
        year: '2012 - 2015',
        place: 'Sorowako, South Sulawesi',
    },
];

const EduTimelineItem = ({ title, desc, year, place }: Edu) => (
    <div className="flex flex-col relative before:absolute before:top-[3px] before:w-4 before:h-4 before:rounded-full before:left-[-7px] before:z-[1] before:dark:bg-neutral-600 pl-4">
        <time className="text-xs tracking-wide uppercase text-gray-500">{year}</time>
        <h3 className="text-md tracking-wide">
            <span className='font-semibold pr-1'>{desc}</span>
            {' at '}
            <span className='font-semibold pl-1'>{title}</span>
        </h3>
        <p className="text-zinc-400 text-sm">{place}</p>
    </div>
);

const EduTL = () => (
    <AnimatedZoom delay={0.5}>
            <p className='text-sm text-neutral-500 font-mono mb-2'>
                <span className='text-neutral-300 mr-0.5'>
                dir-diare
                </span>
                /
                <span className='text-neutral-300 ml-0.5'>
                edu
                </span>
                .md
            </p>
        <div className="grid gap-4">
            <div className="relative space-y-6 col-span-9">
                <div className="relative px-4 col-span-8 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5  before:dark:bg-neutral-800">
                {eduData.map((edu, index) => (
    <AnimatedRight key={edu.title} delay={0.8 + (index * 0.2)}>
        <EduTimelineItem {...edu} />
    </AnimatedRight>
))}
                </div>
            </div>
        </div>
    </AnimatedZoom>
);

export default function AboutPage() {
    return (
        <section>
            <AnimatedAbove delay={0.2}>
                            <div className="mt-4 p-2 border-zinc-700 border-1 rounded">
                                <div className='bg-neutral-950 rounded'>
                                <DiscordStatus/>
                            </div>
                            </div>
            </AnimatedAbove>
            <About />
            <div className="grid grid-cols-1 gap-2">
                <EduTL />
                <Repo/>
            </div>
            <AnimatedBelow delay={0.2}>
            <Saweria />
            </AnimatedBelow>
            <Navbar />
        </section>
    );
}
