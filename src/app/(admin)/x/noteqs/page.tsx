'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { noteQ } from '@/lib/noteq'
import UKButton from '@/components/ui/ukbtn'
import { AUTHORIZED_USER } from '@/lib/constants'
import AuthButton from '../_components/AuthButton'
import AdminShell from '../_components/AdminShell'
import ContentListPanel from '../_components/ContentListPanel'
import RowQuickActions from '../_components/RowQuickActions'
import { useAdminData } from '../_components/useAdminData'
import { useState } from 'react'

export default function NoteQsPage() {
    const { data: session, status } = useSession()
    const { data: noteQs, isLoading, error, refresh } =
        useAdminData<noteQ>('/api/noteqs')
    const [rowBusy, setRowBusy] = useState<string | null>(null)
    const [actionError, setActionError] = useState<string | null>(null)

    const deleteNote = async (note: noteQ) => {
        if (!window.confirm('Delete this note?')) return

        setActionError(null)
        setRowBusy(note._id)
        try {
            const response = await fetch(`/api/noteqs/${note._id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete note')
            }

            await refresh()
        } catch (err) {
            setActionError(
                err instanceof Error ? err.message : 'An unknown error occurred'
            )
        } finally {
            setRowBusy(null)
        }
    }

    if (status === 'loading') {
        return (
            <div className="flex h-screen items-center justify-center bg-[#14120f] font-mono text-[#6e6255]">
                loading...
            </div>
        )
    }

    if (status === 'unauthenticated' || session?.user?.name !== AUTHORIZED_USER) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-[#14120f] p-8 text-center font-mono">
                <h1 className="mb-4 text-2xl font-bold text-[#c4aa7e]">Manage Notes</h1>
                <p className="mb-6 text-[#6e6255]">
                    {status === 'unauthenticated' 
                        ? 'Please sign in to manage notes.' 
                        : 'You are not authorized to manage notes.'}
                </p>
                <AuthButton />
            </div>
        )
    }

    return (
        <AdminShell
            title="Manage Notes"
            actions={
                <Link href="/x/noteqs/create">
                    <UKButton variant="primary">Create New Note</UKButton>
                </Link>
            }
        >
            {actionError && <p className="mb-3 text-sm text-red-500">{actionError}</p>}
            <ContentListPanel
                title="Notes"
                isLoading={isLoading}
                error={error}
                isEmpty={noteQs.length === 0}
                emptyText="No notes yet."
            >
                <div className="space-y-3">
                    {noteQs.map((note) => (
                        <article
                            key={note._id}
                            className="flex flex-col justify-between gap-3 border border-[#2a2520] bg-[#14120f] p-3 lg:flex-row"
                        >
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-neutral-200">
                                    {note.note.slice(0, 140)}
                                </p>
                                <p className="mt-1 text-xs text-neutral-500">
                                    {new Date(note.date).toLocaleDateString()}
                                </p>
                            </div>
                            <RowQuickActions
                                editHref={`/x/noteqs/edit/${note._id}`}
                                disabled={rowBusy === note._id}
                                onDelete={async () => deleteNote(note)}
                            />
                        </article>
                    ))}
                </div>
            </ContentListPanel>
        </AdminShell>
    )
}
