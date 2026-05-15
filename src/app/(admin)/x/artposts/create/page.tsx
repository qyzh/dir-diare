'use client'

import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '../../_components/AdminShell'
import MarkdownEditor from '../../_components/MarkdownEditor'
import UKButton from '@/components/ui/ukbtn'
import { AUTHORIZED_USER } from '@/lib/constants'
import { inputClassName, labelClassName } from '../../_components/formStyles'

export default function CreateArtPostPage() {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [tags, setTags] = useState('')
    const [content, setContent] = useState('')
    const [summary, setSummary] = useState('')
    const [author, setAuthor] = useState(AUTHORIZED_USER)
    const [image, setImage] = useState('')
    const [publishedAt, setPublishedAt] = useState('')
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [imageUploadError, setImageUploadError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const imageFileInputRef = useRef<HTMLInputElement | null>(null)
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
        <AdminShell title="Create New Art Post">
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
                                        placeholder="Art title..."
                                    />
                                </div>
                                <div>
                                    <label className={labelClassName}>Content (Markdown)</label>
                                    <MarkdownEditor
                                        value={content}
                                        onChange={setContent}
                                        rows={20}
                                        placeholder="Describe the artwork..."
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
                                        onChange={(e) => setSlug(e.target.value)}
                                        className={inputClassName}
                                        required
                                        placeholder="art-slug"
                                    />
                                </div>
                                <div>
                                    <label className={labelClassName}>Image URL</label>
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        className={inputClassName}
                                        placeholder="/images/art/..."
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
                                        placeholder="digital, ink..."
                                    />
                                </div>
                                <div>
                                    <label className={labelClassName}>Published At</label>
                                    <input
                                        type="text"
                                        value={publishedAt}
                                        onChange={(e) => setPublishedAt(e.target.value)}
                                        className={inputClassName}
                                        placeholder="YYYY-MM-DDTHH:MM:SSZ"
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
                            </div>
                        </section>

                        <div className="flex flex-col gap-3">
                            <UKButton type="submit" disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create Art Post'}
                            </UKButton>
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
        </AdminShell>
    )
}
