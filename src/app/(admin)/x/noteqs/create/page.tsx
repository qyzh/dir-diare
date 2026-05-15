'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '../../_components/AdminShell'
import UKButton from '@/components/ui/ukbtn'
import { AUTHORIZED_USER } from '@/lib/constants'
import { inputClassName, labelClassName } from '../../_components/formStyles'

export default function CreateNoteQPage() {
    const router = useRouter()
    const [date, setDate] = useState('')
    const [note, setNote] = useState('')
    const [author, setAuthor] = useState(AUTHORIZED_USER)
    const [source, setSource] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        try {
            const res = await fetch('/api/noteqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: date || new Date().toISOString(),
                    note,
                    author,
                    source,
                }),
            })
            if (!res.ok) throw new Error('Failed to create note')
            router.push('/x/noteqs')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AdminShell title="New Note">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                                placeholder="Quote or note text..."
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className={labelClassName}>Author</label>
                                <input
                                    className={inputClassName}
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="e.g. Camus"
                                />
                            </div>
                            <div>
                                <label className={labelClassName}>Source</label>
                                <input
                                    className={inputClassName}
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                    placeholder="e.g. The Stranger"
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClassName}>Date (Optional)</label>
                            <input
                                className={inputClassName}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="2024-01-15T10:00:00.000Z"
                            />
                        </div>
                    </div>
                </section>

                {error && <p className="text-sm text-[#b88a7a] font-mono">{error}</p>}

                <div className="flex items-center gap-4">
                    <UKButton type="submit" disabled={submitting}>
                        {submitting ? 'Creating...' : 'Create Note'}
                    </UKButton>
                    <button
                        type="button"
                        onClick={() => router.push('/x/noteqs')}
                        className="text-sm text-[#6e6255] hover:text-[#c4aa7e] transition-colors font-mono"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </AdminShell>
    )
}
