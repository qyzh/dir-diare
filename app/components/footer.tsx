'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
const Footer = () => {
    return (
        <footer className="prose mt-4" role="contentinfo">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 2.5,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
                className="flex justify-between items-center gap-2 font-mono text-sm text-neutral-500 dark:text-neutral-400"
            >
                <div>
                    <Link
                        href="/about"
                        className="text-neutral-700 dark:text-neutral-200 underline hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors duration-200"
                    >
                        Dir-diare
                    </Link>{' '}
                </div>
                <div className="flex items-center gap-4">
                    <span className="italic">Catch you in a bit, bruv!</span>
                </div>
            </motion.div>
        </footer>
    )
}

export default Footer
