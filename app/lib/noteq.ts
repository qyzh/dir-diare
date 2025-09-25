import clientPromise from './mongodb'
import { ObjectId } from 'mongodb'

export interface noteQ {
    _id: string
    date: timestamp
    note: string
    author?: string
    source?: string
}

async function getDb() {
    const client = await clientPromise
    return client.db('dirmain')
}

export async function getNoteQ(): Promise<noteQ[]> {
    const db = await getDb()
    const posts = await db
        .collection('dirnote')
        .find({})
        .sort({ _id: -1 })
        .toArray()

    return posts.map(
        (post) =>
            ({
                ...post,
                _id: post._id.toString(),
            }) as artPost
    )
}
