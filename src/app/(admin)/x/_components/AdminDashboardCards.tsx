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
        dimColor: '#3a2e1e',
        manageHref: '/x/posts',
        createHref: '/x/posts/create',
    },
    {
        key: 'notes' as const,
        label: 'Notes',
        accentColor: '#8a9e7e',
        dimColor: '#1e2e1a',
        manageHref: '/x/noteqs',
        createHref: '/x/noteqs/create',
    },
    {
        key: 'art' as const,
        label: 'Art',
        accentColor: '#9e7e8a',
        dimColor: '#2e1e26',
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1px',
                background: '#1a1814',
            }}
        >
            {CARD_META.map((card) => (
                <div
                    key={card.key}
                    style={{
                        background: '#14120f',
                        padding: '24px 22px 0',
                        display: 'flex',
                        flexDirection: 'column',
                        borderTop: `2px solid ${card.accentColor}`,
                    }}
                >
                    <p
                        style={{
                            fontSize: '8px',
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: '#3a3228',
                            fontFamily: 'monospace',
                            marginBottom: '12px',
                        }}
                    >
                        {card.label}
                    </p>

                    <p
                        style={{
                            fontSize: '52px',
                            color: card.accentColor,
                            fontFamily: 'var(--font-playfair)',
                            lineHeight: 1,
                            marginBottom: '24px',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {counts[card.key]}
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            borderTop: '1px solid #1e1b17',
                            marginTop: 'auto',
                        }}
                    >
                        <Link
                            href={card.manageHref}
                            className="flex-1 py-3 text-[10px] tracking-[0.12em] uppercase font-mono text-[#6e6255] hover:text-[#a89f94] transition-colors duration-150"
                            style={{ textDecoration: 'none' }}
                        >
                            Manage
                        </Link>
                        <Link
                            href={card.createHref}
                            className="py-3 pl-4 text-[10px] tracking-[0.12em] uppercase font-mono transition-opacity duration-150 hover:opacity-70"
                            style={{
                                color: card.accentColor,
                                textDecoration: 'none',
                            }}
                        >
                            + New
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
