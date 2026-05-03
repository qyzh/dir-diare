import type { Metadata } from 'next'
import AdminShell from './x/_components/AdminShell'

export const metadata: Metadata = {
    title: {
        default: 'Admin',
        template: '%s | Admin',
    },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminShell>{children}</AdminShell>
}
