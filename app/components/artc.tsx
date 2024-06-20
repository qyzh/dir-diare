"use client";
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import React from 'react';

const Card = ({ title, description, imgSrc, href, tagz }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
    <Link href={href} aria-label={`Link to ${title}`}>
    <div className="bg-neutral-900 rounded bg-clip-border text-gray-700 shadow-lg dark:shadow-[0_8px_16px_rgb(0_0_0/0.4)] transition-colors hover:bg-neutral-800 focus-visible:ring-1 focus-visible:ring-white border border-transparent border-zinc-800">
      <div className="overflow-hidden p-4 flex flex-row">
        {imgSrc && (
          <div className="w-32 h-32 relative">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                <Image
                  alt={title}
                  src={imgSrc}
                  className="absolute inset-0 w-full h-full object-cover bg-clip-border bg-black shadow-lg"
                  width={544}
                  height={306}
                />
              </Link>
            ) : (
              <Image
                alt={title}
                src={imgSrc}
                className="absolute inset-0 w-full h-full object-cover bg-clip-border bg-black shadow-lg rounded-xl"
                width={544}
                height={306}
              />
            )}
          </div>
        )}
        <div className="w-1/2 ml-4 my-auto">
          <h2 className="font-bold tracking-tight text-black dark:text-white">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          
          <div className="truncate overflow-hidden mb-2 text-sm font-semibold text-white text-xs ">
            {description}
          </div>
          <div className="inline bg-zinc-800 dark:bg-zinc-800 rounded px-3 py-1 text-sm font-semibold text-white text-xs">
            {tagz}
          </div>
        </div>
      </div>
    </div>
    </Link>
    </motion.div>
  );
};

export default Card;
