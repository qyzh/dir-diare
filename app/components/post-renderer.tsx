import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../mdx-components'
import Breadcrumbs from './breadcrumbs'
import Comments from './comments'
import Footer from './footer'
import { formatDate } from 'app/lib/utils'

const components = useMDXComponents()

export default function PostRenderer({ post, type }: { post: any; type: 'art' | 'writing' }) {
    const formattedDate = post.publishedAt
        ? formatDate(post.publishedAt)
        : 'Unknown date'
    if (type === 'art') {
        return (
            <section>
                <Breadcrumbs />
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BlogPosting',
                            headline: post.title,
                            datePublished: post.publishedAt,
                            dateModified: post.publishedAt,
                            description: post.summary,
                            image: `https://kynoci.com/og?title=${post.title}`,
                            url: `https://kynoci.com/l/${post.slug}`,
                            author: {
                                '@type': 'Person',
                                name: 'Kynoci',
                            },
                        }),
                    }}
                />
                <div className="flex justify-between items-center mt-2  text-sm max-w-[650px]">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {formatDate(post.publishedAt)}
                    </p>
                </div>
                <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
                    {post.title}
                </h1>
                {post.image && (
                    <img
                        src={post.image}
                        alt="Post Image"
                        className="w-full h-auto mb-4 rounded-lg"
                    />
                )}
                <article className="prose prose-quoteless prose-neutral dark:prose-invert">
                    <MDXRemote source={post.content} components={components} />
                </article>
                <Footer />
            </section>
        )
    }

    return (
        <section className="max-w-4xl mx-auto px-4">
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
                                    (tag: string) =>
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
