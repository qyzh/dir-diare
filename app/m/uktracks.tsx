'use client';

import UKCallout from 'app/components/ukcallout';
import { useSpotify } from '../api/spotify/hooks/useSpotify';
import { LoadingSkeleton } from '../components/ukloadingskel';

interface Track {
    name: string;
    artists: Array<{ name: string }>;
    duration_ms: number;
}

interface TracksResponse {
    items: Track[];
}

export default function UKtracks() {
    const { data, error, isLoading } = useSpotify<TracksResponse>('type=top-tracks');
    const loadtracks = [1,2,3,4,5,6,7,8,9,10];

    if (error) {
        return (
            <>
                <UKCallout type='error'>
                    <p className="font-bold">Error loading data <code>tracks</code></p>
                    <p className='font-mono'>{error}</p>
                </UKCallout>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    {loadtracks.map((_, index) => (
                        <LoadingSkeleton key={index} type="track" />
                    ))}
                </section>
            </>
        );
    }

    if (isLoading || !data?.items?.length) {
        return (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                {loadtracks.map((_, index) => (
                    <LoadingSkeleton key={index} type="track" />
                ))}
            </section>
        );
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            {data.items.slice(0, 10).map((track, index) => (
                <div key={index} className="flex p-2 gap-1.5 items-center font-mono border border-neutral-700 dark:bg-neutral-950 rounded hover:bg-neutral-900 transition-colors duration-200">
                    <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                        <div className="font-semibold truncate">{track.name}</div>
                        <div className="text-sm text-neutral-400">{track.artists.map(artist => artist.name).join(', ')}</div>
                    </div>
                    <span className="text-sm text-neutral-500">
                        {track.duration_ms ? 
                            `${Math.floor(track.duration_ms / 60000)}:${((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}` 
                            : '0:00'}
                    </span>
                </div>
            ))}
        </section>
    );
}