"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Drawer } from 'vaul';
import Link from 'next/link';
import UKCallout from './ukcallout';

interface UnsplashPhoto {
  exif: any;
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  likes: number;
  downloads: number;
  location: {
    city: string;
    country: string;
    title: string;
  };
  tags: {
    title: string;
  }[];
}

interface PhotoGalleryProps {
  username: string;
  limit?: number;
}

export default function PhotoGallery({ username, limit = 10 }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPhotoElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchPhotos = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
      if (!apiKey) {
        throw new Error('Missing Unsplash API key');
      }

      const response = await fetch(
        `https://api.unsplash.com/users/${username}/photos?client_id=${apiKey}&per_page=${limit}&page=${pageNumber}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      // Fetch additional details for each photo
      const photosWithDetails = await Promise.all(
        data.map(async (photo) => {
          const photoDetailsResponse = await fetch(
            `https://api.unsplash.com/photos/${photo.id}?client_id=${apiKey}`
          );
          
          if (!photoDetailsResponse.ok) {
            console.error(`Failed to fetch photo details for ${photo.id}`);
            return photo;
          }
          
          const photoDetails = await photoDetailsResponse.json();
          return { ...photo, ...photoDetails };
        })
      );

      setPhotos(prevPhotos => pageNumber === 1 ? photosWithDetails : [...prevPhotos, ...photosWithDetails]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred fetching photos');
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [username, limit]);

  useEffect(() => {
    fetchPhotos(1);
  }, [fetchPhotos]);

  useEffect(() => {
    if (page > 1) {
      fetchPhotos(page);
    }
  }, [page, fetchPhotos]);

  if (initialLoading) return <div className="flex justify-center p-8">Loading photos...</div>;
  if (error) return (
    <>
    <UKCallout type='error'>
      <p className='font-bold font-mono'>Error loading data <code>Photo</code></p>
      <p>{error}</p>
    </UKCallout>
    </>
  );
  if (photos.length === 0) return <div className="p-4">No photos found for this user.</div>;

  return (
    <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {photos.map((photo, index) => (
        <div key={photo.id}>
          <Drawer.Root direction='right'>
        <div
          className="overflow-hidden rounded shadow-lg"
          ref={photos.length === index + 1 ? lastPhotoElementRef : undefined}
        >
          <Drawer.Trigger className="relative h-64 w-full">
            <Image
              src={photo.urls.regular}
              alt={photo.alt_description || `Photo by ${photo.user.name}`}
              fill
              className="object-cover grayscale-100 hover:grayscale-0 transition duration-300 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Drawer.Trigger>
        </div>
        <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[310px] flex text-white dark:text-zinc-600"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
        >
          <div className="bg-black dark:bg-black/5 h-full w-full grow p-5 flex flex-col border border-neutral-300 dark:border-neutral-700">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-2 text-white dark:text-white">Photo by {photo.user.name}</Drawer.Title>
              <Drawer.Description className="mb-4 text-white dark:text-neutral-500 font-mono">
                  {photo.alt_description || 'No description available.'}
                </Drawer.Description>
                <div className="grid grid-cols-2 gap-2 text-sm text-white dark:text-neutral-600">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {photo.likes || 0} likes
                  </div>
                  <div className="flex items-center gap-1  text-white dark:text-neutral-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {photo.downloads || 0} downloads
                  </div>
                  

                  {photo.exif && (
                    <div className="col-span-2 grid grid-cols-1 bg-white/5 dark:bg-neutral-800 p-2 border-1 border-neutral-900 dark:border-neutral-700 mt-2 font-mono text-neutral-400 dark:text-neutral-500 rounded">
                      {(photo.exif.make || photo.exif.model || photo.exif.name) && (
                        <div className="flex items-center gap-1">

                          <span>
                            {photo.exif.make ? `${photo.exif.make} ` : ''}
                            {photo.exif.model ? `${photo.exif.model} ` : ''}
                            {photo.exif.name ? `(${photo.exif.name})` : ''}
                          </span>
                        </div>
                      )}
                      {photo.exif.exposure_time && (
                        <div className="flex items-center gap-1">

                          Exposure: {photo.exif.exposure_time}
                        </div>
                      )}
                      {photo.exif.aperture && (
                        <div className="flex items-center gap-1">
 
                          Aperture: f/{photo.exif.aperture}
                        </div>
                      )}
                      {photo.exif.focal_length && (
                        <div className="flex items-center gap-1">

                          Focal Length: {photo.exif.focal_length}mm
                        </div>
                      )}
                      {photo.exif.iso && (
                        <div className="flex items-center gap-1">

                          ISO: {photo.exif.iso}
                        </div>
                      )}
                    </div>
                  )}


                  {photo.location && (
                    <div className="col-span-2 flex items-center gap-1  text-white dark:text-neutral-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {photo.location.title || `${photo.location.city || ' '} ${photo.location.country || ' '}`}
                      </div>
                  )}
                </div>
                {photo.tags && photo.tags.length > 0 && (
                  <div className="mt-4 text-white dark:text-neutral-600">
                    <div className="text-sm font-medium mb-2"><p>Tags:</p></div>
                    <div className="flex flex-wrap gap-2">
                      {photo.tags.map((tag: any) => (
                        <span key={tag.title} className="px-2 py-1 bg-white/5 dark:bg-neutral-200 rounded-full text-xs">
                          {tag.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            <div className="mt-auto flex justify-between items-center pt-4 border-t border-neutral-700">
            <p className="font-mono text-xs">
              Powered By :{' '}
              <Link href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
                Unsplash
              </Link>
            </p>
          </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
        </Drawer.Root>
      </div>
      ))}     
      {loading && <div className="col-span-full flex justify-center p-4">Loading more photos...</div>}
      {!hasMore && photos.length > 0 && <div className="col-span-full text-center p-4 text-gray-500">No more photos to load</div>}
    </div>
    </div>
  );
}
