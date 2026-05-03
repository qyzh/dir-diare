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
        <aside className="w-64 shrink-0 border-r border-[#2a2520] bg-[#0f0e0c] p-6">
            <p className="mb-6 text-xs uppercase tracking-widest text-[#c4aa7e]">
                DIR-DIARE /X
            </p>
            <nav className="space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== '/x' && pathname.startsWith(`${item.href}/`))

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-2 text-sm transition-colors border ${
                                isActive
                                    ? 'bg-[#1a1713] text-[#c4aa7e] border-[#2a2520]'
                                    : 'border-transparent text-[#6e6255] hover:bg-[#14120f] hover:text-[#d4c9b4]'
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
