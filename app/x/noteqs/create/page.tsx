'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import UKButton from 'app/components/ukbtn'
import Breadcrumbs from 'app/components/breadcrumbs'
export default function CreateNoteQPage() {
    const { data: session, status } = useSession()
    const [date, setDate] = useState('')
    const [note, setNote] = useState('')
    const [author, setAuthor] = useState('')
    const [source, setSource] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/noteqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: date || new Date().toISOString(),
                    note,
                    author,
                    source,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create note')
            }

            router.push('/x/noteqs')
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
                <p>You must be signed in to create a note.</p>
                <UKButton onClick={() => signIn('github')}>
                    Sign in with GitHub
                </UKButton>
            </div>
        )
    }

    if (session?.user?.name !== 'uki') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You are not authorized to create a note.</p>
                <UKButton onClick={() => signOut()}>Sign out</UKButton>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold mb-8">Create New Note</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Date (YYYY-MM-DDTHH:MM:SS.sssZ)
                    </label>
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={inputClassName}
                        placeholder="e.g., 2023-10-27T10:00:00.000Z"
                    />
                </div>
                <div>
                    <label
                        htmlFor="note"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Note
                    </label>
                    <textarea
                        id="note"
                        rows={5}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className={inputClassName}
                        required
                    />
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
                        htmlFor="source"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Source
                    </label>
                    <input
                        type="text"
                        id="source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
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
                        {isLoading ? 'Creating...' : 'Create Note'}
                    </UKButton>
                </div>
            </form>
        </div>
    )
}
