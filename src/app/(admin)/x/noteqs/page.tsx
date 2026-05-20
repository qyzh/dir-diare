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
            {actionError && (
                <p className="mb-4 text-[11px] text-[#9e4a3a] font-mono border border-[#3a1a14] bg-[#1a0e0c] px-3 py-2">
                    {actionError}
                </p>
            )}
            <ContentListPanel
                title="Notes"
                isLoading={isLoading}
                error={error}
                isEmpty={noteQs.length === 0}
                emptyText="No notes yet."
            >
                <div className="space-y-1.5">
                    {noteQs.map((note) => (
                        <article
                            key={note._id}
                            className="group flex flex-col justify-between gap-3 border border-[#1a1814] bg-[#0c0b09] px-4 py-3 hover:border-[#2a2520] transition-colors duration-150 lg:flex-row lg:items-center"
                        >
                            <div className="min-w-0 flex-1">
                                <p className="text-[13px] text-[#a89f94] font-[family-name:var(--font-playfair)] group-hover:text-[#d6cfc5] transition-colors duration-150 line-clamp-2">
                                    {note.note.slice(0, 140)}
                                </p>
                                <p className="mt-0.5 text-[10px] text-[#3a3228] font-mono">
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
