'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { ArtPost } from '@/lib/artpost'
import UKButton from '@/components/ui/ukbtn'
import { AUTHORIZED_USER } from '@/lib/constants'
import AuthButton from '../_components/AuthButton'
import AdminShell from '../_components/AdminShell'
import ContentListPanel from '../_components/ContentListPanel'
import RowQuickActions from '../_components/RowQuickActions'
import { useAdminData } from '../_components/useAdminData'

export default function ArtPostsPage() {
    const { data: session, status } = useSession()
    const { data: artPosts, isLoading, error, refresh } =
        useAdminData<ArtPost>('/api/artposts')
    const [rowBusy, setRowBusy] = useState<string | null>(null)
    const [actionError, setActionError] = useState<string | null>(null)

    const deleteArtPost = async (post: ArtPost) => {
        if (!window.confirm('Delete this art post?')) return

        setActionError(null)
        setRowBusy(post._id)

        try {
            const response = await fetch(`/api/artposts/${post.slug}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete art post')
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
                <h1 className="mb-8 text-4xl font-bold">Manage Art</h1>
                <p className="mb-4">Please sign in to manage art posts.</p>
                <AuthButton />
            </div>
        )
    }

    if (session?.user?.name !== AUTHORIZED_USER) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-4xl font-bold">Manage Art</h1>
                <p>You are not authorized to manage art posts.</p>
                <AuthButton />
            </div>
        )
    }

    return (
        <AdminShell
            title="Manage Art"
            actions={
                <Link href="/x/artposts/create">
                    <UKButton variant="primary">Create New Art Post</UKButton>
                </Link>
            }
        >
            {actionError && <p className="mb-3 text-sm text-red-500">{actionError}</p>}
            <ContentListPanel
                title="Art posts"
                isLoading={isLoading}
                error={error}
                isEmpty={artPosts.length === 0}
                emptyText="No art posts yet."
            >
                <div className="space-y-3">
                    {artPosts.map((post) => (
                        <article
                            key={post._id}
                            className="flex flex-col justify-between gap-3 border border-[#2a2520] bg-[#14120f] p-3 lg:flex-row"
                        >
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-lg font-semibold text-neutral-100">
                                    {post.title}
                                </h3>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <RowQuickActions
                                editHref={`/x/artposts/edit/${post.slug}`}
                                disabled={rowBusy === post._id}
                                onDelete={async () => deleteArtPost(post)}
                            />
                        </article>
                    ))}
                </div>
            </ContentListPanel>
        </AdminShell>
    )
}
