'use client'

import UKDrawer from 'app/components/ukdrawer'
import { useSpotify } from '../api/spotify/hooks/useSpotify'
import { LoadingSkeleton } from '../components/ukloadingskel'
import { Star } from 'lucide-react'
import UKCallout from 'app/components/ukcallout'
import { Drawer } from 'vaul'

interface Track {
    name: string
    artists: Array<{ name: string }>
    duration_ms: number
    album: {
        name: string
        images: Array<{ url: string }>
    }
    uri: string
}

interface TracksResponse {
    items: Track[]
}

export default function UKtracks() {
    const { data, error, isLoading } =
        useSpotify<TracksResponse>('type=top-tracks')
    const loadtracks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    if (error) {
        return (
            <>
                <UKCallout type="error">
                    <p className="font-bold">
                        Error loading data <code>tracks</code>
                    </p>
                    <p className="font-mono">{error}</p>
                </UKCallout>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    {loadtracks.map((_, index) => (
                        <LoadingSkeleton key={index} type="track" />
                    ))}
                </section>
            </>
        )
    }

    if (isLoading || !data?.items?.length) {
        return (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                {loadtracks.map((_, index) => (
                    <LoadingSkeleton key={index} type="track" />
                ))}
            </section>
        )
    }

    return (
        <section
            id="top-10-tracks"
            className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2"
        >
            {data.items.slice(0, 10).map((track, index) => {
                const trigger = (
                    <div className="flex p-2 gap-1.5 items-center font-mono border border-neutral-300 dark:border-neutral-800 bg-neutral-200 dark:bg-neutral-950 rounded hover:bg-neutral-300 dark:hover:bg-neutral-900 transition-colors duration-200 cursor-pointer">
                        {index < 3 && (
                            <div
                                className={`flex rounded items-center justify-center w-6 h-6 text-sm font-bold ${
                                    index === 0
                                        ? 'bg-yellow-500/50 border border-amber-700'
                                        : index === 1
                                          ? 'bg-gray-400/50 border border-neutral-700'
                                          : 'bg-amber-700/50 border border-amber-700'
                                }`}
                            >
                                <Star
                                    className={`w-3.5 h-3.5 ${
                                        index === 0
                                            ? 'fill-yellow-500 text-yellow-500'
                                            : index === 1
                                              ? 'fill-gray-500 text-gray-500'
                                              : 'fill-amber-500 text-amber-500'
                                    }`}
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                            <div className="font-semibold text-neutral-800 dark:text-neutral-100 truncate">
                                {track.name}
                            </div>
                            <div className="text-sm text-neutral-400">
                                {track.artists
                                    .map((artist) => artist.name)
                                    .join(', ')}
                            </div>
                        </div>
                        <span className="text-sm text-neutral-500">
                            {track.duration_ms
                                ? `${Math.floor(track.duration_ms / 60000)}:${((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}`
                                : '0:00'}
                        </span>
                    </div>
                )
                return (
                    <UKDrawer key={index} trigger={trigger}>
                        <div className="w-full h-full relative rounded-lg overflow-hidden">
                            <img
                                src={
                                    track.album.images[0]?.url ||
                                    '/public/images/bg-noise.png'
                                }
                                alt={track.album.name}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
                            />
                        </div>

                        <Drawer.Title className="font-semibold mt-2">
                            <a
                                href={track.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg text-neutral-100 hover:text-green-400 transition-colors"
                                title={track.name}
                            >
                                {track.name}
                            </a>
                        </Drawer.Title>

                        <div className="text-sm text-neutral-400">
                            <p>
                                {track.artists.map((artist, i) => (
                                    <span key={i}>
                                        <a
                                            href={`https://open.spotify.com/search/${encodeURIComponent(
                                                artist.name
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-green-400 transition-colors"
                                        >
                                            {artist.name}
                                        </a>
                                        {i < track.artists.length - 1
                                            ? ', '
                                            : ''}
                                    </span>
                                ))}
                            </p>
                            <p>Album: {track.album.name}</p>
                        </div>
                    </UKDrawer>
                )
            })}
        </section>
    )
}
