'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import UKButton from 'app/components/ukbtn'
import Breadcrumbs from 'app/components/breadcrumbs'
export default function CreateArtPostPage() {
    const { data: session, status } = useSession()
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState('')
    const [publishedAt, setPublishedAt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const generatedSummary = content.substring(0, 100)
        setSummary(generatedSummary)
    }, [content])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/artposts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    slug,
                    tags: tags.split(',').map((tag) => tag.trim()),
                    content,
                    summary,
                    author,
                    image,
                    publishedAt: publishedAt || new Date().toISOString(),
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create art post')
            }

            router.push('/x/artposts')
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsLoading(false)
        }
    }

    const inputClassName =
        'mt-1 px-1 py-1.5 block w-full bg-white/5 border border-neutral-800 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'

    if (status === 'loading') {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    if (status === 'unauthenticated') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You must be signed in to create an art post.</p>
                <UKButton onClick={() => signIn('github')}>
                    Sign in with GitHub
                </UKButton>
            </div>
        )
    }

    if (session?.user?.name !== 'uki') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You are not authorized to create an art post.</p>
                <UKButton onClick={() => signOut()}>Sign out</UKButton>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold mb-8">Create New Art Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={inputClassName}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="slug"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Slug
                    </label>
                    <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className={inputClassName}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="author"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className={inputClassName}
                    />
                </div>
                <div>
                    <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Image URL
                    </label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className={inputClassName}
                    />
                </div>
                <div>
                    <label
                        htmlFor="publishedAt"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Published At (YYYY-MM-DDTHH:MM:SS.sssZ)
                    </label>
                    <input
                        type="text"
                        id="publishedAt"
                        value={publishedAt}
                        onChange={(e) => setPublishedAt(e.target.value)}
                        className={inputClassName}
                        placeholder="e.g., 2023-10-27T10:00:00.000Z"
                    />
                </div>
                <div>
                    <label
                        htmlFor="summary"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Summary
                    </label>
                    <textarea
                        id="summary"
                        rows={3}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className={inputClassName}
                    />
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Content (Markdown)
                    </label>
                    <textarea
                        id="content"
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={inputClassName}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Tags (comma-separated)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className={inputClassName}
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <UKButton
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Creating...' : 'Create Art Post'}
                    </UKButton>
                </div>
            </form>
        </div>
    )
}
