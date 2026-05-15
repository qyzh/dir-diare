import { NextRequest, NextResponse } from 'next/server'
import { getAllTags, createTag } from '@/lib/tags'
import { checkAuth, createErrorResponse } from '@/lib/api-helpers'

export async function GET() {
    try {
        const tags = await getAllTags()
        return NextResponse.json(tags)
    } catch (error) {
        return createErrorResponse('Failed to fetch tags', error as Error, 500)
    }
}

export async function POST(request: NextRequest) {
    const authResult = await checkAuth()
    if (!authResult.authorized) return authResult.response

    try {
        const body = await request.json()
        if (!body.name?.trim()) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 })
        }
        const tag = await createTag(body.name.trim(), body.description?.trim(), body.icon?.trim())
        return NextResponse.json(tag, { status: 201 })
    } catch (error) {
        return createErrorResponse('Failed to create tag', error as Error, 500)
    }
}
