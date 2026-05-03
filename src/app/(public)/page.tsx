import Link from 'next/link'
import { getAllPublishedPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import Footer from '@/components/footer'

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
                    <span className="cursor" />
                </p>
                <p className="hero-meta">
                    <span className='hero-meta-data'>

                        est.
                    </span>
                    <span className='hero-meta-info'>

                        2024
                    </span>
                </p>
            </section>

            {/* Journal */}
            <section id="journal" className="section">
                <h2 className="page-title">Journal</h2>
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
            </section>

            <Footer />
        </main>
    )
}
