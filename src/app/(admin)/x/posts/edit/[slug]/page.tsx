'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import AdminShell from '../../../_components/AdminShell'
import MarkdownEditor from '../../../_components/MarkdownEditor'
import UKButton from '@/components/ui/ukbtn'
import { AUTHORIZED_USER } from '@/lib/constants'

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

            router.push('/x/posts')
        } catch (err) {
            setSubmissionError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    if (sessionStatus === 'loading' || isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#14120f] font-mono text-[#6e6255]">
                loading...
            </div>
        )
    }

    if (sessionStatus === 'unauthenticated') {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-[#14120f] p-8 text-center font-mono">
                <p className="mb-4 text-[#6e6255]">Please sign in to continue</p>
                <UKButton onClick={() => signIn('github')}>
                    Sign in with GitHub
                </UKButton>
            </div>
        )
    }

    if (session?.user?.name !== AUTHORIZED_USER) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#14120f] font-mono text-[#9e6b5a]">
                Not authorized.
            </div>
        )
    }

    const inputClassName =
        'w-full bg-[#1a1713] border border-[#2a2520] text-neutral-100 px-3 py-2 text-sm focus:outline-none focus:border-[#c4aa7e] transition-colors'
    const readOnlyInputClassName =
        'w-full bg-[#14120f] border border-[#2a2520] text-neutral-500 px-3 py-2 text-sm cursor-not-allowed'
    const labelClassName =
        'block text-xs uppercase tracking-widest text-[#6e6255] mb-1.5'

    return (
        <AdminShell title={`Edit: ${title}`}>
            <form onSubmit={handleSubmit} className="max-w-5xl space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        <section className="border border-[#2a2520] bg-[#0f0e0c] p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClassName}>
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className={inputClassName}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClassName}>
                                        Content (Markdown)
                                    </label>
                                    <MarkdownEditor
                                        value={content}
                                        onChange={setContent}
                                        rows={20}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Meta */}
                    <div className="space-y-6">
                        <section className="border border-[#2a2520] bg-[#0f0e0c] p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClassName}>
                                        Slug
                                    </label>
                                    <input
                                        type="text"
                                        value={slug}
                                        readOnly
                                        className={readOnlyInputClassName}
                                    />
                                </div>
                                <div>
                                    <label className={labelClassName}>
                                        Status
                                    </label>
                                    <select
                                        value={status}
                                        onChange={(e) =>
                                            setPostStatus(
                                                e.target.value as
                                                    | 'draft'
                                                    | 'published'
                                            )
                                        }
                                        className={inputClassName}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">
                                            Published
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClassName}>
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        value={author}
                                        onChange={(e) =>
                                            setAuthor(e.target.value)
                                        }
                                        className={inputClassName}
                                    />
                                </div>
                                <div>
                                    <label className={labelClassName}>
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        className={inputClassName}
                                    />
                                </div>
                                <div>
                                    <label className={labelClassName}>
                                        Summary
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={summary}
                                        onChange={(e) =>
                                            setSummary(e.target.value)
                                        }
                                        className={inputClassName}
                                    />
                                </div>
                                <div className="pt-2 border-t border-[#2a2520]">
                                    <p className="text-[10px] text-neutral-600 uppercase tracking-tighter">
                                        Published: {new Date(publishedAt).toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-neutral-600 uppercase tracking-tighter">
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
                                className="text-sm text-[#6e6255] hover:text-[#c4aa7e] transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>

                {submissionError && (
                    <p className="text-sm text-red-500">{submissionError}</p>
                )}
            </form>
        </AdminShell>
    )
}
