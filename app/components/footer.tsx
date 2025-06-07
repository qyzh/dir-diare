"use client"
import Link from "next/link"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="prose mb-8" role="contentinfo">
            <div className="flex justify-between items-center gap-2 font-mono text-sm text-neutral-500 dark:text-neutral-400">
                <div>
                <Link href="/" className="hover:underline">
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
    )
}

export default Footer
