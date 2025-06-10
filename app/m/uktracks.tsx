'use client';

import { useEffect, useState } from 'react';

interface Track {
    name: string;
    artists: Array<{ name: string }>;
    duration_ms: number;
}

export default function UKtracks() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [error, setError] = useState<string | null>(null);

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
            <div className="text-red-500 p-4 bg-red-100 rounded-lg">
                <p className="font-bold">Error loading Spotify data:</p>
                <p>{error}</p>
            </div>
        );
    }

    if (!tracks.length) {
        return <div>Loading...</div>;
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2">
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