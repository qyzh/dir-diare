
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getArtPosts } from 'app/work/utils'
import { baseUrl } from 'app/sitemap'
import { Navbar } from 'app/components/nav'
import  Breadcrumbs  from 'app/components/breadcrumbs'
import {  CaretRightIcon } from '@radix-ui/react-icons'
import Saweria from 'app/components/saweria'

export async function generateStaticParams() {
    let posts = getArtPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export function generateMetadata({ params }) {
    let post = getArtPosts().find((post) => post.slug === params.slug)
    if (!post) {
        return
    }

    let {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = post.metadata
    let ogImage = image
        ? image
        : `${baseUrl}/og?title=${encodeURIComponent(title)}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `${baseUrl}/work/${post.slug}`,
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

export default function Blog({ params }) {
    let post = getArtPosts().find((post) => post.slug === params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div>
            <Navbar />
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.metadata.title,
                        datePublished: post.metadata.publishedAt,
                        dateModified: post.metadata.publishedAt,
                        description: post.metadata.summary,
                        image: post.metadata.image
                            ? `${baseUrl}${post.metadata.image}`
                            : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                        url: `${baseUrl}/art/${post.slug}`,
                        author: {
                            '@type': 'Person',
                            name: 'My Dir',
                        },
                    }),
                }}
            />
            <div className="text-left mb-4">
        <Breadcrumbs post={post}/>
            </div>
            <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
                <time className='proportional-nums ' dateTime={post.metadata.publishedAt} >{formatDate(post.metadata.publishedAt)}</time>

            </p>
            <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
                {post.metadata.title}
            </h1>
            <article className="prose prose-quoteless prose-neutral dark:prose-invert">
                <CustomMDX source={post.content} />

                <hr className='mb-2 border-neutral-300 dark:border-neutral-800' />
            </article>
            <Saweria/>
        </div>
    )
}
