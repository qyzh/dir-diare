'use client'
import Link from 'next/link'
import { useSpotify } from '../api/spotify/hooks/useSpotify'
import { motion } from 'framer-motion'
import { AudioLines } from 'lucide-react'

interface SpotifyData {
    is_playing: boolean
    item: {
        name: string
        artists: Array<{ name: string }>
        album: {
            name: string
            images: Array<{ url: string }>
        }
    }
}
const Footer = () => {
    const { data: nowPlaying, error, isLoading } = useSpotify<SpotifyData>('')
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
                    {isLoading && (
                        <span className="italic">
                            Catch you in a bit, bruv!
                        </span>
                    )}
                    {error && <span>error</span>}
                    {!isLoading && !error && !nowPlaying?.is_playing && (
                        <span className="italic">
                            Catch you in a bit, bruv!
                        </span>
                    )}
                    {!isLoading &&
                        !error &&
                        nowPlaying?.is_playing &&
                        nowPlaying?.item && (
                            <div>
                                <span>
                                    <AudioLines className="text-emerald-600 animate-pulse inline w-4 h-4 mr-1.5" />
                                </span>
                                <Link
                                    href="/m"
                                    className="text-emerald-700 hover:underline"
                                >
                                    <span>{nowPlaying.item.name}</span>
                                    <span> by </span>
                                    <span>
                                        {nowPlaying?.item.artists
                                            .map((artist) => artist.name)
                                            .join(', ')}
                                    </span>
                                </Link>
                            </div>
                        )}
                </div>
            </motion.div>
        </footer>
    )
}

export default Footer
