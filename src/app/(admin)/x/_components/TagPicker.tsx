'use client'

import { useState, useEffect } from 'react'
import { icons } from 'lucide-react'
import type { Tag } from '@/lib/tags'
import { labelClassName } from './formStyles'

interface TagPickerProps {
    selected: string[]
    onChange: (tags: string[]) => void
}

export default function TagPicker({ selected, onChange }: TagPickerProps) {
    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/tags')
            .then((r) => r.json())
            .then((data) => {
                setTags(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const toggle = (name: string) => {
        onChange(
            selected.includes(name)
                ? selected.filter((t) => t !== name)
                : [...selected, name]
        )
    }

    return (
        <div>
            <label className={labelClassName}>Tags</label>
            {loading ? (
                <p className="text-xs text-[#4a4038] font-mono">Loading tags...</p>
            ) : tags.length === 0 ? (
                <p className="text-xs text-[#4a4038] font-mono">
                    No tags yet.{' '}
                    <a href="/x/tags/create" className="text-[#c4aa7e] hover:underline">
                        Create one
                    </a>
                </p>
            ) : (
                <div className="flex flex-wrap gap-2 mt-1">
                    {tags.map((tag) => {
                        const active = selected.includes(tag.name)
                        const Icon = tag.icon ? icons[tag.icon as keyof typeof icons] : null
                        return (
                            <button
                                key={tag._id}
                                type="button"
                                onClick={() => toggle(tag.name)}
                                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border transition-colors ${
                                    active
                                        ? 'bg-[#1e1a14] text-[#c4aa7e] border-[#c4aa7e]'
                                        : 'bg-[#14120f] text-[#6e6255] border-[#2a2520] hover:text-[#d4c9b4] hover:border-[#3a3228]'
                                }`}
                            >
                                {Icon && <Icon size={12} />}
                                {tag.name}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
