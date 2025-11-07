'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Note {
    _id: string
    note: string
    author?: string
    source?: string
    date: string
}

interface UKnotesProps {
    initialNotes?: Note[]
}

export default function UKnotes({ initialNotes }: UKnotesProps) {
    const [notes, setNotes] = useState<Note[]>(initialNotes || [])
    const [loading, setLoading] = useState(!initialNotes)
    const [error, setError] = useState<string | null>(null)

    // Fetch notes if not provided via props
    useEffect(() => {
        if (!initialNotes) {
            const fetchNotes = async () => {
                try {
                    setLoading(true)
                    const response = await fetch('/api/noteqs')
                    if (!response.ok) {
                        throw new Error('Failed to fetch notes')
                    }
                    const data = await response.json()
                    setNotes(data)
                } catch (err) {
                    setError(
                        err instanceof Error ? err.message : 'An error occurred'
                    )
                } finally {
                    setLoading(false)
                }
            }

            fetchNotes()
        }
    }, [initialNotes])

    if (loading) return <div>Loading notes...</div>
    if (error) return <div>Error: {error}</div>
    if (!notes || notes.length === 0) return <div>No notes found.</div>

    return (
        <div>
            {notes
                .sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((note) => (
                    <div
                        key={note._id}
                        className="mb-6 p-4 border border-neutral-300 dark:border-neutral-700"
                    >
                        <p>{note.note}</p>
                        <div className="mt-2 flex justify-between text-sm text-neutral-400">
                            {note.source ? (
                                <Link
                                    href={note.source}
                                    className="text-sky-700 hover:text-sky-800 dark:text-emerald-400 dark:hover:text-emerald-500"
                                    target="_blank"
                                >
                                    {'-'}
                                    {note.author || 'Unknown'}
                                </Link>
                            ) : (
                                <span>{note.author || 'Unknown'}</span>
                            )}
                            <time>
                                {new Date(note.date).toLocaleDateString(
                                    'id-ID'
                                )}
                            </time>
                        </div>
                    </div>
                ))}
        </div>
    )
}
