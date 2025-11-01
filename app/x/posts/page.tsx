'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Post } from 'app/lib/posts'
import UKButton from 'app/components/ukbtn'
import AuthButton from 'app/x/components/AuthButton'
import Breadcrumbs from 'app/components/breadcrumbs'
import { AUTHORIZED_USER } from 'app/lib/constants'

export default function PostsManagePage() {
    const { data: session, status } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/posts')
                .then((res) => res.json())
                .then((data) => {
                    setPosts(data)
                    setIsLoading(false)
                })
                .catch((err) => {
                    setError('Failed to fetch posts')
                    setIsLoading(false)
                })
        }
    }, [status])

    if (status === 'loading') {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    if (status === 'unauthenticated') {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Manage Posts</h1>
                <p className="mb-4">Please sign in to manage posts.</p>
                <AuthButton />
            </div>
        )
    }

    if (session?.user?.name !== AUTHORIZED_USER) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Manage Posts</h1>
                <p>You are not authorized to manage posts.</p>
                <AuthButton />
            </div>
        )
    }

    const filteredPosts = posts.filter((post) => {
        if (filter === 'all') return true
        return post.status === filter
    })

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Manage Posts</h1>
                <div className="flex items-center gap-4">
                    <Link href="/x/posts/create">
                        <UKButton variant="primary">Create New Post</UKButton>
                    </Link>
                    <AuthButton />
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded ${
                        filter === 'all'
                            ? 'bg-white/10 text-white'
                            : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                >
                    All ({posts.length})
                </button>
                <button
                    onClick={() => setFilter('published')}
                    className={`px-4 py-2 rounded ${
                        filter === 'published'
                            ? 'bg-white/10 text-white'
                            : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                >
                    Published ({posts.filter((p) => p.status === 'published').length})
                </button>
                <button
                    onClick={() => setFilter('draft')}
                    className={`px-4 py-2 rounded ${
                        filter === 'draft'
                            ? 'bg-white/10 text-white'
                            : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                >
                    Drafts ({posts.filter((p) => p.status === 'draft').length})
                </button>
            </div>

            {/* Posts List */}
            <div className="p-4">
                {isLoading ? (
                    <p>Loading posts...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-neutral-400 mb-4">
                            {filter === 'all' ? 'No posts yet' : `No ${filter} posts`}
                        </p>
                        <Link href="/x/posts/create">
                            <UKButton variant="primary">Create Your First Post</UKButton>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredPosts.map((post) => (
                            <div
                                key={post._id}
                                className="flex justify-between items-start border border-neutral-800 hover:border-neutral-600 transition-colors rounded-lg p-4"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold">
                                            {post.title}
                                        </h3>
                                        <span
                                            className={`text-xs font-semibold px-2 py-1 rounded ${
                                                post.status === 'published'
                                                    ? 'bg-green-500/10 text-green-500'
                                                    : 'bg-rose-500/10 text-rose-500'
                                            }`}
                                        >
                                            {post.status}
                                        </span>
                                    </div>
                                    {post.summary && (
                                        <p className="text-neutral-400 text-sm mb-2">
                                            {post.summary}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-4 text-neutral-500 text-sm">
                                        <span>
                                            Published: {new Date(post.publishedAt).toLocaleDateString()}
                                        </span>
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex gap-2">
                                                {post.tags.slice(0, 3).map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs bg-white/5 px-2 py-0.5 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {post.tags.length > 3 && (
                                                    <span className="text-xs">
                                                        +{post.tags.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <Link href={`/w/${post.slug}`} target="_blank">
                                        <UKButton variant="secondary" size="sm">
                                            View
                                        </UKButton>
                                    </Link>
                                    <Link href={`/x/posts/edit/${post.slug}`}>
                                        <UKButton variant="primary" size="sm">
                                            Edit
                                        </UKButton>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
