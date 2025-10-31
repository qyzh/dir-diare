import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug, updatePost } from 'app/lib/posts'
import {
    checkAuth,
    createErrorResponse,
    createNotFoundResponse,
} from 'app/lib/api-helpers'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const post = await getPostBySlug(slug)
        if (!post) {
            return createNotFoundResponse('Post not found')
        }
        return NextResponse.json(post)
    } catch (error) {
        return createErrorResponse('Failed to fetch post', error as Error, 500)
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const authResult = await checkAuth()
    if (!authResult.authorized) {
        return authResult.response
    }

    try {
        const { slug } = await params
        const body = await request.json()
        const { title, content, tags, summary, author, status } = body

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            )
        }

        const updatedPost = await updatePost(slug, {
            title,
            content,
            tags,
            summary,
            author,
            status,
        })

        if (!updatedPost) {
            return createNotFoundResponse('Post not found')
        }

        return NextResponse.json({ success: true, post: updatedPost })
    } catch (error) {
        return createErrorResponse('Failed to update post', error as Error, 500)
    }
}
