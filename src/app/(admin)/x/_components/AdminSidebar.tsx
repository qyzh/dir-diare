'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
    { href: '/x', label: 'Dashboard' },
    { href: '/x/posts', label: 'Posts' },
    { href: '/x/noteqs', label: 'Notes' },
    { href: '/x/artposts', label: 'Art' },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-56 shrink-0 border-r border-[#2a2520] bg-[#0f0e0c] p-4">
            <p className="mb-4 text-xs tracking-[0.16em] text-[#c4aa7e]">
                DIR-DIARE /X
            </p>
            <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`)

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-2 py-1.5 text-sm transition-colors ${
                                isActive
                                    ? 'bg-[#1e1a14] text-neutral-100'
                                    : 'text-neutral-400 hover:text-neutral-200'
                            }`}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
