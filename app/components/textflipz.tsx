"use client"
import React from 'react'
import { FlipWords } from '../components/ui/flip-words'
import { motion } from 'framer-motion'

export function FlipWordz() {
    const words = ['Beb', 'upss', 'Beautiful', 'ehhhh']

    return (
        <motion.div className="pb-8"
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: 40, opacity: 0 }}
        transition={{duration: 0.5}}
        >
            <div className="text-4xl mx-auto text-left font-normal text-neutral-600 dark:text-neutral-400">
                Hai,
                <FlipWords words={words} /> <br />
                you can read ma sh1t below...
            </div>
        </motion.div>
    )
}
