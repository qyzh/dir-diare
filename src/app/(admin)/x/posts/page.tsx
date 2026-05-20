'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Post } from '@/lib/posts'
import UKButton from '@/components/ui/ukbtn'
import AdminShell from '../_components/AdminShell'
import ContentListPanel from '../_components/ContentListPanel'
import RowQuickActions from '../_components/RowQuickActions'
import { useAdminData } from '../_components/useAdminData'

export default function PostsManagePage() {
    const { data: posts, isLoading, error, refresh } =
        useAdminData<Post>('/api/posts')
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
    const [rowBusy, setRowBusy] = useState<string | null>(null)
    const [actionError, setActionError] = useState<string | null>(null)

    const filteredPosts = useMemo(() => {
        if (filter === 'all') return posts
        return posts.filter((post) => post.status === filter)
    }, [filter, posts])

    const mutateStatus = async (post: Post, nextStatus: 'draft' | 'published') => {
        setActionError(null)
        setRowBusy(post._id)

        try {
            const response = await fetch(`/api/posts/${post.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: post.title,
                    content: post.content,
                    tags: post.tags || [],
                    summary: post.summary || '',
                    author: post.author,
                    status: nextStatus,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update post status')
            }

            await refresh()
        } catch (err) {
            setActionError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setRowBusy(null)
        }
    }

    const deletePost = async (post: Post) => {
        if (!window.confirm('Delete this post?')) return

        setActionError(null)
        setRowBusy(post._id)

        try {
            const response = await fetch(`/api/posts/${post.slug}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete post')
            }

            await refresh()
        } catch (err) {
            setActionError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setRowBusy(null)
        }
    }

    return (
        <AdminShell
            title="Manage Posts"
            actions={
                <Link href="/x/posts/create">
                    <UKButton variant="primary">Create New Post</UKButton>
                </Link>
            }
        >
            <div className="mb-5 flex flex-wrap gap-1.5">
                {(['all', 'published', 'draft'] as const).map((value) => (
                    <button
                        key={value}
                        onClick={() => setFilter(value)}
                        className={`px-3 py-1.5 text-[10px] font-mono tracking-[0.1em] uppercase transition-all duration-150 border ${
                            filter === value
                                ? 'bg-[#161310] text-[#c4aa7e] border-[#2a2520]'
                                : 'text-[#4a4038] border-transparent hover:text-[#a89f94] hover:border-[#1e1b17]'
                        }`}
                    >
                        {value === 'all'
                            ? `All (${posts.length})`
                            : `${value[0].toUpperCase()}${value.slice(1)} (${
                                  posts.filter((p) => p.status === value).length
                              })`}
                    </button>
                ))}
            </div>

            {actionError && (
                <p className="mb-4 text-[11px] text-[#9e4a3a] font-mono border border-[#3a1a14] bg-[#1a0e0c] px-3 py-2">
                    {actionError}
                </p>
            )}

            <ContentListPanel
                title="Posts"
                isLoading={isLoading}
                error={error}
                isEmpty={filteredPosts.length === 0}
                emptyText="No posts for this filter."
            >
                <div className="space-y-1.5">
                    {filteredPosts.map((post) => (
                        <article
                            key={post._id}
                            className="group flex flex-col justify-between gap-3 border border-[#1a1814] bg-[#0c0b09] px-4 py-3 hover:border-[#2a2520] transition-colors duration-150 lg:flex-row lg:items-center"
                        >
                            <div className="min-w-0 flex-1">
                                <div className="flex items-baseline gap-2.5 mb-1">
                                    <h3 className="truncate text-[14px] text-[#c8c0b4] font-[family-name:var(--font-playfair)] group-hover:text-[#d6cfc5] transition-colors duration-150">
                                        {post.title}
                                    </h3>
                                    <span
                                        className="shrink-0 text-[8px] uppercase tracking-[0.18em] font-mono px-1.5 py-0.5"
                                        style={{
                                            color: post.status === 'published' ? '#8a9e7e' : '#6e6255',
                                            background: post.status === 'published' ? '#0f1a0d' : '#141210',
                                            border: `1px solid ${post.status === 'published' ? '#1e2e1a' : '#1e1b17'}`,
                                        }}
                                    >
                                        {post.status}
                                    </span>
                                </div>
                                {post.summary && (
                                    <p className="text-[11px] text-[#4a4038] font-mono line-clamp-1">
                                        {post.summary}
                                    </p>
                                )}
                            </div>

                            <RowQuickActions
                                editHref={`/x/posts/edit/${post.slug}`}
                                disabled={rowBusy === post._id}
                                onPublish={
                                    post.status === 'draft'
                                        ? async () => mutateStatus(post, 'published')
                                        : undefined
                                }
                                onDraft={
                                    post.status === 'published'
                                        ? async () => mutateStatus(post, 'draft')
                                        : undefined
                                }
                                onDelete={async () => deletePost(post)}
                            />
                        </article>
                    ))}
                </div>
            </ContentListPanel>
        </AdminShell>
    )
}
