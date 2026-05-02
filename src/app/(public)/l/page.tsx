import Link from 'next/link'
import { getAllArtPosts } from '@/lib/artpost'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Art',
    description: 'A collection of recent things crafted, worked on, or tried for fun.',
}

export default async function Page() {
    const posts = await getAllArtPosts()
    const [featured, ...rest] = posts

    return (
        <main>
            <div className="page-header">
                <Link href="/" className="page-back">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    dir-diare
                </Link>
                <h1 className="page-title">Art</h1>
                <p className="page-subtitle">Things crafted, worked on, or tried for fun.</p>
            </div>

            <div className="projects-section">
                {featured && (
                    <Link href={`/l/${featured.slug}`} className="project-featured reveal" style={{ textDecoration: 'none' }}>
                        <div>
                            <p className="project-featured-label">Featured</p>
                            <h2 className="project-featured-title">{featured.title}</h2>
                            {featured.summary && (
                                <p className="project-featured-desc">{featured.summary}</p>
                            )}
                            <span className="project-link">View →</span>
                        </div>
                        {featured.image && (
                            <img
                                src={featured.image}
                                alt={featured.title}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        )}
                    </Link>
                )}

                {rest.length > 0 && (
                    <div className="projects-grid">
                        {rest.map((post) => (
                            <Link key={post._id} href={`/l/${post.slug}`} className="project-card reveal">
                                <p className="project-card-title">{post.title}</p>
                                {post.summary && (
                                    <p className="project-card-desc">{post.summary}</p>
                                )}
                            </Link>
                        ))}
                    </div>
                )}

                {posts.length === 0 && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', padding: 'var(--page-pad)' }}>
                        No art posts yet.
                    </p>
                )}
            </div>

            <footer className="dir-footer">
                <span>dir-diare</span>
            </footer>
        </main>
    )
}
