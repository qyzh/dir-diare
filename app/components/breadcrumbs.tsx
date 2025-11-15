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
                className="px-1.5 inline-flex truncate overflow-hidden font-mono text-neutral-700 hover:text-neutral-100 items-center bg-neutral-200 hover:bg-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-600 rounded  transition-colors duration-300"
            >
                <Link
                    href="/"
                    className="whitespace-nowrap px-1 hover:text-teal-600 dark:text-neutral-300 text-sm"
                >
                    ~
                </Link>
                {paths.map((path, index) => (
                    <React.Fragment key={path}>
                        <div className="text-teal-600 dark:text-yellow-400 ">
                            /
                        </div>
                        {index === paths.length - 1 ? (
                            <div className="dark:text-sky-300 px-1 text-sm">
                                {currentTitle}{' '}
                            </div>
                        ) : (
                            <Link
                                href={`/${paths.slice(0, index + 1).join('/')}`}
                                className="px-1 dark:text-teal-300 hover:text-teal-600 text-sm transition-colors"
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
