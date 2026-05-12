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

export default function AdminShell({ title, actions, children }: AdminShellProps) {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return (
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#14120f',
                    fontFamily: 'monospace',
                    color: '#3a3228',
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}
            >
                initializing...
            </div>
        )
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
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        border: '1px solid #2a2520',
                        padding: '2.5rem 3rem',
                        maxWidth: '360px',
                        width: '100%',
                    }}
                >
                    <p
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '9px',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#c4aa7e',
                            marginBottom: '8px',
                        }}
                    >
                        DIR-DIARE /X
                    </p>
                    <p
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '13px',
                            color: '#6e6255',
                            marginBottom: '24px',
                        }}
                    >
                        Authentication required
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
                    background: '#14120f',
                    fontFamily: 'monospace',
                    color: '#9e6b5a',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                }}
            >
                not authorized.
            </div>
        )
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#14120f',
                color: '#d4c9b4',
            }}
        >
            <div
                className="flex"
                style={{ minHeight: '100vh', width: '100%' }}
            >
                <AdminSidebar />

                <main
                    style={{
                        flex: 1,
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        // bottom padding for mobile bottom nav
                        paddingBottom: 'env(safe-area-inset-bottom)',
                    }}
                    className="pb-20 md:pb-0"
                >
                    {/* Page header */}
                    <div
                        style={{
                            borderBottom: '1px solid #1e1b17',
                            padding: '16px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px',
                            flexWrap: 'wrap',
                            background: '#0f0e0c',
                            position: 'sticky',
                            top: 0,
                            zIndex: 10,
                        }}
                        className="md:px-10"
                    >
                        <h1
                            style={{
                                fontSize: '18px',
                                color: '#c4aa7e',
                                fontFamily: 'var(--font-tinos)',
                                lineHeight: 1.2,
                                margin: 0,
                            }}
                            className="md:text-xl"
                        >
                            {title}
                        </h1>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                flexWrap: 'wrap',
                            }}
                        >
                            {actions}
                            <AuthButton />
                        </div>
                    </div>

                    {/* Content area */}
                    <div
                        style={{ padding: '20px' }}
                        className="md:px-10 md:py-8"
                    >
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
