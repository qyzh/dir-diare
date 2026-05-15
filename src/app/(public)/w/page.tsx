import Link from 'next/link'
import { getAllPublishedPosts } from '@/lib/posts'
import { getAllTags } from '@/lib/tags'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import Footer from '@/components/footer'
import { Calendar } from 'lucide-react'
import CardTagLinks from './_components/CardTagLinks'

export const metadata: Metadata = {
    title: 'Journal',
    description: 'Notes on building things, reading things, and the slow accumulation of days.',
}

export const revalidate = 3600

export default async function Page() {
    const [posts, tagData] = await Promise.all([getAllPublishedPosts(), getAllTags()])

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
                <div className="flex flex-col max-w-3xl mx-auto gap-[1px] bg-[var(--line)] ">
                    {posts.map((post, i) => (
                        <Link
                            key={post._id}
                            href={`/w/${post.slug}`}
                            className={`journal-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
                        >
                            <h2 className="journal-card-title">{post.title}</h2>
                            {post.summary && (
                                <p className="journal-card-excerpt">{post.summary}</p>
                            )}

                            <span className="flex items-center gap-4 mt-6">
                                <span className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-[var(--text-muted)]">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{formatDate(post.publishedAt, false, 'short')}</span>
                                </span>
                                {post.tags && post.tags.length > 0 && (
                                    <CardTagLinks tags={post.tags} tagData={tagData} />
                                )}
                            </span>
                        </Link>
                    ))}
                    {posts.length === 0 && (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', padding: '1.75rem', background: 'var(--bg)' }}>
                            No entries yet.
                        </p>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    )
}
