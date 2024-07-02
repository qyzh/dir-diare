"use client"
import React from 'react'
import { motion } from 'framer-motion'


export const SecHeadWork = () => {
    return (
        <div>
        <motion.div className="pb-8"
        animate={{  opacity: 1 }}
        initial={{  opacity: 0 }}
        transition={{duration: 0.5}}
        >
<h1 className="font-medium text-2xl mb-8 tracking-tighter">
                My Work
            </h1>
            <div className="prose prose-neutral dark:prose-invert">
              <p>Berisi dengan karya dan sebuah percobaan iseng.</p>
                <hr className='border-neutral-300 dark:border-neutral-700' />

            </div>
        </motion.div>
        </div>
    )
}
export const SecHeadBlog = () => {
    return (
        <div>
        <motion.div className="pb-4"
        animate={{  opacity: 1 }}
        initial={{  opacity: 0 }} 
        transition={{duration: 0.5}}
        >
<h1 className="font-medium text-2xl mb-4 tracking-tighter">
                My Blog
            </h1>
            <div className="prose prose-neutral dark:prose-invert">
              <p>Tentang random hal,
                <span className="hover:text-rose-500">Tjinta</span>,
                <span className="hover:text-sky-500">Opini</span>,
                <span className="hover:text-amber-500">Tjoerhatan</span> dan 
                sebagainja</p>
                <hr className='border-neutral-300 dark:border-neutral-700' />

            </div>
        </motion.div>
        </div>
    )
}