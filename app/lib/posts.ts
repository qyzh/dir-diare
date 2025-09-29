import clientPromise from './mongodb'

export interface Post {
    _id: string
    slug: string
    title: string
    content: string
    summary?: string
    publishedAt: string
    updatedAt?: string
    tags?: string[]
    author?: string
}

async function getDb() {
    const client = await clientPromise
    return client.db('dirmain')
}

export async function getAllPosts(): Promise<Post[]> {
    const db = await getDb()
    const posts = await db
        .collection('dirpost')
        .find({})
        .sort({ publishedAt: -1 })
        .toArray()

    return posts.map(
        (post) =>
            ({
                ...post,
                _id: post._id.toString(),
            }) as Post
    )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const db = await getDb()
    const post = await db.collection('dirpost').findOne({ slug })

    if (post) {
        // Process the content if needed based on the stored format
        // MDXRemote expects content as a string of MDX markup
        return {
            ...post,
            _id: post._id.toString(),
        } as Post
    }

    return null
}

export async function createPost(post: Omit<Post, '_id'>): Promise<Post> {
    const db = await getDb()
    const now = new Date().toISOString()

    const postToInsert = {
        ...post,
        publishedAt: post.publishedAt || now,
        updatedAt: now,
    }

    const result = await db.collection('dirpost').insertOne(postToInsert)

    return {
        ...postToInsert,
        _id: result.insertedId.toString(),
    } as Post
}

export async function updatePost(
    slug: string,
    post: Partial<Post>
): Promise<Post | null> {
    const db = await getDb()
    const now = new Date().toISOString()

    const update = {
        ...post,
        updatedAt: now,
    }

    delete update._id // Remove _id if present as it cannot be updated

    const result = await db
        .collection('dirpost')
        .findOneAndUpdate(
            { slug },
            { $set: update },
            { returnDocument: 'after' }
        )

    if (result) {
        return {
            ...result,
            _id: result._id.toString(),
        } as Post
    }

    return null
}
