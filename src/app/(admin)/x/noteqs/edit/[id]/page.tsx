'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'

const inp = {
    width: '100%', background: '#14120f', color: '#d4c9b4',
    border: '1px solid #2c2820', padding: '0.5rem 0.75rem',
    fontFamily: "'Courier Prime', monospace", fontSize: '0.875rem', outline: 'none',
}
const lbl = { fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#6e6255', display: 'block', marginBottom: '0.35rem' }

export default function EditNoteQPage({ params }: { params: Promise<{ id: string }> }) {
    const { data: session, status: sessionStatus } = useSession()
    const { id } = use(params)
    const router = useRouter()

    const [date, setDate] = useState('')
    const [note, setNote] = useState('')
    const [author, setAuthor] = useState('')
    const [source, setSource] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            fetch(`/api/noteqs/${id}`)
                .then((r) => { if (!r.ok) throw new Error('Failed to fetch'); return r.json() })
                .then((d) => { setDate(d.date); setNote(d.note); setAuthor(d.author || ''); setSource(d.source || ''); setLoading(false) })
                .catch((err) => { setError(err.message); setLoading(false) })
        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        try {
            const res = await fetch(`/api/noteqs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, note, author, source }),
            })
            if (!res.ok) throw new Error('Failed to update note')
            router.push('/x/noteqs')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Delete this note?')) return
        setSubmitting(true)
        try {
            const res = await fetch(`/api/noteqs/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Failed to delete note')
            router.push('/x/noteqs')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
            setSubmitting(false)
        }
    }

    if (sessionStatus === 'loading' || loading) return <p style={{ color: '#6e6255', fontFamily: 'Courier Prime, monospace' }}>loading...</p>
    if (sessionStatus === 'unauthenticated') return (
        <div style={{ fontFamily: 'Courier Prime, monospace', paddingTop: '3rem', textAlign: 'center' }}>
            <button onClick={() => signIn('github')} style={{ color: '#c4aa7e', background: 'none', border: '1px solid #2c2820', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>
                Sign in with GitHub
            </button>
        </div>
    )
    if (session?.user?.name !== 'qyzh') return <p style={{ color: '#9e6b5a' }}>Not authorized.</p>
    if (error && loading) return <p style={{ color: '#9e6b5a' }}>{error}</p>

    return (
        <div style={{ fontFamily: "'Courier Prime', monospace" }}>
            <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #2c2820' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e6255' }}>quotes &amp; notes</p>
                <h1 style={{ color: '#c4aa7e', fontSize: '1.4rem', marginTop: '0.2rem' }}>Edit Note</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                    <label style={lbl}>Note</label>
                    <textarea style={{ ...inp, resize: 'vertical' }} rows={6} value={note} onChange={(e) => setNote(e.target.value)} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={lbl}>Author</label>
                        <input style={inp} value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div>
                        <label style={lbl}>Source</label>
                        <input style={inp} value={source} onChange={(e) => setSource(e.target.value)} />
                    </div>
                </div>

                <div>
                    <label style={lbl}>Date</label>
                    <input style={inp} value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                {error && <p style={{ color: '#b88a7a', fontSize: '0.85rem' }}>{error}</p>}

                <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
                    <button type="submit" disabled={submitting} style={{
                        background: 'rgba(196,170,126,0.12)', color: '#c4aa7e',
                        border: '1px solid #c4aa7e', padding: '0.5rem 1.5rem',
                        fontFamily: "'Courier Prime', monospace", fontSize: '0.8rem',
                        letterSpacing: '0.08em', cursor: submitting ? 'not-allowed' : 'pointer',
                        opacity: submitting ? 0.6 : 1,
                    }}>
                        {submitting ? 'saving...' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={() => router.push('/x/noteqs')} style={{
                        background: 'transparent', color: '#6e6255',
                        border: '1px solid #2c2820', padding: '0.5rem 1.5rem',
                        fontFamily: "'Courier Prime', monospace", fontSize: '0.8rem', cursor: 'pointer',
                    }}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleDelete} disabled={submitting} style={{
                        background: 'transparent', color: '#9e6b5a',
                        border: '1px solid rgba(158,107,90,0.3)', padding: '0.5rem 1.5rem',
                        fontFamily: "'Courier Prime', monospace", fontSize: '0.8rem', cursor: 'pointer', marginLeft: 'auto',
                    }}>
                        Delete
                    </button>
                </div>
            </form>
        </div>
    )
}
