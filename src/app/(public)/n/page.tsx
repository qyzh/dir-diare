import Link from 'next/link'
import { getNoteQ } from '@/lib/noteq'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Notes',
    description: 'Collection of quotes and notes from various sources.',
}

export const revalidate = 3600

export default async function Page() {
    const notes = await getNoteQ()

    return (
        <main>
            <div className="page-header">
                <Link href="/" className="page-back">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    dir-diare
                </Link>
                <h1 className="page-title">Notes</h1>
                <p className="page-subtitle">Collected lines worth keeping.</p>
            </div>

            <div className="quotes-wrap">
                {notes.map((note, i) => (
                    <div key={note._id} className="quote-item reveal">
                        <span className="quote-num">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                            <p className="quote-body">{note.note}</p>
                            {(note.author || note.source) && (
                                <p className="quote-source">
                                    {[note.author, note.source].filter(Boolean).join(' — ')}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
                {notes.length === 0 && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        No notes yet.
                    </p>
                )}
            </div>

            <footer className="dir-footer">
                <span>dir-diare</span>
            </footer>
        </main>
    )
}
