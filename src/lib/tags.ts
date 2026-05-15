import {
    getAllDocuments,
    getDocumentByField,
    createDocument,
    updateDocumentByField,
    deleteDocumentByField,
} from './db-helpers'

export interface Tag {
    _id: string
    name: string
    slug: string
    description?: string
    icon?: string
    createdAt: string
}

const COLLECTION = 'dirtags'

export async function getAllTags(): Promise<Tag[]> {
    return getAllDocuments<Tag>(COLLECTION, 'name', 1)
}

export async function getTagById(id: string): Promise<Tag | null> {
    return getDocumentByField<Tag>(COLLECTION, '_id', id)
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
    return getDocumentByField<Tag>(COLLECTION, 'slug', slug)
}

export async function createTag(
    name: string,
    description?: string,
    icon?: string
): Promise<Tag> {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const now = new Date().toISOString()
    return createDocument<Tag>(COLLECTION, { name, slug, description, icon, createdAt: now })
}

export async function updateTag(
    id: string,
    name: string,
    description?: string,
    icon?: string
): Promise<Tag | null> {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    return updateDocumentByField<Tag>(COLLECTION, '_id', id, { name, slug, description, icon })
}

export async function deleteTag(id: string): Promise<boolean> {
    return deleteDocumentByField(COLLECTION, '_id', id)
}
