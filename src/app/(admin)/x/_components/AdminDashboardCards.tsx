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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {cards.map((card) => (
                <section
                    key={card.label}
                    className="border border-[#2a2520] bg-[#1a1713] p-5 transition-colors hover:border-[#4a4038]"
                >
                    <p className="text-xs uppercase tracking-widest text-[#6e6255]">
                        {card.label}
                    </p>
                    <p className="mt-2 text-3xl text-[#c4aa7e]">
                        {card.count}
                    </p>
                    <div className="mt-5 flex items-center gap-4 text-xs uppercase tracking-wider">
                        <Link
                            href={card.manageHref}
                            className="text-[#6e6255] hover:text-[#c4aa7e] transition-colors"
                        >
                            Manage
                        </Link>
                        <span className="text-[#2a2520]">/</span>
                        <Link
                            href={card.createHref}
                            className="text-[#6e6255] hover:text-[#c4aa7e] transition-colors"
                        >
                            + New
                        </Link>
                    </div>
                </section>
            ))}
        </div>
    )
}
