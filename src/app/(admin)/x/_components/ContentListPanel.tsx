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
        <section className="border border-[#2a2520] bg-[#1a1713] p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-xs uppercase tracking-widest text-[#c4aa7e] font-mono">{title}</h2>
                {actions}
            </div>

            {isLoading ? (
                <p className="text-sm text-[#6e6255]">Loading...</p>
            ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
            ) : isEmpty ? (
                <p className="text-sm text-[#6e6255]">{emptyText}</p>
            ) : (
                children
            )}
        </section>
    )
}
