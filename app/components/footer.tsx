"use client"
import Link from "next/link"
import { AnimatedBelow } from "./animated-section"

const Footer = () => {

    return (
        <AnimatedBelow delay={1.5}>
        <footer className="prose mt-4" role="contentinfo">
            <div className="flex justify-between items-center gap-2 font-mono text-sm text-neutral-500 dark:text-neutral-400">
                <div>
                <Link href="/" className="text-white/80 underline hover:text-emerald-300 transition-colors duration-200">
                    Dir-diare 
                </Link>
                {' '} 
                <a href="https://github.com/qyzh/dir-diare/pull/37" target="_blank" rel="noopener noreferrer">
                <span className="text-xs py-0.5 px-1.5 bg-neutral-300/10 border border-neutral-300/20 text-neutral-300 hover:bg-fuchsia-300/10 hover:border-fuchsia-300/20 hover:text-fuchsia-300 transition-colors duration-200 rounded">
                v.3.1</span>
                </a>
                </div>
                <div>
                <span className="italic">
                    Catch you in a bit, bruv!
                </span>
                </div>
            </div>
        </footer>
        </AnimatedBelow>
    )
}

export default Footer
