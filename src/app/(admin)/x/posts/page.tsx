'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Post } from '@/lib/posts'
import { AUTHORIZED_USER } from '@/lib/constants'

const badge = (published: boolean) => ({
    fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const,
    padding: '0.1rem 0.45rem', flexShrink: 0,
    background: published ? 'rgba(100,160,100,0.12)' : 'rgba(160,100,80,0.12)',
    color: published ? '#7ab87a' : '#b88a7a',
    border: `1px solid ${published ? 'rgba(100,160,100,0.25)' : 'rgba(160,100,80,0.25)'}`,
})

export default function PostsPage() {
    const { data: session, status } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/posts')
                .then((r) => r.json())
                .then((d) => { setPosts(d); setLoading(false) })
                .catch(() => setLoading(false))
        }
    }, [status])

    if (status === 'loading') return <p style={{ color: '#6e6255', fontFamily: 'Courier Prime, monospace' }}>loading...</p>
    if (status === 'unauthenticated') return (
        <div style={{ fontFamily: 'Courier Prime, monospace', paddingTop: '3rem', textAlign: 'center' }}>
            <button onClick={() => signIn('github')} style={{ color: '#c4aa7e', background: 'none', border: '1px solid #2c2820', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>
                Sign in with GitHub
            </button>
        </div>
    )
    if (session?.user?.name !== AUTHORIZED_USER) return <p style={{ color: '#9e6b5a' }}>Not authorized.</p>

    const filtered = posts.filter((p) => filter === 'all' || p.status === filter)
    const publishedCount = posts.filter((p) => p.status === 'published').length
    const draftCount = posts.filter((p) => p.status === 'draft').length

    return (
        <div style={{ fontFamily: "'Courier Prime', monospace" }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid #2c2820' }}>
                <div>
                    <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e6255' }}>journal</p>
                    <h1 style={{ color: '#c4aa7e', fontSize: '1.4rem', marginTop: '0.2rem' }}>Posts</h1>
                </div>
                <Link
                    href="/x/posts/create"
                    style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: '#c4aa7e', border: '1px solid #2c2820', padding: '0.4rem 1rem', textDecoration: 'none' }}
                >
                    + New Post
                </Link>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                {([['all', posts.length], ['published', publishedCount], ['draft', draftCount]] as const).map(([key, count]) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        style={{
                            fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '0.3rem 0.9rem', cursor: 'pointer', border: '1px solid',
                            background: filter === key ? 'rgba(196,170,126,0.1)' : 'transparent',
                            color: filter === key ? '#c4aa7e' : '#6e6255',
                            borderColor: filter === key ? '#c4aa7e' : '#2c2820',
                            transition: 'all 0.15s',
                        }}
                    >
                        {key} ({count})
                    </button>
                ))}
            </div>

            {/* List */}
            <div style={{ border: '1px solid #2c2820' }}>
                {loading ? (
                    <p style={{ color: '#4a4038', padding: '1.5rem', fontSize: '0.85rem' }}>loading...</p>
                ) : filtered.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: '#4a4038', marginBottom: '1rem', fontSize: '0.85rem' }}>No posts yet.</p>
                        <Link href="/x/posts/create" style={{ color: '#c4aa7e', fontSize: '0.8rem' }}>Create first post →</Link>
                    </div>
                ) : (
                    filtered.map((post, i) => (
                        <div
                            key={post._id}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem',
                                borderBottom: i < filtered.length - 1 ? '1px solid #1e1c18' : 'none',
                            }}
                        >
                            <span style={badge(post.status === 'published')}>{post.status}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ color: '#d4c9b4', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {post.title}
                                </p>
                                {post.tags && post.tags.length > 0 && (
                                    <p style={{ color: '#4a4038', fontSize: '0.72rem', marginTop: '0.15rem' }}>
                                        {post.tags.slice(0, 4).join(' · ')}
                                    </p>
                                )}
                            </div>
                            <span style={{ color: '#4a4038', fontSize: '0.72rem', flexShrink: 0 }}>
                                {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                            </span>
                            <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                                <Link href={`/w/${post.slug}`} target="_blank" style={{ color: '#4a4038', fontSize: '0.75rem', textDecoration: 'none' }}>↗</Link>
                                <Link href={`/x/posts/edit/${post.slug}`} style={{ color: '#c4aa7e', fontSize: '0.75rem', textDecoration: 'none' }}>edit</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
