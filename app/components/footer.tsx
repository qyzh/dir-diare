'use client'
import Link from 'next/link'
import { AnimatedBelow } from './animated-section'


const Footer = () => {


    return (
        <AnimatedBelow delay={1.5}>
            <footer className="prose mt-4" role="contentinfo">
                <div className="flex justify-between items-center gap-2 font-mono text-sm text-neutral-500 dark:text-neutral-400">
                    <div>
                        <Link
                            href="/"
                            className="text-white/80 underline hover:text-emerald-300 transition-colors duration-200"
                        >
                            Dir-diare
                        </Link>{' '}
                        
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
