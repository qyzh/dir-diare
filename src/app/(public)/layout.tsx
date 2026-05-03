import SiteShell from '@/components/site-shell'

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="dir-shell">
            <SiteShell />
            {children}
        </div>
    )
}
