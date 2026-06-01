'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import type { UnsplashPhoto } from '@/types/unsplash'

function formatPhotoDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

const delayClass = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4']

interface GalleryClientProps {
    initialPhotos: UnsplashPhoto[]
    initialHasMore: boolean
}

export default function GalleryClient({ initialPhotos, initialHasMore }: GalleryClientProps) {
    const [photos, setPhotos] = useState<UnsplashPhoto[]>(initialPhotos)
    const [page, setPage] = useState(2) // next page to fetch
    const [hasMore, setHasMore] = useState(initialHasMore)
    const [loading, setLoading] = useState(false)
    const sentinelRef = useRef<HTMLDivElement>(null)
    const loadingRef = useRef(false) // guard against double-fires

    const loadMore = useCallback(async () => {
        if (loadingRef.current || !hasMore) return
        loadingRef.current = true
        setLoading(true)

        try {
            const res = await fetch(`/api/photos?page=${page}`)
            if (!res.ok) throw new Error('fetch failed')
            const data: { photos: UnsplashPhoto[]; hasMore: boolean } = await res.json()
            setPhotos((prev) => [...prev, ...data.photos])
            setHasMore(data.hasMore)
            setPage((p) => p + 1)
        } catch (err) {
            console.error('[gallery] load more failed:', err)
        } finally {
            setLoading(false)
            loadingRef.current = false
        }
    }, [page, hasMore])

    // Scroll reveal for dynamically appended cards
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>('.reveal:not(.visible)')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible')
                        observer.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.05 }
        )
        els.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [photos])

    // Infinite scroll sentinel
    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore()
                }
            },
            { rootMargin: '300px' } // start loading 300px before the bottom edge
        )
        observer.observe(sentinel)
        return () => observer.disconnect()
    }, [loadMore])

    return (
        <>
            <div className="gallery-grid">
                {photos.map((photo, i) => {
                    const location =
                        photo.location?.city && photo.location?.country
                            ? `${photo.location.city}, ${photo.location.country}`
                            : photo.location?.name ?? null

                    return (
                        <a
                            key={photo.id}
                            href={photo.links.html}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`gallery-card reveal ${delayClass[i % delayClass.length]}`}
                            title={photo.alt_description ?? photo.description ?? 'Photo on Unsplash'}
                        >
                            <div className="gallery-card-img-wrap">
                                <Image
                                    src={photo.urls.regular}
                                    alt={photo.alt_description ?? photo.description ?? 'Photo'}
                                    width={photo.width}
                                    height={photo.height}
                                    className="gallery-card-img"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    // First 3 cards are likely in viewport — prioritise them
                                    priority={i < 3}
                                />
                            </div>

                            <div className="gallery-card-overlay">
                                <div className="gallery-card-meta">
                                    {location && (
                                        <span className="gallery-card-location">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="10"
                                                height="10"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                            </svg>
                                            {location}
                                        </span>
                                    )}
                                    <span className="gallery-card-date">
                                        {formatPhotoDate(photo.created_at)}
                                    </span>
                                </div>

                                {(photo.description ?? photo.alt_description) && (
                                    <p className="gallery-card-desc">
                                        {photo.description ?? photo.alt_description}
                                    </p>
                                )}

                                <div className="gallery-card-stats">
                                    <span className="gallery-card-stat">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="10"
                                            height="10"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                        </svg>
                                        {(photo.views ?? 0).toLocaleString()}
                                    </span>
                                    <span className="gallery-card-stat">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="10"
                                            height="10"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        {photo.likes.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>

            {/* Sentinel + loading indicator */}
            <div ref={sentinelRef} className="gallery-sentinel" aria-hidden="true" />
            {loading && (
                <div className="gallery-loading" aria-label="Loading more photos">
                    <span className="gallery-loading-dots">
                        <span />
                        <span />
                        <span />
                    </span>
                </div>
            )}
            {!hasMore && photos.length > 0 && (
                <p className="gallery-end">— end of gallery —</p>
            )}
        </>
    )
}
