'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Post } from '@/lib/posts'
import { ArtPost } from '@/lib/artpost'
import { noteQ } from '@/lib/noteq'
import { AUTHORIZED_USER } from '@/lib/constants'

const s = {
    label: { fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#6e6255' },
    heading: { color: '#c4aa7e', fontFamily: "'Courier Prime', monospace" },
    card: { background: '#14120f', border: '1px solid #2c2820', padding: '1.25rem' },
    row: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.6rem 0', borderBottom: '1px solid #1e1c18',
    },
    link: { color: '#8a7c6c', fontSize: '0.8rem', textDecoration: 'none' },
    editLink: { color: '#c4aa7e', fontSize: '0.75rem', letterSpacing: '0.05em' },
    badge: (published: boolean) => ({
        fontSize: '0.65rem', letterSpacing: '0.08em',
        padding: '0.15rem 0.5rem', textTransform: 'uppercase' as const,
        background: published ? 'rgba(100,160,100,0.12)' : 'rgba(160,100,80,0.12)',
        color: published ? '#7ab87a' : '#b88a7a',
        border: `1px solid ${published ? 'rgba(100,160,100,0.25)' : 'rgba(160,100,80,0.25)'}`,
    }),
}

export default function AdminDashboard() {
    const { data: session, status } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [artPosts, setArtPosts] = useState<ArtPost[]>([])
    const [notes, setNotes] = useState<noteQ[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === 'authenticated') {
            Promise.all([
                fetch('/api/posts').then((r) => r.json()),
                fetch('/api/artposts').then((r) => r.json()),
                fetch('/api/noteqs').then((r) => r.json()),
            ]).then(([p, a, n]) => {
                setPosts(p)
                setArtPosts(a)
                setNotes(n)
                setLoading(false)
            }).catch(() => setLoading(false))
        }
    }, [status])

    if (status === 'loading') return <p style={{ color: '#6e6255' }}>loading...</p>

    if (status === 'unauthenticated') {
        return (
            <div style={{ paddingTop: '3rem', textAlign: 'center' }}>
                <p style={{ color: '#6e6255', marginBottom: '1.5rem' }}>You need to sign in.</p>
                <button
                    onClick={() => signIn('github')}
                    style={{ ...s.editLink, background: 'rgba(196,170,126,0.1)', border: '1px solid #2c2820', padding: '0.5rem 1.5rem', cursor: 'pointer' }}
                >
                    Sign in with GitHub
                </button>
            </div>
        )
    }

    if (session?.user?.name !== AUTHORIZED_USER) {
        return <p style={{ color: '#9e6b5a' }}>Not authorized.</p>
    }

    const publishedPosts = posts.filter((p) => p.status === 'published').length
    const draftPosts = posts.length - publishedPosts

    return (
        <div style={{ fontFamily: "'Courier Prime', monospace" }}>
            {/* Header */}
            <div style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #2c2820' }}>
                <p style={s.label}>overview</p>
                <h1 style={{ ...s.heading, fontSize: '1.5rem', marginTop: '0.25rem' }}>Dashboard</h1>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                {[
                    { label: 'Posts', count: posts.length, sub: `${publishedPosts} published · ${draftPosts} draft`, href: '/x/posts' },
                    { label: 'Notes', count: notes.length, sub: 'total entries', href: '/x/noteqs' },
                    { label: 'Art', count: artPosts.length, sub: 'total entries', href: '/x/artposts' },
                ].map((item) => (
                    <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                        <div
                            style={s.card}
                            className="transition-all"
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#c4aa7e')}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2c2820')}
                        >
                            <p style={s.label}>{item.label}</p>
                            <p style={{ fontSize: '2rem', color: '#c4aa7e', lineHeight: 1.2, margin: '0.4rem 0 0.25rem' }}>
                                {loading ? '—' : item.count}
                            </p>
                            <p style={{ fontSize: '0.72rem', color: '#4a4038' }}>{item.sub}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent Posts */}
            <Section label="Recent Posts" createHref="/x/posts/create" viewHref="/x/posts">
                {loading ? (
                    <p style={{ color: '#4a4038', fontSize: '0.85rem' }}>loading...</p>
                ) : posts.length === 0 ? (
                    <p style={{ color: '#4a4038', fontSize: '0.85rem' }}>No posts yet.</p>
                ) : (
                    posts.slice(0, 5).map((post) => (
                        <div key={post._id} style={s.row}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                                <span style={s.badge(post.status === 'published')}>{post.status}</span>
                                <span style={{ color: '#d4c9b4', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {post.title}
                                </span>
                            </div>
                            <Link href={`/x/posts/edit/${post.slug}`} style={s.editLink}>edit →</Link>
                        </div>
                    ))
                )}
            </Section>

            {/* Recent Art */}
            <Section label="Recent Art" createHref="/x/artposts/create" viewHref="/x/artposts">
                {loading ? (
                    <p style={{ color: '#4a4038', fontSize: '0.85rem' }}>loading...</p>
                ) : artPosts.length === 0 ? (
                    <p style={{ color: '#4a4038', fontSize: '0.85rem' }}>No art posts yet.</p>
                ) : (
                    artPosts.slice(0, 5).map((ap) => (
                        <div key={ap._id} style={s.row}>
                            <span style={{ color: '#d4c9b4', fontSize: '0.875rem' }}>{ap.title}</span>
                            <Link href={`/x/artposts/edit/${ap.slug}`} style={s.editLink}>edit →</Link>
                        </div>
                    ))
                )}
            </Section>

            {/* Recent Notes */}
            <Section label="Recent Notes" createHref="/x/noteqs/create" viewHref="/x/noteqs">
                {loading ? (
                    <p style={{ color: '#4a4038', fontSize: '0.85rem' }}>loading...</p>
                ) : notes.length === 0 ? (
                    <p style={{ color: '#4a4038', fontSize: '0.85rem' }}>No notes yet.</p>
                ) : (
                    notes.slice(0, 5).map((note) => (
                        <div key={note._id} style={s.row}>
                            <span style={{ color: '#d4c9b4', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                                {note.note.substring(0, 80)}
                            </span>
                            <Link href={`/x/noteqs/edit/${note._id}`} style={s.editLink}>edit →</Link>
                        </div>
                    ))
                )}
            </Section>
        </div>
    )
}

function Section({ label, createHref, viewHref, children }: {
    label: string
    createHref: string
    viewHref: string
    children: React.ReactNode
}) {
    return (
        <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e6255' }}>
                    {label}
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href={viewHref} style={{ fontSize: '0.72rem', color: '#4a4038', textDecoration: 'none' }}>
                        view all
                    </Link>
                    <Link href={createHref} style={{ fontSize: '0.72rem', color: '#c4aa7e', textDecoration: 'none' }}>
                        + new
                    </Link>
                </div>
            </div>
            <div style={{ border: '1px solid #2c2820', padding: '0.25rem 1rem' }}>
                {children}
            </div>
        </div>
    )
}
