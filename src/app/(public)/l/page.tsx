import Link from 'next/link'
import { getAllArtPosts } from '@/lib/artpost'
import type { Metadata } from 'next'
import Footer from '@/components/footer'

export const metadata: Metadata = {
    title: 'Art',
    description: 'A collection of recent things crafted, worked on, or tried for fun.',
}

export const revalidate = 3600

export default async function Page() {
    const posts = await getAllArtPosts()
    const [featured, ...rest] = posts

    return (
        <main>
            <div className="page-header">
                <Link href="/" className="page-back">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M15 17h-2v-2h-2v-2H9v-2h2V9h2V7h2v10Z" />
                    </svg>
                    dir-diare
                </Link>
                <h1 className="page-title">Art</h1>
                <p className="page-subtitle">Things crafted, worked on, or tried for fun.</p>
            </div>

            <div className="projects-section">
                {featured && (
                    <Link href={`/l/${featured.slug}`} className="project-featured reveal" style={{ textDecoration: 'none' }}>
                        <div>
                            <p className="project-featured-label">Featured</p>
                            <h2 className="project-featured-title">{featured.title}</h2>
                            {featured.summary && (
                                <p className="project-featured-desc">{featured.summary}</p>
                            )}
                            <span className="project-link inline">View <svg xmlns="http://www.w3.org/2000/svg" width="14"
                                height="14" fill="currentColor" viewBox="0 0 24 24" ><path d="M4 11v2h16v-2zm12 2v2h2v-2zm-2 2v2h2v-2zm-2 2v2h2v-2zm4-6V9h2v2z" /><path d="M14 15V7h2v8zm-2 2V5h2v12z" /></svg></span>
                        </div>
                        {featured.image && (
                            <img
                                src={featured.image}
                                alt={featured.title}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        )}
                    </Link>
                )}

                {rest.length > 0 && (
                    <div className="projects-grid">
                        {rest.map((post) => (
                            <Link key={post._id} href={`/l/${post.slug}`} className="project-card reveal">
                                <p className="project-card-title">{post.title}</p>
                                {post.summary && (
                                    <p className="project-card-desc">{post.summary}</p>
                                )}
                            </Link>
                        ))}
                    </div>
                )}

                {posts.length === 0 && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', padding: 'var(--page-pad)' }}>
                        No art posts yet.
                    </p>
                )}
            </div>

            <Footer />
        </main>
    )
}
