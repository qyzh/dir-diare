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
            {actionError && <p className="mb-3 text-sm text-red-500 font-mono">{actionError}</p>}

            <ContentListPanel
                title="Tags"
                isLoading={isLoading}
                error={error}
                isEmpty={tags.length === 0}
                emptyText="No tags yet."
            >
                <div className="space-y-2">
                    {tags.map((tag) => (
                        <div
                            key={tag._id}
                            className="flex items-center justify-between border border-[#2a2520] bg-[#14120f] px-4 py-3"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <TagIcon name={tag.icon} />
                                <div className="min-w-0">
                                    <span className="text-[#d4c9b4] font-mono text-sm">{tag.name}</span>
                                    <span className="ml-3 text-[10px] text-[#4a4038] font-mono tracking-wider">
                                        /{tag.slug}
                                    </span>
                                    {tag.description && (
                                        <p className="text-[11px] text-[#4a4038] font-mono mt-0.5 truncate">
                                            {tag.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4 shrink-0">
                                <Link
                                    href={`/x/tags/edit/${tag._id}`}
                                    className="px-3 py-1 text-xs font-mono text-[#6e6255] border border-[#2a2520] hover:text-[#c4aa7e] hover:border-[#3a3228] transition-colors"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteTag(tag)}
                                    disabled={rowBusy === tag._id}
                                    className="px-3 py-1 text-xs font-mono text-[#6e6255] border border-[#2a2520] hover:text-red-400 hover:border-red-900 transition-colors disabled:opacity-40"
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
