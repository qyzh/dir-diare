"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

interface PhotoGalleryProps {
  username: string;
  limit?: number;
}

export default function PhotoGallery({ username, limit = 10 }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
        if (!apiKey) {
          throw new Error('Missing Unsplash API key');
        }

        const response = await fetch(
          `https://api.unsplash.com/users/${username}/photos?client_id=${apiKey}&per_page=${limit}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred fetching photos');
        console.error('Error fetching photos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [username, limit]);

  if (loading) return <div className="flex justify-center p-8">Loading photos...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (photos.length === 0) return <div className="p-4">No photos found for this user.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {photos.map((photo) => (
        <div key={photo.id} className="overflow-hidden rounded-lg shadow-lg">
          <div className="relative h-64 w-full">
            <Image
              src={photo.urls.regular}
              alt={photo.alt_description || `Photo by ${photo.user.name}`}
              fill
              className="object-cover grayscale-100 hover:grayscale-0 transition duration-300 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
