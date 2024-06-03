//"use client";
import React from "react";
import type { Metadata } from 'next'
import ArtList from './ArtList'
import  Card  from 'app/components/artc'
import { GridPattern } from 'app/components/ui/grid-pattern'
import { cn } from 'utils/cn'
import {  Navbar } from '../components/nav'
import SecHead  from "app/components/sechead";

export const metadata: Metadata = {
  title: 'Work',
  description: 'The list of my work.',
}

export default function WorkPage() {

    return (

        <section>
            <Navbar />
              <SecHead judul='my work' desc='This page till on working'/>


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
