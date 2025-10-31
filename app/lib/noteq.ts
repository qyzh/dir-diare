import {
    getAllDocuments,
    getDocumentByField,
    createDocument,
    updateDocumentByField,
    deleteDocumentByField,
} from './db-helpers'

export interface noteQ {
    _id: string
    date: string
    note: string
    author?: string
    source?: string
}

const COLLECTION_NAME = 'dirnote'

export async function getNoteQ(): Promise<noteQ[]> {
    return getAllDocuments<noteQ>(COLLECTION_NAME, '_id', -1)
}

export async function createNoteQ(note: Omit<noteQ, '_id'>): Promise<noteQ> {
    return createDocument<noteQ>(COLLECTION_NAME, note, false)
}

export async function getNoteQById(id: string): Promise<noteQ | null> {
    return getDocumentByField<noteQ>(COLLECTION_NAME, '_id', id)
}

export async function updateNoteQ(
    id: string,
    note: Partial<noteQ>
): Promise<noteQ | null> {
    return updateDocumentByField<noteQ>(COLLECTION_NAME, '_id', id, note, false)
}

export async function deleteNoteQ(id: string): Promise<boolean> {
    return deleteDocumentByField(COLLECTION_NAME, '_id', id)
}

