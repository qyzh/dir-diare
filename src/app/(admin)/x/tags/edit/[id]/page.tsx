'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '../../../_components/AdminShell'
import UKButton from '@/components/ui/ukbtn'
import { inputClassName, labelClassName } from '../../../_components/formStyles'
import IconPicker from '../../../_components/IconPicker'
import type { Tag } from '@/lib/tags'

export default function EditTagPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        fetch('/api/tags')
            .then((r) => r.json())
            .then((tags: Tag[]) => {
                const tag = tags.find((t) => t._id === id)
                if (tag) {
                    setName(tag.name)
                    setSlug(tag.slug)
                    setDescription(tag.description ?? '')
                    setIcon(tag.icon ?? '')
                } else {
                    setError('Tag not found')
                }
                setIsLoading(false)
            })
            .catch(() => {
                setError('Failed to load tag')
                setIsLoading(false)
            })
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitError(null)
        try {
            const res = await fetch(`/api/tags/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, icon }),
            })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to update tag')
            }
            router.push('/x/tags')
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const previewSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    return (
        <AdminShell title="Edit Tag">
            {isLoading ? (
                <p className="text-[#6e6255] font-mono">Loading...</p>
            ) : error ? (
                <p className="text-sm text-red-500 font-mono">{error}</p>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
                    <section className="border border-[#2a2520] bg-[#0f0e0c] p-6 space-y-4">
                        <div>
                            <label className={labelClassName}>Tag Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputClassName}
                                required
                                autoFocus
                            />
                            <p className="mt-1.5 text-[11px] text-[#4a4038] font-mono">
                                slug: {previewSlug}
                                {previewSlug !== slug && (
                                    <span className="ml-2 text-[#c4aa7e]">(was: {slug})</span>
                                )}
                            </p>
                        </div>

                        <div>
                            <label className={labelClassName}>Description</label>
                            <textarea
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={inputClassName}
                                placeholder="Short description of this tag..."
                            />
                        </div>

                        <IconPicker selected={icon} onChange={setIcon} />
                    </section>

                    {submitError && <p className="text-sm text-red-500 font-mono">{submitError}</p>}

                    <div className="flex flex-col gap-3">
                        <UKButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update Tag'}
                        </UKButton>
                        <button
                            type="button"
                            onClick={() => router.push('/x/tags')}
                            className="text-sm text-[#6e6255] hover:text-[#c4aa7e] transition-colors font-mono"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </AdminShell>
    )
}
