import { NextRequest, NextResponse } from 'next/server'
import type { UnsplashPhoto } from '@/types/unsplash'

const PER_PAGE = 12

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, Number(searchParams.get('page') ?? '1'))

    const accessKey = process.env.UNSPLASH_ACCESS_KEY
    const username = process.env.UNSPLASH_USERNAME

    if (!accessKey || !username) {
        return NextResponse.json({ photos: [], hasMore: false }, { status: 200 })
    }

    const res = await fetch(
        `https://api.unsplash.com/users/${username}/photos?per_page=${PER_PAGE}&page=${page}&order_by=latest`,
        {
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
            // Cache each individual page for 1 hour — repeated scrolls don't hit Unsplash again
            next: { revalidate: 3600 },
        }
    )

    if (!res.ok) {
        console.error('[api/photos] Unsplash error:', res.status, res.statusText)
        return NextResponse.json(
            { error: 'Failed to fetch photos' },
            { status: res.status }
        )
    }

    const photos: UnsplashPhoto[] = await res.json()

    return NextResponse.json(
        {
            photos,
            // If we got a full page, there may be more
            hasMore: photos.length === PER_PAGE,
        },
        {
            headers: {
                // Allow the browser/CDN to cache this response too
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
            },
        }
    )
}
