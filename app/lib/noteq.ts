import clientPromise from './mongodb'
import { ObjectId } from 'mongodb'

export interface noteQ {
    _id: string
    date: string
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
            }) as noteQ
    )
}

export async function createNoteQ(note: Omit<noteQ, '_id'>): Promise<noteQ> {
    const db = await getDb()
    const result = await db.collection('dirnote').insertOne(note)
    return {
        ...note,
        _id: result.insertedId.toString(),
    } as noteQ
}

export async function getNoteQById(id: string): Promise<noteQ | null> {
    const db = await getDb()
    const note = await db.collection('dirnote').findOne({ _id: new ObjectId(id) })

    if (note) {
        return {
            ...note,
            _id: note._id.toString(),
        } as noteQ
    }

    return null
}

export async function updateNoteQ(
    id: string,
    note: Partial<noteQ>
): Promise<noteQ | null> {
    const db = await getDb()

    const update = {
        ...note,
    }

    delete update._id // Remove _id if present as it cannot be updated

    const updatedDocument = await db
        .collection('dirnote')
        .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update },
            { returnDocument: 'after' }
        )

    if (updatedDocument) {
        return {
            ...updatedDocument,
            _id: updatedDocument._id.toString(),
        } as noteQ
    }

    return null
}

export async function deleteNoteQ(id: string): Promise<boolean> {
    const db = await getDb()
    const result = await db.collection('dirnote').deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
}

