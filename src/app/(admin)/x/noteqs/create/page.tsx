'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import AdminShell from '../../_components/AdminShell'
import UKButton from '@/components/ui/ukbtn'
import { AUTHORIZED_USER } from '@/lib/constants'

export default function CreateNoteQPage() {
    const { data: session, status } = useSession()
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
        <AdminShell title="New Note">
            <form onSubmit={handleSubmit} className="max-w-4xl space-y-6 font-mono">
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
                            <label className={labelClassName}>
                                Date (Optional)
                            </label>
                            <input
                                className={inputClassName}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="2024-01-15T10:00:00.000Z"
                            />
                        </div>
                    </div>
                </section>

                {error && <p className="text-sm text-[#b88a7a]">{error}</p>}

                <div className="flex items-center gap-4">
                    <UKButton type="submit" disabled={submitting}>
                        {submitting ? 'Creating...' : 'Create Note'}
                    </UKButton>
                    <button
                        type="button"
                        onClick={() => router.push('/x/noteqs')}
                        className="text-sm text-[#6e6255] hover:text-[#c4aa7e] transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </AdminShell>
    )
}
