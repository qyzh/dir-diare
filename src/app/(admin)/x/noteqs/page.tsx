'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { AUTHORIZED_USER } from '@/lib/constants'

interface noteQ { _id: string; date: string; note: string; author?: string; source?: string }

export default function NoteQsPage() {
    const { data: session, status } = useSession()
    const [notes, setNotes] = useState<noteQ[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/noteqs')
            .then((r) => r.json())
            .then((d) => { setNotes(d); setLoading(false) })
            .catch(() => { setError('Failed to fetch notes'); setLoading(false) })
    }, [])

    if (status === 'loading' || loading) return <p style={{ color: '#6e6255', fontFamily: 'Courier Prime, monospace' }}>loading...</p>
    if (status === 'unauthenticated') return (
        <div style={{ fontFamily: 'Courier Prime, monospace', paddingTop: '3rem', textAlign: 'center' }}>
            <button onClick={() => signIn('github')} style={{ color: '#c4aa7e', background: 'none', border: '1px solid #2c2820', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>
                Sign in with GitHub
            </button>
        </div>
    )
    if (session?.user?.name !== AUTHORIZED_USER) return <p style={{ color: '#9e6b5a' }}>Not authorized.</p>

    return (
        <div style={{ fontFamily: "'Courier Prime', monospace" }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #2c2820' }}>
                <div>
                    <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e6255' }}>quotes &amp; notes</p>
                    <h1 style={{ color: '#c4aa7e', fontSize: '1.4rem', marginTop: '0.2rem' }}>Notes</h1>
                </div>
                <Link href="/x/noteqs/create" style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: '#c4aa7e', border: '1px solid #2c2820', padding: '0.4rem 1rem', textDecoration: 'none' }}>
                    + New Note
                </Link>
            </div>

            {error && <p style={{ color: '#b88a7a', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

            <div style={{ border: '1px solid #2c2820' }}>
                {notes.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: '#4a4038', fontSize: '0.85rem', marginBottom: '1rem' }}>No notes yet.</p>
                        <Link href="/x/noteqs/create" style={{ color: '#c4aa7e', fontSize: '0.8rem' }}>Create first note →</Link>
                    </div>
                ) : notes.map((note, i) => (
                    <div
                        key={note._id}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.875rem 1rem', borderBottom: i < notes.length - 1 ? '1px solid #1e1c18' : 'none' }}
                    >
                        <span style={{ color: '#4a4038', fontSize: '0.72rem', flexShrink: 0, paddingTop: '0.15rem', minWidth: '5rem' }}>
                            {new Date(note.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                        </span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ color: '#d4c9b4', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {note.note.substring(0, 100)}
                            </p>
                            {note.author && (
                                <p style={{ color: '#4a4038', fontSize: '0.72rem', marginTop: '0.15rem' }}>— {note.author}{note.source ? `, ${note.source}` : ''}</p>
                            )}
                        </div>
                        <Link href={`/x/noteqs/edit/${note._id}`} style={{ color: '#c4aa7e', fontSize: '0.75rem', textDecoration: 'none', flexShrink: 0 }}>edit</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
