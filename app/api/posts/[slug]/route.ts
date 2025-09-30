import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'app/lib/auth'
import { getPostBySlug, updatePost } from 'app/lib/posts'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const post = await getPostBySlug(slug)
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }
        return NextResponse.json(post)
    } catch (error) {
        console.error('Error fetching post:', error)
        return NextResponse.json(
            {
                error: 'Failed to fetch post',
                details: (error as Error).message,
            },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const session = await getServerSession(authOptions)

    if (session?.user?.name !== 'uki') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
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
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, post: updatedPost })
    } catch (error) {
        console.error('Error updating post:', error)
        return NextResponse.json(
            {
                error: 'Failed to update post',
                details: (error as Error).message,
            },
            { status: 500 }
        )
    }
}
