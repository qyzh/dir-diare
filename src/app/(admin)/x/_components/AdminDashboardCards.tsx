import Link from 'next/link'

interface AdminDashboardCardsProps {
    postsCount: number
    notesCount: number
    artCount: number
}

const CARD_META = [
    {
        key: 'posts' as const,
        label: 'Posts',
        accentColor: '#c4aa7e',
        manageHref: '/x/posts',
        createHref: '/x/posts/create',
    },
    {
        key: 'notes' as const,
        label: 'Notes',
        accentColor: '#8a9e7e',
        manageHref: '/x/noteqs',
        createHref: '/x/noteqs/create',
    },
    {
        key: 'art' as const,
        label: 'Art',
        accentColor: '#9e7e8a',
        manageHref: '/x/artposts',
        createHref: '/x/artposts/create',
    },
]

export default function AdminDashboardCards({
    postsCount,
    notesCount,
    artCount,
}: AdminDashboardCardsProps) {
    const counts: Record<string, number> = {
        posts: postsCount,
        notes: notesCount,
        art: artCount,
    }

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1px',
                background: '#1e1b17',
                border: '1px solid #1e1b17',
            }}
        >
            {CARD_META.map((card) => (
                <div
                    key={card.key}
                    style={{
                        background: '#14120f',
                        padding: '24px 20px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        borderTop: `3px solid ${card.accentColor}`,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Faint watermark number */}
                    <span
                        aria-hidden
                        style={{
                            position: 'absolute',
                            right: '-8px',
                            top: '-4px',
                            fontSize: '72px',
                            fontFamily: 'var(--font-playfair)',
                            color: '#1a1713',
                            lineHeight: 1,
                            pointerEvents: 'none',
                            userSelect: 'none',
                        }}
                    >
                        {counts[card.key]}
                    </span>

                    <div>
                        <p
                            style={{
                                fontSize: '9px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: '#4a4038',
                                fontFamily: 'monospace',
                                marginBottom: '8px',
                            }}
                        >
                            {card.label}
                        </p>
                        <p
                            style={{
                                fontSize: '40px',
                                color: card.accentColor,
                                fontFamily: 'var(--font-playfair)',
                                lineHeight: 1,
                            }}
                        >
                            {counts[card.key]}
                        </p>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0',
                            marginTop: 'auto',
                        }}
                    >
                        <Link
                            href={card.manageHref}
                            style={{
                                flex: 1,
                                fontSize: '10px',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                fontFamily: 'monospace',
                                color: '#6e6255',
                                textDecoration: 'none',
                                padding: '7px 0',
                                borderTop: '1px solid #1e1b17',
                                transition: 'color 0.15s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#d4c9b4')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#6e6255')}
                        >
                            Manage
                        </Link>
                        <Link
                            href={card.createHref}
                            style={{
                                fontSize: '10px',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                fontFamily: 'monospace',
                                color: card.accentColor,
                                textDecoration: 'none',
                                padding: '7px 0 7px 16px',
                                borderTop: '1px solid #1e1b17',
                                transition: 'opacity 0.15s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                        >
                            + New
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
