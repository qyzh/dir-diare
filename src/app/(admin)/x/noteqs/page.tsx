'use client'

import Link from 'next/link'
import { useState } from 'react'
import { noteQ } from '@/lib/noteq'
import UKButton from '@/components/ui/ukbtn'
import AdminShell from '../_components/AdminShell'
import ContentListPanel from '../_components/ContentListPanel'
import RowQuickActions from '../_components/RowQuickActions'
import { useAdminData } from '../_components/useAdminData'

export default function NoteQsPage() {
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

    return (
        <AdminShell
            title="Manage Notes"
            actions={
                <Link href="/x/noteqs/create">
                    <UKButton variant="primary">Create New Note</UKButton>
                </Link>
            }
        >
            {actionError && <p className="mb-3 text-sm text-red-500 font-mono">{actionError}</p>}
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
                                <p className="text-sm text-[#d4c9b4] font-[family-name:var(--font-playfair)]">
                                    {note.note.slice(0, 140)}
                                </p>
                                <p className="mt-1 text-xs text-[#6e6255] font-mono">
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
