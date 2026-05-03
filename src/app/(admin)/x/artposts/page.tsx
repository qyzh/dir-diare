'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { AUTHORIZED_USER } from '@/lib/constants'

interface ArtPost { _id: string; slug: string; title: string; summary?: string; publishedAt: string }

export default function ArtPostsPage() {
    const { data: session, status } = useSession()
    const [artPosts, setArtPosts] = useState<ArtPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/artposts')
            .then((r) => r.json())
            .then((d) => { setArtPosts(d); setLoading(false) })
            .catch(() => { setError('Failed to fetch'); setLoading(false) })
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
                    <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6e6255' }}>art &amp; labs</p>
                    <h1 style={{ color: '#c4aa7e', fontSize: '1.4rem', marginTop: '0.2rem' }}>Art Posts</h1>
                </div>
                <Link href="/x/artposts/create" style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: '#c4aa7e', border: '1px solid #2c2820', padding: '0.4rem 1rem', textDecoration: 'none' }}>
                    + New Art Post
                </Link>
            </div>

            {error && <p style={{ color: '#b88a7a', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

            <div style={{ border: '1px solid #2c2820' }}>
                {artPosts.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <p style={{ color: '#4a4038', fontSize: '0.85rem', marginBottom: '1rem' }}>No art posts yet.</p>
                        <Link href="/x/artposts/create" style={{ color: '#c4aa7e', fontSize: '0.8rem' }}>Create first art post →</Link>
                    </div>
                ) : artPosts.map((ap, i) => (
                    <div
                        key={ap._id}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', borderBottom: i < artPosts.length - 1 ? '1px solid #1e1c18' : 'none' }}
                    >
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ color: '#d4c9b4', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {ap.title}
                            </p>
                            <p style={{ color: '#4a4038', fontSize: '0.72rem', marginTop: '0.1rem' }}>{ap.slug}</p>
                        </div>
                        <span style={{ color: '#4a4038', fontSize: '0.72rem', flexShrink: 0 }}>
                            {new Date(ap.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                        </span>
                        <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                            <Link href={`/l/${ap.slug}`} target="_blank" style={{ color: '#4a4038', fontSize: '0.75rem', textDecoration: 'none' }}>↗</Link>
                            <Link href={`/x/artposts/edit/${ap.slug}`} style={{ color: '#c4aa7e', fontSize: '0.75rem', textDecoration: 'none' }}>edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
