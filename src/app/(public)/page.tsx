import Link from 'next/link'
import { getAllPublishedPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export default async function Page() {
    const posts = await getAllPublishedPosts()
    const recent = posts.slice(0, 9)

    return (
        <main>
            {/* Hero */}
            <section id="hero">
                <h1 className="hero-name">dir-diare</h1>
                <p className="hero-bio">
                    A personal journal. Notes on building things, reading things,
                    and the slow accumulation of days.
                </p>
                <p className="hero-meta">
                    est. 2024<span className="cursor" />
                </p>
            </section>

            {/* Journal */}
            <section id="journal" className="section">
                <p className="section-label reveal">Journal</p>
                {recent.length > 0 ? (
                    <div className="journal-grid">
                        {recent.map((post, i) => (
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
                                            <span key={tag} className="journal-card-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        No entries yet.
                    </p>
                )}
            </section>

            {/* About */}
            <section id="about">
                <h2 className="about-title reveal">About</h2>
                <p className="about-text reveal reveal-delay-1">
                    This is a personal space — part journal, part notebook, part
                    archive. Written slowly, published irregularly.
                </p>
                <p className="about-text reveal reveal-delay-2">
                    Built with Next.js, deployed on Vercel, stored in MongoDB.
                    Typography set in Playfair Display, Courier Prime, and IM Fell
                    English.
                </p>
            </section>

            {/* Footer */}
            <footer className="dir-footer">
                <span>dir-diare</span>
                <span>
                    <Link href="/w">journal</Link>
                    {' · '}
                    <Link href="/n">quotes</Link>
                    {' · '}
                    <Link href="/l">projects</Link>
                </span>
            </footer>
        </main>
    )
}
