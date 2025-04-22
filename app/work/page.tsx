//"use client";
import React from "react";
import type { Metadata } from 'next'
import  Card  from 'app/components/artc'
import {  Navbar } from '../components/nav'
import { SecHeadWork } from "app/components/sechead";
import Breadcrumbs from "app/components/breadcrumbs";
import { getArtPosts } from "./utils";

export const metadata: Metadata = {
  title: 'Work',
  description: 'The list of my work.',
}

export default function WorkPage() {
  let ArtList = getArtPosts().sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })
    return (

        <section>
            <Navbar />
            <Breadcrumbs />
              <SecHeadWork/>
            <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ArtList.map((d) => (
              <Card
                key={d.metadata.title}
                title={d.metadata.title}
                tagz={d.metadata.tag}
                description={d.metadata.summary}
                imgSrc={d.metadata.image}
                href={`/work/${d.slug}`}
              ></Card>
            ))}
          </div>
          </div>
        </section>
    )
}
