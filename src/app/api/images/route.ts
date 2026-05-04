import { NextRequest, NextResponse } from 'next/server'
import { checkAuth, createErrorResponse } from '@/lib/api-helpers'
import {
    MAX_IMAGE_SIZE_BYTES,
    normalizeImageContentType,
    uploadImageBuffer,
} from '@/lib/images'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
    const authResult = await checkAuth()
    if (!authResult.authorized) {
        return authResult.response
    }

    try {
        const formData = await request.formData()
        const imageFile = formData.get('file')

        if (
            !imageFile ||
            typeof imageFile === 'string' ||
            typeof imageFile.arrayBuffer !== 'function'
        ) {
            return NextResponse.json(
                { error: 'Image file is required in "file" field' },
                { status: 400 }
            )
        }

        const inputFile = imageFile as File

        if (inputFile.size === 0) {
            return NextResponse.json(
                { error: 'Image file cannot be empty' },
                { status: 400 }
            )
        }

        if (inputFile.size > MAX_IMAGE_SIZE_BYTES) {
            return NextResponse.json(
                { error: 'Image exceeds 5MB limit' },
                { status: 400 }
            )
        }

        const normalizedContentType = normalizeImageContentType(
            inputFile.type || '',
            inputFile.name || ''
        )

        if (!normalizedContentType) {
            return NextResponse.json(
                {
                    error: `Unsupported image type: ${inputFile.type || 'unknown'}. Allowed: image/jpeg, image/png, image/webp, image/gif`,
                },
                { status: 400 }
            )
        }

        const bytes = await inputFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const uploaded = await uploadImageBuffer(
            buffer,
            inputFile.name,
            normalizedContentType
        )
        const url = `/api/images/${uploaded.id}`

        return NextResponse.json(
            {
                id: uploaded.id,
                url,
                filename: uploaded.filename,
                contentType: uploaded.contentType,
                size: uploaded.size,
                uploadDate: uploaded.uploadDate,
                markdown: `![alt text](${url})`,
            },
            { status: 201 }
        )
    } catch (error) {
        return createErrorResponse('Failed to upload image', error as Error, 500)
    }
}
