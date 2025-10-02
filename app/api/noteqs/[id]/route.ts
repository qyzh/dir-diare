import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/lib/auth'
import {
    getNoteQById,
    updateNoteQ,
    deleteNoteQ,
    noteQ,
} from 'app/lib/noteq'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const note = await getNoteQById(id)

        if (!note) {
            return new NextResponse('Note not found', { status: 404 })
        }

        return NextResponse.json(note)
    } catch (error) {
        console.error('Error fetching note:', error)
        return new NextResponse('Failed to fetch note', { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.name !== 'uki') {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const { id } = await params
        const body = await request.json()
        const updatedNoteQ = await updateNoteQ(id, body as Partial<noteQ>)

        if (!updatedNoteQ) {
            return new NextResponse('Note not found', { status: 404 })
        }

        return NextResponse.json(updatedNoteQ)
    } catch (error) {
        console.error('Failed to update note:', error)
        return new NextResponse('Failed to update note', { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.name !== 'uki') {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const { id } = await params
        const deleted = await deleteNoteQ(id)

        if (!deleted) {
            return new NextResponse('Note not found', { status: 404 })
        }

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error('Failed to delete note:', error)
        return new NextResponse('Failed to delete note', { status: 500 })
    }
}
