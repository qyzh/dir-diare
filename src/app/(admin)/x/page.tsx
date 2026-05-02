'use client'

import { useSession } from 'next-auth/react'
import { Post } from '@/lib/posts'
import { ArtPost } from '@/lib/artpost'
import { noteQ } from '@/lib/noteq'
import AuthButton from './_components/AuthButton'
import { AUTHORIZED_USER } from '@/lib/constants'
import AdminShell from './_components/AdminShell'
import AdminDashboardCards from './_components/AdminDashboardCards'
import RecentContentList from './_components/RecentContentList'
import { useAdminData } from './_components/useAdminData'

export default function AdminDashboard() {
    const { data: session, status } = useSession()
    const posts = useAdminData<Post>('/api/posts')
    const artPosts = useAdminData<ArtPost>('/api/artposts')
    const notes = useAdminData<noteQ>('/api/noteqs')

    if (status === 'loading') {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    if (status === 'unauthenticated') {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>
                <p className="mb-4">Please sign in to view the dashboard.</p>
                <AuthButton />
            </div>
        )
    }

    if (session?.user?.name !== AUTHORIZED_USER) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>
                <p>You are not authorized to view admin pages.</p>
                <AuthButton />
            </div>
        )
    }

    if (posts.error || artPosts.error || notes.error) {
        const message = posts.error || artPosts.error || notes.error
        return (
            <AdminShell title="Admin Dashboard">
                <p className="text-red-500">{message}</p>
            </AdminShell>
        )
    }

    const recentPosts = posts.data.slice(0, 5).map((post) => ({
        id: post._id,
        label: post.title,
        editHref: `/x/posts/edit/${post.slug}`,
    }))

    const recentArt = artPosts.data.slice(0, 5).map((post) => ({
        id: post._id,
        label: post.title,
        editHref: `/x/artposts/edit/${post.slug}`,
    }))

    const recentNotes = notes.data.slice(0, 5).map((item) => ({
        id: item._id,
        label: item.note.slice(0, 72),
        editHref: `/x/noteqs/edit/${item._id}`,
    }))

    const isLoading = posts.isLoading || artPosts.isLoading || notes.isLoading

    return (
        <AdminShell title="Admin Dashboard">
            {isLoading ? (
                <p className="text-neutral-400">Loading dashboard...</p>
            ) : (
                <>
                    <AdminDashboardCards
                        postsCount={posts.data.length}
                        notesCount={notes.data.length}
                        artCount={artPosts.data.length}
                    />

                    <div className="mt-6 grid gap-4 lg:grid-cols-3">
                        <RecentContentList
                            title="Recent posts"
                            items={recentPosts}
                            manageHref="/x/posts"
                        />
                        <RecentContentList
                            title="Recent notes"
                            items={recentNotes}
                            manageHref="/x/noteqs"
                        />
                        <RecentContentList
                            title="Recent art"
                            items={recentArt}
                            manageHref="/x/artposts"
                        />
                    </div>
                </>
            )}
        </AdminShell>
    )
}
