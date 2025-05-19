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
    <div className="hover:bg-white/5 border border-neutral-800 rounded-md bg-clip-border text-gray-700 hover:border-zinc-700">
    <Link href={href} aria-label={`Link to ${title}`}>
      <div className="overflow-hidden p-4 flex flex-row">
        {imgSrc && (
          <div className="w-32 h-32 relative">

                <Image
                  alt={title}
                  src='/images/bg-noise.png'
                  className="absolute inset-0 w-full h-full object-cover bg-clip-border bg-black shadow-lg rounded-xl"
                  width={544}
                  height={306}
                />
             :
              <Image
                alt={title}
                src={imgSrc}
                className="absolute inset-0 w-full h-full object-cover bg-clip-border bg-black shadow-lg rounded-md"
                width={544}
                height={306}
              />
          </div>
        )}
        <div className="w-1/2 ml-4 my-auto">
          <h2 className="font-bold tracking-tight text-black dark:text-white">
                {title}
          </h2>

          <div className="truncate overflow-hidden mb-2 text-sm font-semibold text-zinc-400 ">
            {description}
          </div>
          <div className="inline bg-neutral-800 rounded px-3 py-1 text-xs font-mono text-white truncate ">
            {tagz}
          </div>
        </div>
      </div>
      </Link>
    </div>
    </motion.div>
  );
};

export default Card;
