import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from 'app/components/nav';
import { AnimatedAbove, AnimatedZoom, AnimatedRight, AnimatedFade } from 'app/components/animated-section';
import Breadcrumbs from 'app/components/breadcrumbs';
import Uq from 'app/components/uq';
import Footer from 'app/components/footer';

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
        <div className="flex flex-col gap-2 p-4 my-4 border-1 border-neutral-300 dark:border-neutral-700 rounded">
            <AnimatedZoom delay={0.8}>
                <p className='text-sm text-neutral-500 font-mono'>
                    <span className='text-neutral-400 dark:text-neutral-300 mr-0.5'>dir-diare</span>
                    /
                    <span className='text-neutral-600 dark:text-neutral-300 ml-0.5'>about</span>
                    .md
                </p>
                <p className="prose prose-neutral dark:prose-invert">
                    I am a <span className="italic border-b-2 border-emerald-950 bg-emerald-500/50 hover:bg-emerald-500">Communication student</span> who has an interest in <span className="italic border-b-2 border-emerald-950 bg-emerald-500/50 hover:bg-emerald-500">interface design</span> & <span className="italic border-b-2 border-emerald-950 bg-emerald-500/50 hover:bg-emerald-500">running</span>. My name is{' '}
                    <span className="italic border-b-2 border-emerald-950 bg-emerald-500/50 hover:bg-emerald-500">Syauqi Ashadullah</span> and am currently living in Bandung, West Java.
                </p>
            </AnimatedZoom>
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
    <div className="flex flex-col relative before:absolute before:top-[3px] before:w-4 before:h-4 before:rounded-full before:left-[-7px] before:z-[1] before:bg-neutral-300 before:dark:bg-neutral-700 pl-4">
        <time className="text-xs tracking-wide text-black/50 dark:text-neutral-500 ">{year}</time>
        <h3 className="text-md tracking-wide">
            <span className='font-semibold pr-1'>{desc}</span>
            <span className='font-mono text-neutral-500 dark:text-neutral-400'>at</span>
            <span className='font-semibold pl-1'>{title}</span>
        </h3>
        <p className="text-black/50 dark:text-neutral-500 font-mono text-sm">{place}</p>
    </div>
);

const EduTL = () => (
    <AnimatedZoom delay={0.5}>
        <p className='text-sm text-neutral-500 font-mono mb-2'>
            <span className='text-neutral-400 dark:text-neutral-300 mr-0.5'>dir-diare</span>
            /
            <span className='text-neutral-600 dark:text-neutral-300 ml-0.5'>edu</span>
            .md
        </p>
        <div className="grid gap-4">
            <div className="relative space-y-6 col-span-9">
                <div className="relative px-4 col-span-8 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:bg-neutral-400 before:dark:bg-neutral-900">
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
            <AnimatedFade delay={0.2}>
                <Breadcrumbs />
            </AnimatedFade>
            <AnimatedAbove delay={0.2}>
                <Uq />
            </AnimatedAbove>
            <About />
            <div className="grid grid-cols-1 gap-2">
                <EduTL />
            </div>
            <Navbar />
            <Footer />
        </section>
    );
}
