"use client";
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import React from 'react';

const Card = ({ title, description, imgSrc, href, tagz }) => {
  const getTagColor = (tag) => {
    const tagLower = tag.toLowerCase();
    switch (tagLower) {
      case 'personal projects':
        return 'bg-rose-900 dark:bg-rose-900/50 dark:group-hover:bg-rose-800/50';
      case 'design graphics':
        return 'bg-indigo-900 dark:bg-indigo-900/50 group-hover:bg-indigo-800/50';
      case 'code projects':
        return 'bg-emerald-900 dark:bg-emerald-900/50 dark:group-hover:bg-emerald-800/50';
      default:
        return 'bg-neutral-800 dark:bg-neutral-800 dark:group-hover:bg-neutral-700';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="group dark:hover:bg-white/5 border border-neutral-300 dark:border-neutral-800 bg-clip-border dark:text-gray-700 dark:hover:border-zinc-700 transition-colors duration-200">
        <Link href={href} aria-label={`Link to ${title}`}>
          <div className="overflow-hidden flex flex-row">
            <div className="rotate-180 flex items-center justify-center [writing-mode:_vertical-lr]">
              <time className="text-xs font-bold text-neutral-400 uppercase">
                <div className={`inline ${getTagColor(tagz)} px-3 py-1 text-xs font-mono text-white truncate`}>
                  {tagz}
                </div>
              </time>
            </div>
            
            <div className="flex-1 pl-4 min-w-0 flex items-center gap-4">
              {imgSrc && (
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    alt={title}
                    src={imgSrc}
                    className="absolute inset-0 w-full h-full object-cover bg-clip-border bg-black shadow-lg rounded-md"
                    width={180}
                    height={180}
                    priority={false}
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h2 className="font-bold tracking-tight text-black dark:text-white dark:group-hover:text-neutral-200 transition-colors duration-200">
                  {title}
                </h2>
                <div className="truncate font-mono pr-4 overflow-hidden mt-1 text-sm font-medium text-zinc-400">
                  {description}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;
