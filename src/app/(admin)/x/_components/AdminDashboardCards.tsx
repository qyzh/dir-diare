import Link from 'next/link'

interface AdminDashboardCardsProps {
    postsCount: number
    notesCount: number
    artCount: number
}

export default function AdminDashboardCards({
    postsCount,
    notesCount,
    artCount,
}: AdminDashboardCardsProps) {
    const cards = [
        {
            label: 'Posts',
            count: postsCount,
            manageHref: '/x/posts',
            createHref: '/x/posts/create',
        },
        {
            label: 'Notes',
            count: notesCount,
            manageHref: '/x/noteqs',
            createHref: '/x/noteqs/create',
        },
        {
            label: 'Art',
            count: artCount,
            manageHref: '/x/artposts',
            createHref: '/x/artposts/create',
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {cards.map((card) => (
                <section
                    key={card.label}
                    className="border border-[#2a2520] bg-[#1a1713] p-4"
                >
                    <p className="text-xs tracking-[0.12em] text-neutral-500 uppercase">
                        {card.label}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-neutral-100">
                        {card.count}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs">
                        <Link
                            href={card.manageHref}
                            className="text-[#c4aa7e] hover:text-[#d8be96]"
                        >
                            Manage
                        </Link>
                        <Link
                            href={card.createHref}
                            className="text-neutral-400 hover:text-neutral-200"
                        >
                            + New
                        </Link>
                    </div>
                </section>
            ))}
        </div>
    )
}
