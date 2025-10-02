'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import UKButton from 'app/components/ukbtn'
import Breadcrumbs from 'app/components/breadcrumbs'
export default function EditNoteQPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { data: session, status: sessionStatus } = useSession()
    const { id } = use(params)
    const [date, setDate] = useState('')
    const [note, setNote] = useState('')
    const [author, setAuthor] = useState('')
    const [source, setSource] = useState('')
    const [isFetching, setIsFetching] = useState(true) // for initial fetch
    const [isSubmitting, setIsSubmitting] = useState(false) // for form submission
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (id) {
            setIsFetching(true)
            fetch(`/api/noteqs/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch note data')
                    }
                    return res.json()
                })
                .then((data) => {
                    if (data) {
                        setDate(data.date)
                        setNote(data.note)
                        setAuthor(data.author || '')
                        setSource(data.source || '')
                    }
                    setIsFetching(false)
                })
                .catch((err) => {
                    setError(err.message)
                    setIsFetching(false)
                })
        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await fetch(`/api/noteqs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    note,
                    author,
                    source,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to update note')
            }

            router.push('/x/noteqs')
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this note?')) {
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const response = await fetch(`/api/noteqs/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete note')
            }

            router.push('/x/noteqs')
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const inputClassName =
        'mt-1 px-1 py-1.5 block w-full bg-white/5 border border-neutral-800 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'

    if (sessionStatus === 'loading' || isFetching) return <p>Loading...</p>
    if (error) return <p className="text-red-500">{error}</p>

    if (sessionStatus === 'unauthenticated') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You must be signed in to edit a note.</p>
                <UKButton onClick={() => signIn('github')}>
                    Sign in with GitHub
                </UKButton>
            </div>
        )
    }

    if (session?.user?.name !== 'uki') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You are not authorized to edit this note.</p>
                <UKButton onClick={() => signOut()}>Sign out</UKButton>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold mb-8">Edit Note</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-400"
                    >
                        Date
                    </label>
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={inputClassName}
                        required
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
                        rows={10}
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
                <div className="flex space-x-4">
                    <UKButton
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Note'}
                    </UKButton>
                    <UKButton
                        type="button"
                        onClick={handleDelete}
                        disabled={isSubmitting}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Deleting...' : 'Delete Note'}
                    </UKButton>
                </div>
            </form>
        </div>
    )
}
