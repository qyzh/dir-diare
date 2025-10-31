import { NextResponse, type NextRequest } from 'next/server'
import {
    getArtPostBySlug,
    updateArtPost,
    deleteArtPost,
    ArtPost,
} from 'app/lib/artpost'
import {
    checkAuth,
    createErrorResponse,
    createNotFoundResponse,
} from 'app/lib/api-helpers'
import { AUTHORIZED_USER } from 'app/lib/constants'

export async function GET(request: NextRequest, { params }) {
    const { slug } = params
    const post = await getArtPostBySlug(slug)

    if (!post) {
        return createNotFoundResponse('Art Post not found')
    }

    return NextResponse.json(post)
}

export async function PUT(request: NextRequest, { params }) {
    const authResult = await checkAuth()
    if (!authResult.authorized) {
        return authResult.response
    }

    const { slug } = params
    try {
        const body = await request.json()
        const updatedArtPost = await updateArtPost(slug, {
            ...body,
            author: AUTHORIZED_USER,
        } as Partial<ArtPost>)

        if (!updatedArtPost) {
            return createNotFoundResponse('Art Post not found')
        }

        return NextResponse.json(updatedArtPost)
    } catch (error) {
        return createErrorResponse(
            'Failed to update art post',
            error as Error,
            500
        )
    }
}

export async function DELETE(request: NextRequest, { params }) {
    const authResult = await checkAuth()
    if (!authResult.authorized) {
        return authResult.response
    }

    const { slug } = params
    try {
        const deleted = await deleteArtPost(slug)

        if (!deleted) {
            return createNotFoundResponse('Art Post not found')
        }

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return createErrorResponse(
            'Failed to delete art post',
            error as Error,
            500
        )
    }
}
