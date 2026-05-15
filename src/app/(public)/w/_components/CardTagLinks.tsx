'use client'

import { useRouter } from 'next/navigation'
import { icons } from 'lucide-react'
import type { Tag } from '@/lib/tags'

interface CardTagLinksProps {
    tags: string[]
    tagData: Tag[]
}

export default function CardTagLinks({ tags, tagData }: CardTagLinksProps) {
    const router = useRouter()
    if (tags.length === 0) return null
    return (
        <span
            className="flex flex-wrap items-center gap-1.5"
            onClick={(e) => e.preventDefault()}
        >
            {tags.map((tag) => {
                const meta = tagData.find((t) => t.name === tag)
                const Icon = meta?.icon ? icons[meta.icon as keyof typeof icons] : null
                const href = `/w/tags/${tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
                return (
                    <span
                        key={tag}
                        role="link"
                        tabIndex={0}
                        className="journal-card-tag"
                        style={{ marginTop: 0, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); router.push(href) }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); e.preventDefault(); router.push(href) } }}
                    >
                        {Icon && <Icon size={11} />}
                        {tag}
                    </span>
                )
            })}
        </span>
    )
}
