'use client';

import UKCallout from 'app/components/ukcallout';
import { useSpotify } from '../api/spotify/hooks/useSpotify';
import { LoadingSkeleton } from '../components/ukloadingskel';

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

interface PlaylistResponse {
  items: Playlist[];
}

export default function PlaylistGrid() {
  const { data, error, isLoading } = useSpotify<PlaylistResponse>('type=playlists');
  const loadplaylists = [1,2,3,4,5,6];

  if (error) {
    return (
      <>
        <UKCallout type='error'>
          <p className="font-bold">Error loading data <code>playlist</code></p>
          <p className='font-mono'>{error}</p>
        </UKCallout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          {loadplaylists.map((_, index) => (
            <LoadingSkeleton key={index} type="playlist" />
          ))}
        </div>
      </>
    );
  }

  if (isLoading || !data?.items?.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
        {loadplaylists.map((_, index) => (
          <LoadingSkeleton key={index} type="playlist" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
      {data.items.map((playlist) => (
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
