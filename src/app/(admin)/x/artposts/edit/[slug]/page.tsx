'use client'

import { type ChangeEvent, use, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '../../../_components/AdminShell'
import MarkdownEditor from '../../../_components/MarkdownEditor'
import UKButton from '@/components/ui/ukbtn'
import { inputClassName, labelClassName } from '../../../_components/formStyles'

export default function EditArtPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
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
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [imageUploadError, setImageUploadError] = useState<string | null>(null)
    const [isFetching, setIsFetching] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const imageFileInputRef = useRef<HTMLInputElement | null>(null)
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
                    slug: currentSlug,
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

    const uploadImage = async (file: File) => {
        setIsUploadingImage(true)
        setImageUploadError(null)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/images', {
                method: 'POST',
                body: formData,
            })
            const payload = await response.json()

            if (!response.ok) {
                throw new Error(payload?.error || 'Failed to upload image')
            }

            setImage(payload.url)
        } catch (err) {
            setImageUploadError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsUploadingImage(false)
            if (imageFileInputRef.current) {
                imageFileInputRef.current.value = ''
            }
        }
    }

    const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (!selectedFile) {
            return
        }

        uploadImage(selectedFile)
    }

    return (
        <AdminShell title={isFetching ? 'Edit Art Post' : `Edit: ${title}`}>
            {isFetching ? (
                <p className="text-[#6e6255] font-mono">Loading art post...</p>
            ) : error && !title ? (
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
                                            value={currentSlug}
                                            onChange={(e) => setCurrentSlug(e.target.value)}
                                            className={inputClassName}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClassName}>Image URL</label>
                                        <input
                                            type="text"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            className={inputClassName}
                                        />
                                        <input
                                            ref={imageFileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/gif"
                                            onChange={handleImageFileChange}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => imageFileInputRef.current?.click()}
                                            disabled={isUploadingImage}
                                            className="mt-2 text-xs text-[#8a7c6c] hover:text-[#c4aa7e] transition-colors font-mono disabled:opacity-60"
                                        >
                                            {isUploadingImage
                                                ? 'Uploading image...'
                                                : 'Upload image to MongoDB'}
                                        </button>
                                        {imageUploadError && (
                                            <p className="mt-2 text-xs text-red-500 font-mono">
                                                {imageUploadError}
                                            </p>
                                        )}
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
                                    <div>
                                        <label className={labelClassName}>Tags</label>
                                        <input
                                            type="text"
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                            className={inputClassName}
                                        />
                                    </div>
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
                                    {isSubmitting ? 'Updating...' : 'Update Art Post'}
                                </UKButton>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isSubmitting}
                                    className="text-sm text-[#9e6b5a] hover:text-red-400 transition-colors font-mono"
                                >
                                    Delete Art Post
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.push('/x/artposts')}
                                    className="text-sm text-[#6e6255] hover:text-[#c4aa7e] transition-colors font-mono"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-500 font-mono">{error}</p>}
                </form>
            )}
        </AdminShell>
    )
}
