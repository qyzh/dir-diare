import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { Navbar } from 'app/components/nav'
import  Komentar  from 'app/components/comments'
import Saweria from 'app/components/saweria'
import Breadcrumbs from 'app/components/breadcrumbs'
import { readTime } from 'utils/ReadTime'
import { TimerIcon } from '@radix-ui/react-icons'
export async function generateStaticParams() {
    let posts = getBlogPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}
export function generateMetadata({ params }) {
    let post = getBlogPosts().find((post) => post.slug === params.slug)
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
            url: `${baseUrl}/blog/${post.slug}`,
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
    let post = getBlogPosts().find((post) => post.slug === params.slug)
    if (!post) {
        notFound()
    }

    return (
        <section>
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
                        url: `${baseUrl}/blog/${post.slug}`,
                        author: {
                            '@type': 'Person',
                            name: 'UQ',
                        },
                    }),
                }}
            />
            <Breadcrumbs post={post}/>
            <div className='grid  gap-4'>
            <div className="flex flex-col md:flex-row justify-center md:justify-start gap-x-2 gap-y-1 text-m text-neutral-600 dark:text-neutral-400 mb-2">
                
                
                <div className='flex items-center gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 stroke-indigo-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                    <time className='proportional-nums font-mono' dateTime={post.metadata.publishedAt} >{formatDate(post.metadata.publishedAt, true)}</time>
                </div>


                <div className='flex items-center text-m text-teal-400 hover:text-teal-200 '>
                    <Link
                        href="#comments"
                        className="flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                        </svg>

                        <div className="#comments">Comments</div>
                    </Link>
                </div>
                <div className='flex items-center gap-2'>
                    <TimerIcon className='inline-block stroke-sky-500 size-4.5'/>{readTime(post.content)} read
                </div>
            </div>
            </div>
            <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
                {post.metadata.title}
            </h1>
            <p className='text-neutral-600 dark:text-neutral-400'>{post.metadata.summary}</p>
            <article className="prose prose-quoteless prose-neutral dark:prose-invert">
                <CustomMDX source={post.content} />

                <hr className='my-4 border-neutral-300 dark:border-neutral-700' />
                <Komentar/>
            </article>
            <Saweria/>
        </section>
    )
}
