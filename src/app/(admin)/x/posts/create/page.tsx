'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import AdminShell from '../../_components/AdminShell'
import MarkdownEditor from '../../_components/MarkdownEditor'
import UKButton from '@/components/ui/ukbtn'
import { AUTHORIZED_USER } from '@/lib/constants'

export default function CreatePostPage() {
    const { data: session, status } = useSession()
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [author, setAuthor] = useState(AUTHORIZED_USER)
    const [postStatus, setPostStatus] = useState('draft')
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
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    tags: tags.split(',').map((tag) => tag.trim()),
                    content,
                    summary,
                    author,
                    status: postStatus,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create post')
            }

            router.push('/x/posts')
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsLoading(false)
        }
    }

    if (status === 'loading') {
        return (
            <div className="flex h-screen items-center justify-center bg-[#14120f] font-mono text-[#6e6255]">
                loading...
            </div>
        )
    }

    if (status === 'unauthenticated') {
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
    const labelClassName =
        'block text-xs uppercase tracking-widest text-[#6e6255] mb-1.5'

    return (
        <AdminShell title="Create New Post">
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
                                        placeholder="Post title..."
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
                                        placeholder="Write your story..."
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
                                        Status
                                    </label>
                                    <select
                                        value={postStatus}
                                        onChange={(e) =>
                                            setPostStatus(e.target.value)
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
                                        placeholder="tag1, tag2..."
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
                                        placeholder="Brief summary..."
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col gap-3">
                            <UKButton type="submit" disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create Post'}
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

                {error && <p className="text-sm text-red-500">{error}</p>}
            </form>
        </AdminShell>
    )
}
