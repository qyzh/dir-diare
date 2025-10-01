import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/lib/auth'
import {
    getAllArtPosts,
    createArtPost,
    ArtPost,
} from 'app/lib/artpost'

export async function GET() {
    const posts = await getAllArtPosts()
    return NextResponse.json(posts)
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.name !== 'uki') {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const body = await request.json()
        const newArtPost = await createArtPost(body as Omit<ArtPost, '_id'>)
        return NextResponse.json(newArtPost, { status: 201 })
    } catch (error) {
        console.error('Failed to create art post:', error)
        return new NextResponse('Failed to create art post', { status: 500 })
    }
}
