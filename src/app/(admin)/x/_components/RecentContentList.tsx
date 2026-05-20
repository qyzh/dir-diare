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
        <section
            style={{
                border: '1px solid #1e1b17',
                background: '#0f0e0c',
            }}
        >
            <div
                style={{
                    padding: '14px 18px',
                    borderBottom: '1px solid #1a1814',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <h2
                    style={{
                        fontSize: '9px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#c4aa7e',
                        fontFamily: 'monospace',
                    }}
                >
                    {title}
                </h2>
                <Link
                    href={manageHref}
                    className="text-[9px] font-mono tracking-[0.12em] uppercase text-[#3a3228] hover:text-[#c4aa7e] transition-colors duration-150"
                    style={{ textDecoration: 'none' }}
                >
                    All →
                </Link>
            </div>

            {items.length === 0 ? (
                <p
                    style={{
                        padding: '20px 18px',
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        color: '#3a3228',
                    }}
                >
                    No items yet.
                </p>
            ) : (
                <div>
                    {items.map((item, i) => (
                        <div
                            key={item.id}
                            className="group"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 18px',
                                borderBottom: i < items.length - 1 ? '1px solid #161412' : 'none',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: 'monospace',
                                    fontSize: '9px',
                                    color: '#2a2520',
                                    letterSpacing: '0.05em',
                                    flexShrink: 0,
                                    width: '16px',
                                    textAlign: 'right',
                                }}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </span>

                            <p
                                className="truncate flex-1 font-[family-name:var(--font-playfair)] text-[#a89f94] group-hover:text-[#d4c9b4] transition-colors duration-150"
                                style={{ fontSize: '13px' }}
                            >
                                {item.label}
                            </p>

                            <Link
                                href={item.editHref}
                                aria-label={`Edit ${item.label}`}
                                className="shrink-0 text-[#2a2520] hover:text-[#c4aa7e] transition-colors duration-150"
                            >
                                <Pencil size={12} />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
