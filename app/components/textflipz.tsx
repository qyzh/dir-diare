import React from 'react'
import { FlipWords } from '../components/ui/flip-words'

export function FlipWordz() {
    const words = ['Beb', 'upss', 'Beautiful', 'ehhhh']

    return (
        <div className="pb-8">
            <div className="text-4xl mx-auto text-left font-normal text-neutral-600 dark:text-neutral-400">
                Hai,
                <FlipWords words={words} /> <br />
                you can read ma sh1t below...
            </div>
        </div>
    )
}
