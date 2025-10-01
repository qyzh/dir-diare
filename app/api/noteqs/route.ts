import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/lib/auth'
import {
    getNoteQ,
    createNoteQ,
    noteQ,
} from 'app/lib/noteq'

export async function GET() {
    const notes = await getNoteQ()
    return NextResponse.json(notes)
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.name !== 'uki') {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        const body = await request.json()
        const newNoteQ = await createNoteQ(body as Omit<noteQ, '_id'>)
        return NextResponse.json(newNoteQ, { status: 201 })
    } catch (error) {
        console.error('Failed to create note:', error)
        return new NextResponse('Failed to create note', { status: 500 })
    }
}
