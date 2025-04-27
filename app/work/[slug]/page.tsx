import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getArtPosts } from 'app/work/utils'
import { baseUrl } from 'app/sitemap'
import { Navbar } from 'app/components/nav'
import  Breadcrumbs  from 'app/components/breadcrumbs'
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
            headline: post?.metadata?.title || '',
            datePublished: post?.metadata?.publishedAt || '',
            dateModified: post?.metadata?.publishedAt || '',
            description: post?.metadata?.summary || '',
            image: post?.metadata?.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post?.metadata?.title || '')}`,
            url: `${baseUrl}/art/${post?.slug || ''}`,
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
            <div className="flex items-center flex-wrap gap-4 mb-4">
                <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 72 72" className='inline fill-indigo-600'>
<path d="M 22 14 C 17.029 14 13 18.029 13 23 L 13 49 C 13 53.971 17.029 58 22 58 L 50 58 C 54.971 58 59 53.971 59 49 L 59 23 C 59 18.029 54.971 14 50 14 L 22 14 z M 23 28 L 49 28 C 50.103 28 51 28.897 51 30 L 51 48 C 51 49.103 50.103 50 49 50 L 23 50 C 21.897 50 21 49.103 21 48 L 21 30 C 21 28.897 21.897 28 23 28 z M 32 31 C 31.448 31 31 31.448 31 32 L 31 34 C 31 34.552 31.448 35 32 35 L 34 35 C 34.552 35 35 34.552 35 34 L 35 32 C 35 31.448 34.552 31 34 31 L 32 31 z M 38 31 C 37.448 31 37 31.448 37 32 L 37 34 C 37 34.552 37.448 35 38 35 L 40 35 C 40.552 35 41 34.552 41 34 L 41 32 C 41 31.448 40.552 31 40 31 L 38 31 z M 44 31 C 43.448 31 43 31.448 43 32 L 43 34 C 43 34.552 43.448 35 44 35 L 46 35 C 46.552 35 47 34.552 47 34 L 47 32 C 47 31.448 46.552 31 46 31 L 44 31 z M 26 37 C 25.448 37 25 37.448 25 38 L 25 40 C 25 40.552 25.448 41 26 41 L 28 41 C 28.552 41 29 40.552 29 40 L 29 38 C 29 37.448 28.552 37 28 37 L 26 37 z M 32 37 C 31.448 37 31 37.448 31 38 L 31 40 C 31 40.552 31.448 41 32 41 L 34 41 C 34.552 41 35 40.552 35 40 L 35 38 C 35 37.448 34.552 37 34 37 L 32 37 z M 38 37 C 37.448 37 37 37.448 37 38 L 37 40 C 37 40.552 37.448 41 38 41 L 40 41 C 40.552 41 41 40.552 41 40 L 41 38 C 41 37.448 40.552 37 40 37 L 38 37 z M 44 37 C 43.448 37 43 37.448 43 38 L 43 40 C 43 40.552 43.448 41 44 41 L 46 41 C 46.552 41 47 40.552 47 40 L 47 38 C 47 37.448 46.552 37 46 37 L 44 37 z M 26 43 C 25.448 43 25 43.448 25 44 L 25 46 C 25 46.552 25.448 47 26 47 L 28 47 C 28.552 47 29 46.552 29 46 L 29 44 C 29 43.448 28.552 43 28 43 L 26 43 z M 32 43 C 31.448 43 31 43.448 31 44 L 31 46 C 31 46.552 31.448 47 32 47 L 34 47 C 34.552 47 35 46.552 35 46 L 35 44 C 35 43.448 34.552 43 34 43 L 32 43 z M 38 43 C 37.448 43 37 43.448 37 44 L 37 46 C 37 46.552 37.448 47 38 47 L 40 47 C 40.552 47 41 46.552 41 46 L 41 44 C 41 43.448 40.552 43 40 43 L 38 43 z"></path>
</svg>
                    <time className='proportional-nums' dateTime={post.metadata.publishedAt}>
                        {formatDate(post.metadata.publishedAt)}
                    </time>
                </p>
                {post.metadata.tag && (
                    <span className="text-sm px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                        {post.metadata.tag}
                    </span>
                )}
            </div>
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
