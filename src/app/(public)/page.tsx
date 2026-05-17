import Link from 'next/link'
import { icons } from 'lucide-react'
import { getAllPublishedPosts } from '@/lib/posts'
import { getAllTags } from '@/lib/tags'
import { formatDate } from '@/lib/utils'
import Footer from '@/components/footer'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
    title: { absolute: 'Dir-diare' },
    description: 'A personal journal. Notes on building things, reading things, and the slow accumulation of days.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'Dir-diare',
        description: 'A personal journal. Notes on building things, reading things, and the slow accumulation of days.',
        url: SITE_URL,
        type: 'website',
    },
}

export default async function Page() {
    const [posts, allTags] = await Promise.all([getAllPublishedPosts(), getAllTags()])
    const recent = posts.slice(0, 9)
    const tagMap = Object.fromEntries(allTags.map((t) => [t.name, t]))

    return (
        <main>
            {/* Hero */}
            <section id="hero">
                <h1 className="hero-name">
                    <span style={{ color: 'var(--text-bright)' }}>dir-</span><span style={{ color: 'var(--text-muted)' }}>diare</span>
                </h1>
                <p className="hero-bio">
                    A personal journal. Notes on building things, reading things,
                    and the slow accumulation of days.
                    <span className="cursor" />
                </p>
                <p className="hero-meta">
                    <span style={{ color: 'var(--text-dim)' }}>

                        est.
                    </span>
                    <span style={{ color: 'var(--text-bright)' }}>

                        2024
                    </span>
                </p>
            </section>

            {/* Journal */}
            <section id="journal" className="section">
                <h2 className="page-title pb-12">Journal</h2>
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
                                        {post.tags.map((tagName) => {
                                            const tag = tagMap[tagName]
                                            const Icon = tag?.icon ? icons[tag.icon as keyof typeof icons] : null
                                            return (
                                                <span key={tagName} className="journal-card-tag">
                                                    {Icon && <Icon size={10} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />}
                                                    {tag?.name ?? tagName}
                                                </span>
                                            )
                                        })}
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
