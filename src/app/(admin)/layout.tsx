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
        <div className="max-w-3xl mx-auto px-4 mb-40 bg-neutral-100 dark:bg-neutral-950 min-h-screen">
            {children}
        </div>
    )
}
