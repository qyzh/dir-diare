"use client";

import React, { useState } from 'react';


interface NowPlayProps {
  title?: string;
  children?: React.ReactNode;
}

// Mock data matching Spotify API response
const mockSpotifyData = {
  device: {
    id: "mock-device-id",
    is_active: true,
    is_private_session: false,
    is_restricted: false,
    name: "Kitchen speaker",
    type: "computer",
    volume_percent: 59,
    supports_volume: true
  },
  repeat_state: "off",
  shuffle_state: false,
  is_playing: true,
  item: {
    album: {
      name: "Greatest Hits",
      images: [
        {
          url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          height: 300,
          width: 300
        }
      ],
      artists: [
        {
          name: "Queen"
        }
      ]
    },
    name: "Bohemian Rhapsody",
    artists: [
      {
        name: "Queen"
      }
    ],
    duration_ms: 354000,
    progress_ms: 120000
  }
};

const NowPlay: React.FC<NowPlayProps> = ({  }) => {
  const [nowPlaying, setNowPlaying] = useState(mockSpotifyData);
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
