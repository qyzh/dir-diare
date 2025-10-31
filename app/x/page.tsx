'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Post } from 'app/lib/posts'
import UKButton from 'app/components/ukbtn'
import AuthButton from 'app/x/components/AuthButton'
import Breadcrumbs from 'app/components/breadcrumbs'

export default function AdminDashboard() {
    const { data: session, status } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
                <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
                <p className="mb-4">Please sign in to view the dashboard.</p>
                <AuthButton />
            </div>
        )
    }

    if (session?.user?.name !== 'uki') {
        console.log('Current session user name:', session?.user?.name)

        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
                <p>You are not authorized to view posts admin.</p>
                <AuthButton />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    <AuthButton />
                </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Link href="/x/posts/create" className="block">
                    <div className="p-6 bg-white/5 border border-neutral-800 hover:border-neutral-600 transition-colors rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Posts</h3>
                        <p className="text-neutral-400 text-sm mb-4">Manage blog posts</p>
                        <UKButton variant="primary" size="sm">
                            Create New Post
                        </UKButton>
                    </div>
                </Link>

                <Link href="/x/noteqs" className="block">
                    <div className="p-6 bg-white/5 border border-neutral-800 hover:border-neutral-600 transition-colors rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Notes</h3>
                        <p className="text-neutral-400 text-sm mb-4">Manage noteqs</p>
                        <UKButton variant="primary" size="sm">
                            Manage Notes
                        </UKButton>
                    </div>
                </Link>

                <Link href="/x/artposts" className="block">
                    <div className="p-6 bg-white/5 border border-neutral-800 hover:border-neutral-600 transition-colors rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Labs</h3>
                        <p className="text-neutral-400 text-sm mb-4">Manage art posts & labs</p>
                        <UKButton variant="primary" size="sm">
                            Manage Labs
                        </UKButton>
                    </div>
                </Link>
            </div>

            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
                {isLoading ? (
                    <p>Loading posts...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="space-y-4">
                        {posts.slice(0, 5).map((post) => (
                            <div
                                key={post._id}
                                className="flex justify-between items-center border-l-4 pl-4 border-neutral-700"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold">
                                        {post.title}
                                    </h3>
                                    <div className="text-neutral-400 text-sm">
                                        Published on{' '}
                                        {new Date(
                                            post.publishedAt
                                        ).toLocaleDateString()}{' '}
                                    </div>
                                    <span
                                        className={`text-sm font-semibold ${post.status === 'published' ? 'bg-green-500/10 py-0.5 px-1 text-green-500' : 'bg-rose-500/10 py-0.5 px-1 text-rose-500'}`}
                                    >
                                        {post.status}
                                    </span>
                                </div>
                                <Link
                                    href={`/x/posts/edit/${post.slug}`}
                                    className="text-white px-4 py-2 "
                                >
                                    Edit
                                </Link>
                            </div>
                        ))}
                        {posts.length > 5 && (
                            <Link href="/x/posts/create" className="block text-center text-neutral-400 hover:text-neutral-200 transition-colors">
                                View all posts →
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
