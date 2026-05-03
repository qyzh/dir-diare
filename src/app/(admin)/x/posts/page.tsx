'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Post } from '@/lib/posts'
import UKButton from '@/components/ui/ukbtn'
import { AUTHORIZED_USER } from '@/lib/constants'
import AuthButton from '../_components/AuthButton'
import AdminShell from '../_components/AdminShell'
import ContentListPanel from '../_components/ContentListPanel'
import RowQuickActions from '../_components/RowQuickActions'
import { useAdminData } from '../_components/useAdminData'

export default function PostsManagePage() {
    const { data: session, status } = useSession()
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

    if (status === 'loading') {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    if (status === 'unauthenticated') {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-4xl font-bold">Manage Posts</h1>
                <p className="mb-4">Please sign in to manage posts.</p>
                <AuthButton />
            </div>
        )
    }

    if (session?.user?.name !== AUTHORIZED_USER) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-4xl font-bold">Manage Posts</h1>
                <p>You are not authorized to manage posts.</p>
                <AuthButton />
            </div>
        )
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
            <div className="mb-4 flex flex-wrap gap-2">
                {(['all', 'published', 'draft'] as const).map((value) => (
                    <button
                        key={value}
                        onClick={() => setFilter(value)}
                        className={`px-3 py-1.5 text-sm ${
                            filter === value
                                ? 'bg-[#1e1a14] text-neutral-100'
                                : 'bg-[#151310] text-neutral-400 hover:text-neutral-200'
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

            {actionError && <p className="mb-3 text-sm text-red-500">{actionError}</p>}

            <ContentListPanel
                title="Posts"
                isLoading={isLoading}
                error={error}
                isEmpty={filteredPosts.length === 0}
                emptyText="No posts for this filter."
            >
                <div className="space-y-3">
                    {filteredPosts.map((post) => (
                        <article
                            key={post._id}
                            className="flex flex-col justify-between gap-3 border border-[#2a2520] bg-[#14120f] p-3 lg:flex-row"
                        >
                            <div className="min-w-0 flex-1">
                                <div className="mb-2 flex items-center gap-2">
                                    <h3 className="truncate text-lg font-semibold text-neutral-100">
                                        {post.title}
                                    </h3>
                                    <span className="text-xs text-[#c4aa7e]">
                                        {post.status}
                                    </span>
                                </div>
                                {post.summary && (
                                    <p className="text-sm text-neutral-400">
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
