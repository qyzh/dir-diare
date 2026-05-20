'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

interface Heading {
    id: string
    text: string
    level: number
}

export default function PostTOC() {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Small delay to ensure MDX has finished rendering and rehype-slug has applied IDs
        const timeoutId = setTimeout(() => {
            const elements = Array.from(document.querySelectorAll('.journal-article-body h2, .journal-article-body h3'))
            const extractedHeadings: Heading[] = elements.map((el) => ({
                id: el.id,
                text: el.textContent || '',
                level: parseInt(el.tagName.replace('H', '')),
            }))
            setHeadings(extractedHeadings)

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveId(entry.target.id)
                        }
                    })
                },
                {
                    rootMargin: '-10% 0px -80% 0px',
                    threshold: 0,
                }
            )

            elements.forEach((el) => {
                if (el.id) observer.observe(el)
            })

            return () => observer.disconnect()
        }, 100)

        return () => clearTimeout(timeoutId)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        setIsOpen(false)
        const el = document.getElementById(id)
        if (el) {
            const offset = 80
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = el.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            })
            window.history.pushState(null, '', `#${id}`)
        }
    }

    if (headings.length < 2) return null

    return (
        <div className="tag-toc-container">
            <button
                className="toc-mobile-trigger"
                onClick={() => setIsOpen(true)}
                aria-label="Open Table of Contents"
            >
                <Menu />
            </button>

            <div className={`tag-toc ${isOpen ? 'mobile-open' : ''}`}>
                <div className="tag-toc-title">Contents</div>
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        onClick={(e) => handleClick(e, heading.id)}
                        className={`tag-toc-item level-h${heading.level} ${activeId === heading.id ? 'active' : ''}`}
                        title={heading.text}
                    >
                        {heading.text}
                    </a>
                ))}
            </div>

            {isOpen && (
                <button
                    className="toc-close-btn"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close Table of Contents"
                >
                    <X size={16} style={{ marginRight: '0.6rem' }} />
                    Close
                </button>
            )}
        </div>
    )
}
