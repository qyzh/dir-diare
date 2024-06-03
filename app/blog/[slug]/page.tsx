import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { Navbar } from 'app/components/nav'
import  Komentar  from 'app/components/comments'
import { DotPattern } from 'app/components/ui/dot-pattern'
import { cn } from 'utils/cn'
import Saweria from 'app/components/saweria'
import { CalendarIcon, CaretRightIcon } from '@radix-ui/react-icons'
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
                            name: 'My Dir',
                        },
                    }),
                }}
            />
            <div className="relative flex items-center bg-zinc-900 rounded border border-zinc-800 p-2 mb-4 ">
                <a
                    href="/blog"
                    className="
                    whitespace-nowrap text-zinc-400 hover:dark:text-white hover:text-zinc-700 text-sm border-b dark:border-zinc-700 border-zinc-200
                    
                    "
                >
                    dir ..
                </a>
                <span className="mx-2">

<CaretRightIcon/>
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm font-mono">
                    {post.metadata.title}
                </p>
            </div>
            <div className="flex items-center gap-x-2 font-mono text-m text-neutral-600 dark:text-neutral-400 mb-2">
<CalendarIcon />
                <time className='proportional-nums ' dateTime={post.metadata.publishedAt} >{formatDate(post.metadata.publishedAt)}</time>
                <Link
                href="#comments"
                className="flex items-center gap-x-2 font-mono text-m text-sky-500 hover:text-sky-600 "
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z" clipRule="evenodd" />
</svg>
                <div className="#comments">Comments</div>
              </Link>
            </div>

            <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
                {post.metadata.title}
            </h1>
            <article className="prose prose-quoteless prose-neutral dark:prose-invert">
                <CustomMDX source={post.content} />

                <hr className='my-4 border-neutral-300 dark:border-neutral-700' />
<Komentar/>
            </article>
            <Saweria/>
            <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
        </section>
    )
}
