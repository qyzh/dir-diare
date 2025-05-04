//"use client";
import React from "react";
import type { Metadata } from 'next'
import  Card  from 'app/components/artc'
import {  Navbar } from '../components/nav'
import { SecHeadWork } from "app/components/sechead";
import Breadcrumbs from "app/components/breadcrumbs";
import { getArtPosts } from "./utils";
import { AnimatedAbove, AnimatedBelow, AnimatedZoom } from "app/components/animated-section";
import Footer from "app/components/footer";

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
            <AnimatedAbove delay={0.5}>
            <Breadcrumbs />
            </AnimatedAbove>
            <AnimatedAbove delay={0.3}>
              <SecHeadWork/>
            </AnimatedAbove>
            <div className="container">
        <AnimatedZoom delay={0.5}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ArtList.map((d, index) => (
                <AnimatedZoom key={d.metadata.title} delay={0.8 + (index * 0.2)}>
              <Card
                title={d.metadata.title}
                tagz={d.metadata.tag}
                description={d.metadata.summary}
                imgSrc={d.metadata.image}
                href={`/work/${d.slug}`}
              ></Card>
            </AnimatedZoom>
            ))}
          </div>
        </AnimatedZoom>
          </div>
          <Navbar />
          <AnimatedBelow delay={1.0}>
            <Footer/>
        </AnimatedBelow>
        </section>
    )
}
