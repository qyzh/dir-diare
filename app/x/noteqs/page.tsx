'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import UKButton from 'app/components/ukbtn'

interface noteQ {
    _id: string
    date: string
    note: string
    author?: string
    source?: string
}

export default function NoteQsPage() {
    const { data: session, status } = useSession()
    const [noteQs, setNoteQs] = useState<noteQ[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchNoteQs = async () => {
            try {
                const response = await fetch('/api/noteqs')
                if (!response.ok) {
                    throw new Error('Failed to fetch notes')
                }
                const data = await response.json()
                setNoteQs(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            } finally {
                setIsLoading(false)
            }
        }
        fetchNoteQs()
    }, [])

    if (status === 'loading' || isLoading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    if (status === 'unauthenticated') {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>You must be signed in to view notes admin.</p>
                <UKButton onClick={() => signIn('github')}>Sign in with GitHub</UKButton>
            </div>
        )
    }

    if (session?.user?.name !== 'uki') {
        return (
           <div className="container mx-auto px-4 py-8">
               <p>You are not authorized to view notes admin.</p>
               <UKButton onClick={() => signOut()}>Sign out</UKButton>
           </div>
       )
   }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Notes Admin</h1>
            <div className="mb-6">
                <Link href="/x/noteqs/create">
                    <UKButton>Create New Note</UKButton>
                </Link>
            </div>
            {error && <p className="text-red-500 mb-4">Error: {error}</p>}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white/5">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-neutral-700 text-left text-sm font-semibold text-gray-300">Date</th>
                            <th className="py-2 px-4 border-b border-neutral-700 text-left text-sm font-semibold text-gray-300">Note</th>
                            <th className="py-2 px-4 border-b border-neutral-700 text-left text-sm font-semibold text-gray-300">Author</th>
                            <th className="py-2 px-4 border-b border-neutral-700 text-left text-sm font-semibold text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noteQs.map((note) => (
                            <tr key={note._id}>
                                <td className="py-2 px-4 border-b border-neutral-800 text-sm text-gray-400">{new Date(note.date).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b border-neutral-800 text-sm text-gray-400">{note.note.substring(0, 50)}...</td>
                                <td className="py-2 px-4 border-b border-neutral-800 text-sm text-gray-400">{note.author}</td>
                                <td className="py-2 px-4 border-b border-neutral-800 text-sm">
                                    <Link href={`/x/noteqs/edit/${note._id}`}>
                                        <UKButton className="text-blue-400 hover:text-blue-300">Edit</UKButton>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
