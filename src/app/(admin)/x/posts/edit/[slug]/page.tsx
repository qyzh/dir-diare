'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '../../../_components/AdminShell'
import MarkdownEditor from '../../../_components/MarkdownEditor'
import UKButton from '@/components/ui/ukbtn'
import { inputClassName, readOnlyInputClassName, labelClassName } from '../../../_components/formStyles'
import TagPicker from '../../../_components/TagPicker'

export default function EditPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = use(params)
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState<string[]>([])
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
                        setTags(Array.isArray(data.tags) ? data.tags : [])
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
                    tags,
                    content,
                    summary,
                    author,
                    status,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update post')
            }

            router.push('/x/posts')
        } catch (err) {
            setSubmissionError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AdminShell title={isLoading ? 'Edit Post' : `Edit: ${title}`}>
            {isLoading ? (
                <p className="text-[#6e6255] font-mono">Loading post...</p>
            ) : error ? (
                <p className="text-sm text-red-500 font-mono">{error}</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <section className="border border-[#2a2520] bg-[#0f0e0c] p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClassName}>Title</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className={inputClassName}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClassName}>Content (Markdown)</label>
                                        <MarkdownEditor
                                            value={content}
                                            onChange={setContent}
                                            rows={20}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="space-y-6">
                            <section className="border border-[#2a2520] bg-[#0f0e0c] p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClassName}>Slug</label>
                                        <input
                                            type="text"
                                            value={slug}
                                            readOnly
                                            className={readOnlyInputClassName}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClassName}>Status</label>
                                        <select
                                            value={status}
                                            onChange={(e) =>
                                                setPostStatus(e.target.value as 'draft' | 'published')
                                            }
                                            className={inputClassName}
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClassName}>Author</label>
                                        <input
                                            type="text"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            className={inputClassName}
                                        />
                                    </div>
                                    <TagPicker selected={tags} onChange={setTags} />
                                    <div>
                                        <label className={labelClassName}>Summary</label>
                                        <textarea
                                            rows={4}
                                            value={summary}
                                            onChange={(e) => setSummary(e.target.value)}
                                            className={inputClassName}
                                        />
                                    </div>
                                    <div className="pt-2 border-t border-[#2a2520]">
                                        <p className="text-[10px] text-[#4a4038] uppercase tracking-tighter font-mono">
                                            Published: {new Date(publishedAt).toLocaleString()}
                                        </p>
                                        <p className="text-[10px] text-[#4a4038] uppercase tracking-tighter font-mono">
                                            Updated: {new Date(updatedAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <div className="flex flex-col gap-3">
                                <UKButton type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Updating...' : 'Update Post'}
                                </UKButton>
                                <button
                                    type="button"
                                    onClick={() => router.push('/x/posts')}
                                    className="text-sm text-[#6e6255] hover:text-[#c4aa7e] transition-colors font-mono"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>

                    {submissionError && (
                        <p className="text-sm text-red-500 font-mono">{submissionError}</p>
                    )}
                </form>
            )}
        </AdminShell>
    )
}
