import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'A visual archive — photographs uploaded to Unsplash.',
    alternates: { canonical: '/g' },
}

export const revalidate = 3600

interface UnsplashPhoto {
    id: string
    description: string | null
    alt_description: string | null
    width: number
    height: number
    created_at: string
    urls: {
        raw: string
        full: string
        regular: string
        small: string
        thumb: string
    }
    links: {
        html: string
        download: string
    }
    location: {
        name: string | null
        city: string | null
        country: string | null
    } | null
    likes: number
    views: number
}

async function getUnsplashPhotos(): Promise<UnsplashPhoto[]> {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY
    const username = process.env.UNSPLASH_USERNAME

    if (!accessKey || !username) {
        console.warn('[gallery] UNSPLASH_ACCESS_KEY or UNSPLASH_USERNAME not set')
        return []
    }

    const res = await fetch(
        `https://api.unsplash.com/users/${username}/photos?per_page=30&order_by=latest&stats=true`,
        {
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
            next: { revalidate: 3600 },
        }
    )

    if (!res.ok) {
        console.error('[gallery] Unsplash API error:', res.status, res.statusText)
        return []
    }

    return res.json()
}

function formatPhotoDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

const delayClass = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4']

export default async function GalleryPage() {
    const photos = await getUnsplashPhotos()

    return (
        <main>
            <div className="page-header">
                <Link href="/" className="page-back">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M15 17h-2v-2h-2v-2H9v-2h2V9h2V7h2v10Z" />
                    </svg>
                    dir-diare
                </Link>
                <h1 className="page-title">Gallery</h1>
                <p className="page-subtitle">
                    Photographs — a visual archive from Unsplash.
                </p>
            </div>

            {photos.length > 0 ? (
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
            ) : (
                <div className="gallery-empty">
                    <p className="gallery-empty-text">
                        No photos yet — check back later, or set up your{' '}
                        <code>UNSPLASH_ACCESS_KEY</code> and{' '}
                        <code>UNSPLASH_USERNAME</code> environment variables.
                    </p>
                </div>
            )}

            <Footer />
        </main>
    )
}
