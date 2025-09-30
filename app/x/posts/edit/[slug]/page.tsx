'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import UKbutton from 'app/components/ukbtn'

export default function EditPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = use(params)
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [publishedAt, setPublishedAt] = useState('')
    const [author, setAuthor] = useState('')
    const [status, setStatus] = useState('draft')
    const [updatedAt, setUpdatedAt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (slug) {
            setIsLoading(true)
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
                        setStatus(data.status || 'draft')
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
        setIsLoading(true)
        setError(null)

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
            setError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    const inputClassName =
        'mt-1 px-1 py-1.5 block w-full bg-white/5 border border-neutral-800 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
    const readOnlyInputClassName =
        'mt-1 px-1 py-1.5 block w-full text-neutral-600 bg-black/5 border border-neutral-900 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'

    return (
        <div className="container mx-auto px-4 py-8">
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
                            setStatus(e.target.value as 'draft' | 'published')
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
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <UKbutton
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Updating...' : 'Update Post'}
                    </UKbutton>
                </div>
            </form>
        </div>
    )
}
