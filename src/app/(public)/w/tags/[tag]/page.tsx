import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPublishedPosts } from '@/lib/posts'
import { getTagBySlug, getAllTags } from '@/lib/tags'
import { formatDate } from '@/lib/utils'
import Footer from '@/components/footer'
import { Calendar, icons } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ tag: string }>
}): Promise<Metadata> {
    const { tag } = await params
    const tagDoc = await getTagBySlug(tag)
    if (!tagDoc) return { title: 'Tag not found' }
    return {
        title: `#${tagDoc.name} — Journal`,
        description: `Posts tagged with ${tagDoc.name}`,
        alternates: { canonical: `/w/tags/${tag}` },
    }
}

export async function generateStaticParams() {
    const tags = await getAllTags()
    return tags.map((t) => ({ tag: t.slug }))
}

export const dynamicParams = true
export const revalidate = 3600

export default async function TagPage({
    params,
}: {
    params: Promise<{ tag: string }>
}) {
    const { tag } = await params
    const tagDoc = await getTagBySlug(tag)
    if (!tagDoc) notFound()

    const allPosts = await getAllPublishedPosts()
    const posts = allPosts.filter((p) => p.tags?.includes(tagDoc.name))

    const TagIcon = tagDoc.icon ? icons[tagDoc.icon as keyof typeof icons] : null

    return (
        <main>
            <div className="page-header">
                <Link href="/w" className="page-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15 17h-2v-2h-2v-2H9v-2h2V9h2V7h2v10Z" />
                    </svg>
                    journal
                </Link>
                <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {TagIcon && <TagIcon size={28} />}
                    #{tagDoc.name}
                </h1>
                <p className="page-subtitle">
                    {tagDoc.description
                        ? tagDoc.description
                        : `${posts.length} ${posts.length === 1 ? 'entry' : 'entries'} tagged with ${tagDoc.name}`}
                </p>
                {tagDoc.description && (
                    <p className="page-subtitle" style={{ marginTop: '0.25rem', opacity: 0.6 }}>
                        {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
                    </p>
                )}
            </div>

            <div style={{ padding: '3rem var(--page-pad)' }}>
                <div className="flex flex-col max-w-3xl mx-auto gap-[1px] bg-[var(--line)]">
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
                            <div className="flex items-center gap-4 mt-6">
                                <div className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.1em] uppercase text-[var(--text-muted)]">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{formatDate(post.publishedAt, false, 'short')}</span>
                                </div>
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {post.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="journal-card-tag"
                                                style={{
                                                    marginTop: 0,
                                                    ...(t === tagDoc.name
                                                        ? { color: 'var(--accent)', borderColor: 'var(--accent)' }
                                                        : {}),
                                                }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                    {posts.length === 0 && (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', padding: '1.75rem', background: 'var(--bg)' }}>
                            No posts with this tag yet.
                        </p>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    )
}
