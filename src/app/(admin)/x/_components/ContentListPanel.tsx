import { ReactNode } from 'react'

interface ContentListPanelProps {
    title: string
    actions?: ReactNode
    error?: string | null
    isLoading: boolean
    isEmpty: boolean
    emptyText: string
    children: ReactNode
}

function SkeletonRows() {
    return (
        <div className="space-y-2">
            {[80, 65, 90, 55, 75].map((w, i) => (
                <div
                    key={i}
                    style={{
                        height: '56px',
                        background: '#14120f',
                        border: '1px solid #1a1814',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 12px',
                        gap: '12px',
                    }}
                >
                    <div
                        style={{
                            height: '10px',
                            width: `${w}%`,
                            background: '#1e1b17',
                            borderRadius: '1px',
                            animation: 'shimmer 1.5s ease-in-out infinite',
                            animationDelay: `${i * 0.1}s`,
                        }}
                    />
                </div>
            ))}
            <style>{`
                @keyframes shimmer {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }
            `}</style>
        </div>
    )
}

export default function ContentListPanel({
    title,
    actions,
    error,
    isLoading,
    isEmpty,
    emptyText,
    children,
}: ContentListPanelProps) {
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
                    gap: '12px',
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
                {actions}
            </div>

            <div style={{ padding: '16px 18px' }}>
                {isLoading ? (
                    <SkeletonRows />
                ) : error ? (
                    <p
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            color: '#9e4a3a',
                        }}
                    >
                        {error}
                    </p>
                ) : isEmpty ? (
                    <p
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            color: '#3a3228',
                            padding: '8px 0',
                        }}
                    >
                        {emptyText}
                    </p>
                ) : (
                    children
                )}
            </div>
        </section>
    )
}
