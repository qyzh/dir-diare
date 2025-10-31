import { NextRequest, NextResponse } from 'next/server'
import { getNoteQById, updateNoteQ, deleteNoteQ, noteQ } from 'app/lib/noteq'
import {
    checkAuth,
    createErrorResponse,
    createNotFoundResponse,
} from 'app/lib/api-helpers'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const note = await getNoteQById(id)

        if (!note) {
            return createNotFoundResponse('Note not found')
        }

        return NextResponse.json(note)
    } catch (error) {
        return createErrorResponse('Failed to fetch note', error as Error, 500)
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await checkAuth()
    if (!authResult.authorized) {
        return authResult.response
    }

    try {
        const { id } = await params
        const body = await request.json()
        const updatedNoteQ = await updateNoteQ(id, body as Partial<noteQ>)

        if (!updatedNoteQ) {
            return createNotFoundResponse('Note not found')
        }

        return NextResponse.json(updatedNoteQ)
    } catch (error) {
        return createErrorResponse('Failed to update note', error as Error, 500)
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await checkAuth()
    if (!authResult.authorized) {
        return authResult.response
    }

    try {
        const { id } = await params
        const deleted = await deleteNoteQ(id)

        if (!deleted) {
            return createNotFoundResponse('Note not found')
        }

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        return createErrorResponse('Failed to delete note', error as Error, 500)
    }
}
