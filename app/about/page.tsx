import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from 'app/components/nav';
import { AnimatedAbove, AnimatedZoom, AnimatedRight, AnimatedBelow } from 'app/components/animated-section';
import Breadcrumbs from 'app/components/breadcrumbs';
import Uq from 'app/components/uq';
import Footer from 'app/components/footer';
import UKpathdir from 'app/components/ukpathdir';

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

const About: React.FC = () => (
    <AnimatedAbove delay={0.5}>
        <div id="about-me" className="flex flex-col gap-2 p-4 border-1 border-neutral-300 dark:border-neutral-700 rounded">
            <AnimatedZoom delay={0.8}>
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

const EduTimelineItem: React.FC<Edu> = ({ title, desc, year, place }) => (
    <div className="flex flex-col relative before:absolute before:top-[3px] before:w-4 before:h-4 before:rounded-full before:left-[-7px] before:z-[1] before:bg-neutral-300 before:dark:bg-neutral-700 pl-4">
        <time className="text-xs tracking-wide text-black/50 dark:text-neutral-500">{year}</time>
        <h3 className="text-md tracking-wide">
            <span className='font-semibold pr-1'>{desc}</span>
            <span className='font-mono text-neutral-500 dark:text-neutral-400'>at</span>
            <span className='font-semibold pl-1'>{title}</span>
        </h3>
        <p className="text-black/50 dark:text-neutral-500 font-mono text-sm">{place}</p>
    </div>
);

const EduTL: React.FC = () => (
    <AnimatedZoom delay={0.5} className="grid grid-cols-1 gap-2">
        <div id='edu' className="relative space-y-6">
            <div className="relative px-4 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:bg-neutral-400 before:dark:bg-neutral-900">
                {eduData.map((edu, index) => (
                    <AnimatedRight key={edu.title} delay={0.8 + (index * 0.2)}>
                        <EduTimelineItem {...edu} />
                    </AnimatedRight>
                ))}
            </div>
        </div>
    </AnimatedZoom>
);

const DearDairy: React.FC = () => (
        <AnimatedZoom delay={0.8} className="flex flex-col gap-2 p-4 border-1 border-neutral-300 dark:border-neutral-700 rounded">
            <div id='dear-diary' className="prose prose-neutral dark:prose-invert">
                <strong>Why the name dir-diare?</strong>
                <p>It started with the 
                    classic 
                    <i>    
                    {' '}dear diary {' '}
                    </i>
                    idea. 
                    Sweet, right? But then I thought—nah, too plain. 
                    Needs more nerd... and maybe a bit more toilet humour.
                </p>
                <p>So came <strong>dir-diare</strong>:</p>
                <ul className="list-disc pl-6">
                    <li>
                    <strong className='font-mono'>"dir" </strong>is short for {'  '}<code className='font-mono'>directory</code>{'  '} in programming—where we dump files. In this case, it's where I dump thoughts, rants, ideas, and brain-farts.
                    </li>
                    <li>
                    <strong>"diare" </strong>(a cheeky twist on "diary") literally means {'  '}<i>diarrhoea</i>{'  '} in Indonesian. Which, fun fact: I actually get if I drink milk. But also, it perfectly captures how my thoughts sometimes rush out in... uncontrollable bursts. 💻💩
                    </li>
                </ul>
                <p>
                So yeah, this blog is basically my mental dump folder—raw, weird, and sometimes mildly alarming. Read at your own risk, and maybe bring some digital tissues.
                </p>
            </div>
        </AnimatedZoom>
);

const UCanFindMe: React.FC = () => (
<AnimatedBelow delay={1.0} className="flex flex-col font-mono">
    <div id='contact' className='pl-4'>
            <p>
            You can find me:
            </p>
            <ul className='pl-4'>
                <li>Github:<a href='https://github.com/qyzh' target='_blank'><span className='text-sm font-mono py-0.5 px-1.5 text-neutral-400 hover:bg-neutral-900 hover:border-neutral-800 hover:border '>qyzh</span></a> </li>
                <li>Discord:<a href='https://discord.com/users/334529486773026817' target='_blank'><span className='text-sm font-mono py-0.5 px-1.5 text-neutral-400 hover:bg-neutral-900 hover:border-neutral-800 hover:border '>UQ#9662</span></a></li>
                <li>Twitter:<a href='https://x.com/asetdunia' target='_blank'><span className='text-sm font-mono py-0.5 px-1.5 text-neutral-400 hover:bg-neutral-900 hover:border-neutral-800 hover:border '>asetdunia</span></a> </li>
                <li>LinkedIn:<a href='/' target='_blank'><span className='text-sm font-mono py-0.5 px-1.5 text-neutral-400 hover:bg-neutral-900 hover:border-neutral-800 hover:border '>qyzh</span></a> </li>
                <li>Instagram:<a href='https://www.instagram.com/syauqashdllh/' target='_blank'><span className='text-sm font-mono py-0.5 px-1.5 text-neutral-400 hover:bg-neutral-900 hover:border-neutral-800 hover:border '>syauqashdllh</span></a> </li>
            </ul>
    </div>
</AnimatedBelow>
);

const AboutPage: React.FC = () => (
    <section>
        <Breadcrumbs />
        <main>
            <Uq />
            <UKpathdir name='about-me' type='md'/>
            <About/>
            <UKpathdir name='dear-diary' type='md'/>
            <DearDairy />
            <UKpathdir name='edu' type='md'/>
            <EduTL />
            <UKpathdir name='contact' type='md'/>
            <UCanFindMe />
        </main>
        <Navbar />
        <Footer />
    </section>
);

export default AboutPage;
