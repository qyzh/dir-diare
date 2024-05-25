import React from "react";
import type { Metadata } from 'next';
import Link from 'next/link';
import { NavIndex, Navbar } from '../components/nav';
import { BackgroundBeams } from "..//components/ui/background-beams";
export const metadata: Metadata = {
  title: 'Work',
  description: 'A summary of my work and contributions.',
};

export default function WorkPage() {
  return (
    <section>
      <Navbar/>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
         Still <mark className='transition bg-purple-300 text-purple-900 hover:bg-purple-600 hover:text-zinc-300'>Working</mark> on it.<br/>
         Coming again later.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      </div>
    </section>
  );
}