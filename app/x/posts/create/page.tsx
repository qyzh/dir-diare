'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import UKButton from 'app/components/ukbtn'

export default function CreatePostPage() {
    const { data: session, status } = useSession()
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [author, setAuthor] = useState('')
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

            router.push('/x')
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
                <p>You must be signed in to create a post.</p>
                <UKButton onClick={() => signIn('github')}>Sign in with GitHub</UKButton>
            </div>
        )
    }

    if (session?.user?.name !== 'uki') {
        return (
           <div className="container mx-auto px-4 py-8">
               <p>You are not authorized to create a post.</p>
               <UKButton onClick={() => signOut()}>Sign out</UKButton>
           </div>
       )
   }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Create New Post</h1>
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
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Status
                    </label>
                    <select
                        id="status"
                        value={postStatus}
                        onChange={(e) => setPostStatus(e.target.value)}
                        className={inputClassName}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
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
                        {isLoading ? 'Creating...' : 'Create Post'}
                    </UKButton>
                </div>
            </form>
        </div>
    )
}
