import {
    getAllDocuments,
    getDocumentByField,
    createDocument,
    updateDocumentByField,
    deleteDocumentByField,
    getDb,
    documentToObject,
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

export async function deletePost(slug: string): Promise<boolean> {
    return deleteDocumentByField(COLLECTION_NAME, 'slug', slug)
}

export async function getRelatedPosts(
    tags: string[] | undefined,
    currentSlug: string
): Promise<Post[]> {
    if (!tags || tags.length === 0) return []
    const db = await getDb()
    const docs = await db
        .collection(COLLECTION_NAME)
        .find({
            tags: { $in: tags },
            slug: { $ne: currentSlug },
            status: 'published',
        })
        .sort({ publishedAt: -1 })
        .limit(3)
        .toArray()
    return docs.map((doc) => documentToObject<Post>(doc))
}
