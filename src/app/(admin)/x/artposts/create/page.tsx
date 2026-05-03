'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import MarkdownEditor from '../../_components/MarkdownEditor'

const inp = {
    width: '100%', background: '#14120f', color: '#d4c9b4',
    border: '1px solid #2c2820', padding: '0.5rem 0.75rem',
    fontFamily: "'Courier Prime', monospace", fontSize: '0.875rem', outline: 'none',
}
const lbl = { fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#6e6255', display: 'block', marginBottom: '0.35rem' }

export default function CreateArtPostPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [author, setAuthor] = useState('qyzh')
    const [image, setImage] = useState('')
    const [publishedAt, setPublishedAt] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => { setSummary(content.substring(0, 100)) }, [content])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        try {
            const res = await fetch('/api/artposts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, slug, tags: tags.split(',').map((t) => t.trim()).filter(Boolean), content, summary, author, image, publishedAt: publishedAt || new Date().toISOString() }),
            })
            if (!res.ok) throw new Error('Failed to create art post')
            router.push('/x/artposts')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setSubmitting(false)
        }
    }

    if (status === 'loading') return <p style={{ color: '#6e6255', fontFamily: 'Courier Prime, monospace' }}>loading...</p>
    if (status === 'unauthenticated') return (
        <div style={{ fontFamily: 'Courier Prime, monospace', paddingTop: '3rem', textAlign: 'center' }}>
            <button onClick={() => signIn('github')} style={{ color: '#c4aa7e', background: 'none', border: '1px solid #2c2820', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>
                Sign in with GitHub
            </button>
        </div>
    )
    if (session?.user?.name !== 'qyzh') return <p style={{ color: '#9e6b5a' }}>Not authorized.</p>

    return (
        <div style={{ fontFamily: "'Courier Prime', monospace" }}>
            <div style={{ marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #2c2820' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e6255' }}>art &amp; labs</p>
                <h1 style={{ color: '#c4aa7e', fontSize: '1.4rem', marginTop: '0.2rem' }}>New Art Post</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={lbl}>Title</label>
                        <input style={inp} value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div>
                        <label style={lbl}>Slug</label>
                        <input style={inp} value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="my-art-post" />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={lbl}>Author</label>
                        <input style={inp} value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div>
                        <label style={lbl}>Tags (comma-separated)</label>
                        <input style={inp} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="art, digital, ..." />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={lbl}>Image URL</label>
                        <input style={inp} value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <div>
                        <label style={lbl}>Published At (blank = now)</label>
                        <input style={inp} value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} placeholder="2024-01-15T10:00:00.000Z" />
                    </div>
                </div>

                <div>
                    <label style={lbl}>Summary</label>
                    <textarea style={{ ...inp, resize: 'vertical' }} rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} />
                </div>

                <div>
                    <label style={{ ...lbl, marginBottom: '0.5rem' }}>Content</label>
                    <MarkdownEditor value={content} onChange={setContent} rows={20} required placeholder="Write your art post in Markdown..." />
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
                        {submitting ? 'creating...' : 'Create Art Post'}
                    </button>
                    <button type="button" onClick={() => router.push('/x/artposts')} style={{
                        background: 'transparent', color: '#6e6255',
                        border: '1px solid #2c2820', padding: '0.5rem 1.5rem',
                        fontFamily: "'Courier Prime', monospace", fontSize: '0.8rem', cursor: 'pointer',
                    }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
