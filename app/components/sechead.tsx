"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'


export default function SecHead(props) {
    return (
        <div>
        <motion.div className="pb-8"
        animate={{  opacity: 1 }}
        initial={{  opacity: 0 }}
        transition={{duration: 0.5}}
        >
<h1 className="font-medium text-2xl mb-8 tracking-tighter">
                {props.judul}
            </h1>
            <div className="prose prose-neutral dark:prose-invert">
              <p>{props.desc}</p>
                <hr className='border-neutral-300 dark:border-neutral-700' />

            </div>
        </motion.div>
        </div>
    )
}