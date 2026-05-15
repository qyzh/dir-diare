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
                <p className="page-subtitle">Things crafted, worked on, or tried for fun.</p>
            </div>

            <div className="art-list">
                {posts.length > 0 ? (
                    posts.map((post, i) => {
                        const date = new Date(post.publishedAt);
                        const formattedDate = date.toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        });

                        return (
                            <Link
                                key={post._id}
                                href={`/l/${post.slug}`}
                                className={`art-card reveal ${delayClass[i % delayClass.length]}`}
                            >
                                <div className="art-card-bg">
                                    {post.image ? (
                                        <img src={post.image} alt={post.title} className="art-card-image" />
                                    ) : (
                                        <div className="art-card-image-placeholder"></div>
                                    )}
                                </div>
                                <div className="art-card-top">
                                    <div className="art-card-logo">
                                        {post.author}
                                    </div>
                                    <div className="art-card-date">
                                        {formattedDate}
                                    </div>
                                </div>
                                <div className="art-card-glass">
                                    <div className="art-card-content">
                                        <h2 className="art-card-title">{post.title}</h2>
                                        {post.summary && (
                                            <p className="art-card-summary">{post.summary}</p>
                                        )}
                                    </div>
                                    <div className="art-card-action">
                                        <span className="art-card-btn">Learn more</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                ) : (
                    <p className="art-list-empty">No art posts yet.</p>
                )}
            </div>

            <Footer />
        </main>
    )
}
