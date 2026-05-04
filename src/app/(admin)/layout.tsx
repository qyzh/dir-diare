import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        default: 'Admin',
        template: '%s | Admin',
    },
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen">
            {children}
        </div>
    )
}
