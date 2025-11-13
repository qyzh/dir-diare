'use client'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from './theme-toggle'

interface BreadcrumbsProps {
    post?: { metadata: { title: string } }
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ post }) => {
    const pathname = usePathname()
    const paths = pathname.split('/').filter(Boolean)
    const currentTitle =
        post?.metadata?.title || paths[paths.length - 1] || 'home'

    return (
        <div className="mt-4 flex items-center justify-between">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="inline-flex truncate overflow-hidden font-mono text-neutral-500 items-center py-1.5"
            >
                <Link
                    href="/"
                    className="whitespace-nowrap px-1 hover:text-neutral-300 text-sm transition-colors"
                >
                    ~
                </Link>
                {paths.map((path, index) => (
                    <React.Fragment key={path}>
                        <div className="text-teal-600 dark:text-yellow-400 ">
                            /
                        </div>
                        {index === paths.length - 1 ? (
                            <div className="text-blue-600 dark:text-sky-300 px-1 text-sm">
                                {currentTitle}{' '}
                                <span className="animate-pulse text-teal-600 dark:text-yellow-400">
                                    |
                                </span>
                            </div>
                        ) : (
                            <Link
                                href={`/${paths.slice(0, index + 1).join('/')}`}
                                className="px-1 text-neutral-500 hover:text-teal-600 text-sm transition-colors"
                            >
                                {path}
                            </Link>
                        )}
                    </React.Fragment>
                ))}
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
            >
                <ThemeToggle />
            </motion.div>
        </div>
    )
}

export default Breadcrumbs
