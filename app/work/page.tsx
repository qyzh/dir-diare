import React from 'react'
import type { Metadata } from 'next'
import ArtList from './ArtList'
import  Card  from 'app/components/artc'
import { GridPattern } from 'app/components/ui/grid-pattern'
import { cn } from 'utils/cn'
import {  Navbar } from '../components/nav'

export const metadata: Metadata = {
    title: 'Work',
    description: 'A summary of my work and contributions.',
}

export default function WorkPage() {
    return (
        <section>
            <Navbar />
            <h1 className="font-medium text-2xl mb-8 tracking-tighter">
                my work
            </h1>
            <div className="prose prose-neutral dark:prose-invert">
              <p>This page is still under construction...</p>
                <hr className='border-neutral-300 dark:border-neutral-700' />

            </div>

            <div className="container py-12">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ArtList.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                tagz={d.tagz}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              ></Card>
            ))}
          </div>
          <GridPattern
        width={22}
        height={20}
        x={+2}
        y={-8}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
        </div>

        </section>
    )
}
