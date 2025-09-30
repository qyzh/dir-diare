import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import { createPost, getAllPosts } from 'app/lib/posts'

export async function GET(request: NextRequest) {
    try {
        const posts = await getAllPosts()
        return NextResponse.json(posts)
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json(
            {
                error: 'Failed to fetch posts',
                details: (error as Error).message,
            },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (session?.user?.name !== 'uki') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
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
            author: 'uki',
            status: body.status || 'draft',
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
