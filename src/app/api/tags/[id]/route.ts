import { NextRequest, NextResponse } from 'next/server'
import { updateTag, deleteTag } from '@/lib/tags'
import { checkAuth, createErrorResponse } from '@/lib/api-helpers'

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await checkAuth()
    if (!authResult.authorized) return authResult.response

    try {
        const { id } = await params
        const body = await request.json()
        if (!body.name?.trim()) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 })
        }
        const tag = await updateTag(id, body.name.trim(), body.description?.trim(), body.icon?.trim())
        if (!tag) return NextResponse.json({ error: 'Tag not found' }, { status: 404 })
        return NextResponse.json(tag)
    } catch (error) {
        return createErrorResponse('Failed to update tag', error as Error, 500)
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await checkAuth()
    if (!authResult.authorized) return authResult.response

    try {
        const { id } = await params
        const deleted = await deleteTag(id)
        if (!deleted) return NextResponse.json({ error: 'Tag not found' }, { status: 404 })
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return createErrorResponse('Failed to delete tag', error as Error, 500)
    }
}
