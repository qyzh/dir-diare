'use client'

import { useState } from 'react'

interface MarkdownEditorTabsProps {
    value: string
    onChange: (nextValue: string) => void
    minRows?: number
}

export default function MarkdownEditorTabs({
    value,
    onChange,
    minRows = 16,
}: MarkdownEditorTabsProps) {
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')

    return (
        <div className="border border-neutral-800 bg-white/5">
            <div className="flex border-b border-neutral-800">
                <button
                    type="button"
                    onClick={() => setActiveTab('write')}
                    className={`px-3 py-1.5 text-sm ${
                        activeTab === 'write'
                            ? 'bg-[#1e1a14] text-neutral-100'
                            : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                >
                    Write
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1.5 text-sm ${
                        activeTab === 'preview'
                            ? 'bg-[#1e1a14] text-neutral-100'
                            : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                >
                    Preview
                </button>
            </div>

            {activeTab === 'write' ? (
                <textarea
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    rows={minRows}
                    className="block w-full resize-y bg-transparent px-2 py-2 text-sm focus:outline-none"
                    required
                />
            ) : (
                <div
                    className="min-h-48 whitespace-pre-wrap px-3 py-2 text-sm text-neutral-300"
                    style={{ minHeight: `${minRows * 1.45}rem` }}
                >
                    {value.trim().length > 0
                        ? value
                        : 'Nothing to preview yet. Write markdown in the Write tab.'}
                </div>
            )}
        </div>
    )
}
