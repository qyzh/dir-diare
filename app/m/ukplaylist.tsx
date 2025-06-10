'use client';

import UKCallout from 'app/components/ukcallout';
import { useEffect, useState } from 'react';

interface Playlist {
  id: string;
  name: string;
  description: string | null;
  images: Array<{ url: string }>;
  owner: {
    display_name: string;
  };
  tracks: {
    total: number;
  };
}

export default function PlaylistGrid() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/spotify?type=playlists');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setPlaylists(data.items);
        }
      } catch (err) {
        console.error('Spotify fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch Spotify data');
      }
    };

    fetchPlaylists();
  }, []);

  if (error) {
    return (
      <UKCallout type='error'>
        <p className="font-bold">Error loading data <code>playlist</code></p>
        <p className='font-mono'>{error}</p>
      </UKCallout>
    );
  }

  if (!playlists.length) {
    return <div>Loading playlists...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {playlists.map((playlist) => (
        <div key={playlist.id} className="flex p-2 gap-1.5 items-center font-mono border border-neutral-700 dark:bg-neutral-950 rounded hover:bg-neutral-900 transition-colors duration-200">
          <div className="w-18 h-18 relative rounded overflow-hidden">
            <img
              src={playlist.images[0]?.url || '/public/images/bg-noise.png'}
              alt={playlist.name}
              className="object-cover"
            />
          </div> 
          <div className="overflow-hidden flex-1">
            <h3 className="font-bold text-white truncate">{playlist.name}</h3>
            <p className="text-neutral-400 text-sm truncate">{playlist.description || 'No description'}</p>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">By {playlist.owner.display_name}</span>
              <span className="text-neutral-400 text-sm">{playlist.tracks.total} tracks</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
