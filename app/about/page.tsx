import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Saweria from 'app/components/saweria';
import Uq from 'app/components/uq';
import Link from 'next/link';
import { Navbar } from 'app/components/nav';
import WorkSpace from '../components/workspace';
import { getArtPosts } from '../work/utils';
import AnimatedSection from '../components/animated-section';

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
    <AnimatedSection>
        <div className="flex flex-col gap-2 p-4 mb-8 border border-neutral-800 rounded-md">
            <h2 className="font-semibold">About</h2>
            <p className="prose prose-neutral dark:prose-invert">
                I am a Communication student who has an interest in interface design & running. My name is{' '}
                <strong>Syauqi Ashadullah </strong> and am currently living in Bandung, West Java.
            </p>
        </div>
    </AnimatedSection>
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
        title: 'Universitas Komputer Indonesia',
        desc: 'Junior High School',
        year: '2012 - 2015',
        place: 'Sorowako, South Sulawesi',
    },
];

const ProjectCard = ({ metadata, slug }: { metadata: any; slug: string }) => (
    <Link href={`/art/${slug}`} className='opacity-80 hover:opacity-100 transition-opacity'>
        <div className="flex flex-row gap-2">
            <div className="w-20 h-20 overflow-hidden rounded-md">
                <Image
                    src={metadata.image || '/default-thumbnail.jpg'}
                    alt={metadata.title}
                    width={200}
                    height={200}
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-2">
                <h4 className="font-semibold">{metadata.title}</h4>
                <p className="text-sm">{metadata.tag}</p>
            </div>
        </div>
    </Link>
);

const Worklist = () => {
    const ArtList = getArtPosts();
    return (
        <AnimatedSection delay={0.2}>
            <div className="border-1 border-neutral-800 mb-8 rounded-md overflow-hidden">
                <h2 className="font-semibold px-4 pt-4">Project</h2>
                <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ArtList.slice(0, 2).map(({ metadata, slug }) => (
                            <ProjectCard key={metadata.title} metadata={metadata} slug={slug} />
                        ))}
                    </div>
                </div>
                <Link href="/work">
                    <div className='bg-neutral-600 text-center text-white p-4 cursor-pointer hover:bg-neutral-700 transition-colors'>
                        view more
                    </div>
                </Link>
            </div>
        </AnimatedSection>
    );
};

const EduTimelineItem = ({ title, desc, year, place }: Edu) => (
    <div className="flex flex-col relative before:absolute before:top-[3px] before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] before:dark:bg-neutral-600">
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
    <AnimatedSection delay={0.1}>
        <div className="grid gap-4 grid-cols-12">
            <div className="col-span-3">
                <div className="text-left mb-14">
                    <h3 className="text-lg font-semibold">Edu</h3>
                </div>
            </div>
            <div className="relative space-y-6 col-span-9">
                <div className="relative px-4 col-span-8 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-3 before:dark:bg-neutral-800">
                    {eduData.map((edu) => (
                        <EduTimelineItem key={edu.title} {...edu} />
                    ))}
                </div>
            </div>
        </div>
    </AnimatedSection>
);

export default function AboutPage() {
    return (
        <section>
            <Uq />
            <About />
            <div className="p-4 grid grid-cols-1 gap-2">
                <EduTL />
            </div>
            <Worklist />
            <WorkSpace/>
            <Navbar />
            <Saweria />
        </section>
    );
}
