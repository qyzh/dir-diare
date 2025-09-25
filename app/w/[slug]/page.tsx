import { getPost, getPosts, Post } from 'app/lib/posts'
import { notFound } from 'next/navigation'
import { Navbar } from 'app/components/nav'
import Breadcrumbs from 'app/components/breadcrumbs'
import Comments from 'app/components/comments'
import Footer from 'app/components/footer'
import Link from 'next/link'
import { formatDate } from '../utils'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../../mdx-components'

const components = useMDXComponents()

// Generate metadata for the page
export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const post = await getPost(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested post could not be found',
        }
    }

    return {
        title: post.title,
        description:
            post.summary || `Read ${post.title} by ${post.author || 'qyzh'}`,
        openGraph: {
            title: post.title,
            description:
                post.summary ||
                `Read ${post.title} by ${post.author || 'qyzh'}`,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author || 'qyzh'],
            tags: post.tags,
        },
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)

    if (!post) {
        notFound()
    }

    const formattedDate = post.publishedAt
        ? formatDate(post.publishedAt)
        : 'Unknown date'

    // The content could be HTML, MDX, or plain text depending on what's stored in MongoDB
    // MDXRemote will render it properly as long as it's valid MDX content

    return (
        <section className="max-w-4xl mx-auto">
            <Breadcrumbs post={{ metadata: { title: post.title } }} />
            <Navbar />
            <h1 className="text-3xl font-bold mb-3">
                {post.title || post.slug.replace(/-/g, ' ')}
            </h1>
            <div className="flex items-center space-x-2 my-4">
                <div className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/profil.jpg"
                            alt="Author avatar"
                            className="w-5 h-5 rounded-full bg-teal-300"
                        />
                        <Link
                            href="/about"
                            className="text-black dark:text-white hover:text-emerald-300 transition-colors duration-200"
                            title="About the author"
                        >
                            {post.author || 'qyzh'}
                        </Link>
                    </div>
                </div>
                <span className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                    •
                </span>
                <time className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                    {formattedDate}
                </time>
            </div>

            {post.summary && (
                <p className="text-black/50 dark:text-neutral-500 font-mono my-6 text-lg border-l-4 border-neutral-700 pl-4 italic">
                    {post.summary}
                </p>
            )}

            <article className="max-w-none prose dark:prose-invert prose-lg prose-headings:font-bold prose-headings:text-black dark:prose-headings:text-white/90 prose-p:text-black/80 dark:prose-p:text-neutral-300 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline my-8">
                <MDXRemote source={post.content} components={components} />
            </article>

            {post.tags && post.tags.length > 0 && (
                <div className="mt-6 border-y border-neutral-300 dark:border-neutral-700 py-3">
                    <p className="text-sm text-black dark:text-white flex items-center gap-2">
                        <span className="font-bold">Tags:</span>
                        <span className="font-mono text-neutral-600 dark:text-neutral-400">
                            {post.tags
                                .map(
                                    (tag) =>
                                        tag.charAt(0).toUpperCase() +
                                        tag.slice(1).toLowerCase()
                                )
                                .join(', ')}
                        </span>
                    </p>
                </div>
            )}

            <Comments />
            <Footer />
        </section>
    )
}

export async function generateStaticParams() {
    const posts = await getPosts()

    return posts
        .map((post) => {
            if (!post.slug) {
                console.warn(`Post without slug found: ${post._id}`)
                return null
            }
            return { slug: post.slug }
        })
        .filter(Boolean)
}

// Set to true if you want to allow new posts to be fetched without rebuilding
export const dynamicParams = true

export const revalidate = 3600 // Revalidate the data at most every hour
