import { NextRequest, NextResponse } from 'next/server'
import { createPost, getAllPosts } from 'app/lib/posts'
import { checkAuth, createErrorResponse } from 'app/lib/api-helpers'
import { AUTHORIZED_USER } from 'app/lib/constants'

export async function GET(request: NextRequest) {
    try {
        const posts = await getAllPosts()
        return NextResponse.json(posts)
    } catch (error) {
        return createErrorResponse(
            'Failed to fetch posts',
            error as Error,
            500
        )
    }
}

export async function POST(request: NextRequest) {
    const authResult = await checkAuth()
    if (!authResult.authorized) {
        return authResult.response
    }

    try {
        const body = await request.json()

        // Simple validation
        if (!body.title || !body.content) {
            return NextResponse.json(
                { error: 'Title and content are required fields' },
                { status: 400 }
            )
        }

        const slug = body.slug || body.title.toLowerCase().replace(/\s+/g, '-')

        // Create a new post
        const newPost = await createPost({
            title: body.title,
            slug: slug,
            content: body.content,
            summary: body.summary || '',
            publishedAt: body.publishedAt || new Date().toISOString(),
            tags: body.tags || [],
            author: AUTHORIZED_USER,
            status: body.status || 'draft',
        })

        return NextResponse.json(
            { success: true, post: newPost },
            { status: 201 }
        )
    } catch (error) {
        return createErrorResponse(
            'Failed to create post',
            error as Error,
            500
        )
    }
}
