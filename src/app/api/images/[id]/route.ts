import { Readable } from 'stream'
import { NextRequest, NextResponse } from 'next/server'
import { createErrorResponse, createNotFoundResponse } from '@/lib/api-helpers'
import {
    getImageFileById,
    openImageDownloadStream,
    parseImageObjectId,
} from '@/lib/images'

export const runtime = 'nodejs'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const imageId = parseImageObjectId(id)
        if (!imageId) {
            return NextResponse.json({ error: 'Invalid image id' }, { status: 400 })
        }

        const fileDoc = await getImageFileById(imageId)
        if (!fileDoc) {
            return createNotFoundResponse('Image not found')
        }

        const contentType =
            fileDoc.contentType || fileDoc.metadata?.contentType || 'application/octet-stream'
        const stream = await openImageDownloadStream(imageId)
        const body = Readable.toWeb(stream) as ReadableStream

        return new NextResponse(body, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                ...(typeof fileDoc.length === 'number'
                    ? { 'Content-Length': String(fileDoc.length) }
                    : {}),
            },
        })
    } catch (error) {
        return createErrorResponse('Failed to load image', error as Error, 500)
    }
}
