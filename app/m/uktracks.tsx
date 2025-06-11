'use client';

import UKCallout from 'app/components/ukcallout';
import { useEffect, useState } from 'react';

interface Track {
    name: string;
    artists: Array<{ name: string }>;
    duration_ms: number;
}

export default function UKtracks() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [error, setError] = useState<string | null>(null);
    const loadtracks = [1,2,3,4,5,6,7,8,9,10];
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('/api/spotify?type=top-tracks');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data.error) {
                    setError(data.error);
                } else {
                    setTracks(data.items || []);
                }
            } catch (err) {
                console.error('Spotify fetch error:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch Spotify data');
            }
        };

        fetchTracks();
    }, []);

    if (error) {
        return (
            <>
      <UKCallout type='error'>
        <p className="font-bold">Error loading data <code>tracks</code></p>
        <p className='font-mono'>{error}</p>
      </UKCallout>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            {loadtracks.map(() => (
                <div className="flex p-2 gap-1.5 items-center font-mono border border-neutral-700 dark:bg-neutral-950 rounded hover:bg-neutral-900 transition-colors duration-200">
                    <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                        <div className="h-4 w-48 bg-neutral-800 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse"></div>
                    </div>
                    <span className="text-sm text-neutral-500 animate-pulse">
                        00.00
                    </span>
                </div>
            ))}
            </section>
            </>
        );
    }

    if (!tracks.length) {

        return (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            {loadtracks.map(() => (
                <div className="flex p-2 gap-1.5 items-center font-mono border border-neutral-700 dark:bg-neutral-950 rounded hover:bg-neutral-900 transition-colors duration-200">
                    <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                        <div className="h-4 w-48 bg-neutral-800 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse"></div>
                    </div>
                    <span className="text-sm text-neutral-500 animate-pulse">
                        00.00
                    </span>
                </div>
            ))}
            </section>
    );
    }
    return (

        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            
            {tracks.slice(0, 10).map((track, index) => (
                <div key={index} className="flex p-2 gap-1.5 items-center font-mono border border-neutral-700 dark:bg-neutral-950 rounded hover:bg-neutral-900 transition-colors duration-200">
                    <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                        <div className=" font-semibold truncate">{track.name}</div>
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