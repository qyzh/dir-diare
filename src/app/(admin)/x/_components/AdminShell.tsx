'use client'

import { ReactNode } from 'react'
import Breadcrumbs from '@/components/breadcrumbs'
import AuthButton from './AuthButton'
import AdminSidebar from './AdminSidebar'

interface AdminShellProps {
    title: string
    actions?: ReactNode
    children: ReactNode
}

export default function AdminShell({ title, actions, children }: AdminShellProps) {
    return (
        <div className="min-h-screen bg-[#14120f] text-neutral-200">
            <div className="mx-auto flex max-w-7xl">
                <AdminSidebar />
                <main className="min-w-0 flex-1 p-6">
                    <Breadcrumbs />
                    <div className="mb-6 mt-3 flex items-center justify-between gap-3">
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <div className="flex items-center gap-3">
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
