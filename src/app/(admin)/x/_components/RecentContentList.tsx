import Link from 'next/link'

interface RecentContentItem {
    id: string
    label: string
    editHref: string
}

interface RecentContentListProps {
    title: string
    items: RecentContentItem[]
    manageHref: string
}

export default function RecentContentList({
    title,
    items,
    manageHref,
}: RecentContentListProps) {
    return (
        <section className="border border-[#2a2520] bg-[#1a1713] p-4">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-100">{title}</h2>
                <Link
                    href={manageHref}
                    className="text-xs text-[#c4aa7e] hover:text-[#d8be96]"
                >
                    Manage all
                </Link>
            </div>

            {items.length === 0 ? (
                <p className="text-sm text-neutral-500">No items yet.</p>
            ) : (
                <div className="space-y-2">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b border-[#2a2520] pb-2"
                        >
                            <p className="truncate pr-4 text-sm text-neutral-300">
                                {item.label}
                            </p>
                            <Link
                                href={item.editHref}
                                className="shrink-0 text-xs text-neutral-400 hover:text-neutral-200"
                            >
                                Edit
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
