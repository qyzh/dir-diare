'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import UKButton from 'app/components/ukbtn'
import Breadcrumbs from 'app/components/breadcrumbs'
interface ArtPost {
    _id: string
    slug: string
    title: string
    summary?: string
    publishedAt: string
}

export default function ArtPostsPage() {
    const { data: session, status } = useSession()
    const [artPosts, setArtPosts] = useState<ArtPost[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchArtPosts = async () => {
            try {
                const response = await fetch('/api/artposts')
                if (!response.ok) {
                    throw new Error('Failed to fetch art posts')
                }
                const data = await response.json()
                setArtPosts(data)
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'An unknown error occurred'
                )
            } finally {
                setIsLoading(false)
            }
        }
        fetchArtPosts()
    }, [])

    if (status === 'loading' || isLoading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    if (status === 'unauthenticated') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You must be signed in to view art posts admin.</p>
                <UKButton onClick={() => signIn('github')}>
                    Sign in with GitHub
                </UKButton>
            </div>
        )
    }

    if (session?.user?.name !== 'uki') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You are not authorized to view art posts admin.</p>
                <UKButton onClick={() => signOut()}>Sign out</UKButton>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold mb-8">Art Posts Admin</h1>
            <div className="mb-6">
                <Link href="/x/artposts/create">
                    <UKButton>Create New Art Post</UKButton>
                </Link>
            </div>
            {error && <p className="text-red-500 mb-4">Error: {error}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white/5">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-neutral-700 text-left text-sm font-semibold text-gray-300">
                                Title
                            </th>
                            <th className="py-2 px-4 border-b border-neutral-700 text-left text-sm font-semibold text-gray-300">
                                Slug
                            </th>
                            <th className="py-2 px-4 border-b border-neutral-700 text-left text-sm font-semibold text-gray-300">
                                Published At
                            </th>
                            <th className="py-2 px-4 border-b border-neutral-700 text-left text-sm font-semibold text-gray-300">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {artPosts.map((post) => (
                            <tr key={post._id}>
                                <td className="py-2 px-4 border-b border-neutral-800 text-sm text-gray-400">
                                    {post.title}
                                </td>
                                <td className="py-2 px-4 border-b border-neutral-800 text-sm text-gray-400">
                                    {post.slug}
                                </td>
                                <td className="py-2 px-4 border-b border-neutral-800 text-sm text-gray-400">
                                    {new Date(
                                        post.publishedAt
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border-b border-neutral-800 text-sm">
                                    <Link
                                        href={`/x/artposts/edit/${post.slug}`}
                                    >
                                        <UKButton className="text-blue-400 hover:text-blue-300">
                                            Edit
                                        </UKButton>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
