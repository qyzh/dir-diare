import { NextResponse } from 'next/server'
import { getAllArtPosts, createArtPost, ArtPost } from 'app/lib/artpost'
import { checkAuth, createErrorResponse } from 'app/lib/api-helpers'

export async function GET() {
    const posts = await getAllArtPosts()
    return NextResponse.json(posts)
}

export async function POST(request: Request) {
    const authResult = await checkAuth()
    if (!authResult.authorized) {
        return authResult.response
    }

    try {
        const body = await request.json()
        const newArtPost = await createArtPost({
            ...body,
            author: 'uki',
        } as Omit<ArtPost, '_id'>)
        return NextResponse.json(newArtPost, { status: 201 })
    } catch (error) {
        return createErrorResponse(
            'Failed to create art post',
            error as Error,
            500
        )
    }
}
