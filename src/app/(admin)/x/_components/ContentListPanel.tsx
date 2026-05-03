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
        <section className="border border-[#2a2520] bg-[#1a1713] p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-neutral-100">{title}</h2>
                {actions}
            </div>

            {isLoading ? (
                <p className="text-sm text-neutral-400">Loading...</p>
            ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
            ) : isEmpty ? (
                <p className="text-sm text-neutral-500">{emptyText}</p>
            ) : (
                children
            )}
        </section>
    )
}
