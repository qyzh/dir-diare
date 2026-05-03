import Link from 'next/link'


interface FooterProps {
    /** 'default' — full nav footer used on landing / section pages
     *  'article' — minimal colophon used inside journal articles */
    variant?: 'default' | 'article'
    /** Optional published date string (used in article variant) */
    publishedAt?: string
    /** Optional tags (used in article variant) */
    tags?: string[]
}

export default function Footer({
    variant = 'default',
    publishedAt,
    tags,
}: FooterProps) {
    const year = new Date().getFullYear()

    if (variant === 'article') {
        return (
            <footer className="journal-article-footer" role="contentinfo">
                <div className="journal-article-footer-inner">
                    {tags && tags.length > 0 && (
                        <div className="journal-article-tags">
                            {tags.map((tag) => (
                                <span key={tag} className="journal-article-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="journal-article-footer-row">
                        <Link href="/w" className="journal-article-back">
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
                            back to journal
                        </Link>
                        <span className="journal-article-colophon">
                            {publishedAt
                                ? `written ${publishedAt}`
                                : `dir-diare · ${year}`}
                        </span>
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <footer className="site-footer" role="contentinfo">
            <div className="site-footer-inner">
                {/* Left: wordmark */}
                <Link href="/" className="site-footer-brand">
                    dir-diare &copy;&thinsp;{year}
                </Link>

                {/* Right: year */}
                <span className="site-footer-copy">
                    — a mental dump folder
                </span>
            </div>
        </footer>
    )
}
