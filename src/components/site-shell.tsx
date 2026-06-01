'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV_LINKS = [
    { label: 'Journal', href: '/w' },
    { label: 'Quotes', href: '/n' },
    { label: 'Projects', href: '/l' },
    { label: 'Gallery', href: '/g' },
    { label: 'About', href: '/about' },
]

const SECTION_LABELS: Record<string, string> = {
    '/w': 'Journal',
    '/n': 'Quotes',
    '/l': 'Projects',
    '/g': 'Gallery',
    '/about': 'About',
}

function getSectionLabel(pathname: string): string | null {
    for (const [prefix, label] of Object.entries(SECTION_LABELS)) {
        if (pathname === prefix || pathname.startsWith(prefix + '/')) {
            return label
        }
    }
    return null
}

export default function SiteShell() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const [curtainLifted, setCurtainLifted] = useState(false)

    const sectionLabel = getSectionLabel(pathname)

    useEffect(() => {
        const t = requestAnimationFrame(() => {
            setCurtainLifted(true)
        })
        return () => cancelAnimationFrame(t)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    // Scroll reveal
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>('.reveal')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible')
                        observer.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.1 }
        )
        els.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [pathname])

    return (
        <>
            <div id="curtain" className={curtainLifted ? 'lifted' : ''} />

            <div id="menu-overlay" className={menuOpen ? 'open' : ''}>
                <nav className="menu-nav">
                    {NAV_LINKS.map((link) => (
                        <Link key={link.href} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            <header id="topbar">
                <Link href="/" className="topbar-left">
                    dir-diare
                </Link>
                <button
                    id="menu-btn"
                    className={menuOpen ? 'open' : ''}
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </header>
        </>
    )
}
