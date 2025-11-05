import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../mdx-components'
import Breadcrumbs from './breadcrumbs'
import UkCallout from './ukcallout'
import Comments from './comments'
import Footer from './footer'
import { formatDate } from 'app/lib/utils'
import Image from 'next/image'

const components = useMDXComponents()

export default function PostRenderer({
    post,
    type,
}: {
    post: any
    type: 'art' | 'writing'
}) {
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
                            dateModified: post.updatedAt || post.publishedAt,
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
                <h1 className="post-title tracking-tighter max-w-[650px]">
                    {post.title}
                </h1>
                <div className="flex justify-between items-center mt-2  text-sm max-w-[650px]">
                    <div className="metadataart items-center">
                        <span>
                            Published:{' '}
                            <time>{formatDate(post.publishedAt)}</time>
                        </span>
                    </div>
                </div>
                {post.image && (
                    <Image
                        src={post.image}
                        alt="Post Image"
                        width={800}
                        height={600}
                        className="w-full h-auto my-4"
                    />
                )}
                <article className="prose prose-quoteless prose-neutral dark:prose-invert">
                    <MDXRemote source={post.content} components={components} />
                    <UkCallout>
                        {post.updatedAt &&
                            post.updatedAt !== post.publishedAt && (
                                <time>
                                    Updated: {formatDate(post.updatedAt)}
                                </time>
                            )}
                    </UkCallout>
                </article>
                <Footer />
            </section>
        )
    }

    return (
        <section>
            <Breadcrumbs post={{ metadata: { title: post.title } }} />
            <h1 className="post-title mb-3">
                {post.title || post.slug.replace(/-/g, ' ')}
            </h1>
            <div className="flex items-center space-x-2">
                <time className="post-date">
                    Published: {formattedDate}
                    {post.updatedAt && post.updatedAt !== post.publishedAt && (
                        <span className="ml-4">
                            Updated: {formatDate(post.updatedAt)}
                        </span>
                    )}
                </time>
            </div>

            <article className="max-w-none prose dark:prose-invert prose-lg prose-headings:font-bold prose-headings:text-black dark:prose-headings:text-white/90 prose-p:text-black/80 dark:prose-p:text-neutral-300 prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline">
                <MDXRemote source={post.content} components={components} />
            </article>

            {post.tags && post.tags.length > 0 && (
                <div className="metadataart text-sm">
                    <span className="font-semibold mr-2">Tags:</span>
                    <span className="font-mono text-neutral-600 dark:text-neutral-400">
                        {post.tags
                            .map(
                                (tag: string) =>
                                    tag.charAt(0).toUpperCase() +
                                    tag.slice(1).toLowerCase()
                            )
                            .join(', ')}
                    </span>
                </div>
            )}

            <Comments />
            <Footer />
        </section>
    )
}
