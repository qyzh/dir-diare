'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
    {
        href: '/x',
        label: 'Dashboard',
        exact: true,
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <rect x="3" y="3" width="8" height="8" />
                <rect x="13" y="3" width="8" height="8" />
                <rect x="13" y="13" width="8" height="8" />
                <rect x="3" y="13" width="8" height="8" />
            </svg>
        ),
    },
    {
        href: '/x/posts',
        label: 'Posts',
        exact: false,
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <path d="M4 6h16M4 10h16M4 14h10M4 18h7" />
            </svg>
        ),
    },
    {
        href: '/x/noteqs',
        label: 'Notes',
        exact: false,
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <path d="M11 4H4v16h16v-7" />
                <path d="M14 3l7 7-7 7" />
            </svg>
        ),
    },
    {
        href: '/x/artposts',
        label: 'Art',
        exact: false,
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <circle cx="12" cy="12" r="9" />
                <path d="M9 9l6 6M15 9l-6 6" />
            </svg>
        ),
    },
    {
        href: '/x/tags',
        label: 'Tags',
        exact: false,
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
        ),
    },
]

const QUICK_CREATE = [
    { href: '/x/posts/create', label: 'Post' },
    { href: '/x/noteqs/create', label: 'Note' },
    { href: '/x/artposts/create', label: 'Art' },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    const isActive = (href: string, exact: boolean) =>
        exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

    return (
        <>
            {/* Mobile: fixed bottom nav */}
            <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0908] border-t border-[#2a2520]">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href, item.exact)
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={[
                                'flex-1 flex flex-col items-center justify-center gap-1 py-2.5 pb-safe',
                                'text-[9px] font-mono tracking-[0.08em] uppercase',
                                'border-t-[2px] transition-colors duration-150',
                                active
                                    ? 'text-[#c4aa7e] border-t-[#c4aa7e] bg-[#14120f]'
                                    : 'text-[#4a4038] border-t-transparent hover:text-[#7a7268]',
                            ].join(' ')}
                        >
                            <span style={{ opacity: active ? 1 : 0.5 }}>{item.icon}</span>
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* Desktop: vertical sidebar */}
            <aside className="hidden md:flex w-[220px] shrink-0 flex-col border-r border-[#1e1b17] bg-[#0c0b09] min-h-screen sticky top-0 h-screen overflow-y-auto">

                {/* Brand */}
                <div className="px-5 pt-6 pb-5 border-b border-[#1a1814]">
                    <p className="text-[10px] tracking-[0.22em] uppercase text-[#c4aa7e] font-mono leading-none">
                        DIR-DIARE
                    </p>
                    <p className="text-[8px] tracking-[0.14em] text-[#2e2b25] font-mono uppercase mt-1.5">
                        /x · admin
                    </p>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 pt-4 pb-2">
                    <p className="text-[8px] tracking-[0.22em] uppercase text-[#2a2520] font-mono px-2 mb-2">
                        Navigate
                    </p>

                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item.href, item.exact)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={[
                                    'flex items-center gap-2.5 px-2.5 py-2 mb-px',
                                    'text-[12px] font-mono border-l-2 transition-all duration-150',
                                    active
                                        ? 'text-[#c4aa7e] bg-[#161310] border-l-[#c4aa7e]'
                                        : 'text-[#6e6255] border-l-transparent hover:text-[#a89f94] hover:bg-[#111009]',
                                ].join(' ')}
                            >
                                <span
                                    className="shrink-0 transition-opacity duration-150"
                                    style={{ opacity: active ? 1 : 0.6 }}
                                >
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        )
                    })}

                    {/* Quick create */}
                    <div className="mt-6 pt-4 border-t border-[#1a1814]">
                        <p className="text-[8px] tracking-[0.22em] uppercase text-[#2a2520] font-mono px-2 mb-2">
                            New
                        </p>
                        {QUICK_CREATE.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2 px-2.5 py-1.5 mb-px text-[11px] font-mono tracking-[0.04em] text-[#3a3228] border-l-2 border-l-transparent hover:text-[#c4aa7e] hover:border-l-[#2e2b25] transition-all duration-150"
                            >
                                <span className="text-[#2a2520] text-xs leading-none">+</span>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Footer: view site */}
                <div className="px-5 py-4 border-t border-[#1a1814]">
                    <Link
                        href="/"
                        target="_blank"
                        className="text-[9px] tracking-[0.15em] uppercase font-mono text-[#2e2b25] hover:text-[#6e6255] transition-colors duration-150 flex items-center gap-1.5"
                    >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        View site
                    </Link>
                </div>
            </aside>
        </>
    )
}
