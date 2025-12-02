'use client'

import React from 'react'
import { useSpotify } from '../api/spotify/hooks/useSpotify'
import { LoadingSkeleton } from '../components/ukloadingskel'

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

const NowPlay: React.FC = () => {
    const { data: nowPlaying, error, isLoading } = useSpotify<SpotifyData>('')

    if (isLoading) {
        return <LoadingSkeleton type="now-playing" />
    }

    if (error) {
        return (
            <div className="now-play-container">
                <main className="now-play-content mt-4">
                    <div className="group flex items-center border border-transparent gap-2 sm:gap-4 p-2 sm:p-4 hover:bg-red-500/10 hover:border-red-800 transition-colors rounded">
                        <div className="flex items-center justify-center group-hover:border-r group-hover:border-red-800 w-32 h-32">
                            <div className="bg-neutral-800 w-28 h-28 rounded object-cover animate-pulse shadow-lg" />
                        </div>

                        <div className="track-details flex-1 min-w-0 space-y-1 font-mono">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-base sm:text-xl font-bold text-neutral-700 dark:text-neutral-100 truncate">
                                    3Rr0r
                                </h2>
                                <span className="relative px-2 py-0.5 text-xs font-semibold bg-rose-500/20 text-rose-400 rounded whitespace-nowrap">
                                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                    </span>
                                    Failed
                                </span>
                            </div>
                            <p className="text-sm sm:text-base text-rose-400 truncate">
                                {error}
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-500 truncate">
                                Unable to fetch now playing
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    if (!nowPlaying?.is_playing) {
        return (
            <div className="now-play-container">
                <main className="now-play-content mt-4">
                    <div className="group flex items-center border border-transparent gap-2 sm:gap-4 p-2 sm:p-4 hover:bg-neutral-900 hover:border-neutral-800 transition-colors rounded">
                        <div className="flex items-center justify-center group-hover:border-r group-hover:border-neutral-800 w-32 h-32">
                            <div className="bg-neutral-800 w-28 h-28 rounded object-cover animate-pulse shadow-lg" />
                        </div>

                        <div className="track-details flex-1 min-w-0 space-y-1 font-mono">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-base sm:text-xl font-bold text-neutral-700 dark:text-neutral-100 truncate">
                                    Not Playing
                                </h2>
                                <span className="relative px-2 py-0.5 text-xs font-semibold bg-gray-500/20 text-gray-400 rounded whitespace-nowrap">
                                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
                                    </span>
                                    Offline
                                </span>
                            </div>
                            <p className="text-sm sm:text-base text-neutral-400 truncate">
                                No track currently playing
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-500 truncate">
                                ----
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="now-play-container">
            <main className="now-play-content mt-4">
                {nowPlaying.item && (
                    <div className="group flex items-center border border-transparent gap-2 sm:gap-4 p-2 sm:p-4 hover:bg-emerald-500/10 hover:border-emerald-800 transition-colors rounded">
                        <div className="flex items-center justify-center group-hover:border-r group-hover:border-emerald-800 w-32 h-32">
                            <img
                                src={nowPlaying.item.album.images[0].url}
                                alt={nowPlaying.item.album.name}
                                className="w-28 h-28 rounded object-cover shadow-lg"
                            />
                        </div>

                        <div className="track-details flex-1 min-w-0 space-y-1 font-mono">
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-base sm:text-xl font-bold text-neutral-700 dark:text-neutral-100 truncate">
                                    {nowPlaying.item.name}
                                </h2>
                                <span className="relative px-2 py-0.5 text-xs font-semibold bg-green-500/20 text-green-400 rounded whitespace-nowrap">
                                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Now Playing
                                </span>
                            </div>
                            <p className="text-sm sm:text-base text-neutral-400 truncate">
                                {nowPlaying.item.artists
                                    .map((artist) => artist.name)
                                    .join(', ')}
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-500 truncate">
                                Album: {nowPlaying.item.album.name}
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default NowPlay
