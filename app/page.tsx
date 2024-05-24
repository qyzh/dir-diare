"use client";
import React from "react";
import { FlipWords } from './components/ui/flip-words'
import { HoverEffect } from "./components/ui/card-hover-effect";

export default function Page() {
  const words = ["darling...", "cute...", "beautiful...", "baby..."];
  const projects = [
    {
      title: "Blog",
      description:
        "A daily random journal.",
      link: "/blog",
    },
    {
      title: "404",
      description:
        "On Working on it...",
      link: "/work",
    },
  ];
  return (
  <section>
  <div>

  <div className="justify-center items-center px-24 sm:px-16 md:px-12">
      <div className="text-3xl md:text-7xl font-bold mb-6 relative text-left dark:text-zinc-100 text-zinc-700 max-w-4xl">
        Hi,
        <FlipWords words={words} />
      </div>
      <div className="relative font-regular text-sm sm:text-xl text-zinc-500 tracking-wide mb-8 text-left max-w-2xl antialiased">Welcome to dir-diare</div>
    </div>

    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>

  </div>
  </section>
  )
}
