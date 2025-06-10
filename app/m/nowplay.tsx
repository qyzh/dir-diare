"use client";

import React, { useState, useEffect } from 'react';


interface NowPlayProps {
  title?: string;
  children?: React.ReactNode;
}

interface SpotifyData {
  is_playing: boolean;
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
  };
}

const NowPlay: React.FC<NowPlayProps> = ({ }) => {
  const [nowPlaying, setNowPlaying] = useState<SpotifyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setNowPlaying(data);
        }
      } catch (err) {
        console.error('Spotify fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch Spotify data');
      }
    };

    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-100 rounded-lg">
        <p className="font-bold">Error loading Spotify data:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!nowPlaying) {
    return <div>Loading...</div>;
  }

  if (!nowPlaying.is_playing) {
    return <div>Not currently playing</div>;
  }

  return (
    <div className="now-play-container">      
      <main className="now-play-content">
        {nowPlaying.item && (
          <div className="flex items-center gap-4 p-4 dark:hover:bg-emerald-950">
            {/* Vinyl Record Container */}
            <div className="relative w-32 h-32">
              {/* Vinyl Record */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800 shadow-2xl animate-spin">
                {/* Vinyl Grooves */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800"></div>
                
                {/* Center Label */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                  {/* Album Art */}
                  <img 
                    src={nowPlaying.item.album.images[0].url} 
                    alt={nowPlaying.item.album.name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Track Info */}
            <div className="track-details space-y-1 font-mono">
              <h2 className="text-xl font-bold text-neutral-100">{nowPlaying.item.name}
              <span className="relative px-2 py-0.5 text-xs font-semibold bg-green-500 dark:bg-green-500/20 text-green-100 dark:text-green-400 rounded">
                                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Now Playing
                                    </span>
              </h2>
              <p className="text-neutral-400">{nowPlaying.item.artists.map(artist => artist.name).join(', ')}</p>
              <p className="text-neutral-500">Album: {nowPlaying.item.album.name}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NowPlay;
