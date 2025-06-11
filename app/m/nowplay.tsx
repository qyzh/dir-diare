"use client";

import React from 'react';
import bgnoise from '../../public/images/bg-noise.png';
import { useSpotify } from '../api/spotify/hooks/useSpotify';
import { LoadingSkeleton } from '../components/ukloadingskel';

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

const NowPlay: React.FC = () => {
  const { data: nowPlaying, error, isLoading } = useSpotify<SpotifyData>('');

  if (isLoading) {
    return <LoadingSkeleton type="now-playing" />;
  }

  if (error) {
    return (
      <div className="flex items-center gap-4 p-4 dark:hover:bg-red-500/10">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-900 to-rose-800 shadow-2xl animate-pulse">
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-rose-800 to-rose-900"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-rose-900 to-rose-800"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center">
              <img 
                src="/public/images/bg-noise.png"
                alt="3rr0r"
                className="w-16 h-16 rounded-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="track-details space-y-1 font-mono">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-100">3Rr0r
              <span className="relative ml-2 px-2 py-0.5 text-xs font-semibold bg-rose-500 dark:bg-rose-500/20 text-rose-100 dark:text-rose-400 rounded">
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                Failed
              </span>
            </h2>
            <p className='text-rose-700 font-mono'>{error}</p>
            <div className="h-4 w-40 bg-rose-800 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!nowPlaying?.is_playing) {
    return (
      <div className="flex items-center gap-4 p-4 dark:hover:bg-gray-500/10">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800 shadow-2xl animate-spin">
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
              <img 
                src={bgnoise.src}
                alt="not playing"
                className="w-16 h-16 rounded-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="track-details space-y-1 font-mono">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-neutral-100">Not Playing
              <span className="relative ml-2 px-2 py-0.5 text-xs font-semibold bg-gray-500 dark:bg-gray-500/20 text-gray-100 dark:text-gray-400 rounded">
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
                </span>
                Offline
              </span>
            </h2>
            <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse"></div>
            <div className="h-4 w-40 bg-neutral-800 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="now-play-container">      
      <main className="now-play-content">
        {nowPlaying.item && (
          <div className="flex items-center gap-4 p-4 dark:hover:bg-emerald-500/10">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800 shadow-2xl animate-spin">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                  <img 
                    src={nowPlaying.item.album.images[0].url} 
                    alt={nowPlaying.item.album.name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>

            <div className="track-details space-y-1 font-mono">
              <h2 className="text-xl font-bold text-neutral-100">{nowPlaying.item.name}
                <span className="relative ml-2 px-2 py-0.5 text-xs font-semibold bg-green-500 dark:bg-green-500/20 text-green-100 dark:text-green-400 rounded">
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
