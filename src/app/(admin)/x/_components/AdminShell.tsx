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
            <div className="flex h-screen items-center justify-center bg-[#14120f] font-mono text-[#6e6255]">
                loading...
            </div>
        )
    }

    if (status === 'unauthenticated') {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-[#14120f] p-8 text-center font-mono">
                <p className="mb-4 text-[#6e6255]">Please sign in to continue</p>
                <UKButton onClick={() => signIn('github')}>Sign in with GitHub</UKButton>
            </div>
        )
    }

    if (session?.user?.name !== AUTHORIZED_USER) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#14120f] font-mono text-[#9e6b5a]">
                Not authorized.
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#14120f] text-[#d4c9b4] font-mono selection:bg-[#c4aa7e] selection:text-[#14120f]">
            <div className="mx-auto flex max-w-7xl">
                <AdminSidebar />
                <main className="min-w-0 flex-1 p-6 md:p-8 lg:px-12">
                    <div className="mb-8 mt-4 flex items-center justify-between gap-4 border-b border-[#2a2520] pb-4">
                        <h1 className="text-2xl text-[#c4aa7e] font-[family-name:var(--font-tinos)]">
                            {title}
                        </h1>
                        <div className="flex items-center gap-4">
                            {actions}
                            <AuthButton />
                        </div>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    )
}
