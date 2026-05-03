'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const NAV = [
    { label: 'Dashboard', href: '/x', exact: true },
    { label: 'Posts', href: '/x/posts' },
    { label: 'Notes', href: '/x/noteqs' },
    { label: 'Art', href: '/x/artposts' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { data: session } = useSession()

    return (
        <div
            className="flex min-h-screen"
            style={{ background: '#100e0b', color: '#d4c9b4', fontFamily: "'Courier Prime', monospace" }}
        >
            {/* Sidebar */}
            <aside
                className="flex flex-col flex-shrink-0 w-56 border-r"
                style={{ background: '#14120f', borderColor: '#2c2820' }}
            >
                {/* Brand */}
                <div className="px-5 pt-7 pb-6" style={{ borderBottom: '1px solid #2c2820' }}>
                    <Link href="/x">
                        <span
                            className="text-xs tracking-[0.2em] uppercase font-bold block"
                            style={{ color: '#c4aa7e' }}
                        >
                            DIR-DIARE
                        </span>
                        <span className="text-xs tracking-widest" style={{ color: '#4e4438' }}>
                            /x admin
                        </span>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-5 space-y-0.5">
                    {NAV.map((item) => {
                        const active = item.exact
                            ? pathname === item.href
                            : pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2.5 px-3 py-2 text-sm transition-colors"
                                style={{
                                    color: active ? '#c4aa7e' : '#8a7c6c',
                                    background: active ? 'rgba(196,170,126,0.08)' : 'transparent',
                                    borderLeft: active ? '2px solid #c4aa7e' : '2px solid transparent',
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{ background: active ? '#c4aa7e' : '#3a3228' }}
                                />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="px-5 py-5 space-y-3" style={{ borderTop: '1px solid #2c2820' }}>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
                        style={{ color: '#6e6255' }}
                        target="_blank"
                    >
                        <span>↗</span>
                        <span>View site</span>
                    </Link>
                    {session?.user && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs" style={{ color: '#6e6255' }}>
                                {session.user.name}
                            </span>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="text-xs transition-colors hover:opacity-80"
                                style={{ color: '#9e6b5a' }}
                            >
                                sign out
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 overflow-auto">
                <div className="max-w-4xl mx-auto px-8 py-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
