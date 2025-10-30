import {
    getAllDocuments,
    getDocumentByField,
    createDocument,
    updateDocumentByField,
} from './db-helpers'

export interface Post {
    _id: string
    slug: string
    title: string
    content: string
    summary?: string
    publishedAt: string
    updatedAt?: string
    tags?: string[]
    author: string
    status: 'draft' | 'published'
}

const COLLECTION_NAME = 'dirpost'

export async function getAllPosts(): Promise<Post[]> {
    return getAllDocuments<Post>(COLLECTION_NAME)
}

export async function getAllPublishedPosts(): Promise<Post[]> {
    return getAllDocuments<Post>(COLLECTION_NAME, 'publishedAt', -1, {
        status: 'published',
    })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    return getDocumentByField<Post>(COLLECTION_NAME, 'slug', slug)
}

export async function createPost(post: Omit<Post, '_id'>): Promise<Post> {
    const postWithDefaults = {
        ...post,
        status: post.status || 'draft',
    }
    return createDocument<Post>(COLLECTION_NAME, postWithDefaults, true)
}

export async function updatePost(
    slug: string,
    post: Partial<Post>
): Promise<Post | null> {
    return updateDocumentByField<Post>(COLLECTION_NAME, 'slug', slug, post, true)
}
