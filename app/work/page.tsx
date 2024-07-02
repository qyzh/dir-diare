//"use client";
import React from "react";
import type { Metadata } from 'next'
import ArtList from './ArtList'
import  Card  from 'app/components/artc'
import {  Navbar } from '../components/nav'
import { SecHeadWork } from "app/components/sechead";

export const metadata: Metadata = {
  title: 'Work',
  description: 'The list of my work.',
}

export default function WorkPage() {

    return (

        <section>
            <Navbar />
              <SecHeadWork/>
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
        </div>
        </section>
    )
}
