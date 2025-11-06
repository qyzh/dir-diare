'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Post } from 'app/lib/posts'
import { ArtPost } from 'app/lib/artpost'
import { noteQ } from 'app/lib/noteq'
import UKButton from 'app/components/ukbtn'
import AuthButton from 'app/x/components/AuthButton'
import Breadcrumbs from 'app/components/breadcrumbs'
import Footer from 'app/components/footer'
import { AUTHORIZED_USER } from 'app/lib/constants'

export default function AdminDashboard() {
    const { data: session, status } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [artPosts, setArtPosts] = useState<ArtPost[]>([])
    const [notes, setNotes] = useState<noteQ[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (status === 'authenticated') {
            Promise.all([
                fetch('/api/posts').then((res) => res.json()),
                fetch('/api/artposts').then((res) => res.json()),
                fetch('/api/noteqs').then((res) => res.json()),
            ])
                .then(([postsData, artPostsData, notesData]) => {
                    setPosts(postsData)
                    setArtPosts(artPostsData)
                    setNotes(notesData)
                    setIsLoading(false)
                })
                .catch((err) => {
                    setError('Failed to fetch data')
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

    if (session?.user?.name !== AUTHORIZED_USER) {
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
                <Link href="/x/posts" className="block">
                    <div className="p-4 bg-white/5 border border-neutral-400 dark:border-neutral-800 hover:border-neutral-700 dark:hover:border-neutral-600 transition-colors">
                        <h3 className="text-xl font-semibold mb-2">Posts</h3>
                        <p className="text-neutral-400 text-sm mb-4">
                            Manage blog posts
                        </p>
                        <UKButton variant="primary" size="sm">
                            Manage Posts
                        </UKButton>
                    </div>
                </Link>

                <Link href="/x/noteqs" className="block">
                    <div className="p-4 bg-white/5 border border-neutral-400 dark:border-neutral-800 hover:border-neutral-700 dark:hover:border-neutral-600 transition-colors">
                        <h3 className="text-xl font-semibold mb-2">Notes</h3>
                        <p className="text-neutral-400 text-sm mb-4">
                            Manage noteqs
                        </p>
                        <UKButton variant="primary" size="sm">
                            Manage Notes
                        </UKButton>
                    </div>
                </Link>

                <Link href="/x/artposts" className="block">
                    <div className="p-4 bg-white/5 border border-neutral-400 dark:border-neutral-800 hover:border-neutral-700 dark:hover:border-neutral-600 transition-colors">
                        <h3 className="text-xl font-semibold mb-2">Labs</h3>
                        <p className="text-neutral-400 text-sm mb-4">
                            Manage labs
                        </p>
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
                                className="flex justify-between items-center border-l-4 pl-4 border-neutral-300 dark:border-neutral-700"
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
                                    className="text-neutral-700 dark:text-white px-4 py-2 "
                                >
                                    Edit
                                </Link>
                            </div>
                        ))}
                        {posts.length > 5 && (
                            <Link
                                href="/x/posts"
                                className="block text-center text-neutral-400 hover:text-neutral-200 transition-colors"
                            >
                                View all posts →
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <div className="p-4 mt-8">
                <h2 className="text-2xl font-semibold mb-4">Recent Labs</h2>
                {isLoading ? (
                    <p>Loading labs...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="space-y-4">
                        {artPosts.slice(0, 5).map((artPost) => (
                            <div
                                key={artPost._id}
                                className="flex justify-between items-center border-l-4 pl-4 border-neutral-300 dark:border-neutral-700"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold">
                                        {artPost.title}
                                    </h3>
                                    <div className="text-neutral-400 text-sm">
                                        Published on{' '}
                                        {new Date(
                                            artPost.publishedAt
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                                <Link
                                    href={`/x/artposts/edit/${artPost.slug}`}
                                    className="text-neutral-700 dark:text-white px-4 py-2"
                                >
                                    Edit
                                </Link>
                            </div>
                        ))}
                        {artPosts.length > 5 && (
                            <Link
                                href="/x/artposts"
                                className="block text-center text-neutral-400 hover:text-neutral-200 transition-colors"
                            >
                                View all labs →
                            </Link>
                        )}
                        {artPosts.length === 0 && (
                            <p className="text-neutral-400">No labs yet</p>
                        )}
                    </div>
                )}
            </div>

            <div className="p-4 mt-8">
                <h2 className="text-2xl font-semibold mb-4">Recent Notes</h2>
                {isLoading ? (
                    <p>Loading notes...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="space-y-4">
                        {notes.slice(0, 5).map((note) => (
                            <div
                                key={note._id}
                                className="flex justify-between items-center border-l-4 pl-4 border-neutral-300 dark:border-neutral-700"
                            >
                                <div>
                                    <p className="text-lg">
                                        {note.note.substring(0, 100)}...
                                    </p>
                                    <div className="text-neutral-400 text-sm">
                                        {new Date(
                                            note.date
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                                <Link
                                    href={`/x/noteqs/edit/${note._id}`}
                                    className="text-neutral-700 dark:text-white px-4 py-2"
                                >
                                    Edit
                                </Link>
                            </div>
                        ))}
                        {notes.length > 5 && (
                            <Link
                                href="/x/noteqs"
                                className="block text-center text-neutral-400 hover:text-neutral-200 transition-colors"
                            >
                                View all notes →
                            </Link>
                        )}
                        {notes.length === 0 && (
                            <p className="text-neutral-400">No notes yet</p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}
