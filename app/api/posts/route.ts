import { NextRequest, NextResponse } from 'next/server'
import { createPost } from 'app/lib/posts'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Simple validation
        if (!body.title || !body.slug || !body.content) {
            return NextResponse.json(
                { error: 'Title, slug, and content are required fields' },
                { status: 400 }
            )
        }

        // Create a new post
        const newPost = await createPost({
            title: body.title,
            slug: body.slug,
            content: body.content,
            summary: body.summary || '',
            publishedAt: body.publishedAt || new Date().toISOString(),
            tags: body.tags || [],
            author: body.author || 'qyzh',
        })

        return NextResponse.json(
            { success: true, post: newPost },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating post:', error)
        return NextResponse.json(
            {
                error: 'Failed to create post',
                details: (error as Error).message,
            },
            { status: 500 }
        )
    }
}
