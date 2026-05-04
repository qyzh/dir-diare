'use client'

import { ReactNode } from 'react'
import AuthButton from './AuthButton'
import AdminSidebar from './AdminSidebar'

interface AdminShellProps {
    title: string
    actions?: ReactNode
    children: ReactNode
}

export default function AdminShell({ title, actions, children }: AdminShellProps) {
    return (
        <div className="min-h-screen bg-[#14120f] text-[#d4c9b4] font-mono selection:bg-[#c4aa7e] selection:text-[#14120f]">
            <div className="mx-auto flex max-w-7xl">
                <AdminSidebar />
                <main className="min-w-0 flex-1 p-6 md:p-8 lg:px-12">
                    <div className="mb-8 mt-4 flex items-center justify-between gap-4 border-b border-[#2a2520] pb-4">
                        <h1 className="text-2xl text-[#c4aa7e]">{title}</h1>
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
