'use client'

import { ReactNode } from 'react'
import { useSession, signIn } from 'next-auth/react'
import AuthButton from './AuthButton'
import AdminSidebar from './AdminSidebar'
import UKButton from '@/components/ui/ukbtn'
import { AUTHORIZED_USER } from '@/lib/constants'

interface AdminShellProps {
    title: string
    actions?: ReactNode
    children: ReactNode
}

function Skeleton() {
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0c0b09',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                }}
            >
                <p
                    style={{
                        fontFamily: 'monospace',
                        fontSize: '9px',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: '#c4aa7e',
                    }}
                >
                    DIR-DIARE
                </p>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            style={{
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#2e2b25',
                                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                            }}
                        />
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.2; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    )
}

export default function AdminShell({ title, actions, children }: AdminShellProps) {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <Skeleton />
    }

    if (status === 'unauthenticated') {
        return (
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0908',
                    padding: '2rem',
                }}
            >
                <div
                    style={{
                        border: '1px solid #1e1b17',
                        padding: '2.5rem 2.5rem 2rem',
                        maxWidth: '320px',
                        width: '100%',
                        background: '#0f0d0b',
                    }}
                >
                    <p
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '9px',
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: '#c4aa7e',
                            marginBottom: '4px',
                        }}
                    >
                        DIR-DIARE
                    </p>
                    <p
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '8px',
                            letterSpacing: '0.12em',
                            color: '#2e2b25',
                            textTransform: 'uppercase',
                            marginBottom: '28px',
                        }}
                    >
                        /x · admin
                    </p>
                    <p
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            color: '#6e6255',
                            marginBottom: '20px',
                            lineHeight: 1.5,
                        }}
                    >
                        Authentication required.
                    </p>
                    <UKButton onClick={() => signIn('github')}>Sign in with GitHub</UKButton>
                </div>
            </div>
        )
    }

    if (session?.user?.name !== AUTHORIZED_USER) {
        return (
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0c0b09',
                    fontFamily: 'monospace',
                    color: '#3a3228',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                }}
            >
                not authorized.
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: '#14120f', color: '#d4c9b4' }}>
            <div className="flex" style={{ minHeight: '100vh', width: '100%' }}>
                <AdminSidebar />

                <main
                    style={{ flex: 1, minWidth: 0 }}
                    className="pb-20 md:pb-0 flex flex-col"
                >
                    {/* Sticky header */}
                    <header
                        style={{
                            borderBottom: '1px solid #1a1814',
                            background: '#0f0e0c',
                            position: 'sticky',
                            top: 0,
                            zIndex: 10,
                        }}
                        className="px-5 py-3.5 md:px-8 flex items-center justify-between gap-4 flex-wrap"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <h1
                                style={{
                                    fontFamily: 'var(--font-playfair)',
                                    fontSize: '17px',
                                    color: '#c4aa7e',
                                    lineHeight: 1.2,
                                    margin: 0,
                                }}
                                className="truncate"
                            >
                                {title}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
                            {actions}
                            <AuthButton />
                        </div>
                    </header>

                    {/* Content */}
                    <div className="px-5 py-6 md:px-8 md:py-8 flex-1">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
