'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import UKbutton from 'app/components/ukbtn'
import Breadcrumbs from 'app/components/breadcrumbs'
export default function EditPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { data: session, status: sessionStatus } = useSession()
    const { slug } = use(params)
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [publishedAt, setPublishedAt] = useState('')
    const [author, setAuthor] = useState('')
    const [status, setPostStatus] = useState('draft')
    const [updatedAt, setUpdatedAt] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submissionError, setSubmissionError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (slug) {
            fetch(`/api/posts/${slug}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch post data')
                    }
                    return res.json()
                })
                .then((data) => {
                    if (data) {
                        setTitle(data.title)
                        if (data.tags && Array.isArray(data.tags)) {
                            setTags(data.tags.join(', '))
                        } else {
                            setTags('')
                        }
                        setContent(data.content)
                        setSummary(data.summary || '')
                        setPublishedAt(data.publishedAt)
                        setAuthor(data.author || '')
                        setPostStatus(data.status || 'draft')
                        setUpdatedAt(data.updatedAt || '')
                    }
                    setIsLoading(false)
                })
                .catch((err) => {
                    setError(err.message)
                    setIsLoading(false)
                })
        }
    }, [slug])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmissionError(null)

        try {
            const response = await fetch(`/api/posts/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    tags: tags.split(',').map((tag) => tag.trim()),
                    content,
                    summary,
                    author,
                    status,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update post')
            }

            router.push('/x')
        } catch (err) {
            setSubmissionError(
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

    if (sessionStatus === 'loading' || isLoading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    if (sessionStatus === 'unauthenticated') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You must be signed in to edit a post.</p>
                <UKbutton onClick={() => signIn('github')}>
                    Sign in with GitHub
                </UKbutton>
            </div>
        )
    }

    if (session?.user?.name !== 'qyzh') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You are not authorized to edit this post.</p>
                <UKbutton onClick={() => signOut()}>Sign out</UKbutton>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold mb-8">Edit Post</h1>
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
                        readOnly
                        className={readOnlyInputClassName}
                    />
                </div>
                <div>
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) =>
                            setPostStatus(
                                e.target.value as 'draft' | 'published'
                            )
                        }
                        className={inputClassName}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
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
                {submissionError && <p className="text-red-500">{submissionError}</p>}
                <div>
                    <UKbutton
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Post'}
                    </UKbutton>
                </div>
            </form>
        </div>
    )
}
