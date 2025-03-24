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
import { CalendarDays, Hourglass, MessagesSquare } from 'lucide-react'
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
                <CalendarDays size={16} className='text-indigo-500'/>
                    <time className='proportional-nums font-mono' dateTime={post.metadata.publishedAt} >{formatDate(post.metadata.publishedAt, true)}</time>
                </div>


                <div className='flex items-center text-m text-teal-400 hover:text-teal-200 '>
                    <Link
                        href="#comments"
                        className="flex items-center gap-1"
                    >
                            <MessagesSquare size={16} className='text-teal-400'/>

                        <div className="#comments">Comments</div>
                    </Link>
                </div>
                <div className='flex items-center gap-1'>
                    <Hourglass size={16} className='inline-block stroke-sky-500'/>{readTime(post.content)} read
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
