//"use client";
import React from "react";
import type { Metadata } from 'next'
import Card from 'app/components/artc'
import { Navbar } from '../components/nav'
import Breadcrumbs from "app/components/breadcrumbs";
import { getArtPosts } from "./utils";
import { AnimatedAbove, AnimatedBelow, AnimatedZoom } from "app/components/animated-section";
import Footer from "app/components/footer";

export const metadata: Metadata = {
  title: 'Work',
  description: 'The list of my work.',
}

// Types
interface ArtPost {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    category?: string;
  };
  slug: string;
}

// Constants
const ANIMATION_DELAYS = {
  breadcrumbs: 0.5,
  grid: 0.5,
  card: 0.8,
  cardIncrement: 0.2,
  footer: 1.0
} as const;

// Sort posts by published date
const getSortedArtPosts = (): ArtPost[] => {
  return getArtPosts().sort((a, b) => 
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );
};

export default function WorkPage() {
  const artPosts = getSortedArtPosts();

  return (
    <section>
      <AnimatedAbove delay={ANIMATION_DELAYS.breadcrumbs}>
        <Breadcrumbs />
      </AnimatedAbove>
      
      <div className="container">
        <AnimatedZoom delay={ANIMATION_DELAYS.grid}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
            {artPosts.map((post, index) => (
              <AnimatedZoom 
                key={post.slug} 
                delay={ANIMATION_DELAYS.card + (index * ANIMATION_DELAYS.cardIncrement)}
              >
                <Card
                  title={post.metadata.title}
                  tagz={post.metadata.category}
                  description={post.metadata.summary}
                  imgSrc={post.metadata.image}
                  href={`/work/${post.slug}`}
                />
              </AnimatedZoom>
            ))}
          </div>
        </AnimatedZoom>
      </div>

      <Navbar />
      
      <AnimatedBelow delay={ANIMATION_DELAYS.footer}>
        <Footer />
      </AnimatedBelow>
    </section>
  );
}
