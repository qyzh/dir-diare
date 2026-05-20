import Link from 'next/link'
import type { Metadata } from 'next'
import Footer from '@/components/footer'

export const metadata: Metadata = {
    title: 'About',
    description:
        'Personal journal by qyzh — writing, art, and digital notes from a corner of the internet.',
    alternates: { canonical: '/about' },
}

const CONTENT_TYPES = ['writing', 'art', 'notes', 'music']

export default function Page() {
    return (
        <main>
            {/* ── Page header ── */}
            <div className="page-header">
                <Link href="/" className="page-back">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                            d="M9 2L4 7l5 5"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    dir-diare
                </Link>
                <h1 className="page-title">About</h1>
                <p className="page-subtitle">Little about me and this blog.</p>
            </div>

            {/* ── Identity block ── */}
            <section
                style={{
                    padding: 'var(--page-pad)',
                    maxWidth: '680px',
                    borderBottom: '1px solid var(--line)',
                }}
            >
                <p
                    className="reveal"
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginBottom: '20px',
                    }}
                >
                    $ whoami
                </p>

                <p
                    className="reveal reveal-delay-1"
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.25rem, 3.5vw, 1.875rem)',
                        fontWeight: 400,
                        color: 'var(--text-bright)',
                        lineHeight: 1.35,
                        marginBottom: '28px',
                    }}
                >
                    I'm qyzh. I write, make digital art,
                    <br />
                    and keep notes about things I find interesting.
                </p>

                <div
                    className="reveal reveal-delay-2"
                    style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}
                >
                    {CONTENT_TYPES.map((type) => (
                        <span
                            key={type}
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '9px',
                                letterSpacing: '0.18em',
                                textTransform: 'uppercase',
                                color: 'var(--text-dim)',
                                border: '1px solid var(--line)',
                                padding: '5px 12px',
                            }}
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </section>

            {/* ── Name origin ── */}
            <section
                style={{
                    padding: 'var(--page-pad)',
                    maxWidth: '680px',
                }}
            >
                <h2 className="about-title reveal">Why the name dir-diare?</h2>

                <p className="about-text reveal reveal-delay-1">
                    It started with the classic <em>dear diary</em> idea. Sweet, right? But then
                    I thought — nah, too plain. Needs more nerd... and maybe a bit more toilet
                    humour.
                </p>

                <p
                    className="reveal reveal-delay-2"
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '10px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginBottom: '12px',
                    }}
                >
                    So came{' '}
                    <strong style={{ color: 'var(--text-bright)', fontStyle: 'normal' }}>
                        dir-diare
                    </strong>
                    :
                </p>

                {/* Concept cards */}
                <div
                    className="reveal reveal-delay-3 grid grid-cols-1 sm:grid-cols-2"
                    style={{
                        gap: '1px',
                        background: 'var(--line)',
                        border: '1px solid var(--line)',
                        marginBottom: '2rem',
                    }}
                >
                    {/* DIR */}
                    <div style={{ background: 'var(--bg-card)', padding: '22px 24px' }}>
                        <p
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '9px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                marginBottom: '10px',
                            }}
                        >
                            <span style={{ color: 'var(--text-dim)' }}>01</span>
                            {'  '}/ dir
                        </p>
                        <p
                            style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '1.375rem',
                                fontStyle: 'italic',
                                color: 'var(--text-bright)',
                                marginBottom: '12px',
                                lineHeight: 1.2,
                            }}
                        >
                            directory
                        </p>
                        <p
                            style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-mid)',
                                lineHeight: 1.75,
                            }}
                        >
                            Short for <em>directory</em> in programming — where we dump files.
                            In this case, it's where I dump thoughts, rants, ideas, and
                            brain-farts.
                        </p>
                    </div>

                    {/* DIARE */}
                    <div style={{ background: 'var(--bg-card)', padding: '22px 24px' }}>
                        <p
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '9px',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                marginBottom: '10px',
                            }}
                        >
                            <span style={{ color: 'var(--text-dim)' }}>02</span>
                            {'  '}/ diare
                        </p>
                        <p
                            style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '1.375rem',
                                fontStyle: 'italic',
                                color: 'var(--text-bright)',
                                marginBottom: '12px',
                                lineHeight: 1.2,
                            }}
                        >
                            diary × diarrhoea
                        </p>
                        <p
                            style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-mid)',
                                lineHeight: 1.75,
                            }}
                        >
                            A cheeky twist on "diary" that literally means{' '}
                            <em>diarrhoea</em> in Indonesian. My thoughts rush out in...
                            uncontrollable bursts. (Also: I actually get it from milk.)
                        </p>
                    </div>
                </div>

                <p className="about-text reveal">
                    So yeah — this is my mental dump folder. Raw, weird, and sometimes
                    mildly alarming. Read at your own risk, and maybe bring some digital
                    tissues.
                </p>
            </section>

            <Footer />
        </main>
    )
}
