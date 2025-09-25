import { getPostBySlug, getAllPosts } from 'app/lib/posts'
import { notFound } from 'next/navigation'
import Breadcrumbs from 'app/components/breadcrumbs'
import Comments from 'app/components/comments'
import Footer from 'app/components/footer'
import { formatDate } from '../utils'
import { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../../mdx-components'

const components = useMDXComponents()

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = await getPostBySlug(slug)

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

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const formattedDate = post.publishedAt
        ? formatDate(post.publishedAt)
        : 'Unknown date'
    return (
        <section className="max-w-4xl mx-auto">
            <Breadcrumbs post={{ metadata: { title: post.title } }} />
            <h1 className="text-3xl font-bold mb-3">
                {post.title || post.slug.replace(/-/g, ' ')}
            </h1>
            <div className="flex items-center space-x-2 my-4">
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
    const posts = await getAllPosts()

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

export const dynamicParams = true

export const revalidate = 3600
