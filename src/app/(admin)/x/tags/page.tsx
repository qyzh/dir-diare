'use client'

import Link from 'next/link'
import { useState } from 'react'
import { icons } from 'lucide-react'
import UKButton from '@/components/ui/ukbtn'
import AdminShell from '../_components/AdminShell'
import ContentListPanel from '../_components/ContentListPanel'
import { useAdminData } from '../_components/useAdminData'
import type { Tag } from '@/lib/tags'

function TagIcon({ name }: { name?: string }) {
    if (!name) return null
    const Icon = icons[name as keyof typeof icons]
    return Icon ? <Icon size={14} className="text-[#6e6255]" /> : null
}

export default function TagsManagePage() {
    const { data: tags, isLoading, error, refresh } = useAdminData<Tag>('/api/tags')
    const [rowBusy, setRowBusy] = useState<string | null>(null)
    const [actionError, setActionError] = useState<string | null>(null)

    const deleteTag = async (tag: Tag) => {
        if (!window.confirm(`Delete tag "${tag.name}"?`)) return
        setActionError(null)
        setRowBusy(tag._id)
        try {
            const res = await fetch(`/api/tags/${tag._id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Failed to delete tag')
            await refresh()
        } catch (err) {
            setActionError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setRowBusy(null)
        }
    }

    return (
        <AdminShell
            title="Manage Tags"
            actions={
                <Link href="/x/tags/create">
                    <UKButton variant="primary">New Tag</UKButton>
                </Link>
            }
        >
            {actionError && (
                <p className="mb-4 text-[11px] text-[#9e4a3a] font-mono border border-[#3a1a14] bg-[#1a0e0c] px-3 py-2">
                    {actionError}
                </p>
            )}

            <ContentListPanel
                title="Tags"
                isLoading={isLoading}
                error={error}
                isEmpty={tags.length === 0}
                emptyText="No tags yet."
            >
                <div className="space-y-1.5">
                    {tags.map((tag) => (
                        <div
                            key={tag._id}
                            className="group flex items-center justify-between border border-[#1a1814] bg-[#0c0b09] px-4 py-3 hover:border-[#2a2520] transition-colors duration-150"
                        >
                            <div className="flex items-center gap-2.5 min-w-0">
                                <span className="text-[#3a3228] group-hover:text-[#6e6255] transition-colors duration-150">
                                    <TagIcon name={tag.icon} />
                                </span>
                                <div className="min-w-0">
                                    <span className="text-[#c8c0b4] font-mono text-[13px] group-hover:text-[#d6cfc5] transition-colors duration-150">
                                        {tag.name}
                                    </span>
                                    <span className="ml-2.5 text-[9px] text-[#2e2b25] font-mono tracking-[0.08em]">
                                        /{tag.slug}
                                    </span>
                                    {tag.description && (
                                        <p className="text-[10px] text-[#3a3228] font-mono mt-0.5 truncate">
                                            {tag.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 ml-4 shrink-0">
                                <Link
                                    href={`/x/tags/edit/${tag._id}`}
                                    className="px-2.5 py-1 text-[10px] font-mono tracking-[0.08em] uppercase text-[#4a4038] border border-[#1e1b17] hover:text-[#c4aa7e] hover:border-[#2a2520] transition-all duration-150"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteTag(tag)}
                                    disabled={rowBusy === tag._id}
                                    className="px-2.5 py-1 text-[10px] font-mono tracking-[0.08em] uppercase text-[#4a4038] border border-[#1e1b17] hover:text-[#9e4a3a] hover:border-[#3a1a14] transition-all duration-150 disabled:opacity-30"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </ContentListPanel>
        </AdminShell>
    )
}
