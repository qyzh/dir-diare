import Link from 'next/link'

export default function NotFound() {
    return (
        <main
            style={{
                minHeight: '100svh',
                background: 'var(--bg)',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-body)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'var(--page-pad)',
                paddingBottom: 'clamp(3rem, 8vh, 5rem)',
            }}
        >
            <p
                style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '1.5rem',
                }}
            >
                HTTP · 404
            </p>

            <h1
                style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(4rem, 14vw, 10rem)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: 'var(--text-bright)',
                    lineHeight: 1,
                    margin: '0 0 2rem',
                }}
            >
                Not Found
            </h1>

            <div
                style={{
                    width: '100%',
                    height: '1px',
                    background: 'var(--line)',
                    marginBottom: '2rem',
                }}
            />

            <p
                style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-dim)',
                    lineHeight: 1.7,
                    maxWidth: '44ch',
                    marginBottom: '2.5rem',
                }}
            >
                The page you are looking for either does not exist or you
                don&apos;t have the necessary access.
            </p>

            <Link href="/" className="page-back" style={{ marginBottom: 0 }}>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M9 6H3M3 6L6 3M3 6L6 9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                ./root
            </Link>
        </main>
    )
}
