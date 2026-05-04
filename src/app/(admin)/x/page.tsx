'use client'

import { Post } from '@/lib/posts'
import { ArtPost } from '@/lib/artpost'
import { noteQ } from '@/lib/noteq'
import AdminShell from './_components/AdminShell'
import AdminDashboardCards from './_components/AdminDashboardCards'
import RecentContentList from './_components/RecentContentList'
import { useAdminData } from './_components/useAdminData'

export default function AdminDashboard() {
    const posts = useAdminData<Post>('/api/posts')
    const artPosts = useAdminData<ArtPost>('/api/artposts')
    const notes = useAdminData<noteQ>('/api/noteqs')

    if (posts.error || artPosts.error || notes.error) {
        const message = posts.error || artPosts.error || notes.error
        return (
            <AdminShell title="Admin Dashboard">
                <p className="text-red-500 font-mono">{message}</p>
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
        <AdminShell title="Dashboard">
            {isLoading ? (
                <p className="text-[#6e6255] font-mono">Synchronizing data...</p>
            ) : (
                <div className="space-y-8">
                    <AdminDashboardCards
                        postsCount={posts.data.length}
                        notesCount={notes.data.length}
                        artCount={artPosts.data.length}
                    />

                    <div className="grid gap-6 lg:grid-cols-3">
                        <RecentContentList
                            title="Recent Posts"
                            items={recentPosts}
                            manageHref="/x/posts"
                        />
                        <RecentContentList
                            title="Recent Notes"
                            items={recentNotes}
                            manageHref="/x/noteqs"
                        />
                        <RecentContentList
                            title="Recent Art"
                            items={recentArt}
                            manageHref="/x/artposts"
                        />
                    </div>
                </div>
            )}
        </AdminShell>
    )
}
