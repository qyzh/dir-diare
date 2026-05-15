'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '../../_components/AdminShell'
import UKButton from '@/components/ui/ukbtn'
import { inputClassName, labelClassName } from '../../_components/formStyles'
import IconPicker from '../../_components/IconPicker'

export default function CreateTagPage() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, icon }),
            })
            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to create tag')
            }
            router.push('/x/tags')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AdminShell title="Create Tag">
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
                            placeholder="e.g. web development"
                            autoFocus
                        />
                        {name && (
                            <p className="mt-1.5 text-[11px] text-[#4a4038] font-mono">
                                slug: {name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
                            </p>
                        )}
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

                {error && <p className="text-sm text-red-500 font-mono">{error}</p>}

                <div className="flex flex-col gap-3">
                    <UKButton type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Tag'}
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
        </AdminShell>
    )
}
