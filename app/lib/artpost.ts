import clientPromise from './mongodb'
/* import { ObjectId } from 'mongodb' */

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

async function getDb() {
    const client = await clientPromise
    return client.db('dirmain')
}

export async function getAllArtPosts(): Promise<ArtPost[]> {
    const db = await getDb()
    const posts = await db
        .collection('dirart')
        .find({})
        .sort({ publishedAt: -1 })
        .toArray()

    return posts.map(
        (post) =>
            ({
                ...post,
                _id: post._id.toString(),
            }) as ArtPost
    )
}

export async function getArtPostBySlug(slug: string): Promise<ArtPost | null> {
    const db = await getDb()
    const post = await db.collection('dirart').findOne({ slug })

    if (post) {
        // Process the content if needed based on the stored format
        // MDXRemote expects content as a string of MDX markup
        return {
            ...post,
            _id: post._id.toString(),
        } as ArtPost
    }

    return null
}

export async function createArtPost(
    post: Omit<ArtPost, '_id'>
): Promise<ArtPost> {
    const db = await getDb()
    const now = new Date().toISOString()

    const postToInsert = {
        ...post,
        publishedAt: post.publishedAt || now,
        updatedAt: now,
    }

    const result = await db.collection('dirart').insertOne(postToInsert)

    return {
        ...postToInsert,
        _id: result.insertedId.toString(),
    } as ArtPost
}

export async function updateArtPost(
    slug: string,
    post: Partial<ArtPost>
): Promise<ArtPost | null> {
    const db = await getDb()
    const now = new Date().toISOString()

    const update = {
        ...post,
        updatedAt: now,
    }

    delete update._id // Remove _id if present as it cannot be updated

    const result = await db
        .collection('dirart')
        .findOneAndUpdate(
            { slug },
            { $set: update },
            { returnDocument: 'after' }
        )

    if (result) {
        return { ...result, _id: result._id.toString() } as ArtPost
    }

    return null
}

export async function deleteArtPost(slug: string): Promise<boolean> {
    const db = await getDb()
    const result = await db.collection('dirart').deleteOne({ slug })
    return result.deletedCount === 1
}

