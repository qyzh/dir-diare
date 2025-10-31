import { NextResponse } from 'next/server'
import { getNoteQ, createNoteQ, noteQ } from 'app/lib/noteq'
import { checkAuth, createErrorResponse } from 'app/lib/api-helpers'

export async function GET() {
    const notes = await getNoteQ()
    return NextResponse.json(notes)
}

export async function POST(request: Request) {
    const authResult = await checkAuth()
    if (!authResult.authorized) {
        return authResult.response
    }

    try {
        const body = await request.json()
        const newNoteQ = await createNoteQ(body as Omit<noteQ, '_id'>)
        return NextResponse.json(newNoteQ, { status: 201 })
    } catch (error) {
        return createErrorResponse('Failed to create note', error as Error, 500)
    }
}
