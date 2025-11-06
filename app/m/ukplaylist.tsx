'use client'

import UKDrawer from 'app/components/ukdrawer'
import { useSpotify } from '../api/spotify/hooks/useSpotify'
import { LoadingSkeleton } from '../components/ukloadingskel'
import { Drawer } from 'vaul'
import { useState } from 'react'
import UKButton from '../components/ukbtn'
import UKCallout from 'app/components/ukcallout'

interface Track {
    name: string
    artists: Array<{ name: string }>
    duration_ms: number
    album: {
        name: string
        images: Array<{ url: string }>
    }
}

interface PlaylistTrack {
    track: Track
}

interface PlaylistTracksResponse {
    items: PlaylistTrack[]
}

interface Playlist {
    id: string
    name: string
    description: string | null
    images: Array<{ url: string }>
    owner: {
        display_name: string
    }
    tracks: {
        total: number
    }
}

interface PlaylistResponse {
    items: Playlist[]
}

export default function PlaylistGrid() {
    const { data, error, isLoading } =
        useSpotify<PlaylistResponse>('type=playlists')
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
        null
    )
    const { data: tracksData, isLoading: tracksLoading } =
        useSpotify<PlaylistTracksResponse>(
            selectedPlaylistId
                ? `type=playlist-tracks&playlist_id=${selectedPlaylistId}`
                : 'type=playlists'
        )
    const loadplaylists = [1, 2, 3, 4, 5, 6]

    if (error) {
        return (
            <>
                <UKCallout type="error">
                    <p className="font-bold">
                        Error loading data <code>playlist</code>
                    </p>
                    <p className="font-mono">{error}</p>
                </UKCallout>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    {loadplaylists.map((_, index) => (
                        <LoadingSkeleton key={index} type="playlist" />
                    ))}
                </div>
            </>
        )
    }

    if (isLoading || !data?.items?.length) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                {loadplaylists.map((_, index) => (
                    <LoadingSkeleton key={index} type="playlist" />
                ))}
            </div>
        )
    }

    return (
        <div
            id="my-playlist"
            className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2"
        >
            {data.items.map((playlist) => {
                const trigger = (
                    <div className="flex p-2 gap-1.5 items-center font-mono border border-neutral-300 dark:border-neutral-800 bg-neutral-200 dark:bg-neutral-950 rounded hover:bg-neutral-300 dark:hover:bg-neutral-900 transition-colors duration-200 cursor-pointer">
                        <div className="w-18 h-18 relative rounded overflow-hidden">
                            <img
                                src={
                                    playlist.images[0]?.url ||
                                    '/public/images/bg-noise.png'
                                }
                                alt={playlist.name}
                                className="object-cover"
                            />
                        </div>
                        <div className="overflow-hidden flex-1">
                            <h4 className="font-bold text-neutral-800 dark:text-white truncate">
                                {playlist.name}
                            </h4>
                            <span className="text-neutral-400 text-sm truncate">
                                {playlist.description || 'No description'}
                            </span>
                            <div className="flex justify-between items-center">
                                <span className="text-neutral-400 text-sm">
                                    By {playlist.owner.display_name}
                                </span>
                                <span className="text-neutral-400 text-sm">
                                    {playlist.tracks.total} tracks
                                </span>
                            </div>
                        </div>
                    </div>
                )

                return (
                    <UKDrawer
                        key={playlist.id}
                        trigger={trigger}
                        onOpenChange={(open) => {
                            if (open) {
                                setSelectedPlaylistId(playlist.id)
                            } else {
                                setSelectedPlaylistId(null)
                            }
                        }}
                    >
                        <div className="h-full flex flex-col">
                            <div className="max-w-md flex-1 overflow-hidden flex flex-col">
                                <div className="w-full h-48 relative rounded-lg overflow-hidden mb-4">
                                    <Drawer.Title className="font-semibold text-lg text-neutral-100">
                                        {playlist.name}
                                    </Drawer.Title>
                                    <img
                                        src={
                                            playlist.images[0]?.url ||
                                            '/public/images/bg-noise.png'
                                        }
                                        alt={playlist.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                <div className="mt-2 text-sm text-neutral-400">
                                    <p className="mb-2">
                                        {playlist.description ||
                                            'No description available.'}
                                    </p>
                                    <p className="mb-1">
                                        by: {playlist.owner.display_name}
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <a
                                        href={`https://open.spotify.com/playlist/${playlist.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <UKButton
                                            variant="primary"
                                            size="sm"
                                            className="w-full"
                                        >
                                            Open in Spotify
                                        </UKButton>
                                    </a>
                                </div>

                                <div className="mt-6 flex-1 overflow-hidden">
                                    <h3 className="font-semibold text-neutral-100 mb-3">
                                        Tracks
                                    </h3>
                                    <div className="overflow-y-auto h-full pr-2">
                                        {tracksLoading ? (
                                            <div className="space-y-2">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="animate-pulse"
                                                    >
                                                        <div className="h-4 bg-neutral-800 rounded w-3/4 mb-2"></div>
                                                        <div className="h-3 bg-neutral-800 rounded w-1/2"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : tracksData?.items ? (
                                            <div className="space-y-3">
                                                {tracksData.items
                                                    .filter(
                                                        (item) => item.track
                                                    )
                                                    .map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="text-sm"
                                                        >
                                                            <div className="font-medium text-neutral-100 truncate">
                                                                {item.track
                                                                    ?.name ||
                                                                    'Unknown Track'}
                                                            </div>
                                                            <div className="text-neutral-400 truncate">
                                                                {item.track?.artists
                                                                    ?.map(
                                                                        (
                                                                            artist
                                                                        ) =>
                                                                            artist.name
                                                                    )
                                                                    .join(
                                                                        ', '
                                                                    ) ||
                                                                    'Unknown Artist'}
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        ) : (
                                            <p className="text-neutral-400">
                                                No tracks found
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </UKDrawer>
                )
            })}
        </div>
    )
}
