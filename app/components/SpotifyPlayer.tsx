'use client';

import { useEffect, useState } from 'react';

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

export default function SpotifyPlayer() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify');
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setData(data);
        }
      } catch (err) {
        setError('Failed to fetch Spotify data');
      }
    };

    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!data.is_playing) {
    return <div>Not currently playing</div>;
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg text-white">
      {data.item.album.images[0] && (
        <img
          src={data.item.album.images[0].url}
          alt={data.item.name}
          className="w-16 h-16 rounded"
        />
      )}
      <div>
        <div className="font-bold">{data.item.name}</div>
        <div className="text-gray-300">
          {data.item.artists.map(artist => artist.name).join(', ')}
        </div>
        <div className="text-sm text-gray-400">{data.item.album.name}</div>
      </div>
    </div>
  );
} 