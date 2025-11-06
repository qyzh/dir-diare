'use client'
import Link from 'next/link'
import { AnimatedBelow } from './animated-section'
import ThemeToggle from './theme-toggle'


const Footer = () => {


    return (
        <AnimatedBelow delay={1.5}>
            <footer className="prose mt-4" role="contentinfo">
                <div className="flex justify-between items-center gap-2 font-mono text-sm text-neutral-500 dark:text-neutral-400">
                    <div>
                        <Link
                            href="/"
                            className="text-neutral-700 dark:text-neutral-200 underline hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors duration-200"
                        >
                            Dir-diare
                        </Link>{' '}
                        
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="italic">
                            Catch you in a bit, bruv!
                        </span>
                        <ThemeToggle />
                    </div>
                </div>
            </footer>
        </AnimatedBelow>
    )
}

export default Footer
