"use client"
import Link from "next/link"
import { AnimatedBelow } from "./animated-section"

const Footer = () => {

    return (
        <AnimatedBelow delay={1.5}>
        <footer className="prose mb-8" role="contentinfo">
            <div className="flex justify-between items-center gap-2 font-mono text-sm text-neutral-500 dark:text-neutral-400">
                <div>
                <Link href="/">
                    Dir-diare 
                </Link>
                {' '} 
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
