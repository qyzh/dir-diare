'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import UKButton from 'app/components/ukbtn'
import Breadcrumbs from 'app/components/breadcrumbs'
export default function EditArtPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { data: session, status: sessionStatus } = useSession()
    const { slug } = use(params)
    const [title, setTitle] = useState('')
    const [currentSlug, setCurrentSlug] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [publishedAt, setPublishedAt] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState('')
    const [updatedAt, setUpdatedAt] = useState('')
    const [isFetching, setIsFetching] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (slug) {
            fetch(`/api/artposts/${slug}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch art post data')
                    }
                    return res.json()
                })
                .then((data) => {
                    if (data) {
                        setTitle(data.title)
                        setCurrentSlug(data.slug)
                        if (data.tags && Array.isArray(data.tags)) {
                            setTags(data.tags.join(', '))
                        } else {
                            setTags('')
                        }
                        setContent(data.content)
                        setSummary(data.summary || '')
                        setPublishedAt(data.publishedAt)
                        setAuthor(data.author || '')
                        setImage(data.image || '')
                        setUpdatedAt(data.updatedAt || '')
                    }
                    setIsFetching(false)
                })
                .catch((err) => {
                    setError(err.message)
                    setIsFetching(false)
                })
        }
    }, [slug])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await fetch(`/api/artposts/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    slug: currentSlug, // Allow slug to be updated if needed, or keep it as original slug
                    tags: tags.split(',').map((tag) => tag.trim()),
                    content,
                    summary,
                    author,
                    image,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update art post')
            }

            router.push('/x/artposts')
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this art post?')) {
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const response = await fetch(`/api/artposts/${slug}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete art post')
            }

            router.push('/x/artposts')
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const inputClassName =
        'mt-1 px-1 py-1.5 block w-full bg-white/5 border border-neutral-800 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
    const readOnlyInputClassName =
        'mt-1 px-1 py-1.5 block w-full text-neutral-600 bg-black/5 border border-neutral-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'

    if (sessionStatus === 'loading' || isFetching) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    if (sessionStatus === 'unauthenticated') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You must be signed in to edit an art post.</p>
                <UKButton onClick={() => signIn('github')}>
                    Sign in with GitHub
                </UKButton>
            </div>
        )
    }

    if (session?.user?.name !== 'uki') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You are not authorized to edit this art post.</p>
                <UKButton onClick={() => signOut()}>Sign out</UKButton>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold mb-8">Edit Art Post</h1>
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
                        value={currentSlug}
                        onChange={(e) => setCurrentSlug(e.target.value)}
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
                <div>
                    <label
                        htmlFor="publishedAt"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Published At
                    </label>
                    <input
                        type="text"
                        id="publishedAt"
                        value={new Date(publishedAt).toLocaleString()}
                        readOnly
                        className={readOnlyInputClassName}
                    />
                </div>
                <div>
                    <label
                        htmlFor="updatedAt"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Updated At
                    </label>
                    <input
                        type="text"
                        id="updatedAt"
                        value={new Date(updatedAt).toLocaleString()}
                        readOnly
                        className={readOnlyInputClassName}
                    />
                </div>
                <div className="flex space-x-4">
                    <UKButton
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Art Post'}
                    </UKButton>
                    <UKButton
                        type="button"
                        onClick={handleDelete}
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Deleting...' : 'Delete Art Post'}
                    </UKButton>
                </div>
            </form>
        </div>
    )
}
