import Link from 'next/link'
import { getAllPublishedPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import Footer from '@/components/footer'

export const metadata: Metadata = {
    title: 'Journal',
    description: 'Notes on building things, reading things, and the slow accumulation of days.',
}

export const revalidate = 3600

export default async function Page() {
    const posts = await getAllPublishedPosts()

    return (
        <main>
            <div className="page-header">
                <Link href="/" className="page-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M15 17h-2v-2h-2v-2H9v-2h2V9h2V7h2v10Z" /></svg>
                    dir-diare
                </Link>
                <h1 className="page-title">Journal</h1>
                <p className="page-subtitle">Notes on building things, reading things, and the slow accumulation of days.</p>
            </div>

            <div style={{ padding: '3rem var(--page-pad)' }}>
                <div className="journal-grid">
                    {posts.map((post, i) => (
                        <Link
                            key={post._id}
                            href={`/w/${post.slug}`}
                            className={`journal-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
                        >
                            <p className="journal-card-date">
                                {formatDate(post.publishedAt, false, 'short')}
                            </p>
                            <h2 className="journal-card-title">{post.title}</h2>
                            {post.summary && (
                                <p className="journal-card-excerpt">{post.summary}</p>
                            )}
                            {post.tags && post.tags.length > 0 && (
                                <div className="journal-card-tags">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="journal-card-tag">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </Link>
                    ))}
                    {posts.length === 0 && (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            No entries yet.
                        </p>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    )
}
