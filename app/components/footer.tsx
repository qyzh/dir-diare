'use client'
import Link from 'next/link'
import { AnimatedBelow } from './animated-section'
import { useState, useEffect } from 'react'

const Footer = () => {
    const [commitId, setCommitId] = useState<string | null>(null)

    useEffect(() => {
        const fetchCommitId = async () => {
            try {
                const response = await fetch('/api/latest-commit')
                const data = await response.json()
                setCommitId(data.commitId.substring(0, 8)) // Display first 8 characters
            } catch (error) {
                console.error('Failed to fetch commit ID:', error)
            }
        }

        fetchCommitId()
    }, [])

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
                        {commitId && (
                            <>
                                {' '}
                                <a
                                    href={`https://github.com/qyzh/dir-diare/commit/${commitId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs py-0.5 px-1.5 bg-neutral-300/10 border border-neutral-300/20 text-neutral-300 hover:bg-emerald-300/10 hover:border-emerald-300/20 hover:text-emerald-300 transition-colors duration-200 rounded"
                                >
                                    Commit: {commitId}
                                </a>
                            </>
                        )}
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
