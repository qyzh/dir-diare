import {
    getAllDocuments,
    getDocumentByField,
    createDocument,
    updateDocumentByField,
    deleteDocumentByField,
} from './db-helpers'

export interface ArtPost {
    _id: string
    slug: string
    title: string
    content: string
    summary?: string
    publishedAt: string
    updatedAt?: string
    tags?: string[]
    author: string
    image?: string
}

const COLLECTION_NAME = 'dirart'

export async function getAllArtPosts(): Promise<ArtPost[]> {
    return getAllDocuments<ArtPost>(COLLECTION_NAME)
}

export async function getArtPostBySlug(slug: string): Promise<ArtPost | null> {
    return getDocumentByField<ArtPost>(COLLECTION_NAME, 'slug', slug)
}

export async function createArtPost(
    post: Omit<ArtPost, '_id'>
): Promise<ArtPost> {
    return createDocument<ArtPost>(COLLECTION_NAME, post, true)
}

export async function updateArtPost(
    slug: string,
    post: Partial<ArtPost>
): Promise<ArtPost | null> {
    return updateDocumentByField<ArtPost>(
        COLLECTION_NAME,
        'slug',
        slug,
        post,
        true
    )
}

export async function deleteArtPost(slug: string): Promise<boolean> {
    return deleteDocumentByField(COLLECTION_NAME, 'slug', slug)
}

