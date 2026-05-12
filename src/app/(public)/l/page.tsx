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

    const delayClass = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4']

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
                <p className="page-subtitle">
                    Things crafted, worked on, or tried for fun.
                    {posts.length > 0 && (
                        <span
                            style={{
                                marginLeft: '1rem',
                                fontSize: '0.65rem',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                fontFamily: 'var(--font-body)',
                            }}
                        >
                            {posts.length} {posts.length === 1 ? 'piece' : 'pieces'}
                        </span>
                    )}
                </p>
            </div>

            <div className="art-list">
                {posts.length > 0 ? (
                    posts.map((post, i) => (
                        <Link
                            key={post._id}
                            href={`/l/${post.slug}`}
                            className={`art-item reveal ${delayClass[i % delayClass.length]} ${i === 0 ? 'art-item--featured' : ''}`}
                        >
                            {post.image && (
                                <div className="art-item-image-wrap">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="art-item-image"
                                    />
                                </div>
                            )}
                            <div className="art-item-body">
                                <span className="art-item-index">
                                    No.{String(i + 1).padStart(2, '0')}
                                </span>
                                <h2 className="art-item-title">{post.title}</h2>
                                {post.summary && (
                                    <p className="art-item-summary">{post.summary}</p>
                                )}
                                <span className="art-item-arrow">View &rarr;</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="art-list-empty">No art posts yet.</p>
                )}
            </div>

            <Footer />
        </main>
    )
}
