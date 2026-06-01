import Link from 'next/link'
import Footer from '@/components/footer'
import GalleryClient from './gallery-client'
import type { Metadata } from 'next'
import type { UnsplashPhoto } from '@/types/unsplash'

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'A visual archive — photographs uploaded to Unsplash.',
    alternates: { canonical: '/g' },
}

export const revalidate = 3600

const PER_PAGE = 12

async function getFirstPage(): Promise<{ photos: UnsplashPhoto[]; hasMore: boolean }> {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY
    const username = process.env.UNSPLASH_USERNAME

    if (!accessKey || !username) {
        console.warn('[gallery] UNSPLASH_ACCESS_KEY or UNSPLASH_USERNAME not set')
        return { photos: [], hasMore: false }
    }

    const res = await fetch(
        `https://api.unsplash.com/users/${username}/photos?per_page=${PER_PAGE}&page=1&order_by=latest`,
        {
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
            next: { revalidate: 3600 },
        }
    )

    if (!res.ok) {
        console.error('[gallery] Unsplash API error:', res.status, res.statusText)
        return { photos: [], hasMore: false }
    }

    const photos: UnsplashPhoto[] = await res.json()
    return { photos, hasMore: photos.length === PER_PAGE }
}

export default async function GalleryPage() {
    const { photos, hasMore } = await getFirstPage()

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
                <GalleryClient initialPhotos={photos} initialHasMore={hasMore} />
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
