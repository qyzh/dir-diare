import Link from 'next/link'
import { icons } from 'lucide-react'
import CopyUrlButton from './copyurl'
import KudosButton from './kudos-button'
import { getAllTags } from '@/lib/tags'

interface FooterProps {
    /** 'default' — full nav footer used on landing / section pages
     *  'writing' — minimal colophon used inside journal articles */
    variant?: 'default' | 'writing'
    /** Optional published date string (used in article variant) */
    publishedAt?: string
    /** Optional tags (used in article variant) */
    tags?: string[]
    /** Back link href (writing variant, default '/w') */
    backHref?: string
    /** Back link label (writing variant, default 'back to journal') */
    backLabel?: string
    /** If set, renders a CopyUrlButton after the back link */
    copyUrl?: string
    /** Post slug — if set, renders a KudosButton (writing variant only) */
    slug?: string
    /** Initial kudos count */
    kudos?: number
}

export default async function Footer({
    variant = 'default',
    publishedAt,
    tags,
    backHref = '/w',
    backLabel = 'back to journal',
    copyUrl,
    slug,
    kudos = 0,
}: FooterProps) {
    const year = new Date().getFullYear()

    if (variant === 'writing') {
        const tagData = tags && tags.length > 0 ? await getAllTags() : []

        return (
            <footer className="journal-article-footer" role="contentinfo">
                <div className="journal-article-footer-inner">
                    {tags && tags.length > 0 && (
                        <div className="journal-article-tags">
                            {tags.map((tag) => {
                                const meta = tagData.find((t) => t.name === tag)
                                const Icon = meta?.icon ? icons[meta.icon as keyof typeof icons] : null
                                return (
                                    <Link
                                        key={tag}
                                        href={`/w/tags/${tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                                        className="journal-article-tag"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                                    >
                                        {Icon && <Icon size={12} />}
                                        {tag}
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                    <div className="journal-article-footer-row">
                        <Link href={backHref} className="journal-article-back">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M15 17h-2v-2h-2v-2H9v-2h2V9h2V7h2v10Z" />
                            </svg>
                            {backLabel}
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {slug && <KudosButton slug={slug} initialCount={kudos} />}
                            {copyUrl && <CopyUrlButton url={copyUrl} />}
                        </div>
                    </div>
                    <span className="journal-article-colophon">
                        {publishedAt
                            ? `written ${publishedAt}`
                            : `dir-diare · ${year}`}
                    </span>
                </div>
            </footer>
        )
    }

    return (
        <footer className="site-footer" role="contentinfo">
            <div className="site-footer-inner">
                <Link href="/" className="site-footer-brand">
                    dir-diare &copy;&thinsp;{year}
                </Link>
                <span className="site-footer-copy">
                    — a mental dump folder
                </span>
            </div>
        </footer>
    )
}
