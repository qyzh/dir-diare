import clientPromise from './mongodb'
import { ObjectId, WithId, Document, Filter, OptionalId } from 'mongodb'

/**
 * Get the main database instance
 */
export async function getDb() {
    const client = await clientPromise
    return client.db('dirmain')
}

/**
 * Convert MongoDB document to typed object with string _id
 */
export function documentToObject<T extends { _id: string }>(
    doc: WithId<Document>
): T {
    return {
        ...doc,
        _id: doc._id.toString(),
    } as T
}

/**
 * Generic function to get all documents from a collection
 */
export async function getAllDocuments<T extends { _id: string }>(
    collectionName: string,
    sortField: string = 'publishedAt',
    sortOrder: -1 | 1 = -1,
    filter: Filter<Document> = {}
): Promise<T[]> {
    const db = await getDb()
    const docs = await db
        .collection(collectionName)
        .find(filter)
        .sort({ [sortField]: sortOrder })
        .toArray()

    return docs.map((doc) => documentToObject<T>(doc))
}

/**
 * Generic function to get a document by a field
 */
export async function getDocumentByField<T extends { _id: string }>(
    collectionName: string,
    fieldName: string,
    fieldValue: string | ObjectId
): Promise<T | null> {
    const db = await getDb()
    const filter =
        fieldName === '_id' && typeof fieldValue === 'string'
            ? { [fieldName]: new ObjectId(fieldValue) }
            : { [fieldName]: fieldValue }

    const doc = await db.collection(collectionName).findOne(filter)

    if (doc) {
        return documentToObject<T>(doc)
    }

    return null
}

/**
 * Generic function to create a document
 */
export async function createDocument<T extends { _id: string }>(
    collectionName: string,
    data: Omit<T, '_id'>,
    addTimestamps: boolean = false
): Promise<T> {
    const db = await getDb()
    const now = new Date().toISOString()

    const docToInsert = addTimestamps
        ? {
              ...data,
              publishedAt: (data as any).publishedAt || now,
              updatedAt: now,
          }
        : data

    const result = await db
        .collection(collectionName)
        .insertOne(docToInsert as OptionalId<Document>)

    return {
        ...docToInsert,
        _id: result.insertedId.toString(),
    } as T
}

/**
 * Generic function to update a document by field
 */
export async function updateDocumentByField<T extends { _id: string }>(
    collectionName: string,
    fieldName: string,
    fieldValue: string | ObjectId,
    updates: Partial<T>,
    addTimestamp: boolean = false
): Promise<T | null> {
    const db = await getDb()
    const filter =
        fieldName === '_id' && typeof fieldValue === 'string'
            ? { [fieldName]: new ObjectId(fieldValue) }
            : { [fieldName]: fieldValue }

    const update = { ...updates }
    delete (update as any)._id // Remove _id if present as it cannot be updated

    const updateData = addTimestamp
        ? { ...update, updatedAt: new Date().toISOString() }
        : update

    const result = await db
        .collection(collectionName)
        .findOneAndUpdate(filter, { $set: updateData }, { returnDocument: 'after' })

    if (result) {
        return documentToObject<T>(result)
    }

    return null
}

/**
 * Generic function to delete a document by field
 */
export async function deleteDocumentByField(
    collectionName: string,
    fieldName: string,
    fieldValue: string | ObjectId
): Promise<boolean> {
    const db = await getDb()
    const filter =
        fieldName === '_id' && typeof fieldValue === 'string'
            ? { [fieldName]: new ObjectId(fieldValue) }
            : { [fieldName]: fieldValue }

    const result = await db.collection(collectionName).deleteOne(filter)
    return result.deletedCount === 1
}
