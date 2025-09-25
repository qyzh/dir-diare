import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost, getartPosts } from 'app/lib/artpost'
import { formatDate } from 'app/w/utils'
import Breadcrumbs from 'app/components/breadcrumbs'
import Footer from 'app/components/footer'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../../mdx-components'

const components = useMDXComponents()
export async function generateStaticParams() {
    const posts = await getartPosts()
    return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
    params,
}): Promise<Metadata | undefined> {
    const post = await getPost(params.slug)
    if (!post) {
        return
    }

    const { title, publishedAt: publishedTime, summary: description } = post
    const ogImage = `https://kynoci.com/og?title=${title}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `https://kynoci.com/l/${post.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    }
}

export default async function ArtPost({ params }) {
    const post = await getPost(params.slug)

    if (!post) {
        notFound()
    }

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
            <img
                src={`${post.image}`}
                alt="Post Image"
                className="w-full h-auto mb-4 rounded-lg"
            />
            <article className="prose prose-quoteless prose-neutral dark:prose-invert">
                <MDXRemote source={post.content} components={components} />
            </article>
            <Footer />
        </section>
    )
}
