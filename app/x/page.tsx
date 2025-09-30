'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Post } from 'app/lib/posts'
import UKButton from 'app/components/ukbtn'
import AuthButton from 'app/components/AuthButton'

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
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
                <p>You are not authorized to view this page.</p>
                <AuthButton />
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    <Link href="/x/posts/create">
                        <UKButton variant="primary" size="md">
                            Tulisan baru
                        </UKButton>
                    </Link>
                    <AuthButton />
                </div>
            </div>

            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
                {isLoading ? (
                    <p>Loading posts...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
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
                    </div>
                )}
            </div>
        </div>
    )
}
