import Link from 'next/link'
import type { Metadata } from 'next'
import Footer from '@/components/footer'

export const metadata: Metadata = {
    title: 'About',
    description: 'Personal journal by qyzh — writing, art, and digital notes from a corner of the internet.',
    alternates: { canonical: '/about' },
}

export default function Page() {
    return (
        <main>
            <div className="page-header">
                <Link href="/" className="page-back">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    dir-diare
                </Link>
                <h1 className="page-title">About</h1>
                <p className="page-subtitle">Little about me and this blog.</p>
            </div>

            <div style={{ padding: 'var(--page-pad)', maxWidth: '680px' }}>
                <h2 className="about-title reveal">Why the name dir-diare?</h2>
                <p className="about-text reveal reveal-delay-1">
                    It started with the classic <em>dear diary</em> idea. Sweet, right?
                    But then I thought — nah, too plain. Needs more nerd... and maybe
                    a bit more toilet humour.
                </p>
                <p className="about-text reveal reveal-delay-2">
                    So came <strong style={{ color: 'var(--text-bright)' }}>dir-diare</strong>:
                </p>
                <ul style={{ paddingLeft: '1.25rem', margin: '0 0 1.5rem', listStyle: 'disc' }}>
                    <li className="about-text reveal reveal-delay-3" style={{ marginBottom: '0.75rem' }}>
                        <code style={{ fontFamily: 'var(--font-body)', background: 'var(--bg-card)', padding: '0.1em 0.4em', color: 'var(--text-mid)' }}>"dir"</code>
                        {' '}is short for <em>directory</em> in programming — where we dump files.
                        In this case, it's where I dump thoughts, rants, ideas, and brain-farts.
                    </li>
                    <li className="about-text reveal reveal-delay-4" style={{ marginBottom: '0.75rem' }}>
                        <strong style={{ color: 'var(--text-bright)' }}>"diare"</strong>
                        {' '}(a cheeky twist on "diary") literally means <em>diarrhoea</em> in
                        Indonesian. Which, fun fact: I actually get if I drink milk. But also,
                        it perfectly captures how my thoughts sometimes rush out in... uncontrollable bursts.
                    </li>
                </ul>
                <p className="about-text reveal">
                    So yeah, this blog is basically my mental dump folder — raw, weird,
                    and sometimes mildly alarming. Read at your own risk, and maybe
                    bring some digital tissues.
                </p>
            </div>

            <Footer />
        </main>
    )
}
