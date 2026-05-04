'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '../../../_components/AdminShell'
import UKButton from '@/components/ui/ukbtn'
import { inputClassName, labelClassName } from '../../../_components/formStyles'

export default function EditNoteQPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const router = useRouter()

    const [date, setDate] = useState('')
    const [note, setNote] = useState('')
    const [author, setAuthor] = useState('')
    const [source, setSource] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (id) {
            fetch(`/api/noteqs/${id}`)
                .then((r) => {
                    if (!r.ok) throw new Error('Failed to fetch')
                    return r.json()
                })
                .then((d) => {
                    setDate(d.date)
                    setNote(d.note)
                    setAuthor(d.author || '')
                    setSource(d.source || '')
                    setLoading(false)
                })
                .catch((err) => {
                    setError(err.message)
                    setLoading(false)
                })
        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        try {
            const res = await fetch(`/api/noteqs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, note, author, source }),
            })
            if (!res.ok) throw new Error('Failed to update note')
            router.push('/x/noteqs')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Delete this note?')) return
        setSubmitting(true)
        try {
            const res = await fetch(`/api/noteqs/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Failed to delete note')
            router.push('/x/noteqs')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
            setSubmitting(false)
        }
    }

    return (
        <AdminShell title="Edit Note">
            {loading ? (
                <p className="text-[#6e6255] font-mono">Loading note...</p>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
                    <section className="border border-[#2a2520] bg-[#0f0e0c] p-6">
                        <div className="space-y-6">
                            <div>
                                <label className={labelClassName}>Note Content</label>
                                <textarea
                                    className={inputClassName}
                                    rows={8}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className={labelClassName}>Author</label>
                                    <input
                                        className={inputClassName}
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={labelClassName}>Source</label>
                                    <input
                                        className={inputClassName}
                                        value={source}
                                        onChange={(e) => setSource(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClassName}>Date</label>
                                <input
                                    className={inputClassName}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {error && <p className="text-sm text-[#b88a7a] font-mono">{error}</p>}

                    <div className="flex items-center gap-4">
                        <UKButton type="submit" disabled={submitting}>
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </UKButton>
                        <button
                            type="button"
                            onClick={() => router.push('/x/noteqs')}
                            className="text-sm text-[#6e6255] hover:text-[#c4aa7e] transition-colors font-mono"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={submitting}
                            className="ml-auto text-sm text-[#9e6b5a] hover:text-red-400 transition-colors font-mono"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            )}
        </AdminShell>
    )
}
