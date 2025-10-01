import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/lib/auth'
import {
    getArtPostBySlug,
    updateArtPost,
    deleteArtPost,
    ArtPost,
} from 'app/lib/artpost'

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const { slug } = params
    const post = await getArtPostBySlug(slug)

    if (!post) {
        return new NextResponse('Art Post not found', { status: 404 })
    }

    return NextResponse.json(post)
}

export async function PUT(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.name !== 'uki') {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const { slug } = params
    try {
        const body = await request.json()
        const updatedArtPost = await updateArtPost(slug, {
            ...body,
            author: session.user?.name,
        } as Partial<ArtPost>)

        if (!updatedArtPost) {
            return new NextResponse('Art Post not found', { status: 404 })
        }

        return NextResponse.json(updatedArtPost)
    } catch (error) {
        console.error('Failed to update art post:', error)
        return new NextResponse('Failed to update art post', { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.name !== 'uki') {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const { slug } = params
    try {
        // Assuming deleteArtPost function exists in app/lib/artpost.ts
        // If not, you'll need to implement it.
        const deleted = await deleteArtPost(slug)

        if (!deleted) {
            return new NextResponse('Art Post not found', { status: 404 })
        }

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error('Failed to delete art post:', error)
        return new NextResponse('Failed to delete art post', { status: 500 })
    }
}
