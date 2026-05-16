'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
    {
        href: '/x',
        label: 'Dashboard',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
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
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <path d="M4 6h16M4 10h16M4 14h10M4 18h7" />
            </svg>
        ),
    },
    {
        href: '/x/noteqs',
        label: 'Notes',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <path d="M11 4H4v16h16v-7" />
                <path d="M14 3l7 7-7 7" />
            </svg>
        ),
    },
    {
        href: '/x/artposts',
        label: 'Art',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <circle cx="12" cy="12" r="9" />
                <path d="M9 9l6 6M15 9l-6 6" />
            </svg>
        ),
    },
    {
        href: '/x/tags',
        label: 'Tags',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
        ),
    },
]

const QUICK_CREATE = [
    { href: '/x/posts/create', label: '+ Post' },
    { href: '/x/noteqs/create', label: '+ Note' },
    { href: '/x/artposts/create', label: '+ Art' },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    const isActive = (href: string) =>
        href === '/x'
            ? pathname === '/x'
            : pathname === href || pathname.startsWith(`${href}/`)

    return (
        <>
            {/* Mobile: fixed bottom nav */}
            <nav
                className="flex md:hidden"
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    zIndex: 50,
                    background: '#0a0908',
                    borderTop: '1px solid #2a2520',
                    alignItems: 'stretch',
                }}
            >
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href)
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px',
                                padding: '10px 4px 12px',
                                color: active ? '#c4aa7e' : '#4a4038',
                                fontSize: '9px',
                                fontFamily: 'monospace',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                borderTop: active ? '2px solid #c4aa7e' : '2px solid transparent',
                                transition: 'color 0.15s',
                                background: active ? '#14120f' : 'transparent',
                            }}
                        >
                            <span style={{ opacity: active ? 1 : 0.6 }}>{item.icon}</span>
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* Desktop: vertical sidebar */}
            <aside
                className="hidden md:flex"
                style={{
                    width: '220px',
                    flexShrink: 0,
                    flexDirection: 'column',
                    borderRight: '1px solid #2a2520',
                    background: '#0a0908',
                    minHeight: '100vh',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflowY: 'auto',
                }}
            >
                {/* Logo / brand */}
                <div
                    style={{
                        padding: '24px 20px 16px',
                        borderBottom: '1px solid #1e1b17',
                    }}
                >
                    <p
                        style={{
                            fontSize: '10px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#c4aa7e',
                            fontFamily: 'monospace',
                            marginBottom: '2px',
                        }}
                    >
                        DIR-DIARE
                    </p>
                    <p
                        style={{
                            fontSize: '9px',
                            letterSpacing: '0.12em',
                            color: '#3a3228',
                            fontFamily: 'monospace',
                            textTransform: 'uppercase',
                        }}
                    >
                        /x admin
                    </p>
                </div>

                {/* Nav */}
                <nav style={{ padding: '12px 10px', flex: 1 }}>
                    <p
                        style={{
                            fontSize: '8px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#3a3228',
                            fontFamily: 'monospace',
                            padding: '0 10px',
                            marginBottom: '6px',
                            marginTop: '4px',
                        }}
                    >
                        Navigate
                    </p>
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '9px 10px',
                                    marginBottom: '2px',
                                    color: active ? '#c4aa7e' : '#6e6255',
                                    fontSize: '12px',
                                    fontFamily: 'monospace',
                                    textDecoration: 'none',
                                    background: active ? '#1a1713' : 'transparent',
                                    borderLeft: active ? '2px solid #c4aa7e' : '2px solid transparent',
                                    borderRadius: '0',
                                    transition: 'color 0.15s, background 0.15s',
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.color = '#d4c9b4'
                                        e.currentTarget.style.background = '#14120f'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) {
                                        e.currentTarget.style.color = '#6e6255'
                                        e.currentTarget.style.background = 'transparent'
                                    }
                                }}
                            >
                                <span style={{ opacity: active ? 1 : 0.7, flexShrink: 0 }}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        )
                    })}

                    {/* Quick create */}
                    <div
                        style={{
                            marginTop: '24px',
                            borderTop: '1px solid #1e1b17',
                            paddingTop: '16px',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '8px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: '#3a3228',
                                fontFamily: 'monospace',
                                padding: '0 10px',
                                marginBottom: '6px',
                            }}
                        >
                            Quick Create
                        </p>
                        {QUICK_CREATE.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'block',
                                    padding: '7px 10px',
                                    color: '#4a4038',
                                    fontSize: '11px',
                                    fontFamily: 'monospace',
                                    textDecoration: 'none',
                                    borderLeft: '2px solid transparent',
                                    transition: 'color 0.15s',
                                    letterSpacing: '0.05em',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#c4aa7e'
                                    e.currentTarget.style.borderLeftColor = '#2a2520'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#4a4038'
                                    e.currentTarget.style.borderLeftColor = 'transparent'
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </aside>
        </>
    )
}
