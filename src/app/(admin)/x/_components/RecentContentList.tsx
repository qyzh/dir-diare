import Link from 'next/link'
import { Pencil } from 'lucide-react'

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
        <section className="border border-[#2a2520] bg-[#1a1713] p-5">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xs uppercase tracking-widest text-[#c4aa7e]">{title}</h2>
                <Link
                    href={manageHref}
                    className="text-xs text-[#6e6255] hover:text-[#c4aa7e] transition-colors"
                >
                    Manage all
                </Link>
            </div>

            {items.length === 0 ? (
                <p className="text-sm text-[#6e6255]">No items yet.</p>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b border-[#2a2520] pb-2 last:border-0 last:pb-0"
                        >
                            <p className="truncate pr-4 text-sm text-[#d4c9b4] font-[family-name:var(--font-tinos)]">
                                {item.label}
                            </p>
                            <Link
                                href={item.editHref}
                                className="shrink-0 text-[#6e6255] hover:text-[#c4aa7e] transition-colors"
                            >
                                <Pencil size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
