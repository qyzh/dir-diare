import { GridFSBucket, ObjectId } from 'mongodb'
import { getDb } from './db-helpers'

export const IMAGE_BUCKET_NAME = 'images'
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = new Set([
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
])

const EXTENSION_TO_MIME: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
}

type ImageFileDocument = {
    _id: ObjectId
    filename?: string
    length?: number
    uploadDate?: Date
    contentType?: string
    metadata?: {
        contentType?: string
    }
}

export type UploadedImage = {
    id: string
    filename: string
    contentType: string
    size: number
    uploadDate: string
}

export function isAllowedImageType(contentType: string): boolean {
    return ALLOWED_IMAGE_TYPES.has(contentType)
}

export function normalizeImageContentType(
    contentType: string,
    filename: string
): string | null {
    const normalizedType = contentType.trim().toLowerCase()
    if (normalizedType) {
        if (normalizedType === 'image/jpg') {
            return 'image/jpeg'
        }
        return isAllowedImageType(normalizedType) ? normalizedType : null
    }

    const extension = filename.trim().split('.').pop()?.toLowerCase() || ''
    const mapped = EXTENSION_TO_MIME[extension]
    return mapped || null
}

export function normalizeFilename(filename: string): string {
    const trimmed = filename.trim()
    if (!trimmed) {
        return 'upload-image'
    }
    return trimmed.replace(/[^\w.-]+/g, '-').replace(/-+/g, '-')
}

export function parseImageObjectId(value: string): ObjectId | null {
    if (!ObjectId.isValid(value)) {
        return null
    }
    return new ObjectId(value)
}

export async function uploadImageBuffer(
    buffer: Buffer,
    filename: string,
    contentType: string
): Promise<UploadedImage> {
    const db = await getDb()
    const bucket = new GridFSBucket(db, { bucketName: IMAGE_BUCKET_NAME })
    const normalizedFilename = normalizeFilename(filename)

    const uploadStream = bucket.openUploadStream(normalizedFilename, {
        contentType,
        metadata: { contentType },
    })

    await new Promise<void>((resolve, reject) => {
        uploadStream.on('error', reject)
        uploadStream.on('finish', () => resolve())
        uploadStream.end(buffer)
    })

    const fileId = uploadStream.id
    const objectId =
        typeof fileId === 'object' && fileId instanceof ObjectId
            ? fileId
            : new ObjectId(String(fileId))

    return {
        id: objectId.toString(),
        filename: normalizedFilename,
        contentType,
        size: buffer.length,
        uploadDate: new Date().toISOString(),
    }
}

export async function getImageFileById(
    imageId: ObjectId
): Promise<ImageFileDocument | null> {
    const db = await getDb()
    const fileDoc = await db
        .collection<ImageFileDocument>(`${IMAGE_BUCKET_NAME}.files`)
        .findOne({ _id: imageId })
    return fileDoc
}

export async function openImageDownloadStream(imageId: ObjectId) {
    const db = await getDb()
    const bucket = new GridFSBucket(db, { bucketName: IMAGE_BUCKET_NAME })
    return bucket.openDownloadStream(imageId)
}
